'use client';

import React from 'react';

import { useOperationalHydration } from '@/hooks/use-operational-hydration';
import OperationsShell from '@/shells/operations-shell';
import { ModerationStore } from '@/stores/moderation-store';

import styles from './page.module.css';

const queueNames: Record<string, string> = {
  misinformation_queue: 'Misinformation Queue',
  abuse_reports: 'Abuse Reports',
  fraud_review: 'Fraud Review',
  initiative_disputes: 'Initiative Disputes',
  impersonation_reports: 'Impersonation Reports',
  escalation_reviews: 'Escalation Reviews',
};

export default function ModerationPage() {
  useOperationalHydration();
  const { items } = ModerationStore.useStore();

  const grouped = items.reduce<Record<string, typeof items>>((acc, item) => {
    if (!acc[item.queue]) acc[item.queue] = [];
    acc[item.queue].push(item);
    return acc;
  }, {});

  return (
    <OperationsShell>
      <div className={styles.page}>
        <div className={styles.header}>
          <h2 className="cmd-text-h1">Moderation System</h2>
          <p className="cmd-text-body">Review queues and moderation actions. All actions are auditable.</p>
        </div>

        <div className={styles.queues}>
          {Object.entries(grouped).map(([queueId, queueItems]) => (
            <div key={queueId} className={`cmd-glass-panel ${styles.queueCard}`}>
              <div className={styles.queueHeader}>
                <div>
                  <h3 className="cmd-text-h3">{queueNames[queueId] || queueId}</h3>
                  <span className={styles.queueMeta}>{queueItems.length} pending</span>
                </div>
                <span className={styles.queueCount}>{queueItems.length}</span>
              </div>
              <div className={styles.queueItems}>
                {queueItems.map((item) => (
                  <div key={item.id} className={styles.queueItem}>
                    <div className={styles.itemHeader}>
                      <span className={styles.itemId}>{item.id}</span>
                      <span className={`${styles.itemStatus} ${styles[`status${item.status.replace(' ', '')}`]}`}>
                        {item.status}
                      </span>
                    </div>
                    <p className={styles.itemReport}>{item.report}</p>
                    <span className={styles.itemReporter}>Reported by: {item.reporter}</span>
                    <div className={styles.itemActions}>
                      <button type="button" className="cmd-btn cmd-btn-primary">Warn</button>
                      <button type="button" className="cmd-btn cmd-btn-secondary">Suspend</button>
                      <button type="button" className="cmd-btn cmd-btn-danger">Remove</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </OperationsShell>
  );
}
