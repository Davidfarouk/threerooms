/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['localhost'], // Add your WordPress domain here
    },
    env: {
        NEXT_PUBLIC_WORDPRESS_API_URL: process.env.NEXT_PUBLIC_WORDPRESS_API_URL || 'http://localhost:8080/wp-json/wp/v2',
    },
}

module.exports = nextConfig
