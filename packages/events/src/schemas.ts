export const EVENT_STREAMS = {
  IDENTITY: 'identity',
  CIVIC_ACTION: 'civic_action',
  VERIFICATION: 'verification',
  MODERATION: 'moderation',
  TREASURY: 'treasury',
  GOVERNANCE: 'governance',
  SAFETY: 'safety',
  COMMUNICATION: 'communication',
  SYSTEM: 'system',
} as const;

export type EventStream = typeof EVENT_STREAMS[keyof typeof EVENT_STREAMS];

export interface Event<T = unknown> {
  id: string;
  name: string;
  version: string;
  stream: EventStream;
  actorId: string;
  correlationId: string;
  causationId?: string;
  payload: T;
  metadata: Record<string, unknown>;
  occurredAt: string;
  signature: string;
}

export interface EventSubscription {
  stream: EventStream;
  handler: (event: Event) => Promise<void> | void;
  filter?: (event: Event) => boolean;
}

export const SEED_EVENTS = {
  USER_CREATED: 'user.created',
  USER_VERIFIED: 'user.verified',
  CREDENTIAL_ISSUED: 'credential.issued',
  SIGNAL_SUBMITTED: 'signal.submitted',
  PROJECT_PROPOSED: 'project.proposed',
  FUND_RELEASED: 'fund.released',
  PLEDGE_CREATED: 'pledge.created',
  VOTE_CAST: 'vote.cast',
  ALERT_TRIGGERED: 'alert.triggered',
  PANIC_TRIGGERED: 'panic.triggered',
  MESSAGE_SENT: 'message.sent',
  WORKFLOW_STARTED: 'workflow.started',
  WORKFLOW_COMPLETED: 'workflow.completed',
  AUDIT_RECORDED: 'audit.recorded',
} as const;

export type SeedEvent = typeof SEED_EVENTS[keyof typeof SEED_EVENTS];