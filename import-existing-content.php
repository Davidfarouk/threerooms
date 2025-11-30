<?php
/**
 * Import Existing Content to WordPress
 * 
 * This script imports all existing hardcoded content (logos, gallery items, rental options)
 * into WordPress so they're ready for management and migration.
 */

require_once('/var/www/html/wp-load.php');

if (!defined('ABSPATH')) {
    die('Direct access not allowed');
}

echo "=== Importing Existing Content ===\n\n";

// 1. Import Accreditation Logos
echo "Step 1: Importing Accreditation Logos...\n";

$logos = [
    ['title' => 'BACP', 'alt' => 'BACP - British Association for Counselling and Psychotherapy', 'image' => 'bacp-logo.jpg', 'order' => 0],
    ['title' => 'HCPC', 'alt' => 'HCPC - Health and Care Professions Council', 'image' => 'hcpc-logo.jpg', 'order' => 1],
    ['title' => 'CNHC', 'alt' => 'CNHC - Complementary and Natural Healthcare Council', 'image' => 'CNHC.jpg', 'order' => 2],
    ['title' => 'British Psychological Society', 'alt' => 'British Psychological Society', 'image' => 'British-Psychological-Society.png', 'order' => 3],
    ['title' => 'Alexander Technique Association', 'alt' => 'Alexander Technique Association', 'image' => 'Alexander-Technique-Association.webp', 'order' => 4],
    ['title' => 'BACP Coaching', 'alt' => 'BACP Coaching', 'image' => 'BACP-Coaching.jpg', 'order' => 5],
    ['title' => 'Hypnotherapy', 'alt' => 'Hypnotherapy Accreditation', 'image' => 'Hypnotherapy.png', 'order' => 6],
    ['title' => 'Reflexology', 'alt' => 'Reflexology Accreditation', 'image' => 'reflexology.jpg', 'order' => 7],
];

$logos_imported = 0;
foreach ($logos as $logo_data) {
    // Check if already exists
    $existing = get_posts([
        'post_type' => 'accreditation_logo',
        'title' => $logo_data['title'],
        'posts_per_page' => 1,
        'post_status' => 'any',
    ]);
    
    if (!empty($existing)) {
        echo "  - Already exists: {$logo_data['title']}\n";
        continue;
    }
    
    // Find image in media library by filename
    $image_query = new WP_Query([
        'post_type' => 'attachment',
        'post_mime_type' => 'image',
        'posts_per_page' => 1,
        'meta_query' => [
            [
                'key' => '_wp_attached_file',
                'value' => sanitize_file_name($logo_data['image']),
                'compare' => 'LIKE'
            ]
        ]
    ]);
    
    $post_id = wp_insert_post([
        'post_title' => $logo_data['title'],
        'post_type' => 'accreditation_logo',
        'post_status' => 'publish',
        'menu_order' => $logo_data['order'],
    ]);
    
    if ($post_id && !is_wp_error($post_id)) {
        update_post_meta($post_id, 'logo_alt_text', $logo_data['alt']);
        
        if ($image_query->have_posts()) {
            $attachment_id = $image_query->posts[0]->ID;
            set_post_thumbnail($post_id, $attachment_id);
            echo "  ✓ Created: {$logo_data['title']} (with image)\n";
        } else {
            echo "  ✓ Created: {$logo_data['title']} (image not found in media library)\n";
        }
        $logos_imported++;
    }
}
echo "  ✓ Imported $logos_imported logos\n\n";

// 2. Import Gallery Items
echo "Step 2: Importing Gallery Items...\n";

