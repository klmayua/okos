'use client';

import React from 'react';

import styles from './demo-auth-shell.module.css';

interface DemoAuthShellProps {
  children: React.ReactNode;
}

export default function DemoAuthShell({ children }: DemoAuthShellProps) {
  return (
    <div className={styles.shell}>
      <div className={styles.container}>{children}</div>
    </div>
  );
}
