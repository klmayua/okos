'use client';

import React from 'react';

import styles from './mobile-bottom-nav.module.css';

const items = [
  { label: 'Overview', href: '/overview', icon: '◈' },
  { label: 'Initiatives', href: '/initiatives', icon: '◉' },
  { label: 'Verify', href: '/verify', icon: '◊' },
  { label: 'Alerts', href: '/alerts', icon: '◓' },
  { label: 'More', href: '/operations', icon: '⋯' },
];

export default function MobileBottomNav() {
  return (
    <nav className={styles.nav} aria-label="Mobile command navigation">
      <ul className={styles.list}>
        {items.map((item) => (
          <li key={item.label}>
            <a href={item.href} className={styles.item}>
              <span className={styles.icon}>{item.icon}</span>
              <span className={styles.label}>{item.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
