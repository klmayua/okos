'use client';

import React from 'react';

import styles from './command-sidebar.module.css';

const navItems = [
  { id: 'overview', label: 'Overview', href: '/overview', icon: '◈' },
  { id: 'operations', label: 'Operations', href: '/operations', icon: '◎' },
  { id: 'initiatives', label: 'Initiatives', href: '/initiatives', icon: '◉' },
  { id: 'verify', label: 'Verify', href: '/verify', icon: '◊' },
  { id: 'track', label: 'Track', href: '/track', icon: '◐' },
  { id: 'pulse', label: 'Pulse', href: '/pulse', icon: '◑' },
  { id: 'regions', label: 'Regions', href: '/regions', icon: '◒' },
  { id: 'alerts', label: 'Alerts', href: '/alerts', icon: '◓' },
  { id: 'volunteers', label: 'Volunteers', href: '/volunteers', icon: '◔' },
  { id: 'incidents', label: 'Incidents', href: '/incidents', icon: '◕' },
  { id: 'moderation', label: 'Moderation', href: '/moderation', icon: '◖' },
  { id: 'analytics', label: 'Analytics', href: '/analytics', icon: '◗' },
];

export default function CommandSidebar() {
  return (
    <aside className={styles.sidebar} role="navigation" aria-label="Command navigation">
      <div className={styles.brand}>
        <div className={styles.logoBadge}>CMD</div>
        <span className={styles.logoText}>.OS</span>
      </div>

      <nav className={styles.nav}>
        <ul className={styles.navList} role="menubar">
          {navItems.map((item) => (
            <li key={item.id} role="none">
              <a href={item.href} className={styles.navLink} role="menuitem">
                <span className={styles.navIcon} aria-hidden="true">{item.icon}</span>
                <span className={styles.navLabel}>{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className={styles.footer}>
        <div className={styles.syncStatus}>
          <span className={`${styles.statusDot} ${styles.statusOnline}`} aria-hidden="true" />
          <span className={styles.statusLabel}>Realtime Sync</span>
        </div>
        <div className={styles.version}>v1.0.0</div>
      </div>
    </aside>
  );
}
