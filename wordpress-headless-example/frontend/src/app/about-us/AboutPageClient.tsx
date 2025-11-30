'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import TextReveal from '@/components/TextReveal';
import AnimatedSection from '@/components/AnimatedSection';
import { fadeInUp, staggerContainer as stagger } from '@/lib/animations';

interface AboutPageClientProps {
    galleryCategory?: string;
    galleryItems?: Array<{
        id: number;
        title: string;
        featured_image_url: string | null;
        caption: string;
    }>;
}

export default function AboutPageClient({ galleryCategory = 'our-space', galleryItems = [] }: AboutPageClientProps) {
    // Fallback gallery items if none provided
    const defaultGallery = [
        { id: 1, title: 'Reception Desk', featured_image_url: '/resources/Reception Desk.jpg', caption: 'Reception Area' },
        { id: 2, title: 'Larger Therapy Room', featured_image_url: '/resources/Larger Therapy Room + Therapy Couch.jpg', caption: 'Therapy Room' },
        { id: 3, title: 'Waiting Room', featured_image_url: '/resources/The Rooms waiting room sofa & desk.jpg', caption: 'Waiting Room' },
        { id: 4, title: 'Back Room', featured_image_url: '/resources/Back room & Couch.jpg', caption: 'Therapy Room' },
        { id: 5, title: 'Smaller Therapy Room', featured_image_url: '/resources/Smaller Therapy Room.jpg', caption: 'Therapy Room' },
        { id: 6, title: 'Hanging Logo Sign', featured_image_url: '/resources/Hanging Logo Sign.JPG', caption: 'The Rooms Poundbury' },
    ];
    
    const displayGallery = galleryItems.length > 0 ? galleryItems : defaultGallery;
    return (
        <>
            {/* Our Story Section - with 2010 team photo */}
            <AnimatedSection className="py-20 px-6 bg-white">
                <div className="container mx-auto max-w-6xl">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={stagger}
                        className="grid md:grid-cols-2 gap-12 items-center"
                    >
                        <motion.div variants={fadeInUp}>
                            <TextReveal className="text-3xl md:text-4xl font-serif font-medium text-brand-900 mb-6">
                                Our Story
                            </TextReveal>
                            <div className="space-y-4 text-brand-700 leading-relaxed">
                                <p>
                                    The Rooms was established in 2009 by Judith and Paul Spurr. Judith, a practising psychotherapist,
                                    brought the vision of a calm and welcoming therapeutic space to life – a vision you can still feel
                                    today when you step through the door.
                                </p>
                                <p>
                                    In 2019, their daughter Lucie took over management of The Rooms. Though not a therapist herself,
                                    Lucie is proud to continue her mother's legacy and is your point of contact at the clinic. She is
                                    always happy to help guide you in the right direction when seeking support.
                                </p>
                            </div>
                        </motion.div>
                        <motion.div variants={fadeInUp} className="relative rounded-2xl overflow-hidden shadow-xl">
                            <Image
                                src="/resources/For Statement Page_ Caption _Original Team at The Rooms 2010_.jpg"
                                alt="Original team at The Rooms in 2010"
                                width={800}
                                height={600}
                                className="w-full h-auto object-cover"
                            />
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                                <p className="text-white text-sm font-medium">Original Team at The Rooms, 2010</p>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </AnimatedSection>

            {/* Founder's Vision Section - with Judith's photo */}
            <AnimatedSection className="py-20 px-6 bg-brand-50">
                <div className="container mx-auto max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-8"
                    >
                        <TextReveal className="text-3xl md:text-4xl font-serif font-medium text-brand-900 mb-3 justify-center">
                            A Vision Brought to Life
                        </TextReveal>
                        <p className="text-brand-600 text-sm md:text-base italic">
                            Judith Spurr, Founder
                        </p>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="relative rounded-xl overflow-hidden shadow-xl max-w-2xl mx-auto"
                    >
                        <Image
                            src="/resources/For Statement Page - Caption _Alexander Technique Demonstration with Judith Spurr and Ian Clements_.jpg"
                            alt="Judith Spurr demonstrating Alexander Technique"
                            width={800}
                            height={600}
                            className="w-full h-auto object-cover"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent p-6">
                            <p className="text-white text-sm md:text-base font-medium">
                                Alexander Technique Demonstration with Judith Spurr and Ian Clements
                            </p>
                        </div>
                    </motion.div>
                </div>
            </AnimatedSection>

            {/* Royal Visit Highlight */}
            <AnimatedSection className="py-20 px-6 bg-gradient-to-br from-brand-800 to-brand-900 text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <Image
                        src="/resources/Queen Mother_s Square.jpg"
                        alt="Poundbury"
                        fill
                        className="object-cover"
                    />
                </div>
                <div className="container mx-auto max-w-4xl relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <TextReveal className="text-3xl md:text-4xl font-serif font-medium mb-6 text-white justify-center">
                            A Royal Recognition
                        </TextReveal>
                        <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
                            Over the years, The Rooms has welcomed a diverse range of visitors. In 2014, we had the honour of
                            a royal visit from King Charles (then Prince Charles, Duke of Cornwall) during his trip to Poundbury.
                            His interest in complementary health made the visit especially meaningful.
                        </p>
                    </motion.div>
                </div>
            </AnimatedSection>

            {/* Our Space Gallery */}
            <AnimatedSection className="py-20 px-6 bg-white">
                <div className="container mx-auto max-w-6xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <TextReveal className="text-3xl md:text-4xl font-serif font-medium text-brand-900 mb-4 justify-center">
                            Our Space
                        </TextReveal>
                        <p className="text-brand-700 text-lg max-w-2xl mx-auto">
                            Step into our calm and welcoming therapeutic environment
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {displayGallery.map((item, index) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: (index + 1) * 0.1 }}
                                className="relative rounded-xl overflow-hidden shadow-lg group"
                            >
                                {(() => {
                                    const imageUrl = item.featured_image_url || '/resources/Reception Desk.jpg';
                                    if (!imageUrl || imageUrl.trim() === '') return null;
                                    return (
                                        <Image
                                            src={imageUrl}
                                            alt={item.caption || item.title}
                                            width={600}
                                            height={400}
                                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                            quality={85}
                                            className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                    );
                                })()}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="absolute bottom-0 left-0 right-0 p-4">
                                        <p className="text-white font-medium">{item.caption || item.title}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </AnimatedSection>

            {/* Feedback Section */}
            <AnimatedSection className="py-20 px-6 bg-brand-50">
                <div className="container mx-auto max-w-4xl text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <TextReveal className="text-3xl md:text-4xl font-serif font-medium text-brand-900 mb-6 justify-center">
                            Your Feedback Matters
                        </TextReveal>
                        <p className="text-lg text-brand-700 max-w-2xl mx-auto leading-relaxed">
                            We always appreciate hearing from those who have used our clinic. If you've visited The Rooms, please
                            consider leaving us a review on Google – it helps others find the support they need and helps us
                            continue to grow and improve.
                        </p>
                    </motion.div>
                </div>
            </AnimatedSection>
        </>
    );
}

