'use client';

import React from 'react';

import styles from './live-ticker.module.css';

const tickerItems = [
  { label: 'PVC Registration Deadline', value: '45 days remaining' },
  { label: 'Volunteers Joined', value: '12,847' },
  { label: 'States Activated', value: '36 / 36' },
  { label: 'Verification Updates', value: '2.4M processed' },
  { label: 'Initiative Updates', value: '18 active' },
];

export default function LiveTicker() {
  const doubledItems = [...tickerItems, ...tickerItems];

  return (
    <section className={styles.section} aria-label="Live ticker">
      <div className="ok-container">
        <div className={styles.ticker}>
          <div className={styles.track}>
            {doubledItems.map((item, index) => (
              <div key={`${item.label}-${index}`} className={styles.item}>
                <span className={styles.dot} aria-hidden="true" />
                <span className={styles.label}>{item.label}</span>
                <span className={styles.value}>{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
