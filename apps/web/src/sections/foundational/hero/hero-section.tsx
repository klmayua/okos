'use client';

import React from 'react';

import PVCCard from '@/features/pvc/pvc-card';

import styles from './hero-section.module.css';

export default function HeroSection() {
  return (
    <section className={styles.hero} aria-label="Hero">
      <div className={`ok-container ${styles.grid}`}>
        {/* Left Panel */}
        <div className={styles.leftPanel}>
          {/* Trust Badge */}
          <div className={styles.trustBadge}>
            <span className={styles.trustDot} aria-hidden="true" />
            <span className={styles.trustText}>Official Civic Infrastructure</span>
          </div>

          {/* Headline */}
          <h1 className={`ok-text-hero ${styles.headline}`}>
            Your PVC Is Power.
          </h1>

          {/* Subtext */}
          <p className={`ok-text-body-lg ${styles.subtext}`}>
            Nigeria will not change without your PVC. Before you tweet. Before you complain.
            Register. Verify. Vote. This is your constitutional operating system for civic action.
          </p>

          {/* CTAs */}
          <div className={styles.ctas}>
            <a
              href="https://cvr.inecnigeria.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="ok-btn ok-btn-primary"
            >
              Get Your PVC
            </a>
            <a href="#initiatives" className="ok-btn ok-btn-secondary">
              Explore Initiatives
            </a>
          </div>

          {/* Quick Metrics */}
          <div className={styles.quickMetrics}>
            <div className={styles.metric}>
              <span className={styles.metricValue}>36</span>
              <span className={styles.metricLabel}>States Activated</span>
            </div>
            <div className={styles.metricDivider} aria-hidden="true" />
            <div className={styles.metric}>
              <span className={styles.metricValue}>774</span>
              <span className={styles.metricLabel}>LGAs Covered</span>
            </div>
            <div className={styles.metricDivider} aria-hidden="true" />
            <div className={styles.metric}>
              <span className={styles.metricValue}>100%</span>
              <span className={styles.metricLabel}>Transparency</span>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className={styles.rightPanel}>
          <PVCCard />
        </div>
      </div>
    </section>
  );
}
