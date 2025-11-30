/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '8080',
                pathname: '/wp-content/uploads/**',
            },
            {
                protocol: 'https',
                hostname: '**',
                pathname: '/wp-content/uploads/**',
            },
        ],
        // Modern image formats for better performance
        formats: ['image/avif', 'image/webp'],
        // Device sizes for responsive images
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        // Image sizes for different use cases
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
        // Cache optimization (longer cache for dev)
        minimumCacheTTL: 300, // 5 minutes for dev (was 60s)
        // Image quality (1-100, default 75)
        dangerouslyAllowSVG: true,
        contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    },
    env: {
        NEXT_PUBLIC_WORDPRESS_API_URL: process.env.NEXT_PUBLIC_WORDPRESS_API_URL || 'http://localhost:8080/wp-json/wp/v2',
    },
    // Development optimizations
    ...(process.env.NODE_ENV === 'development' && {
        // Faster refresh in dev mode
        onDemandEntries: {
            maxInactiveAge: 60 * 1000, // Keep pages in memory for 1 minute
            pagesBufferLength: 5, // Keep 5 pages in memory
        },
    }),
}

module.exports = nextConfig
