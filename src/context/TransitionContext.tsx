"use client";

import React, { createContext, useContext, useState, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';

type TransitionContextType = {
  isAnimating: boolean;
  startTransition: (href: string) => void;
};

const TransitionContext = createContext<TransitionContextType>({
  isAnimating: false,
  startTransition: () => {},
});

export const useTransition = () => useContext(TransitionContext);

export const TransitionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const startTransition = useCallback((href: string) => {
    // Only start transition if navigating to a new page
    if (href !== pathname) {
      setIsAnimating(true);
      
      // Allow time for exit animation
      setTimeout(() => {
        router.push(href);
        
        // Reset animation state after navigation
        setTimeout(() => {
          setIsAnimating(false);
        }, 50);
      }, 300); // Match this with your exit animation duration
    } else {
      router.push(href);
    }
  }, [pathname, router]);

  return (
    <TransitionContext.Provider value={{ isAnimating, startTransition }}>
      {children}
    </TransitionContext.Provider>
  );
};