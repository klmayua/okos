'use client';

import React from 'react';

import AdminShell from '@/shells/admin-shell';

import styles from './page.module.css';

const modules = [
  { id: 'leadership', title: 'Leadership Structure', description: 'Steward, Guardian, Auditor, Moderator, Coordinator, CSO Partner, Administrator roles and assignments.', count: 7 },
  { id: 'elections', title: 'Election Management', description: 'Election scheduling, candidate registration, and results management.', count: 2 },
  { id: 'voting', title: 'Voting Records', description: 'Historical and current voting records with transparent audit trails.', count: 124 },
  { id: 'constitutional', title: 'Constitutional Logs', description: 'Immutable constitutional amendments and governance decisions.', count: 18 },
  { id: 'proposals', title: 'Governance Proposals', description: 'Active and historical governance proposals with deliberation status.', count: 8 },
  { id: 'meetings', title: 'Meeting Records', description: 'Minutes and transcripts from governance meetings.', count: 42 },
  { id: 'policy', title: 'Policy Registry', description: 'Active policies, procedures, and compliance frameworks.', count: 35 },
];

const roles = [
  { role: 'Steward', holders: 3, description: 'Strategic oversight and constitutional guardianship' },
  { role: 'Guardian', holders: 5, description: 'System integrity and security oversight' },
  { role: 'Auditor', holders: 4, description: 'Financial and operational audit authority' },
  { role: 'Moderator', holders: 8, description: 'Content moderation and dispute resolution' },
  { role: 'Coordinator', holders: 12, description: 'Regional and initiative coordination' },
  { role: 'CSO Partner', holders: 24, description: 'Civil society organization liaison' },
  { role: 'Administrator', holders: 6, description: 'System administration and compliance' },
];

export default function GovernancePage() {
  return (
    <AdminShell>
      <div className={styles.page}>
        <div className={styles.header}>
          <h1 className="cmd-text-h1">Governance System</h1>
          <p className="cmd-text-body">Leadership structure, voting records, and constitutional management.</p>
        </div>

        <div className={styles.modules}>
          {modules.map((mod) => (
            <div key={mod.id} className={`cmd-glass-panel ${styles.moduleCard}`}>
              <div className={styles.moduleHeader}>
                <h3 className="cmd-text-h3">{mod.title}</h3>
                <span className={styles.moduleCount}>{mod.count}</span>
              </div>
              <p className={styles.moduleDesc}>{mod.description}</p>
              <button type="button" className="cmd-btn cmd-btn-primary">Open Module</button>
            </div>
          ))}
        </div>

        <div className={`cmd-glass-panel ${styles.rolesSection}`}>
          <h3 className="cmd-text-h2">Governance Roles</h3>
          <div className={styles.rolesList}>
            {roles.map((r) => (
              <div key={r.role} className={styles.roleItem}>
                <div className={styles.roleInfo}>
                  <span className={styles.roleName}>{r.role}</span>
                  <span className={styles.roleDesc}>{r.description}</span>
                </div>
                <div className={styles.roleHolders}>
                  <span className={styles.holderCount}>{r.holders}</span>
                  <span className={styles.holderLabel}>holders</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
