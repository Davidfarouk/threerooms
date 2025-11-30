// WordPress API Configuration
const WORDPRESS_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL || 'http://localhost:8080';

// Cache time: Longer in dev mode for better performance, shorter in production for freshness
const CACHE_TIME = process.env.NODE_ENV === 'development' ? 300 : 60; // 5 min dev, 1 min prod

/**
 * Fetch all pages from WordPress
 */
export async function getPages() {
    try {
        const response = await fetch(`${WORDPRESS_API_URL}/wp-json/wp/v2/pages`, {
            next: { revalidate: CACHE_TIME },
        });
        if (!response.ok) throw new Error('Failed to fetch pages');
        return await response.json();
    } catch (error) {
        console.error('Error fetching pages:', error);
        return [];
    }
}

/**
 * Fetch a single page by slug
 */
export async function getPageBySlug(slug: string) {
    try {
        const response = await fetch(`${WORDPRESS_API_URL}/wp-json/wp/v2/pages?slug=${slug}&_embed`, {
            next: { revalidate: CACHE_TIME },
        });
        if (!response.ok) return null;
        const pages = await response.json();
        return pages[0] || null;
    } catch (error) {
        console.error(`Error fetching page ${slug}:`, error);
        return null;
    }
}

/**
 * Fetch all posts (for blog/news)
 */
export async function getPosts() {
    try {
        const response = await fetch(`${WORDPRESS_API_URL}/wp-json/wp/v2/posts?_embed`, {
            next: { revalidate: CACHE_TIME },
        });
        if (!response.ok) throw new Error('Failed to fetch posts');
        const data = await response.json();
        return data.map((post: any) => ({
            ...post,
            featured_image_url: post._embedded?.['wp:featuredmedia']?.[0]?.source_url || null,
        }));
    } catch (error) {
        console.error('Error fetching posts:', error);
        return [];
    }
}

/**
 * Fetch custom post type (e.g., therapists, services)
 */
