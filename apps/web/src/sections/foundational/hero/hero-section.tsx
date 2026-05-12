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
            <span className={styles.trustText}>A Civic Movement for National Renewal</span>
          </div>

          {/* Headline */}
          <h1 className={`ok-text-hero ${styles.headline}`}>
            Nigeria Will Not Fix Itself.
          </h1>

          {/* Supporting Statement */}
          <p className={`ok-text-body-lg ${styles.subtext}`}>
            A generation is building the counter-system. OK Movement is creating the civic infrastructure, 
            accountability systems, and people-powered coordination needed to reclaim Nigeria&apos;s future.
          </p>

          {/* CTAs */}
          <div className={styles.ctas}>
            <a href="#join" className="ok-btn ok-btn-primary">
              Join The Movement
            </a>
            <a href="/manifesto" className="ok-btn ok-btn-secondary">
              Read The Manifesto
            </a>
            <a href="#get-involved" className="ok-btn ok-btn-premium">
              Get Involved
            </a>
          </div>

          {/* Quick Metrics */}
          <div className={styles.quickMetrics}>
            <div className={styles.metric}>
              <span className={styles.metricValue}>8,420</span>
              <span className={styles.metricLabel}>Wards Activated</span>
            </div>
            <div className={styles.metricDivider} aria-hidden="true" />
            <div className={styles.metric}>
              <span className={styles.metricValue}>2.4M</span>
              <span className={styles.metricLabel}>Verified Reports</span>
            </div>
            <div className={styles.metricDivider} aria-hidden="true" />
            <div className={styles.metric}>
              <span className={styles.metricValue}>47K</span>
              <span className={styles.metricLabel}>Volunteers</span>
            </div>
            <div className={styles.metricDivider} aria-hidden="true" />
            <div className={styles.metric}>
              <span className={styles.metricValue}>36</span>
              <span className={styles.metricLabel}>States</span>
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
