import type { UUID, DateTimeISO, BaseEntity } from './identity.js';

export interface VerificationRequest extends BaseEntity {
  userId: UUID;
  type: VerificationType;
  status: VerificationStatus;
  submittedAt: DateTimeISO;
  processedAt: DateTimeISO | null;
  processedBy: UUID | null;
  documents: Document[];
  data: Record<string, unknown>;
  reason: string | null;
  notes: string | null;
}

export type VerificationType = 
  | 'identity'
  | 'address'
  | 'citizenship'
  | 'age'
  | 'membership'
  | 'credential'
  | 'organization';

export type VerificationStatus = 
  | 'pending'
  | 'in_review'
  | 'approved'
  | 'rejected'
  | 'expired';

export interface Document extends BaseEntity {
  type: DocumentType;
  url: string;
  fileName: string;
  mimeType: string;
  size: number;
  hash: string;
  uploadedAt: DateTimeISO;
  verifiedAt: DateTimeISO | null;
  verificationStatus: DocumentStatus;
}

export type DocumentType = 
  | 'id_card'
  | 'passport'
  | 'driver_license'
  | 'birth_certificate'
  | 'utility_bill'
  | 'bank_statement'
  | 'address_proof'
  | 'membership_card'
  | 'certificate'
  | 'other';

export type DocumentStatus = 'pending' | 'verified' | 'rejected' | 'expired';

export interface VerificationLevel extends BaseEntity {
  userId: UUID;
  level: number;
  methods: VerifiedMethod[];
  achievedAt: DateTimeISO;
  expiresAt: DateTimeISO | null;
  lastVerifiedAt: DateTimeISO;
}

export interface VerifiedMethod {
  type: VerificationType;
  verifiedAt: DateTimeISO;
  documentId: UUID | null;
  confidence: number;
  expiresAt: DateTimeISO | null;
}

export interface VerificationAudit extends BaseEntity {
  verificationId: UUID;
  action: string;
  performedBy: UUID;
  performedAt: DateTimeISO;
  details: Record<string, unknown>;
  ipAddress: string | null;
}

export interface IdentityClaim extends BaseEntity {
  claimantId: UUID;
  claimType: string;
  claimValue: string;
  evidence: Record<string, unknown>;
  status: 'pending' | 'verified' | 'rejected';
  verifiedAt: DateTimeISO | null;
  verifiedBy: UUID | null;
}

export interface TrustScore extends BaseEntity {
  userId: UUID;
  score: number;
  breakdown: ScoreBreakdown;
  lastCalculatedAt: DateTimeISO;
}

export interface ScoreBreakdown {
  identity: number;
  activity: number;
  verification: number;
  community: number;
  consistency: number;
}