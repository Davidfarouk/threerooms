'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import AnimatedSection from '@/components/AnimatedSection';
import AnimatedCard from '@/components/AnimatedCard';
import StaggerContainer from '@/components/StaggerContainer';
import AnimatedButton from '@/components/AnimatedButton';
import FloatingElement from '@/components/FloatingElement';
import TiltCard from '@/components/TiltCard';
import TextReveal from '@/components/TextReveal';
import { fadeInUp, staggerContainer as stagger } from '@/lib/animations';

interface ClientHomeProps {
    therapies?: any[];
    therapists?: any[];
    homepageSettings?: {
        hero_image?: string | null;
        hero_title?: string;
        hero_subtitle?: string;
        cta_text?: string;
        cta_link?: string;
        cta_secondary_text?: string;
        cta_secondary_link?: string;
    };
    accreditationLogos?: Array<{
        id: number;
        title: string;
        featured_image_url: string | null;
        logo_url: string | null;
        alt_text: string;
    }>;
}

export default function ClientHome({ therapies, therapists, homepageSettings, accreditationLogos }: ClientHomeProps) {
    // Use settings or fallback to defaults - ensure it's never null/undefined
    const heroImage = (homepageSettings?.hero_image && homepageSettings.hero_image.trim() !== '')
        ? homepageSettings.hero_image
        : '/resources/The Rooms waiting room sofa & desk.jpg';
    const heroTitle = homepageSettings?.hero_title || 'THE ROOMS POUNDBURY';
    const heroSubtitle = homepageSettings?.hero_subtitle || 'A calm and welcoming therapeutic space in the heart of Poundbury. Find a therapist or rent a room for your practice.';
    const ctaText = homepageSettings?.cta_text || 'Find a Therapist';
    const ctaLink = homepageSettings?.cta_link || '/meet-the-team';
    const ctaSecondaryText = homepageSettings?.cta_secondary_text || 'Rent a Room';
    const ctaSecondaryLink = homepageSettings?.cta_secondary_link || '/hire-therapy-room-dorchester';

    // Use logos from WordPress or fallback to hardcoded
    const logos = accreditationLogos && accreditationLogos.length > 0
        ? accreditationLogos
        : [
            { id: 1, title: 'BACP', featured_image_url: '/resources/Logos/bacp-logo.jpg', logo_url: null, alt_text: 'BACP - British Association for Counselling and Psychotherapy' },
            { id: 2, title: 'HCPC', featured_image_url: '/resources/Logos/hcpc-logo.jpg', logo_url: null, alt_text: 'HCPC - Health and Care Professions Council' },
            { id: 3, title: 'CNHC', featured_image_url: '/resources/Logos/CNHC.jpg', logo_url: null, alt_text: 'CNHC - Complementary and Natural Healthcare Council' },
            { id: 4, title: 'British Psychological Society', featured_image_url: '/resources/Logos/British-Psychological-Society.png', logo_url: null, alt_text: 'British Psychological Society' },
            { id: 5, title: 'Alexander Technique Association', featured_image_url: '/resources/Logos/Alexander Technique Association.webp', logo_url: null, alt_text: 'Alexander Technique Association' },
            { id: 6, title: 'BACP Coaching', featured_image_url: '/resources/Logos/BACP Coaching.jpg', logo_url: null, alt_text: 'BACP Coaching' },
            { id: 7, title: 'Hypnotherapy', featured_image_url: '/resources/Logos/Hypnotherapy.png', logo_url: null, alt_text: 'Hypnotherapy Accreditation' },
            { id: 8, title: 'Reflexology', featured_image_url: '/resources/Logos/reflexology.jpg', logo_url: null, alt_text: 'Reflexology Accreditation' },
        ];
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 1000], [0, 400]);

    return (
        <main className="min-h-screen bg-brand-50 text-stone-800 font-sans selection:bg-brand-200 selection:text-stone-900 -mt-28 md:-mt-32">
            {/* Hero Section */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-b from-brand-900/80 via-brand-900/70 to-brand-900/90 z-10" />
                    <motion.div
                        className="relative w-full h-full"
                        initial={{ scale: 1.1 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 1.5, ease: 'easeOut' }}
                        style={{ y }}
                    >
                        <Image
                            src={heroImage}
                            alt="Calm therapy room at The Rooms Poundbury"
                            fill
                            sizes="100vw"
                            quality={90}
                            priority
                            className="object-cover"
                            placeholder="blur"
                            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                        />
                    </motion.div>
                </div>

                <div className="relative z-20 container mx-auto px-6 text-center text-white max-w-4xl">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={stagger}
                    >
                        <TextReveal
                            className="text-5xl md:text-7xl font-serif font-bold mb-6 leading-tight drop-shadow-2xl text-white justify-center"
                            highlightWords={[]}
                            highlightClassName=""
                        >
                            THE ROOMS POUNDBURY
                        </TextReveal>
                        <motion.p
                            variants={fadeInUp}
                            className="text-xl md:text-2xl lg:text-3xl text-white mb-12 font-light max-w-3xl mx-auto drop-shadow-lg leading-relaxed"
                        >
                            {heroSubtitle}
                        </motion.p>
                        <motion.div
                            variants={fadeInUp}
                            className="flex flex-col sm:flex-row gap-4 justify-center"
                        >
                            <AnimatedButton href={ctaLink} variant="primary" size="lg">
                                {ctaText}
                            </AnimatedButton>
                            <AnimatedButton href={ctaSecondaryLink} variant="secondary" size="lg" className="bg-white/20 backdrop-blur-md border-2 border-white/40 text-white hover:bg-white/30 hover:border-white/60">
                                {ctaSecondaryText}
                            </AnimatedButton>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Scroll Indicator */}
                <FloatingElement className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.5, duration: 0.8, ease: 'easeOut' }}
                        whileHover={{ scale: 1.1 }}
                        className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center p-1 cursor-pointer backdrop-blur-sm bg-white/10"
                    >
                        <motion.div
                            animate={{ y: [0, 12, 0] }}
                            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                            className="w-1.5 h-1.5 bg-white rounded-full"
                        />
                    </motion.div>
                </FloatingElement>
            </section>

            {/* Accreditation/Trust Section */}
            <AnimatedSection className="py-24 md:py-32 px-6 bg-white border-b border-stone-100">
                <div className="container mx-auto max-w-6xl">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-100px' }}
                        transition={{ 
                            duration: 0.8,
                            ease: [0.16, 1, 0.3, 1]
                        }}
                        className="text-center mb-16"
                    >
                        <motion.h2 
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-3xl md:text-4xl lg:text-5xl font-serif font-medium text-brand-900 mb-6 relative inline-block"
                        >
                            Trusted & Accredited
                            <motion.span 
                                initial={{ width: 0 }}
                                whileInView={{ width: '100%' }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
                                className="absolute bottom-0 left-0 h-0.5 bg-orange-500"
                            ></motion.span>
                        </motion.h2>
                        <motion.p 
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="text-brand-600 text-base md:text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed"
                        >
                            Our practitioners are registered with leading professional bodies, ensuring the highest standards of care
                        </motion.p>
                    </motion.div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-8 gap-8 items-center justify-items-center">
                        {logos.map((logo, index) => {
                            const imageUrl = logo.logo_url || logo.featured_image_url;
                            if (!imageUrl) return null;

                            return (
                                <motion.div
                                    key={logo.id}
                                    initial={{ opacity: 0, scale: 0.85, y: 20 }}
                                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                    viewport={{ once: true, margin: '-50px' }}
                                    transition={{ 
                                        duration: 0.5, 
                                        delay: index * 0.08,
                                        ease: [0.16, 1, 0.3, 1]
                                    }}
                                    whileHover={{ 
                                        scale: 1.05, 
                                        y: -5,
                                        transition: { duration: 0.3 }
                                    }}
                                    className="flex items-center justify-center p-6 bg-white rounded-xl hover:bg-stone-50 transition-all duration-300 w-full shadow-md hover:shadow-xl border border-stone-200 hover:border-orange-200 cursor-pointer"
                                >
                                    <Image
                                        src={imageUrl}
                                        alt={logo.alt_text}
                                        width={200}
                                        height={100}
                                        sizes="(max-width: 768px) 50vw, (max-width: 1280px) 12.5vw, 10vw"
                                        quality={85}
                                        className="h-20 md:h-24 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity"
                                    />
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </AnimatedSection>

            {/* Latest Reviews Section */}
            <AnimatedSection className="py-24 md:py-32 px-6 bg-brand-50">
                <div className="container mx-auto max-w-6xl">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-100px' }}
                        transition={{ 
                            duration: 0.8,
                            ease: [0.16, 1, 0.3, 1]
                        }}
                        className="text-center mb-16"
                    >
                        <motion.h2 
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium text-brand-900 mb-6 relative inline-block"
                        >
                            Latest Reviews
                            <motion.span 
                                initial={{ width: 0 }}
                                whileInView={{ width: '100%' }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
                                className="absolute bottom-0 left-0 h-0.5 bg-orange-500"
                            ></motion.span>
                        </motion.h2>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Review 1 */}
                        <motion.div
                            initial={{ opacity: 0, y: 30, scale: 0.95 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            viewport={{ once: true, margin: '-50px' }}
                            transition={{ 
                                duration: 0.6, 
                                delay: 0.1,
                                ease: [0.16, 1, 0.3, 1]
                            }}
                            whileHover={{ 
                                y: -8,
                                transition: { duration: 0.3 }
                            }}
                            className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-all duration-300 border border-stone-100 hover:border-orange-200"
                        >
                            <div className="flex items-start justify-between mb-6 pb-4 border-b border-stone-100">
                                <div className="flex items-center space-x-4">
                                    <div className="w-14 h-14 bg-gradient-to-br from-teal-500 to-teal-600 rounded-full flex items-center justify-center text-white font-semibold text-xl shadow-md">
                                        S
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-stone-900 text-lg md:text-xl mb-1">stephanie Barton</h4>
                                        <p className="text-sm md:text-base text-stone-500">2025-04-08</p>
                                    </div>
                                </div>
                                <img
                                    src="https://www.google.com/images/branding/googleg/1x/googleg_standard_color_128dp.png"
                                    alt="Google"
                                    className="w-5 h-5"
                                />
                            </div>
                            <div className="flex items-center gap-2 mb-4">
                                <div className="flex">
                                    {[...Array(5)].map((_, i) => (
                                        <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                        </svg>
                                    ))}
                                </div>
                                <div className="w-5 h-5 bg-blue-500 rounded flex items-center justify-center">
                                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            </div>
                            <p className="text-stone-700 mb-6 line-clamp-4 text-base md:text-lg leading-relaxed">
                                I went to the rooms for Hypnotherapy to help with my anxiety related to health and bodily sensations. I struggled for years w...
                            </p>
                            <Link href="#" className="text-orange-500 hover:text-orange-600 text-base md:text-lg font-medium transition-colors">
                                Read more
                            </Link>
                        </motion.div>

                        {/* Review 2 */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-all duration-300 border border-stone-100 hover:border-orange-200"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-teal-700 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                                        L
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-stone-900">Lucy Cunningham</h4>
                                        <p className="text-sm text-stone-500">2025-03-16</p>
                                    </div>
                                </div>
                                <img
                                    src="https://www.google.com/images/branding/googleg/1x/googleg_standard_color_128dp.png"
                                    alt="Google"
                                    className="w-5 h-5"
                                />
                            </div>
                            <div className="flex items-center gap-2 mb-4">
                                <div className="flex">
                                    {[...Array(5)].map((_, i) => (
                                        <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                        </svg>
                                    ))}
                                </div>
                                <div className="w-5 h-5 bg-blue-500 rounded flex items-center justify-center">
                                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            </div>
                            <p className="text-stone-700 mb-4 line-clamp-4">
                                Visited the Rooms and one of their therapists on recommendation of a friend. Can only say the experience I had was one of the best in all my...
                            </p>
                            <Link href="#" className="text-orange-500 hover:text-orange-600 text-sm transition-colors">
                                Read more
                            </Link>
                        </motion.div>

                        {/* Review 3 */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-all duration-300 border border-stone-100 hover:border-orange-200"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                                        P
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-stone-900">Penny Suarez</h4>
                                        <p className="text-sm text-stone-500">2024-04-04</p>
                                    </div>
                                </div>
                                <img
                                    src="https://www.google.com/images/branding/googleg/1x/googleg_standard_color_128dp.png"
                                    alt="Google"
                                    className="w-5 h-5"
                                />
                            </div>
                            <div className="flex items-center gap-2 mb-4">
                                <div className="flex">
                                    {[...Array(5)].map((_, i) => (
                                        <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                        </svg>
                                    ))}
                                </div>
                                <div className="w-5 h-5 bg-blue-500 rounded flex items-center justify-center">
                                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            </div>
                            <p className="text-stone-700 mb-4 line-clamp-4">
                                The Rooms has a pleasant and relaxing atmosphere within and easy free parking nearby. I needed to see a podiatrist and chose Marcel...
                            </p>
                            <Link href="#" className="text-orange-500 hover:text-orange-600 text-sm transition-colors">
                                Read more
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </AnimatedSection>

            {/* CTA Section */}
            <AnimatedSection className="py-28 md:py-36 px-6 bg-gradient-to-br from-white via-brand-50 to-white relative overflow-hidden">
                <motion.div
                    className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-br from-orange-100/40 to-brown-100/30 skew-x-12 transform translate-x-20"
                    animate={{
                        x: [0, 20, 0],
                        opacity: [0.3, 0.5, 0.3]
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: 'easeInOut'
                    }}
                />
                <div className="container mx-auto max-w-4xl text-center relative z-10">
                    <motion.h2
                        initial={{ opacity: 0, y: 40, scale: 0.95 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        viewport={{ once: true, margin: '-100px' }}
                        transition={{ 
                            duration: 0.8,
                            ease: [0.16, 1, 0.3, 1]
                        }}
                        className="text-4xl md:text-5xl lg:text-6xl font-serif mb-8 text-brand-900 relative inline-block"
                    >
                        Ready to start your journey?
                        <motion.span 
                            initial={{ width: 0 }}
                            whileInView={{ width: '100%' }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
                            className="absolute bottom-0 left-0 h-0.5 bg-orange-500"
                        ></motion.span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ 
                            duration: 0.7, 
                            delay: 0.2,
                            ease: [0.16, 1, 0.3, 1]
                        }}
                        className="text-xl md:text-2xl text-brand-600 mb-12 font-light leading-relaxed max-w-2xl mx-auto"
                    >
                        Whether you're seeking support or looking to establish your practice, we're here to help.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ 
                            duration: 0.7, 
                            delay: 0.3,
                            ease: [0.16, 1, 0.3, 1]
                        }}
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                    >
                        <AnimatedButton href="/contact-us" variant="primary" size="lg">
                            Get in Touch
                        </AnimatedButton>
                        <AnimatedButton href="/about-us" variant="outline" size="lg">
                            Learn More
                        </AnimatedButton>
                    </motion.div>
                </div>
            </AnimatedSection>
        </main>
    );
}
