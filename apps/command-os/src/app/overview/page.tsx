'use client';

import React from 'react';

import { useOperationalHydration } from '@/hooks/use-operational-hydration';
import OperationsShell from '@/shells/operations-shell';
import { IncidentStore } from '@/stores/incident-store';
import { InitiativesStore } from '@/stores/initiatives-store';
import { ModerationStore } from '@/stores/moderation-store';
import { RealtimeStore } from '@/stores/realtime-store';
import { TreasuryStore } from '@/stores/treasury-store';
import { VerificationStore } from '@/stores/verification-store';

import styles from './page.module.css';

export default function OverviewPage() {
  useOperationalHydration();

  const initiatives = InitiativesStore.useStore().initiatives;
  const incidents = IncidentStore.useStore().incidents;
  const verificationStats = VerificationStore.useStore().stats;
  const treasuryTxs = TreasuryStore.useStore().transactions;
  const moderationItems = ModerationStore.useStore().items;
  const realtime = RealtimeStore.useStore();

  const activeInitiatives = initiatives.filter((i) => i.state === 'active').length;
  const openIncidents = incidents.filter((i) => i.status !== 'resolved').length;
  const pendingModeration = moderationItems.filter((i) => i.status === 'pending').length;
  const totalDonations = treasuryTxs.reduce((sum, tx) => (tx.type === 'Donation' ? sum + tx.amount : sum), 0);

  const panels = [
    { label: 'Live Activity Feed', value: '2,847', change: '+12%', status: 'green' as const },
    { label: 'Active Initiatives', value: String(activeInitiatives), change: `+${activeInitiatives}`, status: 'green' as const },
    { label: 'Incident Alerts', value: String(openIncidents), change: openIncidents > 3 ? '+2' : '-2', status: openIncidents > 3 ? ('amber' as const) : ('green' as const) },
    { label: 'Verification Volume', value: `${verificationStats.incoming / 1000}K`, change: '+8%', status: 'green' as const },
    { label: 'Regional Health', value: '36/36', change: '100%', status: 'green' as const },
    { label: 'Donation Flow', value: `₦${(totalDonations / 1000).toFixed(0)}K`, change: '+15%', status: 'green' as const },
    { label: 'Treasury Snapshot', value: '₦2.4M', change: 'Stable', status: 'green' as const },
    { label: 'Volunteer Activity', value: '12,847', change: '+234', status: 'green' as const },
    { label: 'Moderation Queue', value: String(pendingModeration), change: pendingModeration > 5 ? '+3' : '-1', status: pendingModeration > 5 ? ('amber' as const) : ('green' as const) },
  ];

  return (
    <OperationsShell>
      <div className={styles.page}>
        <div className={styles.header}>
          <h2 className="cmd-text-h1">National Operational Snapshot</h2>
          <p className="cmd-text-body">Real-time coordination across all 36 states and the FCT.</p>
          <div className={styles.realtimeBadge}>
            <span className={`${styles.statusDot} ${styles[`status${realtime.status}`]}`} aria-hidden="true" />
            <span className={styles.statusText}>{realtime.status}</span>
            <span className={styles.latency}>{realtime.latency}ms</span>
          </div>
        </div>

        <div className={styles.grid}>
          {panels.map((panel) => (
            <div key={panel.label} className={`cmd-glass-card ${styles.card}`}>
              <span className={styles.cardLabel}>{panel.label}</span>
              <div className={styles.cardValueRow}>
                <span className={styles.cardValue}>{panel.value}</span>
                <span className={`${styles.cardChange} ${styles[`status${panel.status}`]}`}>{panel.change}</span>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.sections}>
          <section className={`cmd-glass-panel ${styles.section}`}>
            <h3 className="cmd-text-h2">Recent Activity</h3>
            <div className={styles.activityList}>
              {[
                'New PVC registration verified in Lagos — 2 min ago',
                'Initiative "One Vote One PVC" milestone reached in Kano — 15 min ago',
                'Incident report submitted in Rivers — 32 min ago',
                'Volunteer assignment completed in Abuja — 1 hr ago',
                'Treasury allocation approved for civic education — 2 hrs ago',
              ].map((item, i) => (
                <div key={i} className={styles.activityItem}>
                  <span className={styles.activityDot} />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </section>

          <section className={`cmd-glass-panel ${styles.section}`}>
            <h3 className="cmd-text-h2">Regional Status</h3>
            <div className={styles.regionList}>
              {[
                { name: 'North Central', status: 'Operational', health: 98 },
                { name: 'North East', status: 'Operational', health: 95 },
                { name: 'North West', status: 'Operational', health: 97 },
                { name: 'South East', status: 'Operational', health: 99 },
                { name: 'South South', status: 'Caution', health: 88 },
                { name: 'South West', status: 'Operational', health: 96 },
              ].map((region) => (
                <div key={region.name} className={styles.regionItem}>
                  <div className={styles.regionInfo}>
                    <span className={styles.regionName}>{region.name}</span>
                    <span className={styles.regionStatus}>{region.status}</span>
                  </div>
                  <div className={styles.regionBar}>
                    <div
                      className={styles.regionBarFill}
                      style={{
                        width: `${region.health}%`,
                        background: region.health > 90 ? '#0F7B5F' : region.health > 80 ? '#F59E0B' : '#D62839',
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </OperationsShell>
  );
}
