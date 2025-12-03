'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ReactNode, useEffect, useState } from 'react';
import { hoverLift } from '@/lib/animations';

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  href?: string;
  onClick?: () => void;
}

export default function AnimatedCard({ 
  children, 
  className = '',
  delay = 0,
  href,
  onClick
}: AnimatedCardProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.05, // Lower threshold for better mobile detection
    rootMargin: '0px 0px -20px 0px', // Less restrictive margin
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

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 30, // Reduced from 40
      scale: 0.97 // Reduced from 0.92 to prevent overflow
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { 
        duration: 0.6, // Slightly faster
        delay,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  const content = (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={shouldAnimate ? 'visible' : 'hidden'}
      variants={cardVariants}
      whileHover={{ 
        y: -10,
        scale: 1.02,
        transition: { duration: 0.3, ease: 'easeOut' }
      }}
      className={className}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} className="block">
        {content}
      </a>
    );
  }

  return content;
}


