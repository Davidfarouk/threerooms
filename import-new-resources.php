<?php
/**
 * Import New Resources Data from JSON
 * 
 * This script imports structured data from JSON files into WordPress
 * Run via: docker exec wordpress_site php /var/www/html/import-new-resources.php
 */

// Load WordPress
require_once('/var/www/html/wp-load.php');

if (!defined('ABSPATH')) {
    die('Direct access not allowed');
}

echo "=== Importing New Resources Data from JSON ===\n\n";

// Service name mappings (JSON name -> WordPress slug/name)
$service_mappings = [
    'Counselling & Psychotherapy' => ['Talking Therapy', 'Counselling', 'Psychotherapy', 'Counselling & Psychotherapy'],
    'Hypnotherapy' => ['Hypnotherapy'],
    'Podiatry' => ['Podiatry'],
    'Alexander Technique' => ['Alexander Technique'],
    'Reflexology' => ['Reflexology'],
];

// File paths
$services_file = '/var/www/html/temp-resources/therapies_by_service.json';
$therapists_file = '/var/www/html/temp-resources/therapists_directory.json';

// Copy files to temp location if needed
if (!file_exists($services_file)) {
    $host_services = __DIR__ . '/../new resources/therapies_by_service.json';
    if (file_exists($host_services)) {
        copy($host_services, $services_file);
    }
}

if (!file_exists($therapists_file)) {
    $host_therapists = __DIR__ . '/../new resources/therapists_directory.json';
    if (file_exists($host_therapists)) {
        copy($host_therapists, $therapists_file);
    }
}

// Load JSON files
if (!file_exists($services_file)) {
    die("ERROR: Services JSON file not found: $services_file\n");
}
if (!file_exists($therapists_file)) {
    die("ERROR: Therapists JSON file not found: $therapists_file\n");
}

$services_data = json_decode(file_get_contents($services_file), true);
$therapists_data = json_decode(file_get_contents($therapists_file), true);

if (!$services_data || !$therapists_data) {
    die("ERROR: Failed to parse JSON files\n");
}

echo "✓ Loaded services JSON: " . count($services_data['services']) . " services\n";
echo "✓ Loaded therapists JSON: " . count($therapists_data['therapists']) . " therapists\n\n";

// Import Services
echo "=== Importing Services ===\n";
$valid_service_ids = [];

