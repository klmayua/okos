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

          {/* Subtext */}
          <p className={`ok-text-body-lg ${styles.subtext}`}>
            OK Movement is building the civic infrastructure, accountability systems, 
            cultural momentum, and people-powered coordination needed to reclaim Nigeria&apos;s future.
          </p>

          {/* CTAs */}
          <div className={styles.ctas}>
            <a href="#join" className="ok-btn ok-btn-primary">
              Join Movement
            </a>
            <a href="/manifesto" className="ok-btn ok-btn-secondary">
              Read Manifesto
            </a>
            <a
              href="https://cvr.inecnigeria.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="ok-btn ok-btn-premium"
            >
              Get PVC
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
