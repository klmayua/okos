'use client';

/* eslint-disable import/order */
import React from 'react';

import { useDemoSession } from '@/stores/demo-session-store';
import OperationalAccessCard from './operational-access-card';

import styles from './operational-access-grid.module.css';
/* eslint-enable import/order */

const cards = [
  { id: 'citizen-view', title: 'Citizen View', route: '/', accent: 'emerald', description: 'Public civic transparency and initiative experience.' },
  { id: 'operations-command', title: 'Operations Command', route: '/overview', accent: 'graphite', description: 'National coordination, incidents, verification, and realtime orchestration.' },
  { id: 'verification-desk', title: 'Verification Desk', route: '/verify', accent: 'green', description: 'Election verification and evidence intake systems.' },
  { id: 'treasury-oversight', title: 'Treasury Oversight', route: '/treasury', accent: 'gold', description: 'Transparent allocation, auditing, and release governance.' },
  { id: 'initiative-coordination', title: 'Initiative Coordination', route: '/initiatives', accent: 'emerald', description: 'Nationwide initiative orchestration and execution.' },
  { id: 'moderation-center', title: 'Moderation Center', route: '/moderation', accent: 'amber', description: 'Narrative review, misinformation response, escalation workflows.' },
  { id: 'governance-chamber', title: 'Governance Chamber', route: '/governance', accent: 'slate', description: 'Movement governance, voting systems, constitutional operations.' },
  { id: 'cso-observer', title: 'CSO Observer', route: '/audit', accent: 'neutral', description: 'Independent audit visibility and institutional observation.' },
  { id: 'emergency-response', title: 'Emergency Response', route: '/incidents', accent: 'crimson', description: 'Escalation management and national incident coordination.' },
  { id: 'admin-core', title: 'Admin Core', route: '/admin-overview', accent: 'sovereign', description: 'Complete systems administration and operational oversight.' },
] as const;

export default function OperationalAccessGrid() {
  const { setRole, initializeWorkspace } = useDemoSession();

  const handleCardClick = (cardId: typeof cards[number]['id'], route: string) => {
    setRole(cardId);
    initializeWorkspace();
    setTimeout(() => {
      window.location.href = route;
    }, 1400);
  };

  return (
    <div className={styles.grid}>
      {cards.map((card) => (
        <OperationalAccessCard
          key={card.id}
          title={card.title}
          route={card.route}
          accent={card.accent}
          description={card.description}
          onClick={() => handleCardClick(card.id, card.route)}
        />
      ))}
    </div>
  );
}