export async function getCustomPosts(postType: string) {
    try {
        // Request all items (per_page=100 should be enough, WordPress default is 10)
        const response = await fetch(`${WORDPRESS_API_URL}/wp-json/wp/v2/${postType}?per_page=100&_embed`, {
            next: { revalidate: CACHE_TIME },
        });
        
        // If endpoint doesn't exist (404), return empty array (plugin not activated)
        if (response.status === 404) {
            console.warn(`⚠️  WordPress endpoint /${postType} not found. Make sure the plugin is activated and permalinks are saved.`);
            return [];
        }
        
        if (!response.ok) {
            throw new Error(`Failed to fetch ${postType}: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        
        // Transform the data to include meta fields and featured image
        return data.map((post: any) => ({
            ...post,
            meta: {
                // Use meta from REST API response (from tr_add_meta_to_rest), fallback to ACF or direct field
                service_tagline: post.meta?.service_tagline || post.acf?.service_tagline || post['service_tagline'],
                price_range: post.meta?.price_range || post.acf?.price_range || post['price_range'],
                duration: post.meta?.duration || post.acf?.duration || post['duration'],
                therapeutic_approaches: post.meta?.therapeutic_approaches || post.acf?.therapeutic_approaches || post['therapeutic_approaches'],
                conditions_treated: post.meta?.conditions_treated || post.acf?.conditions_treated || post['conditions_treated'],
                services_offered: post.meta?.services_offered || post.acf?.services_offered || post['services_offered'],
                booking_information: post.meta?.booking_information || post.acf?.booking_information || post['booking_information'],
                accreditation_note: post.meta?.accreditation_note || post.acf?.accreditation_note || post['accreditation_note'],
                position: post.meta?.position || post.acf?.position || post['position'],
                credentials: post.meta?.credentials || post.acf?.credentials || post['credentials'],
                starting_price: post.meta?.starting_price || post.acf?.starting_price || post['starting_price'],
                email: post.meta?.email || post.acf?.email || post['email'],
                phone: post.meta?.phone || post.acf?.phone || post['phone'],
                website: post.meta?.website || post.acf?.website || post['website'],
                bio: post.meta?.bio || post.acf?.bio || post['bio'],
                specializations: post.meta?.specializations || post.acf?.specializations || post['specializations'],
                years_experience: post.meta?.years_experience || post.acf?.years_experience || post['years_experience'],
                type_of_therapy: post.meta?.type_of_therapy || post.acf?.type_of_therapy || post['type_of_therapy'],
                qualifications_list: post.meta?.qualifications_list || post.acf?.qualifications_list || post['qualifications_list'],
                registrations: post.meta?.registrations || post.acf?.registrations || post['registrations'],
                fees_structure: post.meta?.fees_structure || post.acf?.fees_structure || post['fees_structure'],
                treatment_approaches: post.meta?.treatment_approaches || post.acf?.treatment_approaches || post['treatment_approaches'],
                professional_memberships: post.meta?.professional_memberships || post.acf?.professional_memberships || post['professional_memberships'],
            },
            featured_image_url: post._embedded?.['wp:featuredmedia']?.[0]?.source_url || null,
        }));
    } catch (error) {
        // More helpful error message
        if (error instanceof Error) {
            console.error(`Error fetching ${postType}:`, error.message);
            console.error(`💡 Tip: Make sure "The Rooms Architecture" plugin is activated in WordPress Admin`);
        } else {
            console.error(`Error fetching ${postType}:`, error);
        }
        return [];
    }
}

/**
 * Fetch media/images
 */
export async function getMedia(mediaId: number) {
    try {
        const response = await fetch(`${WORDPRESS_API_URL}/media/${mediaId}`);
        if (!response.ok) throw new Error('Failed to fetch media');
        return await response.json();
    } catch (error) {
        console.error('Error fetching media:', error);
        return null;
    }
}

/**
 * Search WordPress content
 */
export async function searchContent(query: string) {
    try {
        const response = await fetch(`${WORDPRESS_API_URL}/search?search=${encodeURIComponent(query)}`);
        if (!response.ok) throw new Error('Failed to search');
        return await response.json();
    } catch (error) {
        console.error('Error searching:', error);
        return [];
    }
}

/**
 * Fetch accreditation logos
 */
export async function getAccreditationLogos() {
    try {
        const response = await fetch(`${WORDPRESS_API_URL}/wp-json/wp/v2/accreditation_logo?per_page=100&status=publish&_embed`, {
            next: { revalidate: CACHE_TIME },
        });
        if (!response.ok) {
            return [];
        }
        const posts = await response.json();
        return posts.map((post: any) => ({
            id: post.id,
            title: post.title.rendered,
            featured_image_url: post._embedded?.['wp:featuredmedia']?.[0]?.source_url || null,
            alt_text: post.meta?.logo_alt_text || post.title.rendered,
            logo_url: post.meta?.logo_url || null,
            menu_order: post.menu_order || 0,
        })).sort((a: any, b: any) => a.menu_order - b.menu_order);
    } catch (error) {
        console.error('Error fetching accreditation logos:', error);
        return [];
    }
}

/**
 * Fetch gallery items
 */
export async function getGalleryItems(category?: string) {
    try {
        let url = `${WORDPRESS_API_URL}/wp-json/wp/v2/gallery_item?per_page=100&status=publish&_embed`;
        const response = await fetch(url, {
            next: { revalidate: CACHE_TIME },
        });
        if (!response.ok) {
            return [];
        }
        const posts = await response.json();
        let items = posts.map((post: any) => ({
            id: post.id,
            title: post.title.rendered,
            content: post.content.rendered,
            featured_image_url: post._embedded?.['wp:featuredmedia']?.[0]?.source_url || null,
            caption: post.meta?.caption || post.title.rendered,
            category: post.meta?.gallery_category || 'general',
            menu_order: post.menu_order || 0,
        }));
        
        // Filter by category if provided
        if (category) {
            items = items.filter((item: any) => item.category === category);
        }
        
        return items.sort((a: any, b: any) => a.menu_order - b.menu_order);
    } catch (error) {
        console.error('Error fetching gallery items:', error);
        return [];
    }
}

/**
 * Fetch rental options
 */
export async function getRentalOptions() {
    try {
        const response = await fetch(`${WORDPRESS_API_URL}/wp-json/wp/v2/rental_option?per_page=100&status=publish&_embed`, {
            next: { revalidate: CACHE_TIME },
        });
        if (!response.ok) {
            return [];
        }
        const posts = await response.json();
        return posts.map((post: any) => ({
            id: post.id,
            title: post.title.rendered,
            description: post.content.rendered,
            featured_image_url: post._embedded?.['wp:featuredmedia']?.[0]?.source_url || null,
            image_url: post.meta?.image_url || null,
            icon: post.meta?.icon || '',
            menu_order: post.menu_order || 0,
        })).sort((a: any, b: any) => a.menu_order - b.menu_order);
    } catch (error) {
        console.error('Error fetching rental options:', error);
        return [];
    }
}

/**
 * Fetch homepage settings
 */
export async function getHomepageSettings() {
    try {
        const response = await fetch(`${WORDPRESS_API_URL}/wp-json/tr/v1/homepage-settings`, {
            next: { revalidate: CACHE_TIME },
        });
        if (!response.ok) {
            // Return defaults if API not available
            return {
                hero_image: '/resources/Room 1 Wideshot .jpg',
                hero_title: 'We Heal By Listening And Understanding Your Pain.',
                hero_subtitle: 'A calm and welcoming therapeutic space in the heart of Poundbury. Find a therapist or rent a room for your practice.',
                cta_text: 'Find a Therapist',
                cta_link: '/meet-the-team',
                cta_secondary_text: 'Rent a Room',
                cta_secondary_link: '/hire-therapy-room-dorchester',
            };
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching homepage settings:', error);
        // Return defaults on error
        return {
            hero_image: '/resources/Room 1 Wideshot .jpg',
            hero_title: 'We Heal By Listening And Understanding Your Pain.',
            hero_subtitle: 'A calm and welcoming therapeutic space in the heart of Poundbury. Find a therapist or rent a room for your practice.',
            cta_text: 'Find a Therapist',
            cta_link: '/meet-the-team',
            cta_secondary_text: 'Rent a Room',
            cta_secondary_link: '/hire-therapy-room-dorchester',
        };
    }
}

/**
 * Fetch about page settings
 */
export async function getAboutSettings() {
    try {
        const response = await fetch(`${WORDPRESS_API_URL}/wp-json/tr/v1/about-settings`, {
            next: { revalidate: CACHE_TIME },
        });
        if (!response.ok) {
            return {
                hero_image: '/resources/Page - Rent a therapy room_ maybe text in front on photo_.jpg',
                gallery_category: 'our-space',
            };
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching about settings:', error);
        return {
            hero_image: '/resources/Page - Rent a therapy room_ maybe text in front on photo_.jpg',
            gallery_category: 'our-space',
        };
    }
}
