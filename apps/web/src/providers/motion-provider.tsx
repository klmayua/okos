'use client';

import React, { createContext, useContext } from 'react';

import { motionConfig } from '@/config/motion-config';

interface MotionContextValue {
  config: typeof motionConfig;
  reduced: boolean;
}

const MotionContext = createContext<MotionContextValue>({
  config: motionConfig,
  reduced: false,
});

export function MotionProvider({
  children,
  reduced = false,
}: {
  children: React.ReactNode;
  reduced?: boolean;
}) {
  return (
    <MotionContext.Provider value={{ config: motionConfig, reduced }}>
      {children}
    </MotionContext.Provider>
  );
}

export function useMotion(): MotionContextValue {
  return useContext(MotionContext);
}
