'use client';

import React from 'react';

import { useOperationalHydration } from '@/hooks/use-operational-hydration';
import OperationsShell from '@/shells/operations-shell';
import { VerificationStore } from '@/stores/verification-store';

import styles from './page.module.css';

export default function VerifyPage() {
  useOperationalHydration();
  const { submissions } = VerificationStore.useStore();

  const statusCounts = {
    incoming: submissions.length,
    processing: submissions.filter((s) => s.status === 'processing').length,
    verified: submissions.filter((s) => s.status === 'verified').length,
    flagged: submissions.filter((s) => s.status === 'flagged').length,
    escalated: submissions.filter((s) => s.status === 'escalated').length,
  };

  return (
    <OperationsShell>
      <div className={styles.page}>
        <div className={styles.header}>
          <h2 className="cmd-text-h1">Verify Operations Center</h2>
          <p className="cmd-text-body">Election day operational center for verification and incident detection.</p>
        </div>

        <div className={styles.stats}>
          {[
            { label: 'Incoming', value: String(statusCounts.incoming), color: 'green' },
            { label: 'Processing', value: String(statusCounts.processing), color: 'amber' },
            { label: 'Verified', value: String(statusCounts.verified), color: 'green' },
            { label: 'Flagged', value: String(statusCounts.flagged), color: 'red' },
            { label: 'Escalated', value: String(statusCounts.escalated), color: 'red' },
          ].map((stat) => (
            <div key={stat.label} className={`cmd-glass-card ${styles.statCard}`}>
              <span className={styles.statLabel}>{stat.label}</span>
              <span className={styles.statValue}>{stat.value}</span>
            </div>
          ))}
        </div>

        <div className={`cmd-glass-panel ${styles.queuePanel}`}>
          <div className={styles.queueHeader}>
            <h3 className="cmd-text-h2">Verification Queue</h3>
            <div className={styles.filters}>
              <button type="button" className="cmd-btn cmd-btn-secondary">All</button>
              <button type="button" className="cmd-btn cmd-btn-ghost">Pending</button>
              <button type="button" className="cmd-btn cmd-btn-ghost">Flagged</button>
              <button type="button" className="cmd-btn cmd-btn-ghost">Escalated</button>
            </div>
          </div>
          <div className={styles.tableWrapper}>
            <table className="cmd-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Type</th>
                  <th>Polling Unit</th>
                  <th>Status</th>
                  <th>Confidence</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {submissions.map((sub) => (
                  <tr key={sub.id}>
                    <td className={styles.mono}>{sub.id}</td>
                    <td>{sub.type}</td>
                    <td>{sub.unit}</td>
                    <td>
                      <span className={`${styles.badge} ${styles[`badge${sub.status}`]}`}>{sub.status}</span>
                    </td>
                    <td>
                      <div className={styles.confidenceBar}>
                        <div
                          className={styles.confidenceFill}
                          style={{
                            width: `${sub.confidence}%`,
                            background: sub.confidence > 90 ? '#0F7B5F' : sub.confidence > 70 ? '#F59E0B' : '#D62839',
                          }}
                        />
                        <span>{sub.confidence}%</span>
                      </div>
                    </td>
                    <td className={styles.muted}>{sub.time}</td>
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
