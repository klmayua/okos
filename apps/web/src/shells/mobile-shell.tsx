'use client';

import React from 'react';

import MobileBottomNav from '@/components/composed/navigation/mobile-bottom-nav';

interface MobileShellProps {
  children: React.ReactNode;
}

export default function MobileShell({ children }: MobileShellProps) {
  return (
    <>
      {children}
      <MobileBottomNav />
    </>
  );
}