foreach ($services_data['services'] as $service_data) {
    $service_name = $service_data['name'] ?? '';
    echo "Processing service: $service_name\n";
    
    // Find matching WordPress service
    $wp_service = null;
    if (isset($service_mappings[$service_name])) {
        foreach ($service_mappings[$service_name] as $possible_name) {
            $wp_service = get_page_by_path(sanitize_title($possible_name), OBJECT, 'service');
            if ($wp_service) break;
        }
    }
    
    if (!$wp_service) {
        // Try direct match
        $wp_service = get_page_by_path(sanitize_title($service_name), OBJECT, 'service');
    }
    
    if (!$wp_service) {
        echo "  ⚠️  Service not found in WordPress: $service_name\n";
        continue;
    }
    
    echo "  ✓ Found: {$wp_service->post_title} (ID: {$wp_service->ID})\n";
    $valid_service_ids[] = $wp_service->ID;
    
    // Update content
    if (!empty($service_data['description'])) {
        wp_update_post([
            'ID' => $wp_service->ID,
            'post_content' => $service_data['description']
        ]);
        echo "  ✓ Updated content\n";
    }
    
    // Update therapeutic approaches
    if (!empty($service_data['therapeutic_approaches'])) {
        $approaches = implode("\n", $service_data['therapeutic_approaches']);
        update_post_meta($wp_service->ID, 'therapeutic_approaches', $approaches);
        echo "  ✓ Updated therapeutic approaches (" . count($service_data['therapeutic_approaches']) . " items)\n";
    }
    
    // Update conditions treated
    $conditions = [];
    if (!empty($service_data['conditions_treated'])) {
        $conditions = $service_data['conditions_treated'];
    } elseif (!empty($service_data['conditions_supported'])) {
        $conditions = $service_data['conditions_supported'];
    }
    if (!empty($conditions)) {
        update_post_meta($wp_service->ID, 'conditions_treated', implode("\n", $conditions));
        echo "  ✓ Updated conditions treated (" . count($conditions) . " items)\n";
    }
    
    // Update services offered (for Podiatry)
    if (!empty($service_data['services_offered'])) {
        update_post_meta($wp_service->ID, 'services_offered', implode("\n", $service_data['services_offered']));
        echo "  ✓ Updated services offered\n";
    }
    
    // Update booking information
    if (!empty($service_data['booking_note'])) {
        update_post_meta($wp_service->ID, 'booking_information', $service_data['booking_note']);
        echo "  ✓ Updated booking information\n";
    }
    
    // Update accreditation note (if in booking_note)
    if (!empty($service_data['booking_note']) && strpos($service_data['booking_note'], 'accredited') !== false) {
        update_post_meta($wp_service->ID, 'accreditation_note', $service_data['booking_note']);
    }
    
    // Link team members
    if (!empty($service_data['team'])) {
        delete_post_meta($wp_service->ID, 'related_practitioners');
        $linked_count = 0;
        foreach ($service_data['team'] as $team_member) {
            $team_name = $team_member['name'] ?? '';
            $team_post = find_therapist_by_name($team_name);
            if ($team_post) {
                add_post_meta($wp_service->ID, 'related_practitioners', $team_post->ID);
                // Also link service to therapist (therapist -> services)
                delete_post_meta($team_post->ID, 'services_offered', $wp_service->ID);
                add_post_meta($team_post->ID, 'services_offered', $wp_service->ID);
                $linked_count++;
            } else {
                echo "  ⚠️  Team member not found: $team_name\n";
            }
        }
        if ($linked_count > 0) {
            echo "  ✓ Linked $linked_count team member(s) (bidirectional)\n";
        }
    }
    
    echo "\n";
}

// Hide/unpublish services not in the JSON
echo "=== Cleaning up old services ===\n";
$all_services = get_posts([
    'post_type' => 'service',
    'posts_per_page' => -1,
    'post_status' => 'any',
]);
$hidden_count = 0;
foreach ($all_services as $service) {
    if (!in_array($service->ID, $valid_service_ids)) {
        wp_update_post([
            'ID' => $service->ID,
            'post_status' => 'draft'
        ]);
        echo "  ⚠️  Hidden service: {$service->post_title}\n";
        $hidden_count++;
    }
}
if ($hidden_count > 0) {
    echo "  ✓ Hidden $hidden_count old service(s) not in JSON\n";
} else {
    echo "  ✓ All services are valid\n";
}
echo "\n";

// Helper function to find therapist by name (with fuzzy matching)
function find_therapist_by_name($name) {
    // Try exact match
    $therapist = get_page_by_title($name, OBJECT, 'team');
    if ($therapist) return $therapist;
    
    // Try without title prefix
    $name_parts = explode(' ', $name);
    if (count($name_parts) > 1 && in_array($name_parts[0], ['Dr', 'Mr', 'Mrs', 'Ms'])) {
        $name_without_prefix = implode(' ', array_slice($name_parts, 1));
        $therapist = get_page_by_title($name_without_prefix, OBJECT, 'team');
        if ($therapist) return $therapist;
    }
    
    // Try removing parentheses
    $name_no_parens = preg_replace('/\s*\([^)]+\)\s*/', ' ', $name);
    $name_no_parens = trim($name_no_parens);
    if ($name_no_parens !== $name) {
        $therapist = get_page_by_title($name_no_parens, OBJECT, 'team');
        if ($therapist) return $therapist;
    }
    
    // Search all team posts for fuzzy match
    $all_team = get_posts([
        'post_type' => 'team',
        'posts_per_page' => -1,
        'post_status' => 'any',
    ]);
    foreach ($all_team as $team_post) {
        $post_title = $team_post->post_title;
        $normalized_search = preg_replace('/\s+/', ' ', strtolower(trim($name)));
        $normalized_post = preg_replace('/\s+/', ' ', strtolower(trim($post_title)));
        $normalized_search = preg_replace('/^(dr|mr|mrs|ms)\s+/', '', $normalized_search);
        $normalized_post = preg_replace('/^(dr|mr|mrs|ms)\s+/', '', $normalized_post);
        $normalized_search = preg_replace('/\s*\([^)]+\)\s*/', ' ', $normalized_search);
        $normalized_post = preg_replace('/\s*\([^)]+\)\s*/', ' ', $normalized_post);
        if ($normalized_search === $normalized_post) {
            return $team_post;
        }
    }
    
    return null;
}

