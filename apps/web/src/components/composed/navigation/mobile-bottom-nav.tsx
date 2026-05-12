'use client';

import React, { useState } from 'react';

import styles from './mobile-bottom-nav.module.css';

const mainItems = [
  { label: 'Home', href: '#', icon: 'H' },
  { label: 'Initiatives', href: '#initiatives', icon: 'I' },
  { label: 'Verify', href: '#verify', icon: 'V' },
  { label: 'Track', href: '#track', icon: 'T' },
];

const moreItems = [
  { label: 'Vote OK', href: '#vote' },
  { label: 'Pulse OK', href: '#pulse' },
  { label: 'Governance', href: '#governance' },
  { label: 'Notifications', href: '#notifications' },
  { label: 'Settings', href: '#settings' },
  { label: 'Emergency', href: '#emergency' },
  { label: 'Transparency', href: '#transparency' },
];

export default function MobileBottomNav() {
  const [moreOpen, setMoreOpen] = useState(false);

  return (
    <>
      <nav className={styles.nav} aria-label="Mobile navigation">
        <ul className={styles.list} role="menubar">
          {mainItems.map((item) => (
            <li key={item.label} role="none">
              <a href={item.href} className={styles.item} role="menuitem">
                <span className={styles.icon}>{item.icon}</span>
                <span className={styles.label}>{item.label}</span>
              </a>
            </li>
          ))}
          <li role="none">
            <button
              type="button"
              className={styles.item}
              onClick={() => setMoreOpen(true)}
              aria-expanded={moreOpen}
              aria-haspopup="true"
            >
              <span className={styles.icon}>M</span>
              <span className={styles.label}>More</span>
            </button>
          </li>
        </ul>
      </nav>

      {/* More Menu Sheet */}
      {moreOpen && (
        <>
          <div
            className={styles.overlay}
            onClick={() => setMoreOpen(false)}
            aria-hidden="true"
          />
          <div className={styles.sheet} role="dialog" aria-label="More options">
            <div className={styles.sheetHeader}>
              <span className={styles.sheetTitle}>Menu</span>
              <button
                type="button"
                className={styles.sheetClose}
                onClick={() => setMoreOpen(false)}
                aria-label="Close menu"
              >
                ×
              </button>
            </div>
            <ul className={styles.sheetList}>
              {moreItems.map((item) => (
                <li key={item.label}>
                  <a href={item.href} className={styles.sheetItem}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </>
  );
}
