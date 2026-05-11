import type { UUID, DateTimeISO, BaseEntity } from './identity.js';

export interface Policy extends BaseEntity {
  title: string;
  slug: string;
  description: string;
  content: string;
  category: PolicyCategory;
  status: PolicyStatus;
  version: number;
  effectiveFrom: DateTimeISO;
  effectiveTo: DateTimeISO | null;
  createdBy: UUID;
  approvedBy: UUID | null;
  approvedAt: DateTimeISO | null;
  tags: string[];
}

export type PolicyCategory = 
  | 'constitution'
  | 'regulation'
  | 'procedure'
  | 'guideline'
  | 'code_of_conduct'
  | 'privacy'
  | 'terms';

export type PolicyStatus = 'draft' | 'pending_review' | 'active' | 'amended' | 'repealed';

export interface PolicyVersion extends BaseEntity {
  policyId: UUID;
  version: number;
  content: string;
  changes: string;
  createdBy: UUID;
  createdAt: DateTimeISO;
}

export interface Proposal extends BaseEntity {
  title: string;
  slug: string;
  description: string;
  type: ProposalType;
  status: ProposalStatus;
  submittedBy: UUID;
  organizationId: UUID | null;
  category: string;
  votesFor: number;
  votesAgainst: number;
  votesAbstain: number;
  threshold: number;
  deadline: DateTimeISO;
  createdAt: DateTimeISO;
  discussionEnd: DateTimeISO;
  votingStart: DateTimeISO;
  votingEnd: DateTimeISO;
}

export type ProposalType = 'resolution' | 'amendment' | 'policy' | 'budget' | 'structural';
export type ProposalStatus = 
  | 'draft'
  | 'submitted'
  | 'discussion'
  | 'voting'
  | 'passed'
  | 'rejected'
  | 'withdrawn'
  | 'tabled';

export interface ProposalVote extends BaseEntity {
  proposalId: UUID;
  voterId: UUID;
  choice: 'for' | 'against' | 'abstain';
  weight: number;
  votedAt: DateTimeISO;
  rationale: string | null;
}

export interface Committee extends BaseEntity {
  name: string;
  slug: string;
  description: string;
  type: CommitteeType;
  status: CommitteeStatus;
  organizationId: UUID | null;
  chairId: UUID | null;
  memberCount: number;
  createdAt: DateTimeISO;
}

export type CommitteeType = 'standing' | 'special' | 'advisory' | 'temporary';
export type CommitteeStatus = 'active' | 'inactive' | 'dissolved';

export interface CommitteeMember extends BaseEntity {
  committeeId: UUID;
  userId: UUID;
  role: 'chair' | 'vice_chair' | 'secretary' | 'member';
  joinedAt: DateTimeISO;
  termStart: DateTimeISO;
  termEnd: DateTimeISO | null;
}

export interface Meeting extends BaseEntity {
  committeeId: UUID;
  title: string;
  type: MeetingType;
  status: MeetingStatus;
  scheduledAt: DateTimeISO;
  endedAt: DateTimeISO | null;
  location: string | null;
  isVirtual: boolean;
  agenda: string;
  minutes: string | null;
  recordingUrl: string | null;
  attendees: UUID[];
}

export type MeetingType = 'regular' | 'special' | 'emergency' | 'public_hearing';
export type MeetingStatus = 'scheduled' | 'in_progress' | 'adjourned' | 'completed' | 'cancelled';

export interface TransparencyRecord extends BaseEntity {
  type: TransparencyType;
  title: string;
  description: string;
  data: Record<string, unknown>;
  publishedAt: DateTimeISO;
  period: string;
  verifiedAt: DateTimeISO | null;
}

export type TransparencyType = 
  | 'financial'
  | 'attendance'
  | 'decision'
  | 'procurement'
  | 'contract'
  | 'asset'
  | 'expense';