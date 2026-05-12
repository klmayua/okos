'use client';

import React from 'react';

import styles from './operational-access-card.module.css';

const accentMap: Record<string, { glow: string; border: string }> = {
  emerald: { glow: 'rgba(13,92,70,0.24)', border: '#0D5C46' },
  graphite: { glow: 'rgba(255,255,255,0.08)', border: '#3A3A3A' },
  green: { glow: 'rgba(15,123,95,0.24)', border: '#0F7B5F' },
  gold: { glow: 'rgba(200,164,77,0.22)', border: '#C8A44D' },
  amber: { glow: 'rgba(245,158,11,0.20)', border: '#F59E0B' },
  crimson: { glow: 'rgba(220,38,38,0.22)', border: '#DC2626' },
  slate: { glow: 'rgba(148,163,184,0.18)', border: '#94A3B8' },
  neutral: { glow: 'rgba(255,255,255,0.06)', border: 'rgba(255,255,255,0.2)' },
  sovereign: { glow: 'rgba(13,92,70,0.26)', border: '#0D5C46' },
};

interface OperationalAccessCardProps {
  title: string;
  route: string;
  accent: string;
  description: string;
  onClick: () => void;
}

export default function OperationalAccessCard({
  title,
  accent,
  description,
  onClick,
}: OperationalAccessCardProps) {
  const colors = accentMap[accent] ?? accentMap.neutral!;

  return (
    <button
      type="button"
      className={styles.card}
      onClick={onClick}
      style={
        {
          '--card-glow': colors.glow,
          '--card-border': colors.border,
        } as React.CSSProperties
      }
    >
      <div className={styles.top}>
        <div className={styles.iconWrapper}>
          <div
            className={styles.statusDot}
            style={{ background: colors.border }}
            aria-hidden="true"
          />
        </div>
        <h3 className={styles.title}>{title}</h3>
      </div>

      <p className={styles.description}>{description}</p>

      <div className={styles.bottom}>
        <span className={styles.buttonLabel}>Enter Workspace</span>
        <span className={styles.badge}>Demo</span>
      </div>
    </button>
  );
}
