import type { UUID } from '../domain/identity.js';

export type PermissionAction = 
  | 'create'
  | 'read'
  | 'update'
  | 'delete'
  | 'approve'
  | 'reject'
  | 'execute'
  | 'manage';

export type PermissionResource = 
  | 'user'
  | 'citizen'
  | 'organization'
  | 'pathway'
  | 'action'
  | 'fund'
  | 'pulse'
  | 'election'
  | 'community'
  | 'post'
  | 'comment'
  | 'verification'
  | 'proposal'
  | 'policy'
  | 'report'
  | 'system';

export interface Permission {
  id: UUID;
  action: PermissionAction;
  resource: PermissionResource;
  resourceId?: UUID;
  conditions?: PermissionCondition[];
  description?: string;
}

export interface PermissionCondition {
  field: string;
  operator: 'equals' | 'not_equals' | 'in' | 'not_in' | 'greater_than' | 'less_than' | 'contains';
  value: unknown;
}

export interface Role {
  id: UUID;
  name: string;
  description: string;
  permissions: Permission[];
  inheritsFrom?: UUID[];
  isSystem: boolean;
}

export const SYSTEM_ROLES = {
  CITIZEN: 'citizen',
  MEMBER: 'member',
  VOLUNTEER: 'volunteer',
  ORGANIZER: 'organizer',
  MODERATOR: 'moderator',
  VERIFIER: 'verifier',
  ADMIN: 'admin',
  SUPER_ADMIN: 'super_admin',
} as const;

