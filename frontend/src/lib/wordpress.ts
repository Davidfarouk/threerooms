// WordPress API Configuration
const WORDPRESS_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL || 'http://localhost:8080';

/**
 * Fetch all pages from WordPress
 */
export async function getPages() {
    try {
        const response = await fetch(`${WORDPRESS_API_URL}/wp-json/wp/v2/pages`, {
            next: { revalidate: 60 },
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
            next: { revalidate: 60 },
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
            next: { revalidate: 60 },
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
        const response = await fetch(`${WORDPRESS_API_URL}/wp-json/wp/v2/${postType}?_embed`, {
            next: { revalidate: 60 },
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
                position: post.meta?.position || post.acf?.position || post['position'],
                credentials: post.meta?.credentials || post.acf?.credentials || post['credentials'],
                starting_price: post.meta?.starting_price || post.acf?.starting_price || post['starting_price'],
                email: post.meta?.email || post.acf?.email || post['email'],
                phone: post.meta?.phone || post.acf?.phone || post['phone'],
                bio: post.meta?.bio || post.acf?.bio || post['bio'],
                specializations: post.meta?.specializations || post.acf?.specializations || post['specializations'],
                years_experience: post.meta?.years_experience || post.acf?.years_experience || post['years_experience'],
                services_offered: post.meta?.services_offered || post.acf?.services_offered || post['services_offered'] || [],
                case_summary: post.meta?.case_summary || post.acf?.case_summary || post['case_summary'],
                symptoms: post.meta?.symptoms || post.acf?.symptoms || post['symptoms'],
                therapies_used: post.meta?.therapies_used || post.acf?.therapies_used || post['therapies_used'],
                treatment_process: post.meta?.treatment_process || post.acf?.treatment_process || post['treatment_process'],
                results: post.meta?.results || post.acf?.results || post['results'],
                customer_review: post.meta?.customer_review || post.acf?.customer_review || post['customer_review'],
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