$gallery_items = [
    ['title' => 'Reception Desk', 'category' => 'our-space', 'caption' => 'Reception Area', 'image' => 'Reception-Desk.jpg', 'order' => 0],
    ['title' => 'Larger Therapy Room', 'category' => 'our-space', 'caption' => 'Therapy Room', 'image' => 'Larger-Therapy-Room-Therapy-Couch.jpg', 'order' => 1],
    ['title' => 'Waiting Room', 'category' => 'our-space', 'caption' => 'Waiting Room', 'image' => 'The-Rooms-waiting-room-sofa-desk.jpg', 'order' => 2],
    ['title' => 'Back Room', 'category' => 'our-space', 'caption' => 'Therapy Room', 'image' => 'Back-room-Couch.jpg', 'order' => 3],
    ['title' => 'Smaller Therapy Room', 'category' => 'our-space', 'caption' => 'Therapy Room', 'image' => 'Smaller-Therapy-Room.jpg', 'order' => 4],
    ['title' => 'Hanging Logo Sign', 'category' => 'our-space', 'caption' => 'The Rooms Poundbury', 'image' => 'Hanging-Logo-Sign.jpg', 'order' => 5],
    // Therapy rooms for hire page
    ['title' => 'Room 1 Wideshot', 'category' => 'therapy-rooms', 'caption' => 'Therapy room 1', 'image' => 'Room-1-Wideshot-.jpg', 'order' => 0],
    ['title' => 'Smaller Therapy Room Hire', 'category' => 'therapy-rooms', 'caption' => 'Smaller therapy room', 'image' => 'Smaller-Therapy-Room.jpg', 'order' => 1],
    ['title' => 'Back Room Hire', 'category' => 'therapy-rooms', 'caption' => 'Back room with couch', 'image' => 'Back-room-Couch.jpg', 'order' => 2],
];

$gallery_imported = 0;
foreach ($gallery_items as $item_data) {
    // Check if already exists
    $existing = get_posts([
        'post_type' => 'gallery_item',
        'title' => $item_data['title'],
        'posts_per_page' => 1,
        'post_status' => 'any',
    ]);
    
    if (!empty($existing)) {
        echo "  - Already exists: {$item_data['title']}\n";
        continue;
    }
    
    // Find image in media library
    $image_query = new WP_Query([
        'post_type' => 'attachment',
        'post_mime_type' => 'image',
        'posts_per_page' => 1,
        'meta_query' => [
            [
                'key' => '_wp_attached_file',
                'value' => sanitize_file_name($item_data['image']),
                'compare' => 'LIKE'
            ]
        ]
    ]);
    
    $post_id = wp_insert_post([
        'post_title' => $item_data['title'],
        'post_type' => 'gallery_item',
        'post_status' => 'publish',
        'menu_order' => $item_data['order'],
    ]);
    
    if ($post_id && !is_wp_error($post_id)) {
        update_post_meta($post_id, 'gallery_category', $item_data['category']);
        update_post_meta($post_id, 'caption', $item_data['caption']);
        
        if ($image_query->have_posts()) {
            $attachment_id = $image_query->posts[0]->ID;
            set_post_thumbnail($post_id, $attachment_id);
            echo "  ✓ Created: {$item_data['title']} ({$item_data['category']}) (with image)\n";
        } else {
            echo "  ✓ Created: {$item_data['title']} ({$item_data['category']}) (image not found)\n";
        }
        $gallery_imported++;
    }
}
echo "  ✓ Imported $gallery_imported gallery items\n\n";

// 3. Import Rental Options
echo "Step 3: Importing Rental Options...\n";

$rental_options = [
    [
        'title' => '1-1 Therapy',
        'description' => 'We offer two soundproofed therapy rooms, which can be tailored to meet both the needs of talking & physical therapy. We provide a state-of-the-art electronic therapy plinth, offering adjustable features for Osteopathy, Physiotherapy, Massage and other Physical Therapies.',
        'icon' => '🛋️',
        'image' => 'Larger-Therapy-Room-Therapy-Couch.jpg',
        'order' => 0,
    ],
    [
        'title' => 'Small Workshops, Seminars & Supervision',
        'description' => 'Our facility features a large communal area with seating, making it an excellent choice for small workshops, seminars, and group supervision. With availability on weekends, you can host your event at a time that suits you and your attendees.',
        'icon' => '👥',
        'image' => 'The-Rooms-waiting-room-sofa-desk.jpg',
        'order' => 1,
    ],
    [
        'title' => 'Hire Entire Clinic',
        'description' => 'With a light & spacious communal area with multiple seating arrangements, a large standing whiteboard and two therapy rooms acting as break out rooms, our clinic is a wonderful cosy space for workshops and presentations. Flexible rental hire including weekend options.',
        'icon' => '🏢',
        'image' => 'Reception-Desk.jpg',
        'order' => 2,
    ],
];

