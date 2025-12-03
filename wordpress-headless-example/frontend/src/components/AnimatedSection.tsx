'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ReactNode, useEffect, useState, useRef } from 'react';
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
  const elementRef = useRef<HTMLDivElement>(null);
  const [inViewRef, inView] = useInView({
    triggerOnce: true,
    threshold: 0.05, // Lower threshold for better mobile detection
    rootMargin: '0px 0px -20px 0px', // Less restrictive margin, only bottom margin
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
      ref={setRefs}
      initial="hidden"
      animate={shouldAnimate ? 'visible' : 'hidden'}
      variants={variants[direction]}
      className={className}
    >
      {children}
    </motion.div>
  );
}
