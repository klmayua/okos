'use client';

import React from 'react';

import { useCountUp } from '@/hooks/use-count-up';

import styles from './metric-panel.module.css';

const metrics = [
  { label: 'PVC Registrations', value: 2847391, suffix: '', prefix: '' },
  { label: 'Volunteers', value: 12847, suffix: '', prefix: '' },
  { label: 'Donations', value: 45600, suffix: '', prefix: '₦' },
  { label: 'States Activated', value: 36, suffix: '', prefix: '' },
  { label: 'Initiatives Running', value: 18, suffix: '', prefix: '' },
];

function MetricCard({
  label,
  value,
  suffix,
  prefix,
}: {
  label: string;
  value: number;
  suffix: string;
  prefix: string;
}) {
  const { value: animatedValue } = useCountUp(value, 2500);

  const formatted = animatedValue.toLocaleString();

  return (
    <div className={`ok-glass ${styles.card}`}>
      <span className={styles.label}>{label}</span>
      <span className={styles.value} aria-live="polite">
        {prefix}{formatted}{suffix}
      </span>
      <div className={styles.trend}>
        <span className={styles.trendIcon} aria-hidden="true">↑</span>
        <span>+12.4% this week</span>
      </div>
    </div>
  );
}

export default function MetricPanel() {
  return (
    <section className={`ok-section ${styles.section}`} aria-label="Metrics dashboard">
      <div className="ok-container">
        <div className={styles.header}>
          <span className={styles.badge}>Live Dashboard</span>
          <h2 className={`ok-text-h2 ${styles.title}`}>Institutional Transparency</h2>
          <p className={`ok-text-body-lg ${styles.subtitle}`}>
            Real-time metrics from verified sources across all 36 states and the FCT.
          </p>
        </div>
        <div className={styles.grid}>
          {metrics.map((metric) => (
            <MetricCard key={metric.label} {...metric} />
          ))}
        </div>
      </div>
    </section>
  );
}
