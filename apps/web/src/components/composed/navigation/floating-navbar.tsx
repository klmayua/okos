'use client';

import React from 'react';

import styles from './floating-navbar.module.css';

const navItems = [
  { label: 'Movement', href: '#movement' },
  { label: 'Manifesto', href: '/manifesto' },
  { label: 'Initiatives', href: '#initiatives' },
  { label: 'Leadership', href: '#leadership' },
  { label: 'Transparency', href: '#transparency' },
  { label: 'Get Involved', href: '#get-involved' },
];

export default function FloatingNavbar() {
  return (
    <header className={styles.wrapper}>
      <nav className={styles.navbar} role="navigation" aria-label="Main navigation">
        {/* Logo */}
        <a href="/" className={styles.logo} aria-label="OK Movement Home">
          <div className={styles.logoBadge}>OK</div>
          <span className={styles.logoText}>Movement</span>
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
            className={`ok-btn ok-btn-secondary ${styles.actionSecondary}`}
          >
            Get PVC
          </a>
          <a href="#donate" className={`ok-btn ok-btn-premium ${styles.actionTertiary}`}>
            Donate
          </a>
          <a href="#join" className={`ok-btn ok-btn-primary ${styles.actionPrimary}`}>
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
