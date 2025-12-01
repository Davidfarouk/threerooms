'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ReactNode } from 'react';
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
    threshold: 0.15,
    rootMargin: '-50px 0px',
  });

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 40,
      scale: 0.92
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { 
        duration: 0.7,
        delay,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  const content = (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
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


