"use client";

import React from 'react';
import { useTransition } from '@/context/TransitionContext';
import { motion } from 'framer-motion';

type TransitionLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  animateHover?: boolean;
};

const TransitionLink: React.FC<TransitionLinkProps> = ({
  href,
  children,
  className = "",
  animateHover = true
}) => {
  const { startTransition } = useTransition();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    startTransition(href);
  };

  // Different variants for hover animation
  const hoverStyles = animateHover ? {
    whileHover: { y: -3, scale: 1.02 },
    whileTap: { scale: 0.98 },
    transition: { duration: 0.2 }
  } : {};

  return (
    <motion.div {...hoverStyles}>
      <a 
        href={href} 
        onClick={handleClick}
        className={className}
      >
        {children}
      </a>
    </motion.div>
  );
};

export default TransitionLink;