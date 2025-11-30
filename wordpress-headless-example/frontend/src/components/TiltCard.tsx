'use client';

import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface TiltCardProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
}

export default function TiltCard({
    children,
    className = '',
    delay = 0
}: TiltCardProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [inViewRef, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    // Mouse position state
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Smooth out the mouse movement
    const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

    // Calculate rotation based on mouse position
    // Range: -20 degrees to 20 degrees
    const rotateX = useTransform(mouseY, [-0.5, 0.5], [15, -15]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], [-15, 15]);

    // Glare effect position
    const glareX = useTransform(mouseX, [-0.5, 0.5], ['0%', '100%']);
    const glareY = useTransform(mouseY, [-0.5, 0.5], ['0%', '100%']);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();

        // Calculate normalized position (-0.5 to 0.5)
        const width = rect.width;
        const height = rect.height;

        const mouseXFromCenter = e.clientX - rect.left - width / 2;
        const mouseYFromCenter = e.clientY - rect.top - height / 2;

        x.set(mouseXFromCenter / width);
        y.set(mouseYFromCenter / height);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    // Initial entry animation variants
    const cardVariants = {
        hidden: {
            opacity: 0,
            y: 30,
            scale: 0.95
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.5,
                delay,
                ease: 'easeOut'
            }
        }
    };

    return (
        <motion.div
            ref={inViewRef}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            variants={cardVariants}
            style={{
                perspective: 1000,
            }}
            className="h-full"
        >
            <motion.div
                ref={ref}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: 'preserve-3d',
                }}
                className={`relative h-full ${className}`}
            >
                {/* Content */}
                <div style={{ transform: 'translateZ(20px)' }}>
                    {children}
                </div>

                {/* Glare Effect */}
                <motion.div
                    style={{
                        background: `radial-gradient(
              circle at center,
              rgba(255,255,255,0.4) 0%,
              rgba(255,255,255,0) 80%
            )`,
                        left: glareX,
                        top: glareY,
                        opacity: useTransform(mouseX, [-0.5, 0, 0.5], [0.3, 0, 0.3]),
                        transform: 'translate(-50%, -50%)',
                        pointerEvents: 'none',
                    }}
                    className="absolute w-[150%] h-[150%] z-50 rounded-full mix-blend-overlay"
                />
            </motion.div>
        </motion.div>
    );
}
