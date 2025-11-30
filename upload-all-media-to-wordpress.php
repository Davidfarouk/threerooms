<?php
/**
 * Upload All Media to WordPress Media Library
 * 
 * This script uploads all images from the resources folder to WordPress Media Library
 * and sets featured images for therapists automatically.
 * 
 * Run via: docker exec wordpress_site php /var/www/html/upload-all-media-to-wordpress.php
 */

// Load WordPress
require_once('/var/www/html/wp-load.php');

if (!defined('ABSPATH')) {
    die('Direct access not allowed');
}

echo "=== Uploading All Media to WordPress ===\n\n";

// Helper function to upload image to WordPress Media Library
function upload_image_to_wordpress($file_path, $title = '', $alt_text = '') {
    if (!file_exists($file_path)) {
        return null;
    }
    
    $filename = basename($file_path);
    $title = $title ?: pathinfo($filename, PATHINFO_FILENAME);
    
    // Check if image already exists in media library
    $existing = get_posts([
        'post_type' => 'attachment',
        'post_mime_type' => 'image',
        'posts_per_page' => 1,
        'meta_query' => [
            [
                'key' => '_wp_attached_file',
                'value' => sanitize_file_name($filename),
                'compare' => 'LIKE'
            ]
        ]
    ]);
    
    if (!empty($existing)) {
        $attachment_id = $existing[0]->ID;
        echo "  ✓ Already exists: $filename (ID: $attachment_id)\n";
        return $attachment_id;
    }
    
    // Prepare upload
    $upload_file = wp_upload_bits($filename, null, file_get_contents($file_path));
    
    if ($upload_file['error']) {
        echo "  ❌ Error uploading $filename: " . $upload_file['error'] . "\n";
        return null;
    }
    
    // Create attachment
    $attachment = [
        'post_mime_type' => $upload_file['type'],
        'post_title' => sanitize_file_name($title),
        'post_content' => '',
        'post_status' => 'inherit'
    ];
    
    $attach_id = wp_insert_attachment($attachment, $upload_file['file']);
    
    if (is_wp_error($attach_id)) {
        echo "  ❌ Error creating attachment for $filename: " . $attach_id->get_error_message() . "\n";
        return null;
    }
    
    // Generate attachment metadata
    require_once(ABSPATH . 'wp-admin/includes/image.php');
    $attach_data = wp_generate_attachment_metadata($attach_id, $upload_file['file']);
    wp_update_attachment_metadata($attach_id, $attach_data);
    
    // Set alt text
    if ($alt_text) {
        update_post_meta($attach_id, '_wp_attachment_image_alt', $alt_text);
    }
    
    echo "  ✓ Uploaded: $filename (ID: $attach_id)\n";
    return $attach_id;
}

// Helper function to set featured image for therapist
function set_therapist_featured_image($therapist_name, $image_id) {
    $therapist = get_page_by_title($therapist_name, OBJECT, 'team');
    if (!$therapist) {
        // Try without title prefix
        $name_parts = explode(' ', $therapist_name);
        if (count($name_parts) > 1 && in_array($name_parts[0], ['Dr', 'Mr', 'Mrs', 'Ms'])) {
            $name_without_prefix = implode(' ', array_slice($name_parts, 1));
            $therapist = get_page_by_title($name_without_prefix, OBJECT, 'team');
        }
    }
    
    if ($therapist && $image_id) {
        set_post_thumbnail($therapist->ID, $image_id);
        return true;
    }
    return false;
}

