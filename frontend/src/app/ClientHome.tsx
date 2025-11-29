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
}

export default function ClientHome({ therapies, therapists }: ClientHomeProps) {
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 1000], [0, 400]);

    return (
        <main className="min-h-screen bg-brand-50 text-stone-800 font-sans selection:bg-brand-200 selection:text-stone-900">
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
                            src="/resources/Room 1 Wideshot .jpg"
                            alt="Calm therapy room at The Rooms Poundbury"
                            fill
                            className="object-cover"
                            priority
                        />
                    </motion.div>
                </div>

                <div className="relative z-20 container mx-auto px-6 text-center text-white max-w-4xl">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={stagger}
                    >
                        <motion.span
                            variants={fadeInUp}
                            className="inline-block py-1 px-3 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-sm font-medium tracking-wider mb-6"
                        >
                            THE ROOMS POUNDBURY
                        </motion.span>
                        <TextReveal
                            className="text-4xl md:text-6xl font-serif font-medium mb-6 leading-tight drop-shadow-2xl text-white justify-center"
                            highlightWords={['Understanding']}
                            highlightClassName="italic"
                        >
                            We Heal By Listening And Understanding Your Pain.
                        </TextReveal>
                        <motion.p
                            variants={fadeInUp}
                            className="text-lg md:text-xl text-white mb-10 font-light max-w-2xl mx-auto drop-shadow-lg"
                        >
                            A calm and welcoming therapeutic space in the heart of Poundbury. Find a therapist or rent a room for your practice.
                        </motion.p>
                        <motion.div
                            variants={fadeInUp}
                            className="flex flex-col sm:flex-row gap-4 justify-center"
                        >
                            <AnimatedButton href="/therapies" variant="primary" size="lg">
                                Find a Therapist
                            </AnimatedButton>
                            <AnimatedButton href="/hire-therapy-room-dorchester" variant="secondary" size="lg" className="bg-white/20 backdrop-blur-md border-2 border-white/40 text-white hover:bg-white/30 hover:border-white/60">
                                Rent a Therapy Room
                            </AnimatedButton>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Scroll Indicator */}
                <FloatingElement className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1, duration: 1 }}
                        className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center p-1"
                    >
                        <motion.div
                            animate={{ y: [0, 12, 0] }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                            className="w-1 h-1 bg-white rounded-full"
                        />
                    </motion.div>
                </FloatingElement>
            </section>

            {/* Dual Purpose Section */}
            <AnimatedSection className="relative py-24 px-6 bg-brand-50 overflow-hidden">
                {/* Background Pattern - Soft Organic Blobs */}
                <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
                    <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-to-br from-brown-100 to-brand-200 rounded-full mix-blend-multiply filter blur-[80px] opacity-60 -translate-x-1/3 -translate-y-1/3" />
                    <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-to-tl from-brand-100 to-brown-200 rounded-full mix-blend-multiply filter blur-[80px] opacity-60 translate-x-1/3 translate-y-1/3" />
                </div>

                <div className="relative z-10 container mx-auto max-w-6xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* For Clients */}
                        <TiltCard className="bg-white/90 backdrop-blur-md rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all border border-brown-100 hover:border-brown-300">
                            <h2 className="text-3xl font-serif mb-4 text-brand-900">Looking for a Therapist?</h2>
                            <p className="text-brand-700 mb-6 font-medium">
                                Browse our team of qualified professionals offering counselling, psychotherapy, hypnotherapy, and more.
                                Find the right support for your journey to wellness.
                            </p>
                            <div className="flex flex-col gap-3">
                                <AnimatedButton href="/therapies" variant="primary" size="md" className="w-full">
                                    View All Services
                                </AnimatedButton>
                                <AnimatedButton href="/meet-the-team" variant="outline" size="md" className="w-full">
                                    Meet Our Team
                                </AnimatedButton>
                            </div>
                        </TiltCard>

                        {/* For Therapists */}
                        <TiltCard className="bg-white/90 backdrop-blur-md rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all border border-brown-100 hover:border-brown-300">
                            <h2 className="text-3xl font-serif mb-4 text-brand-900">Therapist Looking to Rent?</h2>
                            <p className="text-brand-700 mb-6 font-medium">
                                We offer soundproofed therapy rooms, flexible rental options, and a welcoming space in the heart of Poundbury.
                                Perfect for 1-1 sessions, workshops, or group supervision.
                            </p>
                            <div className="flex flex-col gap-3">
                                <AnimatedButton href="/hire-therapy-room-dorchester" variant="primary" size="md" className="w-full">
                                    View Room Options
                                </AnimatedButton>
                                <AnimatedButton href="/contact-us" variant="outline" size="md" className="w-full">
                                    Contact Us
                                </AnimatedButton>
                            </div>
                        </TiltCard>
                    </div>
                </div>
            </AnimatedSection>

            {/* CTA Section */}
            <AnimatedSection className="py-24 px-6 bg-brand-800 text-white relative overflow-hidden">
                <motion.div
                    className="absolute top-0 right-0 w-1/3 h-full bg-white/5 skew-x-12 transform translate-x-20"
                    animate={{
                        x: [0, 20, 0],
                        opacity: [0.05, 0.1, 0.05]
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: 'easeInOut'
                    }}
                />
                <div className="container mx-auto max-w-4xl text-center relative z-10">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-3xl md:text-4xl font-serif mb-6 text-white"
                    >
                        Ready to start your journey?
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-lg text-brand-100 mb-10 font-light"
                    >
                        Whether you're seeking support or looking to establish your practice, we're here to help.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                    >
                        <AnimatedButton href="/contact-us" variant="primary" size="lg" className="!bg-white !text-brand-800 hover:!bg-brand-50 border-2 border-white hover:border-brand-200 shadow-xl">
                            Get in Touch
                        </AnimatedButton>
                        <AnimatedButton href="/about-us" variant="outline" size="lg" className="bg-white/20 backdrop-blur-md border-2 border-white/40 text-white hover:bg-white/30 hover:border-white/60">
                            Learn More
                        </AnimatedButton>
                    </motion.div>
                </div>
            </AnimatedSection>
        </main>
    );
}
