'use client';

import React from 'react';

import styles from './floating-navbar.module.css';

const navItems = [
  { label: 'Initiatives', href: '#initiatives' },
  { label: 'Verify', href: '#verify' },
  { label: 'Track', href: '#track' },
  { label: 'Vote', href: '#vote' },
  { label: 'Pulse', href: '#pulse' },
  { label: 'Transparency', href: '#transparency' },
];

export default function FloatingNavbar() {
  return (
    <header className={styles.wrapper}>
      <nav className={styles.navbar} role="navigation" aria-label="Main navigation">
        {/* Logo */}
        <a href="/" className={styles.logo} aria-label="OK.OS Home">
          <div className={styles.logoBadge}>OK</div>
          <span className={styles.logoText}>.OS</span>
        </a>

        {/* Center navigation */}
        <ul className={styles.centerNav} role="menubar">
          {navItems.map((item) => (
            <li key={item.label} role="none">
              <a href={item.href} className={styles.navLink} role="menuitem">
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right actions */}
        <div className={styles.actions}>
          <a
            href="https://cvr.inecnigeria.org/"
            target="_blank"
            rel="noopener noreferrer"
            className={`ok-btn ok-btn-primary ${styles.actionPrimary}`}
          >
            Get Your PVC
          </a>
          <a href="#join" className={`ok-btn ok-btn-secondary ${styles.actionSecondary}`}>
            Join Movement
          </a>
          <a href="/signin" className={styles.signinBtn}>
            Sign In
          </a>
        </div>
      </nav>
    </header>
  );
}
