'use client';

import React from 'react';

import { useDemoSession } from '@/stores/demo-session-store';

import styles from './workspace-initializer-overlay.module.css';

const steps = [
  'Initializing synthetic streams',
  'Hydrating operational stores',
  'Connecting realtime feeds',
  'Applying scenario mutations',
  'Loading workspace',
];

export default function WorkspaceInitializerOverlay() {
  const { state } = useDemoSession();

  if (!state.workspaceLoading) return null;

  const currentStepIndex = Math.min(
    Math.floor((state.initializationProgress / 100) * steps.length),
    steps.length - 1
  );

  return (
    <div className={styles.overlay} role="status" aria-live="polite" aria-label="Workspace initialization">
      <div className={styles.content}>
        <div className={styles.spinner} aria-hidden="true">
          <div className={styles.spinnerRing} />
        </div>

        <h3 className={styles.title}>Initializing Workspace</h3>

        <div className={styles.steps}>
          {steps.map((step, i) => (
            <div
              key={step}
              className={`${styles.step} ${i <= currentStepIndex ? styles.stepComplete : ''} ${i === currentStepIndex ? styles.stepActive : ''}`}
            >
              <span className={styles.stepNumber}>{i + 1}</span>
              <span className={styles.stepLabel}>{step}</span>
            </div>
          ))}
        </div>

        <div className={styles.progressTrack} aria-hidden="true">
          <div
            className={styles.progressFill}
            style={{ width: `${state.initializationProgress}%` }}
          />
        </div>

        <span className={styles.progressValue}>{Math.round(state.initializationProgress)}%</span>
      </div>
    </div>
  );
}