// Import Therapists
echo "=== Importing Therapists ===\n";
foreach ($therapists_data['therapists'] as $therapist_data) {
    $therapist_name = $therapist_data['name'] ?? '';
    echo "Processing therapist: $therapist_name\n";
    
    // Find or create therapist
    $wp_therapist = find_therapist_by_name($therapist_name);
    
    if (!$wp_therapist) {
        echo "  ⚠️  Therapist not found, creating new: $therapist_name\n";
        $post_data = [
            'post_title' => $therapist_name,
            'post_content' => $therapist_data['about'] ?? '',
            'post_status' => 'publish',
            'post_type' => 'team',
        ];
        $wp_therapist_id = wp_insert_post($post_data);
        if (is_wp_error($wp_therapist_id)) {
            echo "  ❌ Failed to create therapist: " . $wp_therapist_id->get_error_message() . "\n";
            continue;
        }
        $wp_therapist = get_post($wp_therapist_id);
        echo "  ✓ Created: {$wp_therapist->post_title} (ID: {$wp_therapist->ID})\n";
    } else {
        echo "  ✓ Found: {$wp_therapist->post_title} (ID: {$wp_therapist->ID})\n";
        // Ensure therapist is published
        if ($wp_therapist->post_status !== 'publish') {
            wp_update_post([
                'ID' => $wp_therapist->ID,
                'post_status' => 'publish'
            ]);
            echo "  ✓ Published therapist\n";
        }
    }
    
    // Update content
    if (!empty($therapist_data['about'])) {
        wp_update_post([
            'ID' => $wp_therapist->ID,
            'post_content' => $therapist_data['about']
        ]);
        echo "  ✓ Updated bio\n";
    }
    
    // Update role/position
    if (!empty($therapist_data['role'])) {
        update_post_meta($wp_therapist->ID, 'position', $therapist_data['role']);
        echo "  ✓ Updated position/role: {$therapist_data['role']}\n";
    }
    
    // Update credentials (short)
    if (!empty($therapist_data['qualifications'])) {
        update_post_meta($wp_therapist->ID, 'credentials', $therapist_data['qualifications']);
        echo "  ✓ Updated credentials\n";
    }
    
    // Update type of therapy
    if (!empty($therapist_data['therapy_types'])) {
        update_post_meta($wp_therapist->ID, 'type_of_therapy', implode("\n", $therapist_data['therapy_types']));
        echo "  ✓ Updated type of therapy (" . count($therapist_data['therapy_types']) . " items)\n";
    }
    
    // Update qualifications list
    if (!empty($therapist_data['qualifications_full'])) {
        update_post_meta($wp_therapist->ID, 'qualifications_list', implode("\n", $therapist_data['qualifications_full']));
        echo "  ✓ Updated qualifications list (" . count($therapist_data['qualifications_full']) . " items)\n";
    }
    
    // Update registrations
    if (!empty($therapist_data['registrations'])) {
        update_post_meta($wp_therapist->ID, 'registrations', implode("\n", $therapist_data['registrations']));
        echo "  ✓ Updated registrations (" . count($therapist_data['registrations']) . " items)\n";
    }
    
    // Update contact information
    if (!empty($therapist_data['contact'])) {
        if (!empty($therapist_data['contact']['email'])) {
            update_post_meta($wp_therapist->ID, 'email', $therapist_data['contact']['email']);
            echo "  ✓ Updated email: {$therapist_data['contact']['email']}\n";
        }
        if (!empty($therapist_data['contact']['phone'])) {
            update_post_meta($wp_therapist->ID, 'phone', $therapist_data['contact']['phone']);
            echo "  ✓ Updated phone: {$therapist_data['contact']['phone']}\n";
        }
        if (!empty($therapist_data['contact']['website'])) {
            $website = $therapist_data['contact']['website'];
            if (!preg_match('/^https?:\/\//', $website)) {
                $website = 'https://' . $website;
            }
            update_post_meta($wp_therapist->ID, 'website', $website);
            echo "  ✓ Updated website: {$therapist_data['contact']['website']}\n";
        }
    }
    
    // Update fees
    if (!empty($therapist_data['fees'])) {
        $fees_table = [];
        foreach ($therapist_data['fees'] as $session => $price) {
            $session_label = str_replace('_', ' ', ucwords($session, '_'));
            $fees_table[] = "$session_label | $price";
        }
        if (!empty($fees_table)) {
            update_post_meta($wp_therapist->ID, 'fees_structure', implode("\n", $fees_table));
            echo "  ✓ Updated fees structure\n";
        }
        
        // Extract starting price
        if (!empty($therapist_data['fees']['from'])) {
            update_post_meta($wp_therapist->ID, 'starting_price', $therapist_data['fees']['from']);
        } elseif (!empty($fees_table)) {
            // Use first fee as starting price
            $first_fee = explode('|', $fees_table[0]);
            if (count($first_fee) >= 2) {
                update_post_meta($wp_therapist->ID, 'starting_price', 'From ' . trim($first_fee[1]));
            }
        }
    }
    
    echo "\n";
}

