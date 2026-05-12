'use client';

import React from 'react';

import { useOperationalHydration } from '@/hooks/use-operational-hydration';
import OperationsShell from '@/shells/operations-shell';
import { InitiativesStore } from '@/stores/initiatives-store';

import styles from './page.module.css';

const stateOrder = [
  'draft', 'under_review', 'voting', 'approved', 'active',
  'paused', 'escalated', 'completed', 'archived',
];

export default function InitiativesPage() {
  useOperationalHydration();
  const initiatives = InitiativesStore.useStore().initiatives;

  return (
    <OperationsShell>
      <div className={styles.page}>
        <div className={styles.header}>
          <h2 className="cmd-text-h1">Initiatives Console</h2>
          <p className="cmd-text-body">Nationwide initiative coordination and pipeline management.</p>
        </div>

        <div className={styles.pipeline}>
          <h3 className="cmd-text-h2">Initiative Pipeline</h3>
          <div className={styles.states}>
            {stateOrder.map((state) => (
              <div key={state} className={styles.stateColumn}>
                <div className={styles.stateHeader}>
                  <span className={styles.stateName}>{state.replace('_', ' ')}</span>
                  <span className={styles.stateCount}>
                    {initiatives.filter((ini) => ini.state === state).length}
                  </span>
                </div>
                <div className={styles.stateCards}>
                  {initiatives
                    .filter((ini) => ini.state === state)
                    .map((ini) => (
                      <div key={ini.id} className={`cmd-glass-card ${styles.initiativeCard}`}>
                        <span className={styles.initiativeTitle}>{ini.title}</span>
                        <div className={styles.initiativeMeta}>
                          <span>Volunteers: {ini.volunteers}</span>
                          <span>Funding: ₦{(ini.funding / 1000000).toFixed(1)}M</span>
                        </div>
                        <span className={styles.initiativeImpact}>{ini.impact}</span>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.tableSection}>
          <h3 className="cmd-text-h2">Initiative Registry</h3>
          <div className={styles.tableWrapper}>
            <table className="cmd-table">
              <thead>
                <tr>
                  <th>Initiative</th>
                  <th>State</th>
                  <th>Volunteers</th>
                  <th>Funding</th>
                  <th>Impact</th>
                </tr>
              </thead>
              <tbody>
                {initiatives.map((ini) => (
                  <tr key={ini.id}>
                    <td>{ini.title}</td>
                    <td>
                      <span className={`${styles.badge} ${styles[`badge${ini.state.replace('_', '')}`]}`}>
                        {ini.state.replace('_', ' ')}
                      </span>
                    </td>
                    <td>{ini.volunteers.toLocaleString()}</td>
                    <td>₦{(ini.funding / 1000000).toFixed(1)}M</td>
                    <td>{ini.impact}</td>
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
