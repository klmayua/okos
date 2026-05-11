export type InitiativeCategory =
  | 'education'
  | 'healthcare'
  | 'sanitation'
  | 'water'
  | 'youth_empowerment'
  | 'women_empowerment'
  | 'food_security'
  | 'climate'
  | 'technology'
  | 'security'
  | 'transport'
  | 'emergency_relief'
  | 'environment'
  | 'local_business_support'
  | 'civic_infrastructure'
  | 'digital_access'
  | 'skills_training';

export type InitiativeStatus =
  | 'draft'
  | 'submitted'
  | 'under_review'
  | 'in_deliberation'
  | 'approved'
  | 'rejected'
  | 'funded'
  | 'in_execution'
  | 'completed'
  | 'failed'
  | 'disputed';

export type UrgencyLevel = 'low' | 'medium' | 'high' | 'critical';

export interface Initiative {
  id: string;
  title: string;
  category: InitiativeCategory;
  summary: string;
  detailedProblemStatement: string;
  proposedSolution: string;
  affectedPopulation: number;
  estimatedBudget: number;
  geoLocation: GeoLocation;
  ward: string;
  lga: string;
  state: string;
  urgencyLevel: UrgencyLevel;
  mediaEvidence: string[];
  proposerIdentity: string;
  communityEndorsements: number;
  supportingDocuments: string[];
  proposedExecutionTimeline: number;
  riskAssessment: string;
  tags: string[];
  status: InitiativeStatus;
  createdAt: string;
  updatedAt: string;
}

export interface GeoLocation {
  lat: number;
  lng: number;
  address: string;
}

export interface InitiativeVote {
  initiativeId: string;
  voterId: string;
  weight: number;
  voteType: 'support' | 'oppose' | 'abstain';
  rationale?: string;
  votedAt: string;
}

export interface InitiativeComment {
  id: string;
  initiativeId: string;
  authorId: string;
  content: string;
  parentId?: string;
  isAmendment: boolean;
  isObjection: boolean;
  verifiedAt?: string;
  flags: string[];
  createdAt: string;
}

export interface InitiativeMilestone {
  id: string;
  initiativeId: string;
  title: string;
  description: string;
  targetDate: string;
  completedDate?: string;
  budget: number;
  releasedAmount: number;
  status: 'pending' | 'in_progress' | 'completed' | 'delayed' | 'failed';
  proofEvidence: MilestoneProof[];
}

export interface MilestoneProof {
  type: 'photo' | 'video' | 'receipt' | 'invoice' | 'testimony' | 'drone' | 'report';
  url: string;
  uploadedAt: string;
  uploadedBy: string;
  verified: boolean;
}

export interface InitiativeDisbursement {
  id: string;
  initiativeId: string;
  milestoneId: string;
  amount: number;
  currency: string;
  status: 'pending' | 'approved' | 'released' | 'rejected';
  releasedAt?: string;
  approverId: string;
  recipientId: string;
  transactionId?: string;
}

export interface Vendor {
  id: string;
  name: string;
  type: 'individual' | 'company' | 'ngo' | 'contractor';
  verified: boolean;
  rating: number;
  region: string;
  categories: InitiativeCategory[];
  contractCount: number;
  totalValue: number;
}

export interface NGOPartner {
  id: string;
  name: string;
  type: 'ngo' | 'cso' | 'ingo' | 'foundation';
  verified: boolean;
  verificationLevel: number;
  operatingRegions: string[];
  focusAreas: InitiativeCategory[];
  auditHistory: { date: string; result: 'passed' | 'failed' }[];
  partnershipCount: number;
  contactEmail: string;
  contactPhone: string;
}

export interface Procurement {
  id: string;
  initiativeId: string;
  vendorId: string;
  description: string;
  amount: number;
  currency: string;
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  procurementType: 'service' | 'goods' | 'works';
  createdAt: string;
  approvedAt?: string;
}

export interface ImpactReport {
  id: string;
  initiativeId: string;
  title: string;
  content: string;
  beneficiaries: number;
  mediaEvidence: string[];
  communityFeedback: { rating: number; comments: string }[];
  createdAt: string;
}

export interface CrisisEvent {
  id: string;
  type: 'flood' | 'displacement' | 'violence' | 'food_crisis' | 'medical' | 'security';
  title: string;
  description: string;
  location: GeoLocation;
  affectedCount: number;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'active' | 'responding' | 'resolved';
  createdAt: string;
}

export interface VolunteerDeployment {
  id: string;
  crisisId: string;
  volunteerId: string;
  role: string;
  location: GeoLocation;
  deployedAt: string;
  status: 'assigned' | 'active' | 'completed';
}

export const INITIATIVE_CATEGORIES: InitiativeCategory[] = [
  'education',
  'healthcare',
  'sanitation',
  'water',
  'youth_empowerment',
  'women_empowerment',
  'food_security',
  'climate',
  'technology',
  'security',
  'transport',
  'emergency_relief',
  'environment',
  'local_business_support',
  'civic_infrastructure',
  'digital_access',
  'skills_training',
];

export const MANDATORY_INITIATIVE_FIELDS = [
  'initiative_id',
  'title',
  'category',
  'summary',
  'detailed_problem_statement',
  'proposed_solution',
  'affected_population',
  'estimated_budget',
  'geo_location',
  'ward',
  'lga',
  'state',
  'urgency_level',
  'media_evidence',
  'proposer_identity',
  'community_endorsements',
  'supporting_documents',
  'proposed_execution_timeline',
  'risk_assessment',
  'initiative_tags',
] as const;