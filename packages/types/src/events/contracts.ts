import type { UUID } from '../domain/identity.js';

export interface Event<T = unknown> {
  id: UUID;
  type: string;
  version: string;
  timestamp: string;
  source: string;
  correlationId?: UUID;
  causationId?: UUID;
  data: T;
}

export interface EventMetadata {
  correlationId?: UUID;
  causationId?: UUID;
  timestamp: string;
  source: string;
  userId?: UUID;
  sessionId?: UUID;
  traceId?: UUID;
  spanId?: UUID;
}

export type EventHandler<T = unknown> = (event: Event<T>) => Promise<void> | void;

export interface EventSubscription {
  eventType: string;
  handler: EventHandler;
  filter?: Record<string, unknown>;
}

export const DOMAIN_EVENTS = {
  USER_CREATED: 'user.created',
  USER_UPDATED: 'user.updated',
  USER_DELETED: 'user.deleted',
  USER_VERIFIED: 'user.verified',
  USER_LOGIN: 'user.login',
  USER_LOGOUT: 'user.logout',
  USER_PASSWORD_CHANGED: 'user.password_changed',
  USER_MFA_ENABLED: 'user.mfa_enabled',
  USER_MFA_DISABLED: 'user.mfa_disabled',

  CITIZEN_REGISTERED: 'citizen.registered',
  CITIZEN_UPDATED: 'citizen.updated',
  CITIZEN_VERIFIED: 'citizen.verified',

  PATHWAY_CREATED: 'pathway.created',
  PATHWAY_PUBLISHED: 'pathway.published',
  PATHWAY_STARTED: 'pathway.started',
  PATHWAY_COMPLETED: 'pathway.completed',
  PATHWAY_PROGRESS_UPDATED: 'pathway.progress_updated',
  MILESTONE_UNLOCKED: 'pathway.milestone_unlocked',
  TASK_COMPLETED: 'pathway.task_completed',

  ACTION_CREATED: 'action.created',
  ACTION_PUBLISHED: 'action.published',
  ACTION_CANCELLED: 'action.cancelled',
  ACTION_COMPLETED: 'action.completed',
  ACTION_JOINED: 'action.joined',
  ACTION_LEFT: 'action.left',
  ACTION_IMPACT_LOGGED: 'action.impact_logged',

  FUND_CREATED: 'fund.created',
  FUND_PUBLISHED: 'fund.published',
  FUND_COMPLETED: 'fund.completed',
  CONTRIBUTION_RECEIVED: 'fund.contribution_received',
  MILESTONE_REACHED: 'fund.milestone_reached',

  PULSE_CREATED: 'pulse.created',
  PULSE_PUBLISHED: 'pulse.published',
  PULSE_CLOSED: 'pulse.closed',
  PULSE_RESPONSE_SUBMITTED: 'pulse.response_submitted',
  PULSE_RESULT_PUBLISHED: 'pulse.result_published',

  INCIDENT_REPORTED: 'incident.reported',
  INCIDENT_UPDATED: 'incident.updated',
  INCIDENT_VERIFIED: 'incident.verified',
  INCIDENT_RESOLVED: 'incident.resolved',

  ELECTION_CREATED: 'election.created',
  ELECTION_STARTED: 'election.started',
  ELECTION_ENDED: 'election.ended',
  BALLOT_ISSUED: 'election.ballot_issued',
  VOTE_CAST: 'election.vote_cast',
  RESULT_PUBLISHED: 'election.result_published',

  COMMUNITY_CREATED: 'community.created',
  COMMUNITY_JOINED: 'community.joined',
  COMMUNITY_LEFT: 'community.left',
  POST_CREATED: 'community.post_created',
  POST_UPDATED: 'community.post_updated',
  POST_DELETED: 'community.post_deleted',
  COMMENT_CREATED: 'community.comment_created',

  VERIFICATION_SUBMITTED: 'verification.submitted',
  VERIFICATION_APPROVED: 'verification.approved',
  VERIFICATION_REJECTED: 'verification.rejected',

  PROPOSAL_CREATED: 'governance.proposal_created',
  PROPOSAL_SUBMITTED: 'governance.proposal_submitted',
  PROPOSAL_VOTING_STARTED: 'governance.proposal_voting_started',
  PROPOSAL_PASSED: 'governance.proposal_passed',
  PROPOSAL_REJECTED: 'governance.proposal_rejected',

  NOTIFICATION_SENT: 'notification.sent',
  NOTIFICATION_DELIVERED: 'notification.delivered',
  NOTIFICATION_READ: 'notification.read',

  AUDIT_LOG_CREATED: 'audit.log_created',
} as const;

export type DomainEventType = (typeof DOMAIN_EVENTS)[keyof typeof DOMAIN_EVENTS];

export interface UserEventData {
  userId: UUID;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}

export interface PathwayEventData {
  pathwayId: UUID;
  title: string;
  userId?: UUID;
  milestoneId?: UUID;
  taskId?: string;
  progress?: number;
}

export interface ActionEventData {
  actionId: UUID;
  title: string;
  type: string;
  userId?: UUID;
  count?: number;
}

export interface FundEventData {
  fundId: UUID;
  title: string;
  amount?: number;
  contributorId?: UUID;
  milestoneId?: UUID;
}

export interface PulseEventData {
  pulseId: UUID;
  title: string;
  type: string;
  responseCount?: number;
  userId?: UUID;
}

export interface ElectionEventData {
  electionId: UUID;
  title: string;
  ballotId?: UUID;
  userId?: UUID;
  votes?: number;
}

export interface CommunityEventData {
  communityId: UUID;
  name: string;
  userId?: UUID;
  postId?: UUID;
  commentId?: UUID;
}

export interface NotificationEventData {
  notificationId: UUID;
  userId: UUID;
  type: string;
  channel: string;
  title: string;
  body: string;
}

export interface AuditEventData {
  actorId: UUID;
  action: string;
  resource: string;
  resourceId: UUID;
  changes?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
}