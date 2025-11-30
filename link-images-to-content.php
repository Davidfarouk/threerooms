<?php
/**
 * Link Images to Imported Content
 * 
 * This script links WordPress media library images to the imported logos, gallery items, and rental options
 */

require_once('/var/www/html/wp-load.php');

if (!defined('ABSPATH')) {
    die('Direct access not allowed');
}

echo "=== Linking Images to Content ===\n\n";

// Helper function to find image by partial filename match
function find_image_by_name($search_name) {
    $all_media = get_posts([
        'post_type' => 'attachment',
        'post_mime_type' => 'image',
        'posts_per_page' => -1,
        'post_status' => 'inherit'
    ]);
    
    $search_lower = strtolower(str_replace([' ', '-', '_'], '', $search_name));
    
    foreach ($all_media as $media) {
        $file = get_post_meta($media->ID, '_wp_attached_file', true);
        $filename = basename($file);
        $filename_lower = strtolower(str_replace([' ', '-', '_'], '', pathinfo($filename, PATHINFO_FILENAME)));
        
        if (strpos($filename_lower, $search_lower) !== false || strpos($search_lower, $filename_lower) !== false) {
            return $media->ID;
        }
    }
    
    return null;
}

// Link logos
echo "Step 1: Linking images to Accreditation Logos...\n";
$logo_mappings = [
    'BACP' => ['bacp-logo', 'BACP'],
    'HCPC' => ['hcpc-logo', 'HCPC'],
    'CNHC' => ['CNHC'],
    'British Psychological Society' => ['British-Psychological-Society', 'British Psychological'],
    'Alexander Technique Association' => ['Alexander-Technique-Association', 'Alexander Technique'],
    'BACP Coaching' => ['BACP-Coaching', 'BACP Coaching'],
    'Hypnotherapy' => ['Hypnotherapy'],
    'Reflexology' => ['reflexology'],
];

$logos = get_posts([
    'post_type' => 'accreditation_logo',
    'posts_per_page' => -1,
    'post_status' => 'any',
]);

$linked_logos = 0;
foreach ($logos as $logo) {
    $title = $logo->post_title;
    if (isset($logo_mappings[$title])) {
        foreach ($logo_mappings[$title] as $search_term) {
            $image_id = find_image_by_name($search_term);
            if ($image_id) {
                set_post_thumbnail($logo->ID, $image_id);
                echo "  ✓ Linked image to: $title\n";
                $linked_logos++;
                break;
            }
        }
    }
}
echo "  ✓ Linked $linked_logos logos\n\n";

// Link gallery items
echo "Step 2: Linking images to Gallery Items...\n";
$gallery_mappings = [
    'Reception Desk' => ['Reception-Desk', 'Reception Desk'],
    'Larger Therapy Room' => ['Larger-Therapy-Room', 'Larger Therapy Room'],
    'Waiting Room' => ['The-Rooms-waiting-room', 'waiting room'],
    'Back Room' => ['Back-room-Couch', 'Back room'],
    'Smaller Therapy Room' => ['Smaller-Therapy-Room', 'Smaller Therapy Room'],
    'Hanging Logo Sign' => ['Hanging-Logo-Sign', 'Hanging Logo'],
    'Room 1 Wideshot' => ['Room-1-Wideshot', 'Room 1 Wideshot'],
];

$gallery_items = get_posts([
    'post_type' => 'gallery_item',
    'posts_per_page' => -1,
    'post_status' => 'any',
]);

$linked_gallery = 0;
foreach ($gallery_items as $item) {
    $title = $item->post_title;
    if (isset($gallery_mappings[$title])) {
        foreach ($gallery_mappings[$title] as $search_term) {
            $image_id = find_image_by_name($search_term);
            if ($image_id) {
                set_post_thumbnail($item->ID, $image_id);
                echo "  ✓ Linked image to: $title\n";
                $linked_gallery++;
                break;
            }
        }
    }
}
echo "  ✓ Linked $linked_gallery gallery items\n\n";

// Link rental options
echo "Step 3: Linking images to Rental Options...\n";
$rental_mappings = [
    '1-1 Therapy' => ['Larger-Therapy-Room', 'Larger Therapy Room'],
    'Small Workshops, Seminars & Supervision' => ['The-Rooms-waiting-room', 'waiting room'],
    'Hire Entire Clinic' => ['Reception-Desk', 'Reception Desk'],
];

$rental_options = get_posts([
    'post_type' => 'rental_option',
    'posts_per_page' => -1,
    'post_status' => 'any',
]);

$linked_rental = 0;
foreach ($rental_options as $option) {
    $title = $option->post_title;
    if (isset($rental_mappings[$title])) {
        foreach ($rental_mappings[$title] as $search_term) {
            $image_id = find_image_by_name($search_term);
            if ($image_id) {
                set_post_thumbnail($option->ID, $image_id);
                echo "  ✓ Linked image to: $title\n";
                $linked_rental++;
                break;
            }
        }
    }
}
echo "  ✓ Linked $linked_rental rental options\n\n";

echo "=== Linking Complete ===\n";
echo "Total linked:\n";
echo "- Logos: $linked_logos\n";
echo "- Gallery Items: $linked_gallery\n";
echo "- Rental Options: $linked_rental\n";
echo "\n";

