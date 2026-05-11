import type { UUID, DateTimeISO, BaseEntity } from './identity.js';

export interface Election extends BaseEntity {
  title: string;
  slug: string;
  description: string;
  type: ElectionType;
  status: ElectionStatus;
  votingStart: DateTimeISO;
  votingEnd: DateTimeISO;
  timezone: string;
  eligibleVoters: number;
  registeredVoters: number;
  totalVotes: number;
  turnout: number;
  threshold: number | null;
  isVerified: boolean;
  resultsPublishedAt: DateTimeISO | null;
  metadata: ElectionMetadata;
}

export type ElectionType = 
  | 'presidential'
  | 'parliamentary'
  | 'local'
  | 'referendum'
  | 'primary'
  | 'internal';

export type ElectionStatus = 
  | 'draft'
  | 'scheduled'
  | 'campaigning'
  | 'voting'
  | 'counting'
  | 'certified'
  | 'disputed'
  | 'archived';

export interface ElectionMetadata {
  electorate: string;
  seats: number;
  votingMethod: string;
  requiresVerification: boolean;
  allowsProxy: boolean;
}

export interface Candidate extends BaseEntity {
  electionId: UUID;
  name: string;
  partyId: UUID | null;
  partyName: string | null;
  logoUrl: string | null;
  position: number;
  bio: string | null;
  platform: string | null;
  votes: number;
  percentage: number;
  isElected: boolean | null;
  manifestoid: UUID | null;
}

export interface Ballot extends BaseEntity {
  electionId: UUID;
  voterId: UUID;
  status: BallotStatus;
  issuedAt: DateTimeISO;
  castAt: DateTimeISO | null;
  verificationCode: string;
  ipAddress: string | null;
  deviceInfo: string | null;
  signature: string | null;
}

export type BallotStatus = 'issued' | 'cast' | 'spoiled' | 'voided';

export interface Vote extends BaseEntity {
  ballotId: UUID;
  candidateId: UUID;
  rank: number | null;
  choice: 'candidate' | 'abstain';
  timestamp: DateTimeISO;
  hash: string;
}

export interface ElectionResult extends BaseEntity {
  electionId: UUID;
  candidateId: UUID;
  votes: number;
  percentage: number;
  rank: number;
  isElected: boolean;
  margin: number | null;
  marginPercentage: number | null;
}

export interface ElectionAudit extends BaseEntity {
  electionId: UUID;
  type: AuditType;
  status: AuditStatus;
  conductedBy: UUID;
  startedAt: DateTimeISO;
  completedAt: DateTimeISO | null;
  findings: AuditFinding[];
  certificateUrl: string | null;
}

export type AuditType = 'random_sample' | 'full' | 'risk_limited' | 'compliance';
export type AuditStatus = 'scheduled' | 'in_progress' | 'completed' | 'failed';

export interface AuditFinding {
  category: string;
  severity: 'critical' | 'major' | 'minor';
  description: string;
  recommendation: string | null;
}

export interface Referendum extends BaseEntity {
  electionId: UUID;
  question: string;
  description: string;
  options: ReferendumOption[];
  votesFor: number;
  votesAgainst: number;
  votesAbstain: number;
  result: 'passed' | 'failed' | 'tie';
  threshold: number;
}

export interface ReferendumOption {
  id: UUID;
  text: string;
  order: number;
  votes: number;
  percentage: number;
}