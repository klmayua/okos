'use client';

import React from 'react';

interface OverlayTransitionProps {
  children: React.ReactNode;
  visible: boolean;
}

export default function OverlayTransitions({ children, visible }: OverlayTransitionProps) {
  return (
    <div
      className="overlay-transition"
      style={{
        opacity: visible ? 1 : 0,
        transition: 'opacity 300ms ease',
        pointerEvents: visible ? 'auto' : 'none',
      }}
    >
      {children}
    </div>
  );
}
