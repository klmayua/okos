'use client';

import React from 'react';

import DemoAccessPanel from '@/components/auth/demo-access-panel';
import DemoAuthShell from '@/components/auth/demo-auth-shell';
import InstitutionalIdentityPanel from '@/components/auth/institutional-identity-panel';
import WorkspaceInitializerOverlay from '@/components/auth/workspace-initializer-overlay';
import OperationalAccessGrid from '@/components/demo/operational-access-grid';
import ScenarioOrchestratorSwitcher from '@/components/demo/scenario-orchestrator-switcher';

import styles from './page.module.css';

export default function SignInPage() {
  return (
    <>
      <DemoAuthShell>
        <InstitutionalIdentityPanel />
        <DemoAccessPanel />
      </DemoAuthShell>

      <div className={styles.demoSection}>
        <div className={styles.demoContainer}>
          <div className={styles.demoHeader}>
            <h2 className={styles.demoTitle}>Demo Access</h2>
            <p className={styles.demoSubtitle}>
              Enter curated operational workspaces without authentication.
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
