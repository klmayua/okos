'use client';

import React from 'react';

import CommandSidebar from '@/components/sidebar/command-sidebar';
import CommandTopbar from '@/components/topbar/command-topbar';

import styles from './operations-shell.module.css';

interface OperationsShellProps {
  children: React.ReactNode;
}

export default function OperationsShell({ children }: OperationsShellProps) {
  return (
    <div className={styles.shell}>
      <CommandSidebar />
      <div className={styles.main}>
        <CommandTopbar />
        <main className={styles.content}>{children}</main>
      </div>
    </div>
  );
}
