<?php
/**
 * Cleanup Duplicate Rental Options
 * 
 * This script removes duplicate rental options, keeping only the first (oldest) one.
 * Run this once to clean up existing duplicates.
 */

require_once('/var/www/html/wp-load.php');

if (!defined('ABSPATH')) {
    die('Direct access not allowed');
}

echo "=== Cleaning Up Duplicate Rental Options ===\n\n";

// Get all rental options
$all_rental_options = get_posts([
    'post_type' => 'rental_option',
    'post_status' => 'any',
    'posts_per_page' => -1,
    'orderby' => 'date',
    'order' => 'ASC',
]);

$titles_seen = [];
$duplicates_removed = 0;

foreach ($all_rental_options as $option) {
    $title = $option->post_title;
    
    if (isset($titles_seen[$title])) {
        // This is a duplicate - delete it
        echo "  ✗ Removing duplicate: \"$title\" (ID: {$option->ID}, created: {$option->post_date})\n";
        wp_delete_post($option->ID, true); // true = force delete (skip trash)
        $duplicates_removed++;
    } else {
        // First occurrence - keep it
        $titles_seen[$title] = $option->ID;
        echo "  ✓ Keeping: \"$title\" (ID: {$option->ID}, created: {$option->post_date})\n";
    }
}

echo "\n=== Cleanup Complete ===\n";
echo "Total rental options checked: " . count($all_rental_options) . "\n";
echo "Duplicates removed: $duplicates_removed\n";
echo "Unique rental options remaining: " . count($titles_seen) . "\n";
echo "\n";

