'use client';

import { useEffect } from 'react';

import { realtimeAdapter } from '@/runtime/realtime/realtime-adapter';
import { syntheticInjector } from '@/runtime/synthetic/synthetic-injector';
import { IncidentStore } from '@/stores/incident-store';
import { InitiativesStore } from '@/stores/initiatives-store';
import { ModerationStore } from '@/stores/moderation-store';
import { NotificationStore } from '@/stores/notification-store';
import { RealtimeStore } from '@/stores/realtime-store';
import { SyncStore } from '@/stores/sync-store';
import { TreasuryStore } from '@/stores/treasury-store';
import { VerificationStore } from '@/stores/verification-store';

export function useOperationalHydration() {
  const dispatchInitiatives = InitiativesStore.useDispatch();
  const dispatchIncidents = IncidentStore.useDispatch();
  const dispatchVerifications = VerificationStore.useDispatch();
  const dispatchTreasury = TreasuryStore.useDispatch();
  const dispatchModeration = ModerationStore.useDispatch();
  const dispatchNotifications = NotificationStore.useDispatch();
  const dispatchRealtime = RealtimeStore.useDispatch();
  const dispatchSync = SyncStore.useDispatch();

  useEffect(() => {
    dispatchInitiatives({
      type: 'SET_INITIATIVES',
      payload: [
        { id: '1', title: 'One Vote One PVC', state: 'active', volunteers: 1247, funding: 2400000, impact: '2.4M verifications', createdAt: Date.now() - 86400000, updatedAt: Date.now() },
        { id: '2', title: 'Verify Nigeria 2026', state: 'active', volunteers: 892, funding: 1800000, impact: '1.2M submissions', createdAt: Date.now() - 172800000, updatedAt: Date.now() },
        { id: '3', title: 'Civic Education Drive', state: 'under_review', volunteers: 0, funding: 500000, impact: 'Pending', createdAt: Date.now() - 259200000, updatedAt: Date.now() },
        { id: '4', title: 'Emergency Response Kit', state: 'approved', volunteers: 156, funding: 750000, impact: 'Ready to deploy', createdAt: Date.now() - 345600000, updatedAt: Date.now() },
        { id: '5', title: 'Transparency Portal', state: 'voting', volunteers: 0, funding: 300000, impact: 'Voting open', createdAt: Date.now() - 432000000, updatedAt: Date.now() },
      ],
    });

    dispatchIncidents({
      type: 'SET_INCIDENTS',
      payload: [
        { id: 'I-0234', level: 'low', title: 'Minor reporting delay', region: 'South West', assignee: 'Team A', status: 'open', time: '30 min ago' },
        { id: 'I-0233', level: 'moderate', title: 'Polling unit access issue', region: 'North Central', assignee: 'Team B', status: 'in_progress', time: '1 hr ago' },
        { id: 'I-0232', level: 'severe', title: 'Coordinated misinformation campaign', region: 'South South', assignee: 'Team C', status: 'escalated', time: '2 hrs ago' },
        { id: 'I-0231', level: 'low', title: 'Volunteer check-in delay', region: 'South East', assignee: 'Team D', status: 'resolved', time: '3 hrs ago' },
      ],
    });

    dispatchVerifications({
      type: 'SET_SUBMISSIONS',
      payload: [
        { id: 'V-28471', type: 'PVC Registration', unit: 'Lagos Island PU 12', status: 'pending', confidence: 92, time: '2 min ago' },
        { id: 'V-28470', type: 'Incident Report', unit: 'Port Harcourt PU 08', status: 'flagged', confidence: 45, time: '5 min ago' },
        { id: 'V-28469', type: 'Verification Photo', unit: 'Kano Municipal PU 34', status: 'verified', confidence: 98, time: '8 min ago' },
        { id: 'V-28468', type: 'PVC Registration', unit: 'Abuja Maitama PU 05', status: 'processing', confidence: 78, time: '12 min ago' },
        { id: 'V-28467', type: 'Incident Report', unit: 'Enugu North PU 21', status: 'escalated', confidence: 67, time: '18 min ago' },
      ],
    });

    dispatchTreasury({
      type: 'SET_TRANSACTIONS',
      txs: [
        { id: 'TX-1042', type: 'Donation', amount: 50000, donor: 'Anonymous', initiative: 'One Vote One PVC', status: 'confirmed', time: '2 min ago' },
        { id: 'TX-1041', type: 'Allocation', amount: 200000, donor: 'Treasury', initiative: 'Civic Education Drive', status: 'pending_cso', time: '15 min ago' },
        { id: 'TX-1040', type: 'Release', amount: 150000, donor: 'Treasury', initiative: 'Emergency Response Kit', status: 'approved', time: '1 hr ago' },
        { id: 'TX-1039', type: 'Donation', amount: 25000, donor: 'CSO Partner', initiative: 'Verify Nigeria 2026', status: 'confirmed', time: '2 hrs ago' },
        { id: 'TX-1038', type: 'Expenditure', amount: 75000, donor: 'Treasury', initiative: 'Transparency Portal', status: 'audited', time: '3 hrs ago' },
      ],
    });

    dispatchModeration({
      type: 'SET_ITEMS',
      payload: [
        { id: 'M-1042', queue: 'misinformation_queue', report: 'False PVC link on Twitter', reporter: '@citizen123', status: 'pending' },
        { id: 'M-1041', queue: 'misinformation_queue', report: 'Fabricated turnout numbers', reporter: '@observer_nigeria', status: 'under_review' },
        { id: 'A-0219', queue: 'abuse_reports', report: 'Harassment of volunteer', reporter: 'Anonymous', status: 'pending' },
        { id: 'F-0103', queue: 'fraud_review', report: 'Duplicate donation attempt', reporter: 'System', status: 'under_review' },
      ],
    });

    dispatchNotifications({
      type: 'ADD_NOTIFICATION',
      payload: {
        id: 'N-001',
        type: 'incident_alert',
        severity: 'critical',
        message: 'Coordinated misinformation campaign detected',
        read: false,
        timestamp: Date.now(),
        groupKey: 'incidents',
      },
    });

    dispatchRealtime({ type: 'SET_STATUS', status: 'connected' });
    dispatchSync({ type: 'SET_STATUS', status: 'synchronized' });

    realtimeAdapter.connect();

    syntheticInjector.startStream({
      streamId: 'operational-heartbeat',
      intervalMs: 15000,
      eventDomain: 'sync',
      eventType: 'sync_started',
      payloadGenerator: () => ({ latency: Math.floor(Math.random() * 200) }),
    });

    return () => {
      syntheticInjector.stopAll();
      realtimeAdapter.disconnect();
    };
  }, [
    dispatchInitiatives, dispatchIncidents, dispatchVerifications, dispatchTreasury,
    dispatchModeration, dispatchNotifications, dispatchRealtime, dispatchSync,
  ]);
}