// Map therapist names to their image files
$therapist_image_map = [
    'Dr Linda Bolton' => 'Linda.jpg',
    'Dr Sharon Winward' => 'Sharon Winward.jpg',
    'Hilary Charman' => 'Hilary Charman.JPG',
    'Richard Cawte' => 'Richard 1.JPG',
    'Chris Piercy' => 'Chris.jpg',
    'Naomi David' => 'Naomi David Psychotherapist.jpg',
    'Michael Sinclair' => 'Michael.JPG',
    'Sharon Sheppard' => 'Sharon Sheppard.png',
    'Antoinette Keogh' => 'Antoinette Keogh.png',
    'Marcel Wadman' => 'Marcel 1.jpg',
    'Chrissy Fraser' => 'Chrissy Fraser.png',
    'Roberta Winmill' => 'Linda 2.jpg', // Placeholder
    'Dr Carole Deighton' => 'Dr Carole Deighton.jpg',
    'Aimee Overington' => 'Aimee Overington.png',
    'Melika Clason' => 'Melika Clason.png',
    'Elizabeth (Liz) Bray' => 'Elizabeth Bray.png',
    'Elizabeth Bray' => 'Elizabeth Bray.png',
];

// Resources paths - files should be copied to temp-resources-upload by GO.bat
$resources_path = '/var/www/html/temp-resources-upload';

echo "Step 1: Checking for resources in temp location...\n";
if (!is_dir($resources_path)) {
    echo "  ⚠️  Temp resources folder not found: $resources_path\n";
    echo "  Please ensure GO.bat has copied resources to the container.\n";
    echo "  Or manually copy: docker cp wordpress-headless-example/frontend/public/resources wordpress_site:/var/www/html/temp-resources-upload\n";
} else {
    echo "  ✓ Found temp resources folder\n";
}
echo "\n";

// Step 2: Upload Therapist Headshots
echo "Step 2: Uploading Therapist Headshots...\n";
// Check both possible paths (direct copy vs nested)
$headshots_dir1 = $resources_path . '/Therapist Headshots';
$headshots_dir2 = $resources_path . '/resources/Therapist Headshots';
$headshots_dir = is_dir($headshots_dir1) ? $headshots_dir1 : (is_dir($headshots_dir2) ? $headshots_dir2 : null);
$uploaded_headshots = [];

if ($headshots_dir && is_dir($headshots_dir)) {
    $headshot_files = glob($headshots_dir . '/*');
    foreach ($headshot_files as $file) {
        if (is_file($file)) {
            $filename = basename($file);
            $name_without_ext = pathinfo($filename, PATHINFO_FILENAME);
            $image_id = upload_image_to_wordpress($file, $name_without_ext, "Photo of $name_without_ext");
            if ($image_id) {
                $uploaded_headshots[$filename] = $image_id;
            }
        }
    }
    echo "  ✓ Found headshots directory: $headshots_dir\n";
} else {
    echo "  ⚠️  Therapist Headshots directory not found\n";
}
echo "  ✓ Uploaded " . count($uploaded_headshots) . " therapist headshots\n\n";

// Step 3: Set Featured Images for Therapists
echo "Step 3: Setting Featured Images for Therapists...\n";
$set_count = 0;
foreach ($therapist_image_map as $therapist_name => $image_filename) {
    if (isset($uploaded_headshots[$image_filename])) {
        if (set_therapist_featured_image($therapist_name, $uploaded_headshots[$image_filename])) {
            echo "  ✓ Set featured image for: $therapist_name\n";
            $set_count++;
        } else {
            echo "  ⚠️  Therapist not found: $therapist_name\n";
        }
    } else {
        // Try to find image with similar name
        $found = false;
        foreach ($uploaded_headshots as $uploaded_filename => $image_id) {
            $uploaded_name = pathinfo($uploaded_filename, PATHINFO_FILENAME);
            $target_name = pathinfo($image_filename, PATHINFO_FILENAME);
            if (stripos($uploaded_name, $target_name) !== false || stripos($target_name, $uploaded_name) !== false) {
                if (set_therapist_featured_image($therapist_name, $image_id)) {
                    echo "  ✓ Set featured image for: $therapist_name (matched: $uploaded_filename)\n";
                    $set_count++;
                    $found = true;
                    break;
                }
            }
        }
        if (!$found) {
            echo "  ⚠️  Image not found for: $therapist_name ($image_filename)\n";
        }
    }
}
echo "  ✓ Set featured images for $set_count therapists\n\n";

