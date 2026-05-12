'use client';

import React from 'react';

import WorkspaceInitializerOverlay from '@/components/auth/workspace-initializer-overlay';
import OperationalAccessGrid from '@/components/demo/operational-access-grid';
import ScenarioOrchestratorSwitcher from '@/components/demo/scenario-orchestrator-switcher';

import styles from './page.module.css';

export default function DemoAccessPage() {
  return (
    <>
      <div className={styles.page}>
        <div className={styles.container}>
          <div className={styles.header}>
            <h1 className={styles.title}>Demo Access</h1>
            <p className={styles.subtitle}>
              Select a scenario and enter any operational workspace instantly.
            </p>
          </div>
          <ScenarioOrchestratorSwitcher />
          <OperationalAccessGrid />
        </div>
      </div>
      <WorkspaceInitializerOverlay />
    </>
  );
}
