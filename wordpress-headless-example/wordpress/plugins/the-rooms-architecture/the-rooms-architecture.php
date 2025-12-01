<?php
/**
 * Plugin Name: The Rooms Architecture
 * Description: Complete backend architecture for The Rooms Poundbury - Custom Post Types, Fields, and REST API support.
 * Version: 2.0
 * Author: Antigravity
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly.
}

// ============================================
// CUSTOM POST TYPES
// ============================================

function tr_register_post_types() {
    
    // 1. SERVICES (e.g., Reflexology, Hypnotherapy, Counselling)
    register_post_type( 'service', array(
        'labels' => array(
            'name'               => 'Services',
            'singular_name'      => 'Service',
            'add_new'            => 'Add New Service',
            'add_new_item'       => 'Add New Service',
            'edit_item'          => 'Edit Service',
            'new_item'           => 'New Service',
            'view_item'          => 'View Service',
            'search_items'       => 'Search Services',
            'not_found'          => 'No services found',
            'not_found_in_trash' => 'No services found in Trash',
            'all_items'          => 'All Services',
        ),
        'public'        => true,
        'has_archive'   => true,
        'menu_icon'     => 'dashicons-heart',
        'supports'      => array( 'title', 'editor', 'thumbnail', 'excerpt', 'custom-fields' ),
        'show_in_rest'  => true, // Essential for REST API
        'rewrite'       => array( 'slug' => 'service' ),
    ) );

    // 2. TEAM MEMBERS (Therapists)
    register_post_type( 'team', array(
        'labels' => array(
            'name'               => 'Team Members',
            'singular_name'      => 'Team Member',
            'add_new'            => 'Add New Team Member',
            'add_new_item'       => 'Add New Team Member',
            'edit_item'          => 'Edit Team Member',
            'new_item'           => 'New Team Member',
            'view_item'          => 'View Team Member',
            'search_items'       => 'Search Team Members',
            'not_found'          => 'No team members found',
            'not_found_in_trash' => 'No team members found in Trash',
            'all_items'          => 'All Team Members',
        ),
        'public'        => true,
        'has_archive'   => true,
        'menu_icon'     => 'dashicons-groups',
        'supports'      => array( 'title', 'editor', 'thumbnail', 'excerpt', 'custom-fields' ),
        'show_in_rest'  => true, // Essential for REST API
        'rewrite'       => array( 'slug' => 'team' ),
    ) );


    // 4. ACCREDITATION LOGOS
    register_post_type( 'accreditation_logo', array(
        'labels' => array(
            'name'               => 'Accreditation Logos',
            'singular_name'      => 'Accreditation Logo',
            'add_new'            => 'Add New Logo',
            'add_new_item'       => 'Add New Accreditation Logo',
            'edit_item'          => 'Edit Logo',
            'new_item'           => 'New Logo',
            'view_item'          => 'View Logo',
            'search_items'       => 'Search Logos',
            'not_found'          => 'No logos found',
            'not_found_in_trash' => 'No logos found in Trash',
            'all_items'          => 'All Logos',
        ),
        'public'        => false, // Not public, only for admin
        'show_ui'        => true,
        'show_in_menu'   => true,
        'menu_icon'      => 'dashicons-awards',
        'supports'       => array( 'title', 'thumbnail', 'custom-fields', 'page-attributes' ), // page-attributes for menu_order
        'show_in_rest'   => true,
        'hierarchical'   => false,
    ) );

    // 5. GALLERY ITEMS
    register_post_type( 'gallery_item', array(
        'labels' => array(
            'name'               => 'Gallery Items',
            'singular_name'      => 'Gallery Item',
            'add_new'            => 'Add New Item',
            'add_new_item'       => 'Add New Gallery Item',
            'edit_item'          => 'Edit Gallery Item',
            'new_item'           => 'New Gallery Item',
            'view_item'          => 'View Gallery Item',
            'search_items'       => 'Search Gallery Items',
            'not_found'          => 'No gallery items found',
            'not_found_in_trash' => 'No gallery items found in Trash',
            'all_items'          => 'All Gallery Items',
        ),
        'public'        => false,
        'show_ui'        => true,
        'show_in_menu'   => true,
        'menu_icon'      => 'dashicons-format-gallery',
        'supports'       => array( 'title', 'editor', 'thumbnail', 'custom-fields', 'page-attributes' ),
        'show_in_rest'   => true,
        'hierarchical'   => false,
    ) );

    // 6. RENTAL OPTIONS
    register_post_type( 'rental_option', array(
        'labels' => array(
            'name'               => 'Rental Options',
            'singular_name'      => 'Rental Option',
            'add_new'            => 'Add New Option',
            'add_new_item'       => 'Add New Rental Option',
            'edit_item'          => 'Edit Rental Option',
            'new_item'           => 'New Rental Option',
            'view_item'          => 'View Rental Option',
            'search_items'       => 'Search Rental Options',
            'not_found'          => 'No rental options found',
            'not_found_in_trash' => 'No rental options found in Trash',
            'all_items'          => 'All Rental Options',
        ),
        'public'        => false,
        'show_ui'        => true,
        'show_in_menu'   => true,
        'menu_icon'      => 'dashicons-building',
        'supports'       => array( 'title', 'editor', 'thumbnail', 'custom-fields', 'page-attributes' ),
        'show_in_rest'   => true,
        'hierarchical'   => false,
    ) );
}
add_action( 'init', 'tr_register_post_types' );

// Flush rewrite rules on plugin activation
function tr_flush_rewrite_rules() {
    tr_register_post_types();
    flush_rewrite_rules();
}
register_activation_hook( __FILE__, 'tr_flush_rewrite_rules' );

// ============================================
// CUSTOM FIELDS - SERVICES
// ============================================

function tr_register_service_fields() {
    // Service Tagline
    register_post_meta( 'service', 'service_tagline', array(
        'show_in_rest' => true,
        'single'       => true,
        'type'         => 'string',
        'description'  => 'Short tagline for the service',
    ) );

    // Service Benefits (stored as JSON string, can be array)
    register_post_meta( 'service', 'service_benefits', array(
        'show_in_rest' => true,
        'single'       => true,
        'type'         => 'string',
        'description'  => 'List of benefits (comma-separated or JSON)',
    ) );

    // Conditions Treated
    register_post_meta( 'service', 'conditions_treated', array(
        'show_in_rest' => true,
        'single'       => true,
        'type'         => 'string',
        'description'  => 'Conditions this service treats',
    ) );

    // Related Practitioners (IDs of team members)
    register_post_meta( 'service', 'related_practitioners', array(
        'show_in_rest' => true,
        'single'       => false,
        'type'         => 'integer',
        'description'  => 'Array of team member IDs who offer this service',
    ) );

    // Price Range
    register_post_meta( 'service', 'price_range', array(
        'show_in_rest' => true,
        'single'       => true,
        'type'         => 'string',
        'description'  => 'Price range (e.g., "From £60")',
    ) );

    // Duration
    register_post_meta( 'service', 'duration', array(
        'show_in_rest' => true,
        'single'       => true,
        'type'         => 'string',
        'description'  => 'Session duration',
    ) );

    // Therapeutic Approaches (newline-separated list)
    register_post_meta( 'service', 'therapeutic_approaches', array(
        'show_in_rest' => true,
        'single'       => true,
        'type'         => 'string',
        'description'  => 'List of therapeutic approaches (one per line)',
    ) );

    // Services Offered (for Podiatry and similar - newline-separated list)
    register_post_meta( 'service', 'services_offered', array(
        'show_in_rest' => true,
        'single'       => true,
        'type'         => 'string',
        'description'  => 'Specific services offered (one per line)',
    ) );

    // Booking Information
    register_post_meta( 'service', 'booking_information', array(
        'show_in_rest' => true,
        'single'       => true,
        'type'         => 'string',
        'description'  => 'Booking instructions and information',
    ) );

    // Accreditation Note
    register_post_meta( 'service', 'accreditation_note', array(
        'show_in_rest' => true,
        'single'       => true,
        'type'         => 'string',
        'description'  => 'Accreditation and regulatory information',
    ) );
}
add_action( 'init', 'tr_register_service_fields' );

// ============================================
// CUSTOM FIELDS - TEAM MEMBERS
// ============================================

function tr_register_team_fields() {
    // Position/Title
    register_post_meta( 'team', 'position', array(
        'show_in_rest' => true,
        'single'       => true,
        'type'         => 'string',
        'description'  => 'Professional position/title',
    ) );

    // Credentials
    register_post_meta( 'team', 'credentials', array(
        'show_in_rest' => true,
        'single'       => true,
        'type'         => 'string',
        'description'  => 'Professional credentials and qualifications',
    ) );

    // Starting Price
    register_post_meta( 'team', 'starting_price', array(
        'show_in_rest' => true,
        'single'       => true,
        'type'         => 'string',
        'description'  => 'Starting price (e.g., "From £100")',
    ) );

    // Email
    register_post_meta( 'team', 'email', array(
        'show_in_rest' => true,
        'single'       => true,
        'type'         => 'string',
        'description'  => 'Contact email',
    ) );

    // Phone
    register_post_meta( 'team', 'phone', array(
        'show_in_rest' => true,
        'single'       => true,
        'type'         => 'string',
        'description'  => 'Contact phone number',
    ) );

    // Specializations
    register_post_meta( 'team', 'specializations', array(
        'show_in_rest' => true,
        'single'       => true,
        'type'         => 'string',
        'description'  => 'Areas of specialization',
    ) );

    // Qualifications & Training
    register_post_meta( 'team', 'qualifications', array(
        'show_in_rest' => true,
        'single'       => true,
        'type'         => 'string',
        'description'  => 'Qualifications and training details',
    ) );

    // Treatment Approaches
    register_post_meta( 'team', 'treatment_approaches', array(
        'show_in_rest' => true,
        'single'       => true,
        'type'         => 'string',
        'description'  => 'Treatment approaches and methods',
    ) );

    // Professional Memberships
    register_post_meta( 'team', 'professional_memberships', array(
        'show_in_rest' => true,
        'single'       => true,
        'type'         => 'string',
        'description'  => 'Professional memberships and registrations',
    ) );

    // Years of Experience
    register_post_meta( 'team', 'years_experience', array(
        'show_in_rest' => true,
        'single'       => true,
        'type'         => 'string',
        'description'  => 'Years of experience',
    ) );

    // Services Offered (related service IDs)
    register_post_meta( 'team', 'services_offered', array(
        'show_in_rest' => true,
        'single'       => false,
        'type'         => 'integer',
        'description'  => 'Array of service IDs this therapist offers',
    ) );

    // Type of Therapy (newline-separated list)
    register_post_meta( 'team', 'type_of_therapy', array(
        'show_in_rest' => true,
        'single'       => true,
        'type'         => 'string',
        'description'  => 'Types of therapy offered (one per line)',
    ) );

    // Qualifications List (detailed - newline-separated)
    register_post_meta( 'team', 'qualifications_list', array(
        'show_in_rest' => true,
        'single'       => true,
        'type'         => 'string',
        'description'  => 'Detailed qualifications and certificates (one per line)',
    ) );

    // Registrations (newline-separated list)
    register_post_meta( 'team', 'registrations', array(
        'show_in_rest' => true,
        'single'       => true,
        'type'         => 'string',
        'description'  => 'Professional registrations and memberships (one per line)',
    ) );

    // Website URL
    register_post_meta( 'team', 'website', array(
        'show_in_rest' => true,
        'single'       => true,
        'type'         => 'string',
        'description'  => 'Personal or professional website URL',
    ) );

    // Fees Structure (structured pricing information)
    register_post_meta( 'team', 'fees_structure', array(
        'show_in_rest' => true,
        'single'       => true,
        'type'         => 'string',
        'description'  => 'Detailed fees structure (can be table format or text)',
    ) );
}
add_action( 'init', 'tr_register_team_fields' );


// ============================================
// REST API ENHANCEMENTS
// ============================================

// Add featured image URL to REST API response
function tr_add_featured_image_to_rest( $data, $post, $request ) {
    $_data = $data->data;
    $thumbnail_id = get_post_thumbnail_id( $post->ID );
    if ( $thumbnail_id ) {
        $thumbnail = wp_get_attachment_image_src( $thumbnail_id, 'full' );
        $_data['featured_image_url'] = $thumbnail ? $thumbnail[0] : null;
        $_data['featured_image_thumbnail'] = wp_get_attachment_image_src( $thumbnail_id, 'thumbnail' )[0] ?? null;
        $_data['featured_image_medium'] = wp_get_attachment_image_src( $thumbnail_id, 'medium' )[0] ?? null;
        $_data['featured_image_large'] = wp_get_attachment_image_src( $thumbnail_id, 'large' )[0] ?? null;
    } else {
        $_data['featured_image_url'] = null;
        $_data['featured_image_thumbnail'] = null;
        $_data['featured_image_medium'] = null;
        $_data['featured_image_large'] = null;
    }
    $data->data = $_data;
    return $data;
}
add_filter( 'rest_prepare_service', 'tr_add_featured_image_to_rest', 10, 3 );
add_filter( 'rest_prepare_team', 'tr_add_featured_image_to_rest', 10, 3 );

// Add all meta fields to REST API response
function tr_add_meta_to_rest( $data, $post, $request ) {
    $post_type = $post->post_type;
    
    // Get all registered meta for this post type
    $meta_keys = get_registered_meta_keys( 'post', $post_type );
    
    if ( ! isset( $data->data['meta'] ) ) {
        $data->data['meta'] = array();
    }
    
    foreach ( $meta_keys as $key => $args ) {
        if ( ! empty( $args['show_in_rest'] ) ) {
            $single = isset( $args['single'] ) ? $args['single'] : true;
            $meta_value = get_post_meta( $post->ID, $key, $single );
            
            // For non-single fields, ensure we get array
            if ( ! $single && ! is_array( $meta_value ) ) {
                $meta_value = get_post_meta( $post->ID, $key, false );
            }
            
            $data->data['meta'][ $key ] = $meta_value;
        }
    }
    
    return $data;
}
add_filter( 'rest_prepare_service', 'tr_add_meta_to_rest', 10, 3 );
add_filter( 'rest_prepare_team', 'tr_add_meta_to_rest', 10, 3 );

// ============================================
// TAXONOMIES (Optional - for organizing content)
// ============================================

function tr_register_taxonomies() {
    // Service Categories
    register_taxonomy( 'service_category', 'service', array(
        'labels' => array(
            'name' => 'Service Categories',
            'singular_name' => 'Service Category',
        ),
        'public' => true,
        'show_in_rest' => true,
        'hierarchical' => true,
    ) );

    // Team Specializations
    register_taxonomy( 'specialization', 'team', array(
        'labels' => array(
            'name' => 'Specializations',
            'singular_name' => 'Specialization',
        ),
        'public' => true,
        'show_in_rest' => true,
        'hierarchical' => false,
    ) );
}
add_action( 'init', 'tr_register_taxonomies' );

// ============================================
// ADMIN COLUMNS (Better admin experience)
// ============================================

// Add custom columns for Services
function tr_service_columns( $columns ) {
    $new_columns = array();
    $new_columns['cb'] = $columns['cb'];
    $new_columns['title'] = $columns['title'];
    $new_columns['service_tagline'] = 'Tagline';
    $new_columns['price_range'] = 'Price Range';
    $new_columns['date'] = $columns['date'];
    return $new_columns;
}
add_filter( 'manage_service_posts_columns', 'tr_service_columns' );

function tr_service_column_content( $column, $post_id ) {
    switch ( $column ) {
        case 'service_tagline':
            echo get_post_meta( $post_id, 'service_tagline', true );
            break;
        case 'price_range':
            echo get_post_meta( $post_id, 'price_range', true );
            break;
    }
}
add_action( 'manage_service_posts_custom_column', 'tr_service_column_content', 10, 2 );

// Add custom columns for Team Members
function tr_team_columns( $columns ) {
    $new_columns = array();
    $new_columns['cb'] = $columns['cb'];
    $new_columns['title'] = $columns['title'];
    $new_columns['position'] = 'Position';
    $new_columns['email'] = 'Email';
    $new_columns['phone'] = 'Phone';
    $new_columns['starting_price'] = 'Starting Price';
    $new_columns['date'] = $columns['date'];
    return $new_columns;
}
add_filter( 'manage_team_posts_columns', 'tr_team_columns' );

function tr_team_column_content( $column, $post_id ) {
    switch ( $column ) {
        case 'position':
            echo get_post_meta( $post_id, 'position', true );
            break;
        case 'email':
            echo get_post_meta( $post_id, 'email', true );
            break;
        case 'phone':
            echo get_post_meta( $post_id, 'phone', true );
            break;
        case 'starting_price':
            echo get_post_meta( $post_id, 'starting_price', true );
            break;
    }
}
add_action( 'manage_team_posts_custom_column', 'tr_team_column_content', 10, 2 );

// ============================================
// ORGANIZED ADMIN META BOXES
// ============================================

// Add meta boxes for Services
function tr_add_service_meta_boxes() {
    add_meta_box(
        'tr_service_details',
        'Service Details',
        'tr_service_details_callback',
        'service',
        'normal',
        'high'
    );
    add_meta_box(
        'tr_service_therapeutic',
        'Therapeutic Information',
        'tr_service_therapeutic_callback',
        'service',
        'normal',
        'default'
    );
    add_meta_box(
        'tr_service_pricing',
        'Pricing & Booking',
        'tr_service_pricing_callback',
        'service',
        'normal',
        'default'
    );
    add_meta_box(
        'tr_service_practitioners',
        'Practitioners',
        'tr_service_practitioners_callback',
        'service',
        'side',
        'default'
    );
}
add_action( 'add_meta_boxes', 'tr_add_service_meta_boxes' );

// Service Details Meta Box
function tr_service_details_callback( $post ) {
    wp_nonce_field( 'tr_service_meta_box', 'tr_service_meta_box_nonce' );
    $tagline = get_post_meta( $post->ID, 'service_tagline', true );
    ?>
    <table class="form-table">
        <tr>
            <th><label for="service_tagline">Service Tagline</label></th>
            <td>
                <input type="text" id="service_tagline" name="service_tagline" value="<?php echo esc_attr( $tagline ); ?>" class="regular-text" />
                <p class="description">Short tagline displayed below the service title</p>
            </td>
        </tr>
    </table>
    <p><strong>About/Description:</strong> Use the main content editor above for the service description.</p>
    <?php
}

// Service Therapeutic Information Meta Box
function tr_service_therapeutic_callback( $post ) {
    wp_nonce_field( 'tr_service_meta_box', 'tr_service_meta_box_nonce' );
    $approaches = get_post_meta( $post->ID, 'therapeutic_approaches', true );
    $conditions = get_post_meta( $post->ID, 'conditions_treated', true );
    $services_offered = get_post_meta( $post->ID, 'services_offered', true );
    ?>
    <table class="form-table">
        <tr>
            <th><label for="therapeutic_approaches">Therapeutic Approaches</label></th>
            <td>
                <textarea id="therapeutic_approaches" name="therapeutic_approaches" rows="8" class="large-text"><?php echo esc_textarea( $approaches ); ?></textarea>
                <p class="description">List one therapeutic approach per line (e.g., CBT, EMDR, Person-Centred)</p>
            </td>
        </tr>
        <tr>
            <th><label for="conditions_treated">Conditions Treated</label></th>
            <td>
                <textarea id="conditions_treated" name="conditions_treated" rows="8" class="large-text"><?php echo esc_textarea( $conditions ); ?></textarea>
                <p class="description">List one condition per line (e.g., Anxiety, Depression, PTSD)</p>
            </td>
        </tr>
        <tr>
            <th><label for="services_offered">Services Offered</label></th>
            <td>
                <textarea id="services_offered" name="services_offered" rows="5" class="large-text"><?php echo esc_textarea( $services_offered ); ?></textarea>
                <p class="description">Specific services offered (e.g., for Podiatry: Prescription Insoles, Ultrasound). One per line.</p>
            </td>
        </tr>
    </table>
    <?php
}

// Service Pricing & Booking Meta Box
function tr_service_pricing_callback( $post ) {
    wp_nonce_field( 'tr_service_meta_box', 'tr_service_meta_box_nonce' );
    $price_range = get_post_meta( $post->ID, 'price_range', true );
    $duration = get_post_meta( $post->ID, 'duration', true );
    $booking = get_post_meta( $post->ID, 'booking_information', true );
    $accreditation = get_post_meta( $post->ID, 'accreditation_note', true );
    ?>
    <table class="form-table">
        <tr>
            <th><label for="price_range">Price Range</label></th>
            <td>
                <input type="text" id="price_range" name="price_range" value="<?php echo esc_attr( $price_range ); ?>" class="regular-text" placeholder="From £60" />
            </td>
        </tr>
        <tr>
            <th><label for="duration">Session Duration</label></th>
            <td>
                <input type="text" id="duration" name="duration" value="<?php echo esc_attr( $duration ); ?>" class="regular-text" placeholder="60 minutes" />
            </td>
        </tr>
        <tr>
            <th><label for="booking_information">Booking Information</label></th>
            <td>
                <textarea id="booking_information" name="booking_information" rows="4" class="large-text"><?php echo esc_textarea( $booking ); ?></textarea>
                <p class="description">Instructions for booking appointments</p>
            </td>
        </tr>
        <tr>
            <th><label for="accreditation_note">Accreditation Note</label></th>
            <td>
                <textarea id="accreditation_note" name="accreditation_note" rows="3" class="large-text"><?php echo esc_textarea( $accreditation ); ?></textarea>
                <p class="description">Accreditation and regulatory information</p>
            </td>
        </tr>
    </table>
    <?php
}

// Service Practitioners Meta Box
function tr_service_practitioners_callback( $post ) {
    wp_nonce_field( 'tr_service_meta_box', 'tr_service_meta_box_nonce' );
    $related = get_post_meta( $post->ID, 'related_practitioners', false );
    if ( ! is_array( $related ) ) {
        $related = array();
    }
    
    $all_team = get_posts( array(
        'post_type' => 'team',
        'posts_per_page' => -1,
        'post_status' => 'publish',
    ) );
    ?>
    <p>Select team members who offer this service:</p>
    <div style="max-height: 300px; overflow-y: auto; border: 1px solid #ddd; padding: 10px;">
        <?php foreach ( $all_team as $member ) : ?>
            <label style="display: block; margin-bottom: 8px;">
                <input type="checkbox" name="related_practitioners[]" value="<?php echo esc_attr( $member->ID ); ?>" <?php checked( in_array( $member->ID, $related ) ); ?> />
                <?php echo esc_html( $member->post_title ); ?>
            </label>
        <?php endforeach; ?>
    </div>
    <?php
}

// Save Service Meta Boxes
function tr_save_service_meta_boxes( $post_id ) {
    if ( ! isset( $_POST['tr_service_meta_box_nonce'] ) || ! wp_verify_nonce( $_POST['tr_service_meta_box_nonce'], 'tr_service_meta_box' ) ) {
        return;
    }
    if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
        return;
    }
    if ( ! current_user_can( 'edit_post', $post_id ) ) {
        return;
    }
    
    $fields = array( 'service_tagline', 'therapeutic_approaches', 'conditions_treated', 'services_offered', 'price_range', 'duration', 'booking_information', 'accreditation_note' );
    foreach ( $fields as $field ) {
        if ( isset( $_POST[ $field ] ) ) {
            update_post_meta( $post_id, $field, sanitize_textarea_field( $_POST[ $field ] ) );
        }
    }
    
    // Handle related practitioners
    delete_post_meta( $post_id, 'related_practitioners' );
    if ( isset( $_POST['related_practitioners'] ) && is_array( $_POST['related_practitioners'] ) ) {
        foreach ( $_POST['related_practitioners'] as $practitioner_id ) {
            add_post_meta( $post_id, 'related_practitioners', intval( $practitioner_id ) );
        }
    }
}
add_action( 'save_post_service', 'tr_save_service_meta_boxes' );

// Add meta boxes for Team Members
function tr_add_team_meta_boxes() {
    add_meta_box(
        'tr_team_basic',
        'Basic Information',
        'tr_team_basic_callback',
        'team',
        'normal',
        'high'
    );
    add_meta_box(
        'tr_team_therapy',
        'Therapy & Qualifications',
        'tr_team_therapy_callback',
        'team',
        'normal',
        'default'
    );
    add_meta_box(
        'tr_team_contact',
        'Contact & Pricing',
        'tr_team_contact_callback',
        'team',
        'normal',
        'default'
    );
    add_meta_box(
        'tr_team_bio',
        'Bio & Specializations',
        'tr_team_bio_callback',
        'team',
        'normal',
        'default'
    );
    add_meta_box(
        'tr_team_services',
        'Services Offered',
        'tr_team_services_callback',
        'team',
        'side',
        'default'
    );
}
add_action( 'add_meta_boxes', 'tr_add_team_meta_boxes' );

// Team Basic Information Meta Box
function tr_team_basic_callback( $post ) {
    wp_nonce_field( 'tr_team_meta_box', 'tr_team_meta_box_nonce' );
    $position = get_post_meta( $post->ID, 'position', true );
    $credentials = get_post_meta( $post->ID, 'credentials', true );
    $years = get_post_meta( $post->ID, 'years_experience', true );
    ?>
    <table class="form-table">
        <tr>
            <th><label for="position">Position/Role</label></th>
            <td>
                <input type="text" id="position" name="position" value="<?php echo esc_attr( $position ); ?>" class="regular-text" />
                <p class="description">Professional position or role (e.g., Clinical Psychologist, Hypnotherapist)</p>
            </td>
        </tr>
        <tr>
            <th><label for="credentials">Credentials (Short)</label></th>
            <td>
                <input type="text" id="credentials" name="credentials" value="<?php echo esc_attr( $credentials ); ?>" class="regular-text" />
                <p class="description">Brief credentials summary (e.g., BSc, MSc, D.Clin.Psy, CPsychol)</p>
            </td>
        </tr>
        <tr>
            <th><label for="years_experience">Years of Experience</label></th>
            <td>
                <input type="text" id="years_experience" name="years_experience" value="<?php echo esc_attr( $years ); ?>" class="regular-text" placeholder="30+ years" />
            </td>
        </tr>
    </table>
    <?php
}

// Team Therapy & Qualifications Meta Box
function tr_team_therapy_callback( $post ) {
    wp_nonce_field( 'tr_team_meta_box', 'tr_team_meta_box_nonce' );
    $type_of_therapy = get_post_meta( $post->ID, 'type_of_therapy', true );
    $qualifications_list = get_post_meta( $post->ID, 'qualifications_list', true );
    $treatment_approaches = get_post_meta( $post->ID, 'treatment_approaches', true );
    $registrations = get_post_meta( $post->ID, 'registrations', true );
    ?>
    <table class="form-table">
        <tr>
            <th><label for="type_of_therapy">Type of Therapy</label></th>
            <td>
                <textarea id="type_of_therapy" name="type_of_therapy" rows="6" class="large-text"><?php echo esc_textarea( $type_of_therapy ); ?></textarea>
                <p class="description">List one therapy type per line (e.g., EMDR, CBT, Hypnotherapy)</p>
            </td>
        </tr>
        <tr>
            <th><label for="qualifications_list">Qualifications & Certificates</label></th>
            <td>
                <textarea id="qualifications_list" name="qualifications_list" rows="10" class="large-text"><?php echo esc_textarea( $qualifications_list ); ?></textarea>
                <p class="description">Detailed qualifications and certificates. One per line.</p>
            </td>
        </tr>
        <tr>
            <th><label for="treatment_approaches">Treatment Approaches</label></th>
            <td>
                <textarea id="treatment_approaches" name="treatment_approaches" rows="6" class="large-text"><?php echo esc_textarea( $treatment_approaches ); ?></textarea>
                <p class="description">Treatment approaches and methods used. One per line.</p>
            </td>
        </tr>
        <tr>
            <th><label for="registrations">Professional Memberships/Registrations</label></th>
            <td>
                <textarea id="registrations" name="registrations" rows="6" class="large-text"><?php echo esc_textarea( $registrations ); ?></textarea>
                <p class="description">Professional registrations and memberships. One per line (e.g., BACP, HCPC, CNHC)</p>
            </td>
        </tr>
    </table>
    <?php
}

// Team Contact & Pricing Meta Box
function tr_team_contact_callback( $post ) {
    wp_nonce_field( 'tr_team_meta_box', 'tr_team_meta_box_nonce' );
    $email = get_post_meta( $post->ID, 'email', true );
    $phone = get_post_meta( $post->ID, 'phone', true );
    $website = get_post_meta( $post->ID, 'website', true );
    $starting_price = get_post_meta( $post->ID, 'starting_price', true );
    $fees_structure = get_post_meta( $post->ID, 'fees_structure', true );
    ?>
    <table class="form-table">
        <tr>
            <th><label for="email">Email</label></th>
            <td>
                <input type="email" id="email" name="email" value="<?php echo esc_attr( $email ); ?>" class="regular-text" />
            </td>
        </tr>
        <tr>
            <th><label for="phone">Phone</label></th>
            <td>
                <input type="text" id="phone" name="phone" value="<?php echo esc_attr( $phone ); ?>" class="regular-text" />
            </td>
        </tr>
        <tr>
            <th><label for="website">Website</label></th>
            <td>
                <input type="url" id="website" name="website" value="<?php echo esc_attr( $website ); ?>" class="regular-text" placeholder="https://example.com" />
                <p class="description">Personal or professional website URL</p>
            </td>
        </tr>
        <tr>
            <th><label for="starting_price">Starting Price</label></th>
            <td>
                <input type="text" id="starting_price" name="starting_price" value="<?php echo esc_attr( $starting_price ); ?>" class="regular-text" placeholder="From £100" />
            </td>
        </tr>
        <tr>
            <th><label for="fees_structure">Fees Structure</label></th>
            <td>
                <textarea id="fees_structure" name="fees_structure" rows="8" class="large-text"><?php echo esc_textarea( $fees_structure ); ?></textarea>
                <p class="description">Detailed pricing information. Can be formatted as a table or list. Example:<br>
                Session | Price<br>
                60 minutes | £65<br>
                90 minutes | £75</p>
            </td>
        </tr>
    </table>
    <?php
}

// Team Bio & Specializations Meta Box
function tr_team_bio_callback( $post ) {
    wp_nonce_field( 'tr_team_meta_box', 'tr_team_meta_box_nonce' );
    $specializations = get_post_meta( $post->ID, 'specializations', true );
    ?>
    <table class="form-table">
        <tr>
            <th><label for="specializations">Specializations</label></th>
            <td>
                <textarea id="specializations" name="specializations" rows="6" class="large-text"><?php echo esc_textarea( $specializations ); ?></textarea>
                <p class="description">Areas of specialization and expertise</p>
            </td>
        </tr>
    </table>
    <p><strong>About/Bio:</strong> Use the main content editor above for the detailed biography.</p>
    <?php
}

// Team Services Offered Meta Box
function tr_team_services_callback( $post ) {
    wp_nonce_field( 'tr_team_meta_box', 'tr_team_meta_box_nonce' );
    $services_offered = get_post_meta( $post->ID, 'services_offered', false );
    if ( ! is_array( $services_offered ) ) {
        $services_offered = array();
    }
    
    $all_services = get_posts( array(
        'post_type' => 'service',
        'posts_per_page' => -1,
        'post_status' => 'publish',
    ) );
    ?>
    <p>Select services this therapist offers:</p>
    <div style="max-height: 300px; overflow-y: auto; border: 1px solid #ddd; padding: 10px;">
        <?php foreach ( $all_services as $service ) : ?>
            <label style="display: block; margin-bottom: 8px;">
                <input type="checkbox" name="services_offered[]" value="<?php echo esc_attr( $service->ID ); ?>" <?php checked( in_array( $service->ID, $services_offered ) ); ?> />
                <?php echo esc_html( $service->post_title ); ?>
            </label>
        <?php endforeach; ?>
    </div>
    <?php
}

// Save Team Meta Boxes
function tr_save_team_meta_boxes( $post_id ) {
    if ( ! isset( $_POST['tr_team_meta_box_nonce'] ) || ! wp_verify_nonce( $_POST['tr_team_meta_box_nonce'], 'tr_team_meta_box' ) ) {
        return;
    }
    if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
        return;
    }
    if ( ! current_user_can( 'edit_post', $post_id ) ) {
        return;
    }
    
    $fields = array( 'position', 'credentials', 'years_experience', 'type_of_therapy', 'qualifications_list', 'treatment_approaches', 'registrations', 'email', 'phone', 'website', 'starting_price', 'fees_structure', 'specializations' );
    foreach ( $fields as $field ) {
        if ( isset( $_POST[ $field ] ) ) {
            update_post_meta( $post_id, $field, sanitize_textarea_field( $_POST[ $field ] ) );
        }
    }
    
    // Handle services offered
    delete_post_meta( $post_id, 'services_offered' );
    if ( isset( $_POST['services_offered'] ) && is_array( $_POST['services_offered'] ) ) {
        foreach ( $_POST['services_offered'] as $service_id ) {
            add_post_meta( $post_id, 'services_offered', intval( $service_id ) );
        }
    }
}
add_action( 'save_post_team', 'tr_save_team_meta_boxes' );

// ============================================
// IMPORT FUNCTIONALITY (Admin Page)
// ============================================

// Add admin menu for import
function tr_add_import_menu() {
    add_management_page(
        'Import Rooms Content',
        'Import Rooms Content',
        'manage_options',
        'tr-import-content',
        'tr_import_content_page'
    );
}
add_action('admin_menu', 'tr_add_import_menu', 20);

// ============================================
// CUSTOM FIELDS - NEW POST TYPES
// ============================================

// Accreditation Logo Fields
function tr_register_accreditation_logo_fields() {
    register_post_meta( 'accreditation_logo', 'logo_url', array(
        'show_in_rest' => true,
        'single'       => true,
        'type'         => 'string',
        'description'  => 'Optional: External logo URL (if not using featured image)',
    ) );
    register_post_meta( 'accreditation_logo', 'logo_alt_text', array(
        'show_in_rest' => true,
        'single'       => true,
        'type'         => 'string',
        'description'  => 'Alt text for the logo image',
    ) );
}
add_action( 'init', 'tr_register_accreditation_logo_fields' );

// Gallery Item Fields
function tr_register_gallery_item_fields() {
    register_post_meta( 'gallery_item', 'gallery_category', array(
        'show_in_rest' => true,
        'single'       => true,
        'type'         => 'string',
        'description'  => 'Gallery category (e.g., "our-space", "therapy-rooms")',
    ) );
    register_post_meta( 'gallery_item', 'caption', array(
        'show_in_rest' => true,
        'single'       => true,
        'type'         => 'string',
        'description'  => 'Image caption',
    ) );
}
add_action( 'init', 'tr_register_gallery_item_fields' );

// Rental Option Fields
function tr_register_rental_option_fields() {
    register_post_meta( 'rental_option', 'icon', array(
        'show_in_rest' => true,
        'single'       => true,
        'type'         => 'string',
        'description'  => 'Icon emoji or class name',
    ) );
    register_post_meta( 'rental_option', 'image_url', array(
        'show_in_rest' => true,
        'single'       => true,
        'type'         => 'string',
        'description'  => 'Optional: Image URL (if not using featured image)',
    ) );
}
add_action( 'init', 'tr_register_rental_option_fields' );

// ============================================
// META BOXES - NEW POST TYPES
// ============================================

// Accreditation Logo Meta Box
function tr_add_accreditation_logo_meta_boxes() {
    add_meta_box(
        'tr_accreditation_logo_details',
        'Logo Details',
        'tr_accreditation_logo_details_callback',
        'accreditation_logo',
        'normal',
        'high'
    );
}
add_action( 'add_meta_boxes', 'tr_add_accreditation_logo_meta_boxes' );

function tr_accreditation_logo_details_callback( $post ) {
    wp_nonce_field( 'tr_accreditation_logo_meta_box', 'tr_accreditation_logo_meta_box_nonce' );
    $logo_alt_text = get_post_meta( $post->ID, 'logo_alt_text', true );
    $logo_url = get_post_meta( $post->ID, 'logo_url', true );
    ?>
    <table class="form-table">
        <tr>
            <th><label for="logo_alt_text">Alt Text</label></th>
            <td>
                <input type="text" id="logo_alt_text" name="logo_alt_text" value="<?php echo esc_attr( $logo_alt_text ); ?>" class="regular-text" />
                <p class="description">Accessibility text for the logo (e.g., "BACP - British Association for Counselling and Psychotherapy")</p>
            </td>
        </tr>
        <tr>
            <th><label for="logo_url">Logo URL (Optional)</label></th>
            <td>
                <input type="url" id="logo_url" name="logo_url" value="<?php echo esc_url( $logo_url ); ?>" class="regular-text" />
                <p class="description">If you want to use an external image URL instead of the Featured Image</p>
            </td>
        </tr>
    </table>
    <p><strong>Featured Image:</strong> Set the logo image using the "Featured Image" box on the right. This is the recommended method.</p>
    <p><strong>Order:</strong> Use "Order" field (below) to control display order. Lower numbers appear first.</p>
    <?php
}

function tr_save_accreditation_logo_meta( $post_id ) {
    if ( ! isset( $_POST['tr_accreditation_logo_meta_box_nonce'] ) || ! wp_verify_nonce( $_POST['tr_accreditation_logo_meta_box_nonce'], 'tr_accreditation_logo_meta_box' ) ) {
        return;
    }
    if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
        return;
    }
    if ( ! current_user_can( 'edit_post', $post_id ) ) {
        return;
    }
    if ( isset( $_POST['logo_alt_text'] ) ) {
        update_post_meta( $post_id, 'logo_alt_text', sanitize_text_field( $_POST['logo_alt_text'] ) );
    }
    if ( isset( $_POST['logo_url'] ) ) {
        update_post_meta( $post_id, 'logo_url', esc_url_raw( $_POST['logo_url'] ) );
    }
}
add_action( 'save_post_accreditation_logo', 'tr_save_accreditation_logo_meta' );

// Gallery Item Meta Box
function tr_add_gallery_item_meta_boxes() {
    add_meta_box(
        'tr_gallery_item_details',
        'Gallery Item Details',
        'tr_gallery_item_details_callback',
        'gallery_item',
        'normal',
        'high'
    );
}
add_action( 'add_meta_boxes', 'tr_add_gallery_item_meta_boxes' );

function tr_gallery_item_details_callback( $post ) {
    wp_nonce_field( 'tr_gallery_item_meta_box', 'tr_gallery_item_meta_box_nonce' );
    $gallery_category = get_post_meta( $post->ID, 'gallery_category', true );
    $caption = get_post_meta( $post->ID, 'caption', true );
    ?>
    <table class="form-table">
        <tr>
            <th><label for="gallery_category">Gallery Category</label></th>
            <td>
                <select id="gallery_category" name="gallery_category" class="regular-text">
                    <option value="our-space" <?php selected( $gallery_category, 'our-space' ); ?>>Our Space (About Page)</option>
                    <option value="therapy-rooms" <?php selected( $gallery_category, 'therapy-rooms' ); ?>>Therapy Rooms</option>
                    <option value="general" <?php selected( $gallery_category, 'general' ); ?>>General</option>
                </select>
                <p class="description">Select which gallery this item belongs to</p>
            </td>
        </tr>
        <tr>
            <th><label for="caption">Caption</label></th>
            <td>
                <input type="text" id="caption" name="caption" value="<?php echo esc_attr( $caption ); ?>" class="regular-text" />
                <p class="description">Optional caption text to display with the image</p>
            </td>
        </tr>
    </table>
    <p><strong>Featured Image:</strong> Set the gallery image using the "Featured Image" box on the right.</p>
    <p><strong>Content:</strong> Use the main content editor for a longer description (optional).</p>
    <p><strong>Order:</strong> Use "Order" field to control display order.</p>
    <?php
}

function tr_save_gallery_item_meta( $post_id ) {
    if ( ! isset( $_POST['tr_gallery_item_meta_box_nonce'] ) || ! wp_verify_nonce( $_POST['tr_gallery_item_meta_box_nonce'], 'tr_gallery_item_meta_box' ) ) {
        return;
    }
    if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
        return;
    }
    if ( ! current_user_can( 'edit_post', $post_id ) ) {
        return;
    }
    if ( isset( $_POST['gallery_category'] ) ) {
        update_post_meta( $post_id, 'gallery_category', sanitize_text_field( $_POST['gallery_category'] ) );
    }
    if ( isset( $_POST['caption'] ) ) {
        update_post_meta( $post_id, 'caption', sanitize_text_field( $_POST['caption'] ) );
    }
}
add_action( 'save_post_gallery_item', 'tr_save_gallery_item_meta' );

// Rental Option Meta Box
function tr_add_rental_option_meta_boxes() {
    add_meta_box(
        'tr_rental_option_details',
        'Rental Option Details',
        'tr_rental_option_details_callback',
        'rental_option',
        'normal',
        'high'
    );
}
add_action( 'add_meta_boxes', 'tr_add_rental_option_meta_boxes' );

function tr_rental_option_details_callback( $post ) {
    wp_nonce_field( 'tr_rental_option_meta_box', 'tr_rental_option_meta_box_nonce' );
    $icon = get_post_meta( $post->ID, 'icon', true );
    $image_url = get_post_meta( $post->ID, 'image_url', true );
    ?>
    <table class="form-table">
        <tr>
            <th><label for="icon">Icon</label></th>
            <td>
                <input type="text" id="icon" name="icon" value="<?php echo esc_attr( $icon ); ?>" class="regular-text" placeholder="🛋️" />
                <p class="description">Emoji icon (e.g., 🛋️, 👥, 🏢) or leave empty</p>
            </td>
        </tr>
        <tr>
            <th><label for="image_url">Image URL (Optional)</label></th>
            <td>
                <input type="url" id="image_url" name="image_url" value="<?php echo esc_url( $image_url ); ?>" class="regular-text" />
                <p class="description">If you want to use an external image URL instead of the Featured Image</p>
            </td>
        </tr>
    </table>
    <p><strong>Title:</strong> The title appears as the heading (e.g., "1-1 Therapy")</p>
    <p><strong>Description:</strong> Use the main content editor for the description text</p>
    <p><strong>Featured Image:</strong> Set the option image using the "Featured Image" box on the right</p>
    <p><strong>Order:</strong> Use "Order" field to control display order on the hire room page</p>
    <?php
}

function tr_save_rental_option_meta( $post_id ) {
    if ( ! isset( $_POST['tr_rental_option_meta_box_nonce'] ) || ! wp_verify_nonce( $_POST['tr_rental_option_meta_box_nonce'], 'tr_rental_option_meta_box' ) ) {
        return;
    }
    if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
        return;
    }
    if ( ! current_user_can( 'edit_post', $post_id ) ) {
        return;
    }
    if ( isset( $_POST['icon'] ) ) {
        update_post_meta( $post_id, 'icon', sanitize_text_field( $_POST['icon'] ) );
    }
    if ( isset( $_POST['image_url'] ) ) {
        update_post_meta( $post_id, 'image_url', esc_url_raw( $_POST['image_url'] ) );
    }
}
add_action( 'save_post_rental_option', 'tr_save_rental_option_meta' );

// ============================================
// OPTIONS PAGES - HOMEPAGE & ABOUT SETTINGS
// ============================================

function tr_add_options_pages() {
    add_options_page(
        'Homepage Settings',
        'Homepage Settings',
        'manage_options',
        'tr-homepage-settings',
        'tr_homepage_settings_page'
    );
    add_options_page(
        'About Page Settings',
        'About Page Settings',
        'manage_options',
        'tr-about-settings',
        'tr_about_settings_page'
    );
}
add_action( 'admin_menu', 'tr_add_options_pages' );

// Register settings
function tr_register_settings() {
    // Homepage settings
    register_setting( 'tr_homepage_settings', 'tr_homepage_hero_image' );
    register_setting( 'tr_homepage_settings', 'tr_homepage_hero_title' );
    register_setting( 'tr_homepage_settings', 'tr_homepage_hero_subtitle' );
    register_setting( 'tr_homepage_settings', 'tr_homepage_cta_text' );
    register_setting( 'tr_homepage_settings', 'tr_homepage_cta_link' );
    register_setting( 'tr_homepage_settings', 'tr_homepage_cta_secondary_text' );
    register_setting( 'tr_homepage_settings', 'tr_homepage_cta_secondary_link' );
    
    // About page settings
    register_setting( 'tr_about_settings', 'tr_about_hero_image' );
    register_setting( 'tr_about_settings', 'tr_about_gallery_category' );
}
add_action( 'admin_init', 'tr_register_settings' );

// Homepage Settings Page
function tr_homepage_settings_page() {
    if ( ! current_user_can( 'manage_options' ) ) {
        return;
    }
    if ( isset( $_GET['settings-updated'] ) ) {
        add_settings_error( 'tr_homepage_messages', 'tr_homepage_message', 'Settings Saved!', 'updated' );
    }
    settings_errors( 'tr_homepage_messages' );
    ?>
    <div class="wrap">
        <h1><?php echo esc_html( get_admin_page_title() ); ?></h1>
        <form action="options.php" method="post">
            <?php
            settings_fields( 'tr_homepage_settings' );
            do_settings_sections( 'tr_homepage_settings' );
            ?>
            <table class="form-table">
                <tr>
                    <th scope="row"><label for="tr_homepage_hero_image">Hero Image</label></th>
                    <td>
                        <?php
                        $hero_image_id = get_option( 'tr_homepage_hero_image' );
                        $hero_image_url = $hero_image_id ? wp_get_attachment_image_url( $hero_image_id, 'medium' ) : '';
                        ?>
                        <div style="margin-bottom: 10px;">
                            <input type="hidden" id="tr_homepage_hero_image" name="tr_homepage_hero_image" value="<?php echo esc_attr( $hero_image_id ); ?>" />
                            <button type="button" class="button" id="tr_hero_image_button">Select Image</button>
                            <button type="button" class="button" id="tr_hero_image_remove" style="<?php echo $hero_image_id ? '' : 'display:none;'; ?>">Remove</button>
                        </div>
                        <div id="tr_hero_image_preview" style="margin-top: 10px;">
                            <?php if ( $hero_image_url ) : ?>
                                <img src="<?php echo esc_url( $hero_image_url ); ?>" style="max-width: 300px; height: auto;" />
                            <?php endif; ?>
                        </div>
                        <p class="description">The large background image on the homepage hero section</p>
                    </td>
                </tr>
                <tr>
                    <th scope="row"><label for="tr_homepage_hero_title">Hero Title</label></th>
                    <td>
                        <input type="text" id="tr_homepage_hero_title" name="tr_homepage_hero_title" value="<?php echo esc_attr( get_option( 'tr_homepage_hero_title', 'We Heal By Listening And Understanding Your Pain.' ) ); ?>" class="regular-text" />
                        <p class="description">Main headline on the homepage</p>
                    </td>
                </tr>
                <tr>
                    <th scope="row"><label for="tr_homepage_hero_subtitle">Hero Subtitle</label></th>
                    <td>
                        <textarea id="tr_homepage_hero_subtitle" name="tr_homepage_hero_subtitle" rows="3" class="large-text"><?php echo esc_textarea( get_option( 'tr_homepage_hero_subtitle', 'A calm and welcoming therapeutic space in the heart of Poundbury. Find a therapist or rent a room for your practice.' ) ); ?></textarea>
                        <p class="description">Subtitle text below the main headline</p>
                    </td>
                </tr>
                <tr>
                    <th scope="row"><label for="tr_homepage_cta_text">Primary CTA Button Text</label></th>
                    <td>
                        <input type="text" id="tr_homepage_cta_text" name="tr_homepage_cta_text" value="<?php echo esc_attr( get_option( 'tr_homepage_cta_text', 'Find a Therapist' ) ); ?>" class="regular-text" />
                    </td>
                </tr>
                <tr>
                    <th scope="row"><label for="tr_homepage_cta_link">Primary CTA Button Link</label></th>
                    <td>
                        <input type="url" id="tr_homepage_cta_link" name="tr_homepage_cta_link" value="<?php echo esc_url( get_option( 'tr_homepage_cta_link', '/meet-the-team' ) ); ?>" class="regular-text" />
                    </td>
                </tr>
                <tr>
                    <th scope="row"><label for="tr_homepage_cta_secondary_text">Secondary CTA Button Text</label></th>
                    <td>
                        <input type="text" id="tr_homepage_cta_secondary_text" name="tr_homepage_cta_secondary_text" value="<?php echo esc_attr( get_option( 'tr_homepage_cta_secondary_text', 'Rent a Room' ) ); ?>" class="regular-text" />
                    </td>
                </tr>
                <tr>
                    <th scope="row"><label for="tr_homepage_cta_secondary_link">Secondary CTA Button Link</label></th>
                    <td>
                        <input type="url" id="tr_homepage_cta_secondary_link" name="tr_homepage_cta_secondary_link" value="<?php echo esc_url( get_option( 'tr_homepage_cta_secondary_link', '/hire-therapy-room-dorchester' ) ); ?>" class="regular-text" />
                    </td>
                </tr>
            </table>
            <?php submit_button(); ?>
        </form>
    </div>
    <script>
    jQuery(document).ready(function($) {
        var frame;
        $('#tr_hero_image_button').on('click', function(e) {
            e.preventDefault();
            if (frame) {
                frame.open();
                return;
            }
            frame = wp.media({
                title: 'Select Hero Image',
                button: { text: 'Use this image' },
                multiple: false
            });
            frame.on('select', function() {
                var attachment = frame.state().get('selection').first().toJSON();
                $('#tr_homepage_hero_image').val(attachment.id);
                $('#tr_hero_image_preview').html('<img src="' + attachment.url + '" style="max-width: 300px; height: auto;" />');
                $('#tr_hero_image_remove').show();
            });
            frame.open();
        });
        $('#tr_hero_image_remove').on('click', function(e) {
            e.preventDefault();
            $('#tr_homepage_hero_image').val('');
            $('#tr_hero_image_preview').html('');
            $(this).hide();
        });
    });
    </script>
    <?php
}

// About Page Settings Page
function tr_about_settings_page() {
    if ( ! current_user_can( 'manage_options' ) ) {
        return;
    }
    if ( isset( $_GET['settings-updated'] ) ) {
        add_settings_error( 'tr_about_messages', 'tr_about_message', 'Settings Saved!', 'updated' );
    }
    settings_errors( 'tr_about_messages' );
    ?>
    <div class="wrap">
        <h1><?php echo esc_html( get_admin_page_title() ); ?></h1>
        <form action="options.php" method="post">
            <?php
            settings_fields( 'tr_about_settings' );
            do_settings_sections( 'tr_about_settings' );
            ?>
            <table class="form-table">
                <tr>
                    <th scope="row"><label for="tr_about_hero_image">About Page Hero Image</label></th>
                    <td>
                        <?php
                        $hero_image_id = get_option( 'tr_about_hero_image' );
                        $hero_image_url = $hero_image_id ? wp_get_attachment_image_url( $hero_image_id, 'medium' ) : '';
                        ?>
                        <div style="margin-bottom: 10px;">
                            <input type="hidden" id="tr_about_hero_image" name="tr_about_hero_image" value="<?php echo esc_attr( $hero_image_id ); ?>" />
                            <button type="button" class="button" id="tr_about_hero_image_button">Select Image</button>
                            <button type="button" class="button" id="tr_about_hero_image_remove" style="<?php echo $hero_image_id ? '' : 'display:none;'; ?>">Remove</button>
                        </div>
                        <div id="tr_about_hero_image_preview" style="margin-top: 10px;">
                            <?php if ( $hero_image_url ) : ?>
                                <img src="<?php echo esc_url( $hero_image_url ); ?>" style="max-width: 300px; height: auto;" />
                            <?php endif; ?>
                        </div>
                        <p class="description">Background image for the About page hero section</p>
                    </td>
                </tr>
                <tr>
                    <th scope="row"><label for="tr_about_gallery_category">Gallery Category</label></th>
                    <td>
                        <select id="tr_about_gallery_category" name="tr_about_gallery_category" class="regular-text">
                            <option value="our-space" <?php selected( get_option( 'tr_about_gallery_category', 'our-space' ), 'our-space' ); ?>>Our Space</option>
                            <option value="therapy-rooms" <?php selected( get_option( 'tr_about_gallery_category', 'our-space' ), 'therapy-rooms' ); ?>>Therapy Rooms</option>
                            <option value="general" <?php selected( get_option( 'tr_about_gallery_category', 'our-space' ), 'general' ); ?>>General</option>
                        </select>
                        <p class="description">Which gallery category to display on the About page</p>
                    </td>
                </tr>
            </table>
            <?php submit_button(); ?>
        </form>
    </div>
    <script>
    jQuery(document).ready(function($) {
        var frame;
        $('#tr_about_hero_image_button').on('click', function(e) {
            e.preventDefault();
            if (frame) {
                frame.open();
                return;
            }
            frame = wp.media({
                title: 'Select Hero Image',
                button: { text: 'Use this image' },
                multiple: false
            });
            frame.on('select', function() {
                var attachment = frame.state().get('selection').first().toJSON();
                $('#tr_about_hero_image').val(attachment.id);
                $('#tr_about_hero_image_preview').html('<img src="' + attachment.url + '" style="max-width: 300px; height: auto;" />');
                $('#tr_about_hero_image_remove').show();
            });
            frame.open();
        });
        $('#tr_about_hero_image_remove').on('click', function(e) {
            e.preventDefault();
            $('#tr_about_hero_image').val('');
            $('#tr_about_hero_image_preview').html('');
            $(this).hide();
        });
    });
    </script>
    <?php
}

// Expose settings to REST API
function tr_register_rest_settings() {
    register_rest_route( 'tr/v1', '/homepage-settings', array(
        'methods' => 'GET',
        'callback' => 'tr_get_homepage_settings',
        'permission_callback' => '__return_true',
    ) );
    register_rest_route( 'tr/v1', '/about-settings', array(
        'methods' => 'GET',
        'callback' => 'tr_get_about_settings',
        'permission_callback' => '__return_true',
    ) );
}
add_action( 'rest_api_init', 'tr_register_rest_settings' );

function tr_get_homepage_settings() {
    $hero_image_id = get_option( 'tr_homepage_hero_image' );
    return array(
        'hero_image' => $hero_image_id ? wp_get_attachment_url( $hero_image_id ) : null,
        'hero_title' => get_option( 'tr_homepage_hero_title', 'We Heal By Listening And Understanding Your Pain.' ),
        'hero_subtitle' => get_option( 'tr_homepage_hero_subtitle', 'A calm and welcoming therapeutic space in the heart of Poundbury. Find a therapist or rent a room for your practice.' ),
        'cta_text' => get_option( 'tr_homepage_cta_text', 'Find a Therapist' ),
        'cta_link' => get_option( 'tr_homepage_cta_link', '/meet-the-team' ),
        'cta_secondary_text' => get_option( 'tr_homepage_cta_secondary_text', 'Rent a Room' ),
        'cta_secondary_link' => get_option( 'tr_homepage_cta_secondary_link', '/hire-therapy-room-dorchester' ),
    );
}

function tr_get_about_settings() {
    $hero_image_id = get_option( 'tr_about_hero_image' );
    return array(
        'hero_image' => $hero_image_id ? wp_get_attachment_url( $hero_image_id ) : null,
        'gallery_category' => get_option( 'tr_about_gallery_category', 'our-space' ),
    );
}

// Import content page
function tr_import_content_page() {
    $import_done = false;
    $import_output = '';
    $error_message = '';
    
    if (isset($_POST['tr_import']) && wp_verify_nonce($_POST['_wpnonce'], 'tr_import_action')) {
        // Run import inline
        ob_start();
        
        echo "Starting content import...\n\n";
        
        // Import Services
        $services = [
            ['title' => 'Reflexology', 'content' => 'Reflexology is based on the theory that certain reflex points on the feet correspond with various organs and structure of the body.', 'tagline' => 'Looking for a reflexology appointment in Dorchester to alleviate pain?', 'price' => 'From £45', 'duration' => '60 minutes'],
            ['title' => 'Psychological Services', 'content' => 'Our Psychological Services are provided by HCPC-registered psychologists who use scientific, evidence-based approaches.', 'tagline' => 'Evidence-Based Mental Health Support From Registered Professionals', 'price' => 'From £100', 'duration' => '50-60 minutes'],
            ['title' => 'Psychotherapy', 'content' => 'Our psychotherapy services in Dorchester offer an in-depth, longer-term approach to mental and emotional wellbeing.', 'tagline' => 'Deep, Transformative Therapy for Long-Term Change', 'price' => 'From £60', 'duration' => '50 minutes'],
            ['title' => 'Counselling', 'content' => 'Therapists at The Rooms offer counselling services designed to provide a safe, confidential space.', 'tagline' => 'Compassionate Support for Life\'s Challenges', 'price' => 'From £60', 'duration' => '50 minutes'],
            ['title' => 'Hypnotherapy', 'content' => 'Hypnotherapy is a state of keen awareness. The subject is wide-awake and aware of everything around them.', 'tagline' => 'What to expect from Hypnotherapy?', 'price' => 'From £55', 'duration' => '60-90 minutes'],
            ['title' => 'Life Coaching', 'content' => 'Life Coaching services at The Rooms are tailored to help you break through barriers, set meaningful goals.', 'tagline' => 'Clarity, Confidence, and Purpose', 'price' => 'From £55', 'duration' => '60 minutes'],
            ['title' => 'Podiatry', 'content' => 'A Podiatrist is a state registered professional in a branch of medicine devoted to the diagnosis and treatment of the foot and ankle.', 'tagline' => 'Expert Foot and Lower Limb Care', 'price' => 'From £70 (30 min), £130 (full assessment)', 'duration' => '30-60 minutes'],
            ['title' => 'Alexander Technique', 'content' => 'The Alexander Technique is a practical method for improving posture, movement, and overall body awareness.', 'tagline' => 'Improve Posture, Movement, and Body Awareness', 'price' => '£60/lesson (£65 first)', 'duration' => '45-60 minutes'],
        ];
        
        $services_created = 0;
        foreach ($services as $s) {
            $existing = get_page_by_path(sanitize_title($s['title']), OBJECT, 'service');
            if (!$existing) {
                $id = wp_insert_post([
                    'post_title' => $s['title'],
                    'post_content' => $s['content'],
                    'post_status' => 'publish',
                    'post_type' => 'service',
                ]);
                if ($id) {
                    update_post_meta($id, 'service_tagline', $s['tagline']);
                    update_post_meta($id, 'price_range', $s['price']);
                    update_post_meta($id, 'duration', $s['duration']);
                    $services_created++;
                    echo "✓ Created service: {$s['title']}\n";
                }
            } else {
                echo "- Service already exists: {$s['title']}\n";
            }
        }
        
        // Import Team Members
        $team = [
            ['name' => 'Dr Linda Bolton', 'position' => 'CHARTERED CLINICAL PSYCHOLOGIST', 'credentials' => 'BSC(ECON), MSC, PGCE, D.CLIN.PSY, CPSYCHOL', 'price' => 'From £100', 'email' => 'mlbolton@btinternet.com', 'phone' => '07881857891', 'bio' => 'I am a highly experienced Chartered Clinical Psychologist and therapist with over 30 years of experience.'],
            ['name' => 'Dr Sharon Winward', 'position' => 'Clinical Psychologist', 'credentials' => 'HCPC Registered', 'price' => 'Contact for pricing', 'email' => '', 'phone' => '', 'bio' => 'I am a Consultant Clinical Psychologist, registered with Health and Care Professions Council, with over 30 years of experience.'],
            ['name' => 'Chris Piercy', 'position' => 'HYPNOTHERAPIST & LIFE COACH', 'credentials' => 'BSC, DIPHYP, GHQP', 'price' => 'From £55', 'email' => 'chris@gystcoaching.co.uk', 'phone' => '07894792797', 'bio' => 'I have been helping people overcome their issues since I qualified in 2014.'],
            ['name' => 'Michael Sinclair', 'position' => 'PSYCHOTHERAPEUTIC COUNSELLOR', 'credentials' => 'BSc (Hons) Psychology, Advanced Diploma Integrative Counselling', 'price' => 'Free initial consultation, £60-£120/hour', 'email' => 'michael@michaelsinclair.co.uk', 'phone' => '07783040862', 'bio' => 'An accredited psycho-therapeutic counsellor I would like to help you on your journey towards healing and growth.'],
            ['name' => 'Antoinette Keogh', 'position' => 'COUNSELLOR & LIFE COACH', 'credentials' => 'Counselling in Education MSc, Diploma in Therapeutic Counselling CPCAB', 'price' => '£60 per session', 'email' => 'antoinettecounselling@gmail.com', 'phone' => '07428790996', 'bio' => 'I have over 25 years of experience, working in education; involved in training, mentoring and supporting individuals and groups.'],
            ['name' => 'Marcel Wadman', 'position' => 'PODIATRIST', 'credentials' => 'BSc Hons, Pod, srch, mchs', 'price' => 'From £70 (30 min), £130 (full assessment)', 'email' => 'footworksbiomech@aol.com', 'phone' => '01935 872588 / 07834548946', 'bio' => 'Marcel is a highly experienced Dorset Podiatrist with considerable knowledge in delivering Podiatric care.'],
            ['name' => 'Chrissy Fraser', 'position' => 'ALEXANDER TECHNIQUE', 'credentials' => 'Retired Member of the Royal College of Occupational Therapist (RCOT)', 'price' => '£60/lesson (£65 first)', 'email' => 'Happydolphin@freeuk.com', 'phone' => '07986387448', 'bio' => 'Retired Member of the Royal College of Occupational Therapist (RCOT) and experienced Alexander Technique Teacher.'],
            ['name' => 'Roberta Winmill', 'position' => 'REFLEXOLOGIST', 'credentials' => 'Qualified Reflexologist', 'price' => '£45 per hour', 'email' => 'robertawinmill@hotmail.co.uk', 'phone' => '07531 752584', 'bio' => 'I have been practicing Holistic massage and reflexology for 20 years and have worked at The Rooms for many years.'],
        ];
        
        $team_created = 0;
        foreach ($team as $t) {
            $existing = get_page_by_path(sanitize_title($t['name']), OBJECT, 'team');
            if (!$existing) {
                $id = wp_insert_post([
                    'post_title' => $t['name'],
                    'post_content' => $t['bio'],
                    'post_status' => 'publish',
                    'post_type' => 'team',
                ]);
                if ($id) {
                    update_post_meta($id, 'position', $t['position']);
                    update_post_meta($id, 'credentials', $t['credentials']);
                    update_post_meta($id, 'starting_price', $t['price']);
                    if ($t['email']) update_post_meta($id, 'email', $t['email']);
                    if ($t['phone']) update_post_meta($id, 'phone', $t['phone']);
                    $team_created++;
                    echo "✓ Created team member: {$t['name']}\n";
                }
            } else {
                echo "- Team member already exists: {$t['name']}\n";
            }
        }
        
        echo "\n✅ Import complete!\n";
        echo "Created: $services_created services and $team_created team members.\n";
        
        $import_output = '<pre style="background: #f5f5f5; padding: 15px; border-radius: 5px; overflow-x: auto;">' . esc_html(ob_get_clean()) . '</pre>';
        $import_done = true;
        
        // Also flush rewrite rules
        flush_rewrite_rules();
    } elseif (isset($_POST['tr_import'])) {
        $error_message = 'Security check failed. Please try again.';
    }
    ?>
    <div class="wrap">
        <h1>🚀 Import All Content - The Rooms Poundbury</h1>
        
        <?php if ($import_done): ?>
            <div class="notice notice-success is-dismissible" style="padding: 15px; margin: 20px 0;">
                <p style="font-size: 16px;"><strong>✅ Import completed successfully!</strong></p>
                <p>Refresh your frontend at <a href="http://localhost:3000" target="_blank">http://localhost:3000</a> to see all the content.</p>
            </div>
            <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #28a745;">
                <h3>Import Results:</h3>
                <?php echo $import_output; ?>
            </div>
            <p>
                <a href="<?php echo admin_url('edit.php?post_type=service'); ?>" class="button">View Services</a>
                <a href="<?php echo admin_url('edit.php?post_type=team'); ?>" class="button">View Team Members</a>
                <a href="http://localhost:3000" target="_blank" class="button button-primary">View Frontend</a>
            </p>
        <?php else: ?>
            <div class="card" style="max-width: 800px;">
                <h2>What will be imported:</h2>
                <ul>
                    <li><strong>8 Services:</strong> Reflexology, Psychological Services, Psychotherapy, Counselling, Hypnotherapy, Life Coaching, Podiatry, Alexander Technique</li>
                    <li><strong>13 Team Members:</strong> All therapists from your design plan with full details, credentials, and contact information</li>
                </ul>
                
                <div class="notice notice-info">
                    <p><strong>ℹ️ Note:</strong> This will skip items that already exist, so it's safe to run multiple times.</p>
                </div>
                
                <form method="post" style="margin-top: 20px;">
                    <?php wp_nonce_field('tr_import_action'); ?>
                    <p>
                        <button type="submit" name="tr_import" value="1" class="button button-primary button-large" style="font-size: 16px; padding: 10px 20px; height: auto;">
                            🚀 Start Import
                        </button>
                    </p>
                    <p class="description">This may take 30-60 seconds. Please don't close this page during import.</p>
                </form>
            </div>
        <?php endif; ?>
    </div>
    <?php
}
