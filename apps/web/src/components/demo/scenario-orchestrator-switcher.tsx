'use client';

import React from 'react';

import { useDemoSession } from '@/stores/demo-session-store';

import styles from './scenario-orchestrator-switcher.module.css';

const scenarios = [
  { id: 'quiet_day', label: 'Quiet Day' },
  { id: 'pvc_mobilization_surge', label: 'PVC Mobilization Surge' },
  { id: 'election_day', label: 'Election Day' },
  { id: 'treasury_audit_week', label: 'Treasury Audit Week' },
  { id: 'misinformation_wave', label: 'Misinformation Wave' },
  { id: 'verification_crisis', label: 'Verification Crisis' },
  { id: 'national_incident_escalation', label: 'National Incident Escalation' },
  { id: 'volunteer_activation_wave', label: 'Volunteer Activation Wave' },
] as const;

export default function ScenarioOrchestratorSwitcher() {
  const { state, setScenario } = useDemoSession();

  return (
    <div className={styles.toolbar} role="toolbar" aria-label="Simulation scenario selector">
      <span className={styles.label}>Simulation Scenario</span>
      <div className={styles.options}>
        {scenarios.map((s) => (
          <button
            key={s.id}
            type="button"
            className={`${styles.option} ${state.selectedScenario === s.id ? styles.active : ''}`}
            onClick={() => setScenario(s.id)}
            aria-pressed={state.selectedScenario === s.id}
          >
            {s.label}
          </button>
        ))}
      </div>
    </div>
  );
}
