'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface TextRevealProps {
    children: string;
    className?: string;
    delay?: number;
    highlightWords?: string[]; // Words to highlight with a specific color/style
    highlightClassName?: string;
}

export default function TextReveal({
    children,
    className = '',
    delay = 0,
    highlightWords = [],
    highlightClassName = 'italic'
}: TextRevealProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-10%" });

    // Split text into words
    const words = children.split(" ");

    const container = {
        hidden: { opacity: 0 },
        visible: (i = 1) => ({
            opacity: 1,
            transition: { staggerChildren: 0.12, delayChildren: 0.04 * i + delay },
        }),
    };

    const child = {
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 100,
            },
        },
        hidden: {
            opacity: 0,
            y: 20,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 100,
            },
        },
    };

    return (
        <motion.div
            ref={ref}
            style={{ overflow: "hidden", display: "flex", flexWrap: "wrap" }}
            variants={container}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className={className}
        >
            {words.map((word, index) => {
                // Check if this word should be highlighted
                // We strip punctuation for the check but render the full word
                const cleanWord = word.replace(/[^a-zA-Z0-9]/g, "");
                const isHighlighted = highlightWords.includes(cleanWord);

                return (
                    <motion.span
                        variants={child}
                        style={{ marginRight: "0.25em" }}
                        key={index}
                        className={isHighlighted ? highlightClassName : ""}
                    >
                        {word}
                    </motion.span>
                );
            })}
        </motion.div>
    );
}
