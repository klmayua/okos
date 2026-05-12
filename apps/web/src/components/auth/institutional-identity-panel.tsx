'use client';

import React from 'react';

import styles from './institutional-identity-panel.module.css';

const trustIndicators = [
  '774 LGAs Simulated',
  'Real-Time Operational Feeds',
  'Perpetual Audit Layer',
  'Synthetic Scenario Engine Active',
];

const statusItems = [
  { label: 'Synthetic Grid', status: 'operational' },
  { label: 'Verification Streams', status: 'active' },
  { label: 'Treasury Monitoring', status: 'synchronized' },
  { label: 'Scenario Engine', status: 'live' },
];

export default function InstitutionalIdentityPanel() {
  return (
    <div className={styles.panel}>
      <div className={styles.brand}>
        <div className={styles.logoBadge}>OK</div>
        <h1 className={styles.title}>.OS</h1>
      </div>

      <p className={styles.subtitle}>Civic Infrastructure Interface</p>

      <p className={styles.statement}>
        A sovereign civic operating layer for accountability, coordination, transparency, and collective action.
      </p>

      <div className={styles.trustIndicators}>
        {trustIndicators.map((item) => (
          <div key={item} className={styles.trustItem}>
            <span className={styles.trustDot} aria-hidden="true" />
            <span>{item}</span>
          </div>
        ))}
      </div>

      <div className={styles.statusCard}>
        <span className={styles.statusCaption}>Live System Status</span>
        <div className={styles.statusList}>
          {statusItems.map((item) => (
            <div key={item.label} className={styles.statusItem}>
              <span className={`${styles.statusDot} ${styles[`status${item.status}`]}`} aria-hidden="true" />
              <span className={styles.statusLabel}>{item.label}</span>
              <span className={styles.statusValue}>{item.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
