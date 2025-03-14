"use client";

import React from 'react';
import { PageTransition } from '@/components/animations/PageTransition';

type PageTemplateProps = {
  children: React.ReactNode;
  className?: string;
};

export default function PageTemplate({ children, className = "" }: PageTemplateProps) {
  return (
    <PageTransition className={`min-h-screen ${className}`}>
      {children}
    </PageTransition>
  );
}