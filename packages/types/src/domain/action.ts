import type { UUID, DateTimeISO, BaseEntity } from './identity.js';

export interface Action extends BaseEntity {
  title: string;
  slug: string;
  description: string;
  type: ActionType;
  category: ActionCategory;
  status: ActionStatus;
  startDate: DateTimeISO;
  endDate: DateTimeISO | null;
  location: GeoLocation | null;
  organizerId: UUID;
  organizationId: UUID | null;
  targetCount: number | null;
  currentCount: number;
  visibility: 'public' | 'members' | 'private';
  tags: string[];
  imageUrl: string | null;
}

export type ActionType = 
  | 'campaign'
  | 'event'
  | 'petition'
  | 'volunteer'
  | 'donation'
  | 'advocacy'
  | 'survey';

export type ActionCategory = 
  | 'community'
  | 'education'
  | 'health'
  | 'environment'
  | 'governance'
  | 'infrastructure'
  | 'social'
  | 'economic';

export type ActionStatus = 'draft' | 'published' | 'cancelled' | 'completed' | 'archived';

export interface GeoLocation {
  type: 'Point';
  coordinates: [number, number];
  address: string;
  wardCode: string;
  constituencyCode: string;
  regionCode: string;
}

export interface ActionParticipant extends BaseEntity {
  actionId: UUID;
  userId: UUID;
  role: 'organizer' | 'volunteer' | 'attendee' | 'contributor';
  status: 'registered' | 'confirmed' | 'attended' | 'cancelled';
  registeredAt: DateTimeISO;
  checkedInAt: DateTimeISO | null;
  contributions: number;
}

export interface ActionImpact extends BaseEntity {
  actionId: UUID;
  metric: string;
  value: number;
  unit: string;
  recordedAt: DateTimeISO;
  evidence: string | null;
}

export interface Pledge extends BaseEntity {
  actionId: UUID;
  userId: UUID;
  amount: number;
  currency: string;
  status: 'pledged' | 'fulfilled' | 'cancelled' | 'refunded';
  pledgedAt: DateTimeISO;
  fulfilledAt: DateTimeISO | null;
  paymentMethod: string | null;
  transactionId: string | null;
}

export interface Campaign extends Action {
  type: 'campaign';
  goal: string;
  targetAmount: number | null;
  raisedAmount: number;
  donorCount: number;
  story: string | null;
  updateCount: number;
}

export interface CivicEvent extends Action {
  type: 'event';
  venue: string | null;
  capacity: number | null;
  rsvpCount: number;
  isVirtual: boolean;
  meetingUrl: string | null;
}

export interface Petition extends Action {
  type: 'petition';
  targetEntity: string;
  targetPosition: string;
  signatureCount: number;
  threshold: number;
  isVerified: boolean;
}

export interface VolunteerOpportunity extends Action {
  type: 'volunteer';
  skillsRequired: string[];
  commitment: string;
  benefits: string[];
  slotsAvailable: number;
  applicationsReceived: number;
}