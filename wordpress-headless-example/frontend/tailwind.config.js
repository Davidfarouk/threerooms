/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#2C3E50',  // Dark Grey (from brand - logo/text)
                    light: '#34495E',    // Medium Dark Grey
                    dark: '#1A252F',     // Very Dark Grey
                },
                secondary: {
                    DEFAULT: '#6B7280',  // Medium Grey (from brand - backgrounds)
                    light: '#9CA3AF',    // Light Grey (from brand - accents)
                },
                accent: '#9CA3AF',       // Light Grey
                brand: {
                    50: '#FAF9F6',       // Off White / Cream
                    100: '#F5F0EB',      // Light Beige
                    200: '#E8DFD8',      // Beige
                    300: '#DBCFC6',      // Warm Beige
                    400: '#C2B0A3',      // Light Brown
                    500: '#A69080',      // Medium Brown
                    600: '#8C7365',      // Warm Earth
                    700: '#6D5448',      // Deep Warm Brown
                    800: '#4F3B32',      // Dark Brown (Text readable)
                    900: '#36261F',      // Darkest Brown
                },
                brown: {
                    50: '#FBF7F4',       // Lightest Cream
                    100: '#F3EBE6',      // Cream
                    200: '#E6D6CD',      // Light Almond
                    300: '#D4Beb1',      // Almond
                    400: '#BFA093',      // Light Cocoa
                    500: '#A68374',      // Cocoa
                    600: '#8C6658',      // Warm Cocoa
                    700: '#704C40',      // Deep Cocoa
                    800: '#52342A',      // Dark Cocoa
                    900: '#38221B',      // Darkest Cocoa
                },
                success: '#10B981',      // Green
            },
            fontFamily: {
                sans: ['Outfit', 'sans-serif'],
                serif: ['Playfair Display', 'serif'],
            },
            boxShadow: {
                'premium': '0 8px 32px rgba(45, 95, 93, 0.16)',
            },
        },
    },
    plugins: [],
}
