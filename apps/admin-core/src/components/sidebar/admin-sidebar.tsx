'use client';

import React from 'react';

import styles from './admin-sidebar.module.css';

const navItems = [
  { label: 'Dashboard', href: '/', icon: '◈' },
  { label: 'Governance', href: '/governance', icon: '◉' },
  { label: 'Treasury', href: '/treasury', icon: '◊' },
  { label: 'Audit', href: '/audit', icon: '◐' },
  { label: 'Moderation', href: '/moderation', icon: '◑' },
  { label: 'Compliance', href: '/compliance', icon: '◒' },
];

export default function AdminSidebar() {
  return (
    <aside className={styles.sidebar} role="navigation" aria-label="Admin navigation">
      <div className={styles.brand}>
        <div className={styles.logoBadge}>ADM</div>
        <span className={styles.logoText}>.CORE</span>
      </div>
      <nav className={styles.nav}>
        <ul className={styles.navList}>
          {navItems.map((item) => (
            <li key={item.label}>
              <a href={item.href} className={styles.navLink}>
                <span className={styles.navIcon}>{item.icon}</span>
                <span>{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
