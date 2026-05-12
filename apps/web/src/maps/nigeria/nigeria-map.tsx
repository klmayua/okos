import React from 'react';

import styles from './nigeria-map.module.css';

const states = [
  { name: 'Lagos', x: 18, y: 65, active: true },
  { name: 'Abuja', x: 42, y: 48, active: true },
  { name: 'Kano', x: 38, y: 22, active: true },
  { name: 'Rivers', x: 28, y: 72, active: true },
  { name: 'Kaduna', x: 35, y: 32, active: true },
  { name: 'Oyo', x: 15, y: 58, active: true },
  { name: 'Enugu', x: 32, y: 62, active: true },
  { name: 'Delta', x: 24, y: 68, active: true },
];

export default function NigeriaMap() {
  return (
    <section className={`ok-section-lg ${styles.section}`} aria-label="Map experience">
      <div className="ok-container">
        <div className={styles.header}>
          <span className={styles.badge}>Interactive Map</span>
          <h2 className={`ok-text-h2 ${styles.title}`}>Nationwide Activation</h2>
          <p className={`ok-text-body-lg ${styles.subtitle}`}>
            Explore civic activity across all 36 states and the Federal Capital Territory.
          </p>
        </div>
        <div className={styles.mapContainer}>
          <div className={styles.map}>
            <svg viewBox="0 0 100 100" className={styles.svg} aria-hidden="true">
              {/* Background */}
              <rect width="100" height="100" rx="24" fill="#0A0A0B" />
              <rect width="100" height="100" rx="24" fill="url(#mapGrad)" />
              
              <defs>
                <linearGradient id="mapGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0A0A0B" />
                  <stop offset="100%" stopColor="#0D5C46" stopOpacity="0.4" />
                </linearGradient>
              </defs>

              {/* Nigeria outline approximation */}
              <path
                d="M30 10 L55 8 L75 15 L85 30 L88 50 L82 70 L70 85 L50 90 L30 85 L15 70 L10 50 L15 30 L20 20 Z"
                fill="none"
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="0.5"
              />

              {/* Grid lines */}
              {Array.from({ length: 10 }).map((_, i) => (
                <line key={`h-${i}`} x1="0" y1={i * 10} x2="100" y2={i * 10} stroke="rgba(255,255,255,0.03)" strokeWidth="0.3" />
              ))}
              {Array.from({ length: 10 }).map((_, i) => (
                <line key={`v-${i}`} x1={i * 10} y1="0" x2={i * 10} y2="100" stroke="rgba(255,255,255,0.03)" strokeWidth="0.3" />
              ))}

              {/* State markers */}
              {states.map((state) => (
                <g key={state.name}>
                  <circle
                    cx={state.x}
                    cy={state.y}
                    r="3"
                    fill={state.active ? '#0F7B5F' : 'rgba(255,255,255,0.2)'}
                    opacity="0.8"
                  />
                  <circle
                    cx={state.x}
                    cy={state.y}
                    r="6"
                    fill="none"
                    stroke={state.active ? '#0F7B5F' : 'rgba(255,255,255,0.1)'}
                    strokeWidth="0.5"
                    opacity="0.4"
                  >
                    <animate attributeName="r" values="6;8;6" dur="3s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.4;0.1;0.4" dur="3s" repeatCount="indefinite" />
                  </circle>
                  <text
                    x={state.x}
                    y={state.y + 6}
                    textAnchor="middle"
                    fill="rgba(255,255,255,0.5)"
                    fontSize="3"
                    fontWeight="500"
                  >
                    {state.name}
                  </text>
                </g>
              ))}
            </svg>
          </div>
          <div className={styles.legend}>
            <div className={styles.legendItem}>
              <span className={styles.legendDot} style={{ background: '#0F7B5F' }} />
              <span>Active</span>
            </div>
            <div className={styles.legendItem}>
              <span className={styles.legendDot} style={{ background: '#C8A44D' }} />
              <span>Target</span>
            </div>
            <div className={styles.legendItem}>
              <span className={styles.legendDot} style={{ background: 'rgba(255,255,255,0.3)' }} />
              <span>Pending</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
