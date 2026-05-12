'use client';

import React from 'react';

import { useOperationalHydration } from '@/hooks/use-operational-hydration';
import OperationsShell from '@/shells/operations-shell';
import { IncidentStore } from '@/stores/incident-store';

import styles from './page.module.css';

export default function IncidentsPage() {
  useOperationalHydration();
  const { incidents } = IncidentStore.useStore();

  const levelCounts = {
    low: incidents.filter((i) => i.level === 'low').length,
    moderate: incidents.filter((i) => i.level === 'moderate').length,
    severe: incidents.filter((i) => i.level === 'severe').length,
    emergency: incidents.filter((i) => i.level === 'emergency').length,
  };

  return (
    <OperationsShell>
      <div className={styles.page}>
        <div className={styles.header}>
          <h2 className="cmd-text-h1">Incident Response</h2>
          <p className="cmd-text-body">Incident creation, escalation, and resolution tracking.</p>
        </div>

        <div className={styles.levels}>
          {[
            { label: 'Low', count: levelCounts.low, color: styles.levelLow },
            { label: 'Moderate', count: levelCounts.moderate, color: styles.levelModerate },
            { label: 'Severe', count: levelCounts.severe, color: styles.levelSevere },
            { label: 'Emergency', count: levelCounts.emergency, color: styles.levelEmergency },
          ].map((lvl) => (
            <div key={lvl.label} className={`cmd-glass-card ${styles.levelCard}`}>
              <span className={`${styles.levelBadge} ${lvl.color}`}>{lvl.label}</span>
              <span className={styles.levelCount}>{lvl.count}</span>
            </div>
          ))}
        </div>

        <div className={`cmd-glass-panel ${styles.incidentList}`}>
          <h3 className="cmd-text-h2">Active Incidents</h3>
          <div className={styles.tableWrapper}>
            <table className="cmd-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Level</th>
                  <th>Title</th>
                  <th>Region</th>
                  <th>Assignee</th>
                  <th>Status</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {incidents.map((inc) => (
                  <tr key={inc.id}>
                    <td className={styles.mono}>{inc.id}</td>
                    <td>
                      <span className={`${styles.levelBadge} ${styles[`level${inc.level.charAt(0).toUpperCase() + inc.level.slice(1)}`]}`}>
                        {inc.level}
                      </span>
                    </td>
                    <td>{inc.title}</td>
                    <td>{inc.region}</td>
                    <td>{inc.assignee}</td>
                    <td>
                      <span className={`${styles.statusBadge} ${styles[`status${inc.status.replace(' ', '')}`]}`}>
                        {inc.status}
                      </span>
                    </td>
                    <td className={styles.muted}>{inc.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </OperationsShell>
  );
}
