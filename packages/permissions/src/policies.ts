export type Role =
  | 'citizen'
  | 'member'
  | 'volunteer'
  | 'organizer'
  | 'verifier'
  | 'moderator'
  | 'admin'
  | 'super_admin';

export type PermissionAction = 'create' | 'read' | 'update' | 'delete' | 'approve' | 'reject' | 'execute' | 'manage';

export type Resource =
  | 'content'
  | 'financial'
  | 'moderation'
  | 'admin'
  | 'emergency'
  | 'partner'
  | 'analytics'
  | 'export';

export interface PermissionContext {
  role: Role;
  verificationLevel: number;
  trustScore: number;
  jurisdiction?: string;
  deviceTrust?: 'trusted' | 'unknown' | 'untrusted';
  riskLevel?: 'low' | 'medium' | 'high';
}

export interface PermissionPolicy {
  resource: Resource;
  actions: PermissionAction[];
  requiresRole: Role[];
  requiresVerificationLevel?: number;
  requiresTrustScore?: number;
  requiresDeviceTrust?: 'trusted' | 'any';
}

export const MANDATORY_POLICIES: PermissionPolicy[] = [
  {
    resource: 'content',
    actions: ['read', 'create', 'update', 'delete'],
    requiresRole: ['citizen', 'member', 'volunteer', 'organizer', 'moderator', 'admin', 'super_admin'],
    requiresVerificationLevel: 1,
    requiresTrustScore: 0,
  },
  {
    resource: 'financial',
    actions: ['create', 'read', 'approve', 'manage'],
    requiresRole: ['organizer', 'admin', 'super_admin'],
    requiresVerificationLevel: 3,
    requiresTrustScore: 50,
    requiresDeviceTrust: 'trusted',
  },
  {
    resource: 'moderation',
    actions: ['read', 'update', 'delete', 'approve', 'reject'],
    requiresRole: ['moderator', 'admin', 'super_admin'],
    requiresVerificationLevel: 2,
    requiresTrustScore: 30,
  },
  {
    resource: 'admin',
    actions: ['create', 'read', 'update', 'delete', 'manage'],
    requiresRole: ['admin', 'super_admin'],
    requiresVerificationLevel: 4,
    requiresTrustScore: 75,
    requiresDeviceTrust: 'trusted',
  },
  {
    resource: 'emergency',
    actions: ['execute', 'approve'],
    requiresRole: ['admin', 'super_admin'],
    requiresVerificationLevel: 3,
    requiresTrustScore: 60,
  },
  {
    resource: 'partner',
    actions: ['read', 'create', 'update'],
    requiresRole: ['member', 'organizer', 'admin', 'super_admin'],
    requiresVerificationLevel: 2,
  },
  {
    resource: 'analytics',
    actions: ['read', 'manage'],
    requiresRole: ['organizer', 'admin', 'super_admin'],
    requiresVerificationLevel: 3,
  },
  {
    resource: 'export',
    actions: ['read', 'create'],
    requiresRole: ['admin', 'super_admin'],
    requiresVerificationLevel: 4,
    requiresDeviceTrust: 'trusted',
  },
];

export const ROLE_HIERARCHY: Record<Role, Role[]> = {
  citizen: [],
  member: ['citizen'],
  volunteer: ['member'],
  organizer: ['volunteer'],
  verifier: ['member'],
  moderator: ['organizer'],
  admin: ['moderator'],
  super_admin: [],
};