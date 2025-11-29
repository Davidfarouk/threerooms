'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import Link from 'next/link';

interface AnimatedButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
}

export default function AnimatedButton({
  children,
  href,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false
}: AnimatedButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variantClasses = {
    primary: 'bg-brand-800 text-white hover:bg-brand-900 focus:ring-brand-700 shadow-lg hover:shadow-xl',
    secondary: 'bg-white/20 backdrop-blur-md border-2 border-white/40 text-white hover:bg-white/30 hover:border-white/60 focus:ring-white/50 shadow-md hover:shadow-lg',
    outline: 'bg-transparent border-2 border-brand-800 text-brand-800 hover:bg-brand-800 hover:text-white focus:ring-brand-700'
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-8 py-4 text-base',
    lg: 'px-10 py-5 text-lg'
  };

  const buttonClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`;

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.05,
      transition: { duration: 0.2 }
    },
    tap: { 
      scale: 0.95,
      transition: { duration: 0.1 }
    }
  };

  const content = (
    <motion.button
      type={type}
      variants={buttonVariants}
      initial="initial"
      whileHover={disabled ? 'initial' : 'hover'}
      whileTap={disabled ? 'initial' : 'tap'}
      onClick={onClick}
      disabled={disabled}
      className={buttonClasses}
    >
      {children}
    </motion.button>
  );

  if (href && !disabled) {
    return (
      <Link href={href} className="inline-block">
        <motion.div
          variants={buttonVariants}
          initial="initial"
          whileHover="hover"
          whileTap="tap"
          className={buttonClasses}
        >
          {children}
        </motion.div>
      </Link>
    );
  }

  return content;
}


