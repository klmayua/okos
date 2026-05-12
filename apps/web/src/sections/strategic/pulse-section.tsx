'use client';

import React from 'react';

import styles from './pulse-section.module.css';

const pulseSignals = [
  { category: 'Fuel Scarcity', sentiment: 'High Concern', intensity: 78, region: 'Nationwide' },
  { category: 'Election Tension', sentiment: 'Elevated', intensity: 65, region: 'South-West' },
  { category: 'Youth Mobilization', sentiment: 'Growing', intensity: 52, region: 'North-Central' },
  { category: 'Civic Engagement', sentiment: 'Active', intensity: 71, region: 'Nationwide' },
  { category: 'Misinformation', sentiment: 'Moderate', intensity: 44, region: 'Social Media' },
  { category: 'Governance Dissatisfaction', sentiment: 'High', intensity: 82, region: 'Nationwide' },
];

const narrativeTrends = [
  { topic: 'PVC Registration', trend: '↑ Rising', velocity: 'High' },
  { topic: 'Election Dates', trend: '↑ Rising', velocity: 'Medium' },
  { topic: 'Candidate Visibility', trend: '→ Stable', velocity: 'Low' },
  { topic: 'Voter Education', trend: '↑ Rising', velocity: 'High' },
];

export default function PulseSection() {
  return (
    <section id="pulse" className={`ok-section-lg ${styles.section}`} aria-label="Strategic Pulse">
      <div className="ok-container">
        {/* Header */}
        <div className={styles.header}>
          <span className={styles.badge}>Strategic Pulse</span>
          <h2 className={`ok-text-h2 ${styles.title}`}>Civic Intelligence Layer</h2>
          <p className={styles.subtitle}>
            Real-time narrative mapping and civic sentiment tracking across Nigeria.
          </p>
        </div>

        {/* Main Grid */}
        <div className={styles.grid}>
          {/* Signal Cards */}
          <div className={styles.signalsPanel}>
            <h3 className={styles.panelTitle}>Active Signal Categories</h3>
            <div className={styles.signalList}>
              {pulseSignals.map((signal, index) => (
                <div key={index} className={styles.signalCard}>
                  <div className={styles.signalHeader}>
                    <span className={styles.signalCategory}>{signal.category}</span>
                    <span 
                      className={styles.signalIntensity}
                      data-intensity={signal.intensity > 70 ? 'high' : signal.intensity > 40 ? 'medium' : 'low'}
                    >
                      {signal.intensity}%
                    </span>
                  </div>
                  <div className={styles.signalBar}>
                    <div 
                      className={styles.signalFill} 
                      style={{ width: `${signal.intensity}%` }}
                      data-intensity={signal.intensity > 70 ? 'high' : signal.intensity > 40 ? 'medium' : 'low'}
                    />
                  </div>
                  <div className={styles.signalMeta}>
                    <span className={styles.signalSentiment}>{signal.sentiment}</span>
                    <span className={styles.signalRegion}>{signal.region}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Narrative Trends */}
          <div className={styles.trendsPanel}>
            <h3 className={styles.panelTitle}>Narrative Velocity</h3>
            <div className={styles.trendList}>
              {narrativeTrends.map((trend, index) => (
                <div key={index} className={styles.trendItem}>
                  <span className={styles.trendTopic}>{trend.topic}</span>
                  <span className={styles.trendIndicator} data-trend={trend.trend}>
                    {trend.trend}
                  </span>
                  <span className={styles.trendVelocity}>{trend.velocity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Pulse Summary */}
          <div className={styles.summaryPanel}>
            <h3 className={styles.panelTitle}>National Pulse Index</h3>
            <div className={styles.pulseIndex}>
              <div className={styles.indexValue}>67.4</div>
              <div className={styles.indexLabel}>Civic Activity Score</div>
            </div>
            <div className={styles.indexMetrics}>
              <div className={styles.indexMetric}>
                <span className={styles.indexMetricValue}>↑ 4.2%</span>
                <span className={styles.indexMetricLabel}>Week-over-week</span>
              </div>
              <div className={styles.indexMetric}>
                <span className={styles.indexMetricValue}>Stable</span>
                <span className={styles.indexMetricLabel}>Trend</span>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Indicator */}
        <div className={styles.trustNote}>
          <svg viewBox="0 0 24 24" fill="currentColor" className={styles.trustIcon} aria-hidden="true">
            <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>
          </svg>
          <span>Aggregated from verified civic reports. Not surveillance.</span>
        </div>
      </div>
    </section>
  );
}