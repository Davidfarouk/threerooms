import { getPageBySlug, getAboutSettings, getGalleryItems } from '@/lib/wordpress';
import AnimatedSection from '@/components/AnimatedSection';
import TextReveal from '@/components/TextReveal';
import Image from 'next/image';
import AboutPageClient from './AboutPageClient';

export default async function AboutPage() {
    const page = await getPageBySlug('about-us');
    const aboutSettings = await getAboutSettings();
    const galleryCategory = aboutSettings?.gallery_category || 'our-space';
    const galleryItems = await getGalleryItems(galleryCategory);
    // Ensure heroImage is never null/undefined
    const heroImage = (aboutSettings?.hero_image && aboutSettings.hero_image.trim() !== '') 
        ? aboutSettings.hero_image 
        : '/resources/Page - Rent a therapy room_ maybe text in front on photo_.jpg';

    return (
        <div className="min-h-screen bg-brand-50">
            {/* Hero Section */}
            <AnimatedSection className="bg-brand-800 text-white pt-28 md:pt-32 pb-20 relative overflow-hidden">
                <div className="absolute inset-0 opacity-30">
                    <Image
                        src={heroImage}
                        alt="Therapy room background"
                        fill
                        sizes="100vw"
                        quality={90}
                        priority
                        className="object-cover"
                        style={{ objectPosition: '50% 25%' }}
                    />
                </div>
                <div className="absolute inset-0 bg-gradient-to-b from-brand-900/80 via-brand-900/70 to-brand-900/90 z-0"></div>
                <div className="container mx-auto px-6 text-center relative z-10">
                    <TextReveal
                        className="text-5xl md:text-6xl font-serif font-medium mb-6 text-white drop-shadow-2xl justify-center"
                    >
                        About Us
                    </TextReveal>
                    <p className="text-xl md:text-2xl lg:text-3xl text-white max-w-3xl mx-auto drop-shadow-md leading-relaxed">
                        A calm and welcoming therapeutic space in the heart of Poundbury
                    </p>
                </div>
            </AnimatedSection>

            <AboutPageClient galleryCategory={galleryCategory} galleryItems={galleryItems} />
        </div>
    );
}