// Handle unmapped therapists (like Elizabeth Bray)
if (!empty($services_data['unmapped_therapists'])) {
    echo "=== Processing Unmapped Therapists ===\n";
    foreach ($services_data['unmapped_therapists'] as $unmapped) {
        $therapist_name = $unmapped['name'] ?? '';
        echo "Processing unmapped therapist: $therapist_name\n";
        
        // Find in therapists JSON
        $therapist_data = null;
        foreach ($therapists_data['therapists'] as $t) {
            if ($t['name'] === $therapist_name) {
                $therapist_data = $t;
                break;
            }
        }
        
        if ($therapist_data) {
            // Use same import logic as above
            $wp_therapist = find_therapist_by_name($therapist_name);
            if (!$wp_therapist) {
                $post_data = [
                    'post_title' => $therapist_name,
                    'post_content' => $therapist_data['about'] ?? '',
                    'post_status' => 'publish',
                    'post_type' => 'team',
                ];
                $wp_therapist_id = wp_insert_post($post_data);
                if (!is_wp_error($wp_therapist_id)) {
                    $wp_therapist = get_post($wp_therapist_id);
                    echo "  ✓ Created: {$wp_therapist->post_title}\n";
                    // Import all data (same as above)
                    // ... (reuse the import logic)
                }
            }
        }
    }
    echo "\n";
}

echo "=== Import Complete ===\n";
echo "Services processed: " . count($services_data['services']) . "\n";
echo "Valid services (published): " . count($valid_service_ids) . "\n";
echo "Therapists processed: " . count($therapists_data['therapists']) . "\n";

// Count published therapists
$published_therapists = get_posts([
    'post_type' => 'team',
    'posts_per_page' => -1,
    'post_status' => 'publish',
]);
echo "Total published therapists: " . count($published_therapists) . "\n";
echo "\n";