export const PERMISSION_MATRIX = {
  [SYSTEM_ROLES.CITIZEN]: {
    user: { read: ['own'], update: ['own'] },
    citizen: { read: ['own'], update: ['own'] },
    pathway: { read: ['all'] },
    action: { read: ['public'], create: [], update: [], delete: [] },
    fund: { read: ['public'] },
    pulse: { read: ['public'], create: [], update: [], delete: [] },
    election: { read: ['public'], execute: ['vote'] },
    community: { read: ['public'], create: [], update: [], delete: [] },
    post: { create: [], read: ['public'], update: ['own'], delete: ['own'] },
    comment: { create: [], read: ['public'], update: ['own'], delete: ['own'] },
    verification: { create: [], read: ['own'], update: [] },
    proposal: { read: ['public'] },
  },
  [SYSTEM_ROLES.MEMBER]: {
    user: { read: ['own'], update: ['own'] },
    citizen: { read: ['own'], update: ['own'] },
    pathway: { read: ['all'], create: [], update: [], delete: [] },
    action: { read: ['all'], create: [], update: [], delete: [] },
    fund: { read: ['all'], create: [], update: [], delete: [] },
    pulse: { read: ['all'], create: [], update: [], delete: [] },
    election: { read: ['all'], execute: ['vote'] },
    community: { read: ['all'], create: [], update: [], delete: [] },
    post: { create: [], read: ['all'], update: ['own'], delete: ['own'] },
    comment: { create: [], read: ['all'], update: ['own'], delete: ['own'] },
    verification: { create: [], read: ['own'], update: [] },
    proposal: { read: ['all'], create: [], update: [], delete: [] },
  },
  [SYSTEM_ROLES.ORGANIZER]: {
    user: { read: ['own'], update: ['own'] },
    citizen: { read: ['own'], update: ['own'] },
    pathway: { read: ['all'], create: [], update: ['own'], delete: [] },
    action: { read: ['all'], create: [], update: ['own'], delete: ['own'] },
    fund: { read: ['all'], create: [], update: ['own'], delete: ['own'] },
    pulse: { read: ['all'], create: [], update: ['own'], delete: ['own'] },
    election: { read: ['all'], execute: ['vote'] },
    community: { read: ['all'], create: [], update: ['own'], delete: [] },
    post: { create: [], read: ['all'], update: ['own'], delete: ['own'] },
    comment: { create: [], read: ['all'], update: ['own'], delete: ['own'] },
    verification: { create: [], read: ['own'], update: [] },
    proposal: { read: ['all'], create: [], update: ['own'], delete: ['own'] },
  },
  [SYSTEM_ROLES.MODERATOR]: {
    user: { read: ['own', 'org'], update: ['org'] },
    citizen: { read: ['all'], update: [] },
    pathway: { read: ['all'], create: [], update: ['org'], delete: [] },
    action: { read: ['all'], create: [], update: ['org'], delete: [] },
    fund: { read: ['all'], create: [], update: ['org'], delete: [] },
    pulse: { read: ['all'], create: [], update: ['org'], delete: [] },
    election: { read: ['all'], execute: [] },
    community: { read: ['all'], create: [], update: ['org'], delete: [] },
    post: { create: [], read: ['all'], update: ['org'], delete: ['org'] },
    comment: { create: [], read: ['all'], update: ['org'], delete: ['org'] },
    verification: { read: ['all'], update: ['org'] },
    proposal: { read: ['all'], create: [], update: [], delete: [] },
  },
  [SYSTEM_ROLES.VERIFIER]: {
    user: { read: ['all'], update: [] },
    citizen: { read: ['all'], update: [] },
    pathway: { read: ['all'], create: [], update: [], delete: [] },
    action: { read: ['all'], create: [], update: [], delete: [] },
    fund: { read: ['all'], create: [], update: [], delete: [] },
    pulse: { read: ['all'], create: [], update: [], delete: [] },
    election: { read: ['all'], execute: [] },
    community: { read: ['all'], create: [], update: [], delete: [] },
    post: { create: [], read: ['all'], update: [], delete: [] },
    comment: { create: [], read: ['all'], update: [], delete: [] },
    verification: { read: ['all'], approve: [], reject: [] },
    proposal: { read: ['all'], create: [], update: [], delete: [] },
  },
  [SYSTEM_ROLES.ADMIN]: {
    user: { read: ['all'], update: ['all'], delete: [] },
    citizen: { read: ['all'], update: ['all'], delete: [] },
    pathway: { read: ['all'], create: [], update: ['all'], delete: [] },
    action: { read: ['all'], create: [], update: ['all'], delete: [] },
    fund: { read: ['all'], create: [], update: ['all'], delete: [] },
    pulse: { read: ['all'], create: [], update: ['all'], delete: [] },
    election: { read: ['all'], create: [], update: ['all'], delete: [] },
    community: { read: ['all'], create: [], update: ['all'], delete: [] },
    post: { create: [], read: ['all'], update: ['all'], delete: ['all'] },
    comment: { create: [], read: ['all'], update: ['all'], delete: ['all'] },
    verification: { read: ['all'], update: ['all'], approve: [], reject: [] },
    proposal: { read: ['all'], create: [], update: ['all'], delete: ['all'] },
    policy: { read: ['all'], create: [], update: ['all'], delete: [] },
    report: { read: ['all'], create: [], update: [], delete: [] },
  },
  [SYSTEM_ROLES.SUPER_ADMIN]: {
    user: { create: [], read: ['all'], update: ['all'], delete: [] },
    citizen: { create: [], read: ['all'], update: ['all'], delete: [] },
    organization: { create: [], read: ['all'], update: ['all'], delete: [] },
    pathway: { create: [], read: ['all'], update: ['all'], delete: [] },
    action: { create: [], read: ['all'], update: ['all'], delete: [] },
    fund: { create: [], read: ['all'], update: ['all'], delete: [] },
    pulse: { create: [], read: ['all'], update: ['all'], delete: [] },
    election: { create: [], read: ['all'], update: ['all'], delete: [] },
    community: { create: [], read: ['all'], update: ['all'], delete: [] },
    post: { create: [], read: ['all'], update: ['all'], delete: ['all'] },
    comment: { create: [], read: ['all'], update: ['all'], delete: ['all'] },
    verification: { create: [], read: ['all'], update: ['all'], delete: [], approve: [], reject: [] },
    proposal: { create: [], read: ['all'], update: ['all'], delete: ['all'] },
    policy: { create: [], read: ['all'], update: ['all'], delete: [] },
    report: { create: [], read: ['all'], update: ['all'], delete: ['all'] },
    system: { create: [], read: ['all'], update: ['all'], delete: [], manage: [] },
  },
} as const;

export interface PermissionCheck {
  actorId: UUID;
  action: PermissionAction;
  resource: PermissionResource;
  resourceId?: UUID;
  context?: Record<string, unknown>;
}

export interface PermissionResult {
  allowed: boolean;
  reason?: string;
  conditions?: PermissionCondition[];
}

export interface PermissionPolicy {
  id: UUID;
  name: string;
  description: string;
  effect: 'allow' | 'deny';
  principals: PolicyPrincipal[];
  actions: PermissionAction[];
  resources: PermissionResource[];
  conditions?: PermissionCondition[];
  priority: number;
}

export interface PolicyPrincipal {
  type: 'user' | 'role' | 'organization';
  id: UUID;
}