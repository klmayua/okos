'use client';

import React from 'react';

import MobileBottomNav from '@/components/navigation/mobile-bottom-nav';
import CommandSidebar from '@/components/sidebar/command-sidebar';
import CommandTopbar from '@/components/topbar/command-topbar';

import styles from './incident-shell.module.css';

interface IncidentShellProps {
  children: React.ReactNode;
}

export default function IncidentShell({ children }: IncidentShellProps) {
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
