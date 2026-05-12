'use client';

import React from 'react';

import AdminSidebar from '@/components/sidebar/admin-sidebar';

import styles from './admin-shell.module.css';

interface AdminShellProps {
  children: React.ReactNode;
}

export default function AdminShell({ children }: AdminShellProps) {
  return (
    <div className={styles.shell}>
      <AdminSidebar />
      <div className={styles.main}>
        <main className={styles.content}>{children}</main>
      </div>
    </div>
  );
}
