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
    threshold: 0.1,
  });

  const variants = {
    up: scrollReveal,
    down: {
      hidden: { opacity: 0, y: -50, scale: 0.95 },
      visible: { 
        opacity: 1, 
        y: 0,
        scale: 1,
        transition: { duration: 0.6, delay, ease: 'easeOut' }
      }
    },
    left: {
      hidden: { opacity: 0, x: -50, scale: 0.95 },
      visible: { 
        opacity: 1, 
        x: 0,
        scale: 1,
        transition: { duration: 0.6, delay, ease: 'easeOut' }
      }
    },
    right: {
      hidden: { opacity: 0, x: 50, scale: 0.95 },
      visible: { 
        opacity: 1, 
        x: 0,
        scale: 1,
        transition: { duration: 0.6, delay, ease: 'easeOut' }
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


