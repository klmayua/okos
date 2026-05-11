import type { GeoLocation } from './action.js';
import type { UUID, DateTimeISO, BaseEntity } from './identity.js';

export interface Pulse extends BaseEntity {
  title: string;
  slug: string;
  description: string;
  type: PulseType;
  status: PulseStatus;
  createdBy: UUID;
  organizationId: UUID | null;
  startDate: DateTimeISO;
  endDate: DateTimeISO | null;
  targetResponses: number | null;
  currentResponses: number;
  visibility: 'public' | 'members' | 'private';
  tags: string[];
}

export type PulseType = 'poll' | 'survey' | 'feedback' | 'sentiment' | 'census';
export type PulseStatus = 'draft' | 'active' | 'closed' | 'archived';

export interface PulseQuestion extends BaseEntity {
  pulseId: UUID;
  text: string;
  type: QuestionType;
  order: number;
  required: boolean;
  options: QuestionOption[] | null;
  validation: QuestionValidation | null;
  skipLogic: SkipLogic | null;
}

export type QuestionType = 
  | 'single_choice'
  | 'multiple_choice'
  | 'text'
  | 'rating'
  | 'scale'
  | 'date'
  | 'location'
  | 'file_upload';

export interface QuestionOption {
  id: UUID;
  text: string;
  order: number;
  isOther: boolean;
}

export interface QuestionValidation {
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  fileTypes?: string[];
  maxSize?: number;
}

export interface SkipLogic {
  condition: 'equals' | 'not_equals' | 'contains' | 'greater_than' | 'less_than';
  questionId: UUID;
  value: string | number;
  action: 'skip_to' | 'show';
  targetQuestionId: UUID;
}

export interface PulseResponse extends BaseEntity {
  pulseId: UUID;
  respondentId: UUID;
  answers: Answer[];
  submittedAt: DateTimeISO;
  timeSpent: number;
  score: number | null;
  metadata: Record<string, unknown>;
}

export interface Answer {
  questionId: UUID;
  value: string | number | string[] | Record<string, unknown> | null;
}

export interface PulseResult extends BaseEntity {
  pulseId: UUID;
  questionId: UUID;
  totalResponses: number;
  data: ResultData;
}

export type ResultData = 
  | { type: 'choice'; counts: Record<string, number> }
  | { type: 'rating'; average: number; distribution: number[] }
  | { type: 'scale'; min: number; max: number; mean: number }
  | { type: 'text'; sample: string[]; themes: string[] }
  | { type: 'numeric'; sum: number; average: number; median: number };

export interface Incident extends BaseEntity {
  title: string;
  description: string;
  type: IncidentType;
  severity: IncidentSeverity;
  status: IncidentStatus;
  location: GeoLocation;
  reportedBy: UUID;
  assignedTo: UUID | null;
  wardCode: string;
  constituencyCode: string;
  regionCode: string;
  affectedCount: number | null;
  verifiedAt: DateTimeISO | null;
  resolvedAt: DateTimeISO | null;
  attachments: string[];
}

export type IncidentType = 
  | 'infrastructure'
  | 'health'
  | 'safety'
  | 'environment'
  | 'service'
  | 'corruption'
  | 'other';

export type IncidentSeverity = 'critical' | 'high' | 'medium' | 'low';
export type IncidentStatus = 'reported' | 'investigating' | 'in_progress' | 'resolved' | 'closed';