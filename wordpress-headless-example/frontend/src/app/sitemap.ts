import { MetadataRoute } from 'next';
import { getCustomPosts, getPages, getPosts } from '@/lib/wordpress';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.theroomspoundbury.co.uk';
    
    // Static routes
    const staticRoutes: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: `${baseUrl}/about-us`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/therapies`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/meet-the-team`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/contact-us`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        {
            url: `${baseUrl}/hire-therapy-room-dorchester`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        {
            url: `${baseUrl}/blog`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.6,
        },
    ];

    try {
        // Get all pages from WordPress
        const pages = await getPages();
        const pageRoutes: MetadataRoute.Sitemap = pages
            .filter((page: any) => page.slug !== 'home')
            .map((page: any) => ({
                url: `${baseUrl}/${page.slug}`,
                lastModified: new Date(page.modified),
                changeFrequency: 'monthly' as const,
                priority: 0.7,
            }));

        // Get all services
        const services = await getCustomPosts('service');
        const serviceRoutes: MetadataRoute.Sitemap = services.map((service: any) => ({
            url: `${baseUrl}/service/${service.slug}`,
            lastModified: new Date(service.modified),
            changeFrequency: 'weekly' as const,
            priority: 0.7,
        }));

        // Get all team members
        const team = await getCustomPosts('team');
        const teamRoutes: MetadataRoute.Sitemap = team.map((member: any) => ({
            url: `${baseUrl}/team/${member.slug}`,
            lastModified: new Date(member.modified),
            changeFrequency: 'monthly' as const,
            priority: 0.6,
        }));

        // Get all blog posts
        const blogPosts = await getPosts();
        const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((post: any) => ({
            url: `${baseUrl}/blog/${post.slug}`,
            lastModified: new Date(post.modified),
            changeFrequency: 'weekly' as const,
            priority: 0.6,
        }));

        return [
            ...staticRoutes,
            ...pageRoutes,
            ...serviceRoutes,
            ...teamRoutes,
            ...blogRoutes,
        ];
    } catch (error) {
        console.error('Error generating sitemap:', error);
        // Return static routes even if WordPress fails
        return staticRoutes;
    }
}

