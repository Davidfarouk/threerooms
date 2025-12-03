'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ReactNode, useEffect, useState } from 'react';
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
  threshold = 0.05 // Lower default threshold for better mobile detection
}: StaggerContainerProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold,
    rootMargin: '0px 0px -20px 0px', // Less restrictive margin for mobile
  });

  const [isVisible, setIsVisible] = useState(false);

  // Handle bfcache restoration - check if element is in viewport on mount
  useEffect(() => {
    if (ref && typeof window !== 'undefined') {
      const checkVisibility = () => {
        if (ref.current) {
          const rect = ref.current.getBoundingClientRect();
          const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;
          if (isInViewport) {
            setIsVisible(true);
          }
        }
      };

      // Check immediately
      checkVisibility();

      // Check after a short delay to handle bfcache restoration
      const timeout = setTimeout(checkVisibility, 100);

      // Handle page visibility change (bfcache restore)
      const handleVisibilityChange = () => {
        if (document.visibilityState === 'visible') {
          setTimeout(checkVisibility, 50);
        }
      };

      document.addEventListener('visibilitychange', handleVisibilityChange);

      return () => {
        clearTimeout(timeout);
        document.removeEventListener('visibilitychange', handleVisibilityChange);
      };
    }
  }, [ref]);

  // Use inView OR isVisible (fallback for bfcache)
  const shouldAnimate = inView || isVisible;

  const variants = {
    fast: staggerContainerFast,
    normal: staggerContainer,
    slow: staggerContainerSlow
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={shouldAnimate ? 'visible' : 'hidden'}
      variants={variants[speed]}
      className={className}
    >
      {children}
    </motion.div>
  );
}


