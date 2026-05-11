import { MANDATORY_POLICIES, ROLE_HIERARCHY, type Role, type Resource, type PermissionAction, type PermissionContext } from './policies.js';

export interface PermissionResult {
  allowed: boolean;
  reason?: string;
}

export class PermissionEngine {
  private policies = [...MANDATORY_POLICIES];
  private rolePermissions = new Map<Role, Set<PermissionAction>>();

  constructor() {
    this.initializeDefaultPermissions();
  }

  private initializeDefaultPermissions(): void {
    const permissionsByRole: Record<Role, PermissionAction[]> = {
      citizen: ['read'],
      member: ['read', 'create'],
      volunteer: ['read', 'create', 'update'],
      organizer: ['read', 'create', 'update', 'delete'],
      verifier: ['read', 'approve', 'reject'],
      moderator: ['read', 'create', 'update', 'delete', 'approve', 'reject'],
      admin: ['read', 'create', 'update', 'delete', 'approve', 'reject', 'manage'],
      super_admin: ['create', 'read', 'update', 'delete', 'approve', 'reject', 'execute', 'manage'],
    };

    for (const [role, perms] of Object.entries(permissionsByRole)) {
      this.rolePermissions.set(role as Role, new Set(perms));
    }
  }

  checkPermission(context: PermissionContext, resource: Resource, action: PermissionAction): PermissionResult {
    const policy = this.policies.find(p => p.resource === resource && p.actions.includes(action));

    if (!policy) {
      return { allowed: false, reason: `No policy found for ${resource}:${action}` };
    }

    if (!policy.requiresRole.includes(context.role)) {
      return { allowed: false, reason: `Role ${context.role} not authorized for ${resource}:${action}` };
    }

    if (policy.requiresVerificationLevel && context.verificationLevel < policy.requiresVerificationLevel) {
      return { allowed: false, reason: `Verification level ${context.verificationLevel} insufficient. Required: ${policy.requiresVerificationLevel}` };
    }

    if (policy.requiresTrustScore !== undefined && context.trustScore < policy.requiresTrustScore) {
      return { allowed: false, reason: `Trust score ${context.trustScore} insufficient. Required: ${policy.requiresTrustScore}` };
    }

    if (policy.requiresDeviceTrust === 'trusted' && context.deviceTrust !== 'trusted') {
      return { allowed: false, reason: 'Untrusted device' };
    }

    return { allowed: true };
  }

  checkRolePermission(role: Role, action: PermissionAction): boolean {
    const perms = this.rolePermissions.get(role);
    if (!perms) return false;
    return perms.has(action) || perms.has('manage');
  }

  getInheritedRoles(role: Role): Role[] {
    const inherited = ROLE_HIERARCHY[role] ?? [];
    const allInherited: Role[] = [];

    for (const r of inherited) {
      allInherited.push(r);
      allInherited.push(...this.getInheritedRoles(r));
    }

    return [...new Set(allInherited)];
  }

  addPolicy(policy: typeof MANDATORY_POLICIES[number]): void {
    this.policies.push(policy);
  }

  getPolicies(): typeof MANDATORY_POLICIES {
    return [...this.policies];
  }
}

const globalPermissionEngine = new PermissionEngine();

export function getPermissionEngine(): PermissionEngine {
  return globalPermissionEngine;
}

export function checkPermission(
  role: Role,
  resource: Resource,
  action: PermissionAction,
  verificationLevel: number = 1,
  trustScore: number = 0,
  deviceTrust: 'trusted' | 'unknown' | 'untrusted' = 'unknown'
): PermissionResult {
  const context: PermissionContext = {
    role,
    verificationLevel,
    trustScore,
    deviceTrust,
  };
  return getPermissionEngine().checkPermission(context, resource, action);
}