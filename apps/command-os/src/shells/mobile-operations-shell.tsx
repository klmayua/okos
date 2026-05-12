'use client';

import React from 'react';

import MobileBottomNav from '@/components/navigation/mobile-bottom-nav';

import styles from './mobile-operations-shell.module.css';

interface MobileOperationsShellProps {
  children: React.ReactNode;
}

export default function MobileOperationsShell({ children }: MobileOperationsShellProps) {
  return (
    <div className={styles.shell}>
      <main className={styles.content}>{children}</main>
      <MobileBottomNav />
    </div>
  );
}