// Step 4: Upload Logos
echo "Step 4: Uploading Logos...\n";
// Check both possible paths (direct copy vs nested)
$logos_dir1 = $resources_path . '/Logos';
$logos_dir2 = $resources_path . '/resources/Logos';
$logos_dir = is_dir($logos_dir1) ? $logos_dir1 : (is_dir($logos_dir2) ? $logos_dir2 : null);
$uploaded_logos = [];

if ($logos_dir && is_dir($logos_dir)) {
    $logo_files = glob($logos_dir . '/*');
    foreach ($logo_files as $file) {
        if (is_file($file)) {
            $filename = basename($file);
            $name_without_ext = pathinfo($filename, PATHINFO_FILENAME);
            $image_id = upload_image_to_wordpress($file, $name_without_ext . " Logo", $name_without_ext . " accreditation logo");
            if ($image_id) {
                $uploaded_logos[$filename] = $image_id;
            }
        }
    }
    echo "  ✓ Found logos directory: $logos_dir\n";
} else {
    echo "  ⚠️  Logos directory not found\n";
}
echo "  ✓ Uploaded " . count($uploaded_logos) . " logos\n\n";

// Step 5: Upload Other Images (clinic photos, etc.)
echo "Step 5: Uploading Other Images...\n";
$other_images = [];
$image_extensions = ['jpg', 'jpeg', 'png', 'JPG', 'JPEG', 'PNG', 'webp', 'WEBP'];
// Check both possible paths
$base_paths = [
    $resources_path,
    $resources_path . '/resources'
];
foreach ($base_paths as $base_path) {
    if (is_dir($base_path)) {
        foreach ($image_extensions as $ext) {
            $files = glob($base_path . '/*.' . $ext);
            foreach ($files as $file) {
                if (is_file($file)) {
                    $filename = basename($file);
                    // Skip if already processed as headshot or logo
                    if (strpos($file, 'Therapist Headshots') === false && strpos($file, 'Logos') === false) {
                        $name_without_ext = pathinfo($filename, PATHINFO_FILENAME);
                        $image_id = upload_image_to_wordpress($file, $name_without_ext, $name_without_ext);
                        if ($image_id) {
                            $other_images[$filename] = $image_id;
                        }
                    }
                }
            }
        }
    }
}
echo "  ✓ Uploaded " . count($other_images) . " other images\n\n";

// Step 6: Create mapping reference file
echo "Step 6: Creating media mapping reference...\n";
$mapping = [
    'therapist_headshots' => $uploaded_headshots,
    'logos' => $uploaded_logos,
    'other_images' => $other_images,
    'total_uploaded' => count($uploaded_headshots) + count($uploaded_logos) + count($other_images),
    'upload_date' => date('Y-m-d H:i:s'),
];

$mapping_file = '/var/www/html/wp-content/uploads/media-mapping.json';
$uploads_dir = dirname($mapping_file);
if (!is_dir($uploads_dir)) {
    wp_mkdir_p($uploads_dir);
}
file_put_contents($mapping_file, json_encode($mapping, JSON_PRETTY_PRINT));
echo "  ✓ Created mapping file: $mapping_file\n\n";

// Cleanup temp directory
if (is_dir($resources_path)) {
    // Keep it for reference, but could delete: rmdir($resources_path);
}

echo "=== Upload Complete ===\n";
echo "Total images uploaded: " . (count($uploaded_headshots) + count($uploaded_logos) + count($other_images)) . "\n";
echo "- Therapist headshots: " . count($uploaded_headshots) . "\n";
echo "- Logos: " . count($uploaded_logos) . "\n";
echo "- Other images: " . count($other_images) . "\n";
echo "- Featured images set: $set_count\n";
echo "\n";
echo "All media is now in WordPress Media Library!\n";
echo "You can now export/import everything using WordPress Tools → Export\n";
echo "\n";

