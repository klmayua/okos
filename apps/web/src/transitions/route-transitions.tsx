'use client';

import React from 'react';

interface RouteTransitionProps {
  children: React.ReactNode;
}

export default function RouteTransitions({ children }: RouteTransitionProps) {
  return (
    <div className="route-transition" style={{ transition: 'opacity 300ms ease' }}>
      {children}
    </div>
  );
}
