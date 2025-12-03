'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ReactNode } from 'react';
import { scrollReveal } from '@/lib/animations';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
}

export default function AnimatedSection({ 
  children, 
  className = '',
  delay = 0,
  direction = 'up'
}: AnimatedSectionProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.05, // Lower threshold for better mobile detection
    rootMargin: '0px 0px -20px 0px', // Less restrictive margin, only bottom margin
  });

  const variants = {
    up: {
      hidden: { 
        opacity: 0, 
        y: 40, // Reduced from 60 for less movement
        scale: 0.98 // Reduced scale to prevent overflow issues
      },
      visible: { 
        opacity: 1, 
        y: 0,
        scale: 1,
        transition: { 
          duration: 0.6, // Slightly faster
          delay,
          ease: [0.16, 1, 0.3, 1] // Custom easing for smoother feel
        }
      }
    },
    down: {
      hidden: { opacity: 0, y: -40, scale: 0.98 },
      visible: { 
        opacity: 1, 
        y: 0,
        scale: 1,
        transition: { 
          duration: 0.6, 
          delay, 
          ease: [0.16, 1, 0.3, 1]
        }
      }
    },
    left: {
      hidden: { opacity: 0, x: -40, scale: 0.98 },
      visible: { 
        opacity: 1, 
        x: 0,
        scale: 1,
        transition: { 
          duration: 0.6, 
          delay, 
          ease: [0.16, 1, 0.3, 1]
        }
      }
    },
    right: {
      hidden: { opacity: 0, x: 40, scale: 0.98 },
      visible: { 
        opacity: 1, 
        x: 0,
        scale: 1,
        transition: { 
          duration: 0.6, 
          delay, 
          ease: [0.16, 1, 0.3, 1]
        }
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={variants[direction]}
      className={className}
    >
      {children}
    </motion.div>
  );
}


