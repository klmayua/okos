export type UUID = string & { readonly __brand: unique symbol };
export type DateTimeISO = string & { readonly __brand: unique symbol };
export type Email = string & { readonly __brand: unique symbol };
export type PhoneNumber = string & { readonly __brand: unique symbol };
export type NationalID = string & { readonly __brand: unique symbol };

export function isUUID(value: string): value is UUID {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value);
}

export function isEmail(value: string): value is Email {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function isPhoneNumber(value: string): value is PhoneNumber {
  return /^\+?[1-9]\d{6,14}$/.test(value);
}

export interface BaseEntity {
  id: UUID;
  createdAt: DateTimeISO;
  updatedAt: DateTimeISO;
}

export interface SoftDeletable {
  deletedAt: DateTimeISO | null;
}

export interface Versionable {
  version: number;
}

export interface Auditable {
  createdBy: UUID;
  updatedBy: UUID;
}

export type EntityStatus = 'active' | 'inactive' | 'suspended' | 'pending' | 'archived';

export interface Citizen extends BaseEntity, SoftDeletable {
  nationalId: NationalID;
  firstName: string;
  lastName: string;
  email: Email;
  phone: PhoneNumber;
  dateOfBirth: DateTimeISO;
  status: EntityStatus;
  wardCode: string;
  constituencyCode: string;
  regionCode: string;
  verifiedAt: DateTimeISO | null;
  verificationLevel: number;
}

export interface User extends Citizen {
  lastLoginAt: DateTimeISO | null;
  failedLoginAttempts: number;
  lockedUntil: DateTimeISO | null;
  passwordChangedAt: DateTimeISO;
  mfaEnabled: boolean;
  mfaMethod: 'totp' | 'sms' | 'email' | null;
  preferences: UserPreferences;
}

export interface UserPreferences {
  locale: string;
  timezone: string;
  theme: 'light' | 'dark' | 'system';
  notifications: NotificationPreferences;
  accessibility: AccessibilityPreferences;
}

export interface NotificationPreferences {
  email: boolean;
  sms: boolean;
  push: boolean;
  whatsapp: boolean;
  digest: 'realtime' | 'daily' | 'weekly' | 'none';
}

export interface AccessibilityPreferences {
  fontSize: 'small' | 'medium' | 'large' | 'xlarge';
  highContrast: boolean;
  reducedMotion: boolean;
  screenReader: boolean;
}

export interface Organization extends BaseEntity, SoftDeletable {
  name: string;
  slug: string;
  type: OrganizationType;
  status: EntityStatus;
  description: string;
  logoUrl: string | null;
  websiteUrl: string | null;
  verifiedAt: DateTimeISO | null;
  primaryContact: UUID;
}

export type OrganizationType = 
  | 'government'
  | 'ngo'
  | 'political_party'
  | 'media'
  | 'business'
  | 'civil_society'
  | 'religious'
  | 'educational'
  | 'other';

export type UserRole = 
  | 'citizen'
  | 'member'
  | 'volunteer'
  | 'organizer'
  | 'moderator'
  | 'verifier'
  | 'admin'
  | 'super_admin';

export interface Member extends User {
  organizationId: UUID;
  role: UserRole;
  joinedAt: DateTimeISO;
  contributions: number;
  reputationScore: number;
}

export interface MemberProfile extends Member {
  bio: string | null;
  avatarUrl: string | null;
  socialLinks: SocialLinks;
  skills: string[];
  interests: string[];
  badges: Badge[];
}

export interface SocialLinks {
  twitter?: string;
  facebook?: string;
  instagram?: string;
  linkedin?: string;
  website?: string;
}

export interface Badge {
  id: UUID;
  name: string;
  description: string;
  iconUrl: string;
  awardedAt: DateTimeISO;
}