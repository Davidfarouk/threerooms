'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface FloatingElementProps {
  children: ReactNode;
  className?: string;
  duration?: number;
  delay?: number;
}

export default function FloatingElement({ 
  children, 
  className = '',
  duration = 3,
  delay = 0
}: FloatingElementProps) {
  const floatAnimation = {
    y: [0, -10, 0],
    transition: {
      duration,
      repeat: Infinity,
      ease: 'easeInOut',
      delay
    }
  };

  return (
    <motion.div
      animate={floatAnimation}
      className={className}
    >
      {children}
    </motion.div>
  );
}


