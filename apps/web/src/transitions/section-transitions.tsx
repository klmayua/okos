'use client';

import React from 'react';

interface SectionTransitionProps {
  children: React.ReactNode;
  delay?: number;
}

export default function SectionTransitions({ children, delay = 0 }: SectionTransitionProps) {
  return (
    <div
      className="section-transition"
      style={{
        transition: `opacity 600ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
