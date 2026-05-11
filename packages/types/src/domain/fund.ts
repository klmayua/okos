import type { UUID, DateTimeISO, BaseEntity } from './identity.js';

export interface Fund extends BaseEntity {
  title: string;
  slug: string;
  description: string;
  status: FundStatus;
  type: FundType;
  targetAmount: number;
  raisedAmount: number;
  currency: string;
  ownerId: UUID;
  organizationId: UUID | null;
  category: FundCategory;
  startDate: DateTimeISO;
  endDate: DateTimeISO | null;
  imageUrl: string | null;
  tags: string[];
  transparencyScore: number;
}

export type FundStatus = 'draft' | 'active' | 'completed' | 'cancelled' | 'archived';
export type FundType = 'public' | 'corporate' | 'grant' | 'crowdfunding';
export type FundCategory = 
  | 'infrastructure'
  | 'healthcare'
  | 'education'
  | 'environment'
  | 'community'
  | 'emergency'
  | 'research'
  | 'other';

export interface FundContribution extends BaseEntity {
  fundId: UUID;
  contributorId: UUID;
  amount: number;
  currency: string;
  status: ContributionStatus;
  paymentMethod: PaymentMethod;
  transactionId: string | null;
  anonymous: boolean;
  message: string | null;
  matchedBy: UUID | null;
  matchAmount: number | null;
}

export type ContributionStatus = 'pending' | 'completed' | 'failed' | 'refunded';
export type PaymentMethod = 'card' | 'bank_transfer' | 'mobile_money' | 'crypto' | 'pledge';

export interface FundMilestone extends BaseEntity {
  fundId: UUID;
  title: string;
  description: string;
  targetAmount: number;
  currentAmount: number;
  targetDate: DateTimeISO;
  completedAt: DateTimeISO | null;
  status: 'planned' | 'active' | 'completed' | 'delayed';
}

export interface FundReport extends BaseEntity {
  fundId: UUID;
  title: string;
  content: string;
  type: 'progress' | 'impact' | 'financial' | 'milestone';
  publishedAt: DateTimeISO;
  attachments: string[];
}

export interface TreasuryTransaction extends BaseEntity {
  type: TransactionType;
  amount: number;
  currency: string;
  balance: number;
  description: string;
  reference: string;
  category: string;
  status: TransactionStatus;
  metadata: Record<string, unknown>;
}

export type TransactionType = 'income' | 'expense' | 'transfer' | 'adjustment';
export type TransactionStatus = 'pending' | 'completed' | 'failed' | 'reversed';

export interface TreasuryReport extends BaseEntity {
  period: string;
  totalIncome: number;
  totalExpenses: number;
  netBalance: number;
  currency: string;
  categoryBreakdown: Record<string, number>;
  topDonors: DonorSummary[];
  projects: ProjectSummary[];
}

export interface DonorSummary {
  donorId: UUID;
  totalContributed: number;
  contributionCount: number;
}

export interface ProjectSummary {
  projectId: UUID;
  name: string;
  fundedAmount: number;
  status: string;
}