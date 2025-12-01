import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollProgress from '@/components/ScrollProgress';

export const metadata: Metadata = {
    title: {
        default: 'The Rooms Poundbury - Complementary Health Clinic',
        template: '%s | The Rooms Poundbury',
    },
    description: 'Experience holistic wellness and therapeutic treatments in the heart of Poundbury, Dorchester. Find qualified therapists for counselling, hypnotherapy, podiatry, reflexology, and more.',
    keywords: ['wellness', 'therapy', 'counselling', 'hypnotherapy', 'podiatry', 'reflexology', 'Alexander Technique', 'Poundbury', 'Dorchester', 'Dorset', 'complementary health', 'therapy clinic'],
    authors: [{ name: 'The Rooms Poundbury' }],
    creator: 'The Rooms Poundbury',
    publisher: 'The Rooms Poundbury',
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://www.theroomspoundbury.co.uk'),
    alternates: {
        canonical: '/',
    },
    openGraph: {
        type: 'website',
        locale: 'en_GB',
        url: 'https://www.theroomspoundbury.co.uk',
        siteName: 'The Rooms Poundbury',
        title: 'The Rooms Poundbury - Complementary Health Clinic',
        description: 'Experience holistic wellness and therapeutic treatments in the heart of Poundbury, Dorchester.',
        images: [
            {
                url: '/resources/Logos/Header.png',
                width: 1200,
                height: 630,
                alt: 'The Rooms Poundbury',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'The Rooms Poundbury - Complementary Health Clinic',
        description: 'Experience holistic wellness and therapeutic treatments in the heart of Poundbury, Dorchester.',
        images: ['/resources/Logos/Header.png'],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    verification: {
        // Add when you have Google Search Console verification code
        // google: 'your-verification-code',
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <head>
                {/* Google Analytics 4 */}
                {process.env.NEXT_PUBLIC_GA_ID && (
                    <>
                        <script
                            async
                            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
                        />
                        <script
                            dangerouslySetInnerHTML={{
                                __html: `
                                    window.dataLayer = window.dataLayer || [];
                                    function gtag(){dataLayer.push(arguments);}
                                    gtag('js', new Date());
                                    gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                                        page_path: window.location.pathname,
                                    });
                                `,
                            }}
                        />
                    </>
                )}

                {/* LocalBusiness Schema */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "LocalBusiness",
                            "name": "The Rooms Poundbury",
                            "image": "https://www.theroomspoundbury.co.uk/resources/Logos/Header.png",
                            "@id": "https://www.theroomspoundbury.co.uk",
                            "url": "https://www.theroomspoundbury.co.uk",
                            "email": "info@theroomspoundbury.co.uk",
                            "priceRange": "$$",
                            "address": {
                                "@type": "PostalAddress",
                                "streetAddress": "1 Ringhill Street",
                                "addressLocality": "Poundbury",
                                "addressRegion": "Dorset",
                                "postalCode": "DT1 3TL",
                                "addressCountry": "GB"
                            },
                            "geo": {
                                "@type": "GeoCoordinates",
                                "latitude": 50.7150,
                                "longitude": -2.4414
                            },
                            "openingHoursSpecification": [
                                {
                                    "@type": "OpeningHoursSpecification",
                                    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                                    "opens": "09:00",
                                    "closes": "18:00"
                                }
                            ],
                            "sameAs": [
                                "https://www.facebook.com/theroomspoundbury/",
                                "https://www.instagram.com/theroomspoundbury"
                            ],
                            "description": "A calm and welcoming therapeutic space in the heart of Poundbury, Dorchester. Offering counselling, hypnotherapy, podiatry, reflexology, and Alexander Technique services."
                        })
                    }}
                />

                {/* Fonts */}
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Playfair+Display:wght@400;600;700&display=swap"
                    rel="stylesheet"
                />
            </head>
            <body className="antialiased">
                <ScrollProgress />
                <Header />
                <main className="pt-28 md:pt-32">
                    {children}
                </main>
                <Footer />
            </body>
        </html>
    );
}
