'use client';

import React from 'react';

import styles from './featured-initiative.module.css';

export default function FeaturedInitiative() {
  return (
    <section id="initiatives" className={`ok-section-lg ${styles.section}`} aria-label="Featured initiative">
      <div className="ok-container">
        <div className={styles.grid}>
          {/* Left Content */}
          <div className={styles.content}>
            <span className={styles.badge}>Featured Initiative</span>
            <h2 className={`ok-text-h2 ${styles.title}`}>One Vote. One PVC.</h2>
            <p className={`ok-text-body-lg ${styles.description}`}>
              A nationwide civic mobilization to ensure every eligible Nigerian is registered,
              verified, and prepared to vote. We operate with full transparency, real-time
              verification, and community-powered accountability.
            </p>

            {/* Contribution Methods */}
            <div className={styles.methods}>
              <h3 className={`ok-text-h3 ${styles.methodsTitle}`}>How to Contribute</h3>
              <ul className={styles.methodsList}>
                <li className={styles.method}>
                  <span className={styles.methodIcon} aria-hidden="true">1</span>
                  <span className={styles.methodText}>Register or verify your PVC</span>
                </li>
                <li className={styles.method}>
                  <span className={styles.methodIcon} aria-hidden="true">2</span>
                  <span className={styles.methodText}>Volunteer as a community verifier</span>
                </li>
                <li className={styles.method}>
                  <span className={styles.methodIcon} aria-hidden="true">3</span>
                  <span className={styles.methodText}>Share verified information</span>
                </li>
                <li className={styles.method}>
                  <span className={styles.methodIcon} aria-hidden="true">4</span>
                  <span className={styles.methodText}>Report incidents transparently</span>
                </li>
              </ul>
            </div>

            {/* Impact Metrics */}
            <div className={styles.impact}>
              <div className={styles.impactItem}>
                <span className={styles.impactValue}>2.4M</span>
                <span className={styles.impactLabel}>Verifications</span>
              </div>
              <div className={styles.impactItem}>
                <span className={styles.impactValue}>98.2%</span>
                <span className={styles.impactLabel}>Accuracy</span>
              </div>
              <div className={styles.impactItem}>
                <span className={styles.impactValue}>36</span>
                <span className={styles.impactLabel}>States</span>
              </div>
            </div>

            {/* Transparency Metrics */}
            <div className={styles.transparency}>
              <div className={styles.transparencyItem}>
                <span className={styles.transparencyCheck} aria-hidden="true">✓</span>
                <span>Real-time public audit log</span>
              </div>
              <div className={styles.transparencyItem}>
                <span className={styles.transparencyCheck} aria-hidden="true">✓</span>
                <span>Immutable contribution records</span>
              </div>
              <div className={styles.transparencyItem}>
                <span className={styles.transparencyCheck} aria-hidden="true">✓</span>
                <span>Open-source verification protocol</span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className={styles.progress}>
              <div className={styles.progressHeader}>
                <span className={styles.progressLabel}>National PVC Registration</span>
                <span className={styles.progressValue}>78.4%</span>
              </div>
              <div className={styles.progressTrack} aria-hidden="true">
                <div className={styles.progressFill} style={{ width: '78.4%' }} />
              </div>
            </div>

            {/* Community Proof */}
            <div className={styles.community}>
              <div className={styles.communityAvatars} aria-hidden="true">
                <div className={styles.avatar}>A</div>
                <div className={styles.avatar}>B</div>
                <div className={styles.avatar}>C</div>
                <div className={styles.avatar}>D</div>
                <div className={styles.avatar}>E</div>
              </div>
              <span className={styles.communityText}>
                <strong>12,847</strong> citizens verified this week
              </span>
            </div>

            {/* Contribution Actions */}
            <div className={styles.actions}>
              <a href="#participate" className="ok-btn ok-btn-primary">
                Participate
              </a>
              <a href="#donate" className="ok-btn ok-btn-secondary">
                Donate
              </a>
            </div>
          </div>

          {/* Right Visual */}
          <div className={styles.visual}>
            <div className={`ok-glass ${styles.visualCard}`}>
              <div className={styles.mapPlaceholder} aria-label="Activation map placeholder">
                <svg viewBox="0 0 200 200" width="100%" height="100%" aria-hidden="true">
                  <rect width="200" height="200" rx="16" fill="rgba(13,92,70,0.04)" />
                  <circle cx="100" cy="80" r="40" fill="rgba(13,92,70,0.08)" />
                  <circle cx="80" cy="110" r="25" fill="rgba(200,164,77,0.1)" />
                  <circle cx="130" cy="100" r="30" fill="rgba(15,123,95,0.06)" />
                  <text x="100" y="170" textAnchor="middle" fill="#0D5C46" fontSize="12" fontWeight="600">
                    NIGERIA ACTIVATION MAP
                  </text>
                </svg>
              </div>
              <div className={styles.mapLegend}>
                <div className={styles.legendItem}>
                  <span className={styles.legendDot} style={{ background: '#0D5C46' }} />
                  <span>Active</span>
                </div>
                <div className={styles.legendItem}>
                  <span className={styles.legendDot} style={{ background: '#C8A44D' }} />
                  <span>Target</span>
                </div>
                <div className={styles.legendItem}>
                  <span className={styles.legendDot} style={{ background: '#0F7B5F' }} />
                  <span>Verified</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
