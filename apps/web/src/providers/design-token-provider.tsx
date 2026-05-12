'use client';

import React from 'react';

import { AccessibilityProvider } from './accessibility-provider';
import { MotionProvider } from './motion-provider';

interface DesignTokenProviderProps {
  children: React.ReactNode;
}

export default function DesignTokenProvider({ children }: DesignTokenProviderProps) {
  return (
    <AccessibilityProvider>
      <MotionProvider>{children}</MotionProvider>
    </AccessibilityProvider>
  );
}
