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
    threshold: 0.15,
    rootMargin: '-50px 0px',
  });

  const variants = {
    up: {
      hidden: { 
        opacity: 0, 
        y: 60,
        scale: 0.96
      },
      visible: { 
        opacity: 1, 
        y: 0,
        scale: 1,
        transition: { 
          duration: 0.8, 
          delay,
          ease: [0.16, 1, 0.3, 1] // Custom easing for smoother feel
        }
      }
    },
    down: {
      hidden: { opacity: 0, y: -60, scale: 0.96 },
      visible: { 
        opacity: 1, 
        y: 0,
        scale: 1,
        transition: { 
          duration: 0.8, 
          delay, 
          ease: [0.16, 1, 0.3, 1]
        }
      }
    },
    left: {
      hidden: { opacity: 0, x: -60, scale: 0.96 },
      visible: { 
        opacity: 1, 
        x: 0,
        scale: 1,
        transition: { 
          duration: 0.8, 
          delay, 
          ease: [0.16, 1, 0.3, 1]
        }
      }
    },
    right: {
      hidden: { opacity: 0, x: 60, scale: 0.96 },
      visible: { 
        opacity: 1, 
        x: 0,
        scale: 1,
        transition: { 
          duration: 0.8, 
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


