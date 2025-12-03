'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ReactNode, useEffect, useState, useRef } from 'react';
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
  const elementRef = useRef<HTMLDivElement>(null);
  const [inViewRef, inView] = useInView({
    triggerOnce: true,
    threshold,
    rootMargin: '0px 0px -20px 0px', // Less restrictive margin for mobile
  });

  const [isVisible, setIsVisible] = useState(false);

  // Combined ref callback that stores element AND sets up intersection observer
  const setRefs = (node: HTMLDivElement | null) => {
    elementRef.current = node;
    inViewRef(node); // Call the useInView ref callback
  };

  // Handle bfcache restoration - check if element is in viewport on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const checkVisibility = () => {
        if (elementRef.current) {
          const rect = elementRef.current.getBoundingClientRect();
          const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;
          if (isInViewport) {
            setIsVisible(true);
          }
        }
      };

      // Check immediately and after delays to handle bfcache restoration
      checkVisibility();
      const timeout1 = setTimeout(checkVisibility, 50);
      const timeout2 = setTimeout(checkVisibility, 200);

      // Handle page visibility change (bfcache restore)
      const handleVisibilityChange = () => {
        if (document.visibilityState === 'visible') {
          setTimeout(checkVisibility, 100);
        }
      };

      // Handle pageshow event (bfcache restore) - this is the key event!
      const handlePageShow = (e: PageTransitionEvent) => {
        if (e.persisted) { // Page was restored from bfcache
          setTimeout(checkVisibility, 100);
        }
      };

      document.addEventListener('visibilitychange', handleVisibilityChange);
      window.addEventListener('pageshow', handlePageShow);

      return () => {
        clearTimeout(timeout1);
        clearTimeout(timeout2);
        document.removeEventListener('visibilitychange', handleVisibilityChange);
        window.removeEventListener('pageshow', handlePageShow);
      };
    }
  }, []); // Run on mount

  // Use inView OR isVisible (fallback for bfcache)
  const shouldAnimate = inView || isVisible;

  const variants = {
    fast: staggerContainerFast,
    normal: staggerContainer,
    slow: staggerContainerSlow
  };

  return (
    <motion.div
      ref={setRefs}
      initial="hidden"
      animate={shouldAnimate ? 'visible' : 'hidden'}
      variants={variants[speed]}
      className={className}
    >
      {children}
    </motion.div>
  );
}
