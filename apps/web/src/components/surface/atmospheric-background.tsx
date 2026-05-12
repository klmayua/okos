'use client';

import React from 'react';

import styles from './atmospheric-background.module.css';

export default function AtmosphericBackground() {
  return (
    <div className={styles.background} aria-hidden="true">
      {/* Gradient base layer */}
      <div className={styles.gradientBase} />

      {/* Overlay glow layers */}
      <div className={styles.overlayGlow1} />
      <div className={styles.overlayGlow2} />
      <div className={styles.overlayGlow3} />

      {/* Animated atmospheric blobs */}
      <div className={`${styles.blob} ${styles.blob1}`} />
      <div className={`${styles.blob} ${styles.blob2}`} />
      <div className={`${styles.blob} ${styles.blob3}`} />
    </div>
  );
}