$rental_imported = 0;
foreach ($rental_options as $option_data) {
    // Check if already exists
    $existing = get_posts([
        'post_type' => 'rental_option',
        'title' => $option_data['title'],
        'posts_per_page' => 1,
        'post_status' => 'any',
    ]);
    
    if (!empty($existing)) {
        echo "  - Already exists: {$option_data['title']}\n";
        continue;
    }
    
    // Find image in media library
    $image_query = new WP_Query([
        'post_type' => 'attachment',
        'post_mime_type' => 'image',
        'posts_per_page' => 1,
        'meta_query' => [
            [
                'key' => '_wp_attached_file',
                'value' => sanitize_file_name($option_data['image']),
                'compare' => 'LIKE'
            ]
        ]
    ]);
    
    $post_id = wp_insert_post([
        'post_title' => $option_data['title'],
        'post_content' => $option_data['description'],
        'post_type' => 'rental_option',
        'post_status' => 'publish',
        'menu_order' => $option_data['order'],
    ]);
    
    if ($post_id && !is_wp_error($post_id)) {
        update_post_meta($post_id, 'icon', $option_data['icon']);
        
        if ($image_query->have_posts()) {
            $attachment_id = $image_query->posts[0]->ID;
            set_post_thumbnail($post_id, $attachment_id);
            echo "  ✓ Created: {$option_data['title']} (with image)\n";
        } else {
            echo "  ✓ Created: {$option_data['title']} (image not found)\n";
        }
        $rental_imported++;
    }
}
echo "  ✓ Imported $rental_imported rental options\n\n";

// 4. Set Homepage Settings
echo "Step 4: Setting Homepage Defaults...\n";

// Find hero image
$hero_image_query = new WP_Query([
    'post_type' => 'attachment',
    'post_mime_type' => 'image',
    'posts_per_page' => 1,
    'meta_query' => [
        [
            'key' => '_wp_attached_file',
            'value' => 'Room-1-Wideshot',
            'compare' => 'LIKE'
        ]
    ]
]);

if ($hero_image_query->have_posts()) {
    $hero_image_id = $hero_image_query->posts[0]->ID;
    update_option('tr_homepage_hero_image', $hero_image_id);
    echo "  ✓ Set homepage hero image\n";
}

update_option('tr_homepage_hero_title', 'We Heal By Listening And Understanding Your Pain.');
update_option('tr_homepage_hero_subtitle', 'A calm and welcoming therapeutic space in the heart of Poundbury. Find a therapist or rent a room for your practice.');
update_option('tr_homepage_cta_text', 'Find a Therapist');
update_option('tr_homepage_cta_link', '/meet-the-team');
update_option('tr_homepage_cta_secondary_text', 'Rent a Room');
update_option('tr_homepage_cta_secondary_link', '/hire-therapy-room-dorchester');
echo "  ✓ Set homepage text and CTA buttons\n\n";

// 5. Set About Page Settings
echo "Step 5: Setting About Page Defaults...\n";

$about_hero_query = new WP_Query([
    'post_type' => 'attachment',
    'post_mime_type' => 'image',
    'posts_per_page' => 1,
    'meta_query' => [
        [
            'key' => '_wp_attached_file',
            'value' => 'Page-Rent-a-therapy-room',
            'compare' => 'LIKE'
        ]
    ]
]);

if ($about_hero_query->have_posts()) {
    $about_hero_id = $about_hero_query->posts[0]->ID;
    update_option('tr_about_hero_image', $about_hero_id);
    echo "  ✓ Set about page hero image\n";
}

update_option('tr_about_gallery_category', 'our-space');
echo "  ✓ Set about page gallery category\n\n";

echo "=== Import Complete ===\n";
echo "Total imported:\n";
echo "- Logos: $logos_imported\n";
echo "- Gallery Items: $gallery_imported\n";
echo "- Rental Options: $rental_imported\n";
echo "\n";
echo "All existing content is now in WordPress!\n";
echo "You can now manage everything from WordPress Admin.\n";
echo "\n";

