'use client';

import React from 'react';

interface CommandProviderProps {
  children: React.ReactNode;
}

export default function CommandProvider({ children }: CommandProviderProps) {
  return <>{children}</>;
}
