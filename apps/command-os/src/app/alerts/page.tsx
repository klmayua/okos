'use client';

import React from 'react';

import { useOperationalHydration } from '@/hooks/use-operational-hydration';
import OperationsShell from '@/shells/operations-shell';
import { IncidentStore } from '@/stores/incident-store';
import { VerificationStore } from '@/stores/verification-store';

import styles from './page.module.css';

export default function AlertsPage() {
  useOperationalHydration();
  const incidents = IncidentStore.useStore().incidents;
  const submissions = VerificationStore.useStore().submissions;

  const alerts: Array<{
    id: string;
    type: string;
    severity: 'informational' | 'caution' | 'warning' | 'critical';
    region: string;
    time: string;
    message: string;
  }> = [
    ...incidents
      .filter((i) => i.level !== 'low')
      .map((i) => ({
        id: i.id,
        type: i.level === 'emergency' ? 'Moderation Emergency' : 'Regional Incident',
        severity: i.level === 'severe' || i.level === 'emergency' ? ('critical' as const) : ('warning' as const),
        region: i.region,
        time: i.time,
        message: i.title,
      })),
    ...submissions
      .filter((s) => s.status === 'flagged' || s.status === 'escalated')
      .map((s) => ({
        id: s.id,
        type: s.status === 'escalated' ? 'Verification Spike' : 'Misinformation',
        severity: s.status === 'escalated' ? ('warning' as const) : ('caution' as const),
        region: s.unit,
        time: s.time,
        message: `${s.type} flagged at ${s.unit}`,
      })),
  ];

  const counts = {
    informational: alerts.filter((a) => a.severity === 'informational').length,
    caution: alerts.filter((a) => a.severity === 'caution').length,
    warning: alerts.filter((a) => a.severity === 'warning').length,
    critical: alerts.filter((a) => a.severity === 'critical').length,
  };

  const severityStyles: Record<string, { class: string; label: string }> = {
    informational: { class: styles.sevInfo, label: 'Info' },
    caution: { class: styles.sevCaution, label: 'Caution' },
    warning: { class: styles.sevWarning, label: 'Warning' },
    critical: { class: styles.sevCritical, label: 'Critical' },
  };

  return (
    <OperationsShell>
      <div className={styles.page}>
        <div className={styles.header}>
          <h2 className="cmd-text-h1">Alert Center</h2>
          <p className="cmd-text-body">Operational alerts and incident notifications.</p>
        </div>

        <div className={styles.stats}>
          {[
            { label: 'Informational', count: counts.informational, color: 'blue' },
            { label: 'Caution', count: counts.caution, color: 'amber' },
            { label: 'Warning', count: counts.warning, color: 'orange' },
            { label: 'Critical', count: counts.critical, color: 'red' },
          ].map((s) => (
            <div key={s.label} className={`cmd-glass-card ${styles.statCard}`}>
              <span className={styles.statCount}>{s.count}</span>
              <span className={styles.statLabel}>{s.label}</span>
            </div>
          ))}
        </div>

        <div className={`cmd-glass-panel ${styles.alertList}`}>
          <h3 className="cmd-text-h2">Active Alerts</h3>
          <div className={styles.list}>
            {alerts.map((alert) => {
              const sev = severityStyles[alert.severity];
              return (
                <div key={alert.id} className={styles.alertItem}>
                  <div className={styles.alertHeader}>
                    <span className={`${styles.severityBadge} ${sev.class}`}>{sev.label}</span>
                    <span className={styles.alertType}>{alert.type}</span>
                    <span className={styles.alertId}>{alert.id}</span>
                    <span className={styles.alertTime}>{alert.time}</span>
                  </div>
                  <p className={styles.alertMessage}>{alert.message}</p>
                  <span className={styles.alertRegion}>Region: {alert.region}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </OperationsShell>
  );
}
