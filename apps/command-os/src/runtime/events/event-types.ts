/**
 * OK.OS — EVENT TYPES
 * Immutable, append-only, deterministic event orchestration.
 */

export interface OKEvent {
  readonly id: string;
  readonly domain: EventDomain;
  readonly type: string;
  readonly payload: Record<string, unknown>;
  readonly timestamp: number;
  readonly correlationId: string;
  readonly causationId?: string;
}

export type EventDomain =
  | 'initiatives'
  | 'treasury'
  | 'verification'
  | 'incidents'
  | 'volunteers'
  | 'moderation'
  | 'governance'
  | 'narratives'
  | 'donations'
  | 'elections'
  | 'sync'
  | 'audit';

/* ---- INITIATIVES ---- */
export type InitiativeEventType =
  | 'initiative_created'
  | 'initiative_submitted'
  | 'initiative_approved'
  | 'initiative_rejected'
  | 'initiative_activated'
  | 'initiative_escalated'
  | 'initiative_completed';

/* ---- TREASURY ---- */
export type TreasuryEventType =
  | 'donation_received'
  | 'release_requested'
  | 'CSO_review_started'
  | 'treasury_approved'
  | 'treasury_rejected'
  | 'funds_disbursed';

/* ---- VERIFICATION ---- */
export type VerificationEventType =
  | 'upload_received'
  | 'OCR_completed'
  | 'verification_flagged'
  | 'verification_confirmed'
  | 'escalation_triggered';

/* ---- INCIDENTS ---- */
export type IncidentEventType =
  | 'incident_reported'
  | 'incident_acknowledged'
  | 'response_assigned'
  | 'escalation_level_changed'
  | 'incident_resolved';

/* ---- SYNCHRONIZATION ---- */
export type SyncEventType =
  | 'sync_started'
  | 'sync_delayed'
  | 'sync_failed'
  | 'sync_restored';

export function createEvent(
  domain: EventDomain,
  type: string,
  payload: Record<string, unknown>,
  correlationId: string,
  causationId?: string
): OKEvent {
  return {
    id: generateEventId(),
    domain,
    type,
    payload,
    timestamp: Date.now(),
    correlationId,
    causationId,
  };
}

function generateEventId(): string {
  return `evt-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}
