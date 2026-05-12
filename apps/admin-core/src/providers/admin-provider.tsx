'use client';

import React from 'react';

interface AdminProviderProps {
  children: React.ReactNode;
}

export default function AdminProvider({ children }: AdminProviderProps) {
  return <>{children}</>;
}
