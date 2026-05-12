'use client';

import React from 'react';

import MobileBottomNav from '@/components/navigation/mobile-bottom-nav';
import CommandSidebar from '@/components/sidebar/command-sidebar';
import CommandTopbar from '@/components/topbar/command-topbar';

import styles from './verification-shell.module.css';

interface VerificationShellProps {
  children: React.ReactNode;
}

export default function VerificationShell({ children }: VerificationShellProps) {
  return (
    <div className={styles.shell}>
      <CommandSidebar />
      <div className={styles.main}>
        <CommandTopbar />
        <main className={styles.content}>{children}</main>
      </div>
      <MobileBottomNav />
    </div>
  );
}
