'use client';

import { motion } from 'framer-motion';

interface SkeletonCardProps {
    className?: string;
    variant?: 'team' | 'service';
}

export default function SkeletonCard({ className = '', variant = 'team' }: SkeletonCardProps) {
    const pulseAnimation = {
        opacity: [0.5, 1, 0.5],
        transition: {
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut'
        }
    };

    if (variant === 'team') {
        return (
            <div className={`rounded-2xl bg-white shadow-sm overflow-hidden ${className}`}>
                <motion.div
                    animate={pulseAnimation}
                    className="aspect-[3/4] bg-stone-200"
                />
                <div className="p-6 space-y-3">
                    <motion.div
                        animate={pulseAnimation}
                        className="h-6 bg-stone-200 rounded w-3/4"
                    />
                    <motion.div
                        animate={pulseAnimation}
                        className="h-4 bg-stone-200 rounded w-1/2"
                    />
                </div>
            </div>
        );
    }

    // Service variant
    return (
        <div className={`rounded-2xl bg-white/90 p-8 shadow-sm border border-brown-100 ${className}`}>
            <motion.div
                animate={pulseAnimation}
                className="w-14 h-14 bg-stone-200 rounded-xl mb-6"
            />
            <motion.div
                animate={pulseAnimation}
                className="h-7 bg-stone-200 rounded w-3/4 mb-4"
            />
            <motion.div
                animate={pulseAnimation}
                className="h-4 bg-stone-200 rounded w-full mb-2"
            />
            <motion.div
                animate={pulseAnimation}
                className="h-4 bg-stone-200 rounded w-5/6 mb-2"
            />
            <motion.div
                animate={pulseAnimation}
                className="h-4 bg-stone-200 rounded w-4/6 mb-6"
            />
            <motion.div
                animate={pulseAnimation}
                className="h-5 bg-stone-200 rounded w-24"
            />
        </div>
    );
}


