'use client';

import React from 'react';

import MobileBottomNav from '@/components/navigation/mobile-bottom-nav';
import CommandTopbar from '@/components/topbar/command-topbar';

import styles from './field-shell.module.css';

interface FieldShellProps {
  children: React.ReactNode;
}

export default function FieldShell({ children }: FieldShellProps) {
  return (
    <div className={styles.shell}>
      <CommandTopbar />
      <main className={styles.content}>{children}</main>
      <MobileBottomNav />
    </div>
  );
}
