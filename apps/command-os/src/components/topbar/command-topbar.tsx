'use client';

import React from 'react';

import styles from './command-topbar.module.css';

export default function CommandTopbar() {
  return (
    <header className={styles.topbar} role="banner">
      <div className={styles.left}>
        <h1 className={styles.pageTitle}>Operations Overview</h1>
      </div>

      <div className={styles.center}>
        <div className={styles.statusGroup}>
          <span className={`${styles.statusDot} ${styles.statusGreen}`} aria-hidden="true" />
          <span className={styles.statusText}>All Systems Operational</span>
        </div>
      </div>

      <div className={styles.right}>
        <div className={styles.regionSelector}>
          <span className={styles.regionLabel}>Region:</span>
          <select className={styles.regionSelect} aria-label="Select region">
            <option>All Nigeria</option>
            <option>North Central</option>
            <option>North East</option>
            <option>North West</option>
            <option>South East</option>
            <option>South South</option>
            <option>South West</option>
          </select>
        </div>

        <div className={styles.alerts}>
          <button type="button" className={styles.alertBtn} aria-label="Alerts">
            <span className={styles.alertIcon} aria-hidden="true">◆</span>
            <span className={styles.alertBadge}>3</span>
          </button>
        </div>

        <div className={styles.profile}>
          <div className={styles.avatar}>OP</div>
          <span className={styles.profileName}>Operator</span>
        </div>
      </div>
    </header>
  );
}
