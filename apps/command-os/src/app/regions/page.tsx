'use client';

import React from 'react';

import OperationsShell from '@/shells/operations-shell';

import styles from './page.module.css';

const regions = [
  { name: 'North Central', states: 7, volunteers: 2147, initiatives: 4, health: 98, incidents: 1 },
  { name: 'North East', states: 6, volunteers: 1892, initiatives: 3, health: 95, incidents: 2 },
  { name: 'North West', states: 7, volunteers: 2456, initiatives: 4, health: 97, incidents: 1 },
  { name: 'South East', states: 5, volunteers: 1987, initiatives: 3, health: 99, incidents: 0 },
  { name: 'South South', states: 6, volunteers: 2341, initiatives: 3, health: 88, incidents: 3 },
  { name: 'South West', states: 6, volunteers: 2212, initiatives: 4, health: 96, incidents: 1 },
];

export default function RegionsPage() {
  return (
    <OperationsShell>
      <div className={styles.page}>
        <div className={styles.header}>
          <h2 className="cmd-text-h1">Regional Operations</h2>
          <p className="cmd-text-body">Activity and health across all geopolitical zones.</p>
        </div>

        <div className={styles.grid}>
          {regions.map((region) => (
            <div key={region.name} className={`cmd-glass-panel ${styles.regionCard}`}>
              <div className={styles.regionHeader}>
                <h3 className="cmd-text-h3">{region.name}</h3>
                <span className={`${styles.healthBadge} ${region.health > 90 ? styles.healthGood : styles.healthCaution}`}>
                  {region.health}%
                </span>
              </div>
              <div className={styles.regionStats}>
                <div className={styles.stat}>
                  <span className={styles.statValue}>{region.states}</span>
                  <span className={styles.statLabel}>States</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statValue}>{region.volunteers.toLocaleString()}</span>
                  <span className={styles.statLabel}>Volunteers</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statValue}>{region.initiatives}</span>
                  <span className={styles.statLabel}>Initiatives</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statValue}>{region.incidents}</span>
                  <span className={styles.statLabel}>Incidents</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </OperationsShell>
  );
}
