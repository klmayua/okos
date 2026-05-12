'use client';

import React from 'react';

import AtmosphericBackground from '@/components/surface/atmospheric-background';

interface ImmersiveShellProps {
  children: React.ReactNode;
}

export default function ImmersiveShell({ children }: ImmersiveShellProps) {
  return (
    <>
      <AtmosphericBackground />
      {children}
    </>
  );
}
