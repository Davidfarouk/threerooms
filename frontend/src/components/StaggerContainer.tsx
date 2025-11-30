'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ReactNode } from 'react';
import { staggerContainer, staggerContainerFast, staggerContainerSlow } from '@/lib/animations';

interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  speed?: 'fast' | 'normal' | 'slow';
  threshold?: number;
}

export default function StaggerContainer({ 
  children, 
  className = '',
  speed = 'normal',
  threshold = 0.1
}: StaggerContainerProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold,
  });

  const variants = {
    fast: staggerContainerFast,
    normal: staggerContainer,
    slow: staggerContainerSlow
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={variants[speed]}
      className={className}
    >
      {children}
    </motion.div>
  );
}


