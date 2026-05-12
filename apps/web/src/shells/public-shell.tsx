'use client';

import React from 'react';

import Footer from '@/components/composed/footer/footer';
import FloatingNavbar from '@/components/composed/navigation/floating-navbar';
import MobileBottomNav from '@/components/composed/navigation/mobile-bottom-nav';
import AtmosphericBackground from '@/components/surface/atmospheric-background';

interface PublicShellProps {
  children: React.ReactNode;
}

export default function PublicShell({ children }: PublicShellProps) {
  return (
    <>
      <AtmosphericBackground />
      <FloatingNavbar />
      {children}
      <Footer />
      <MobileBottomNav />
    </>
  );
}
