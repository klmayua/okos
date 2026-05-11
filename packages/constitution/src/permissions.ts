export const PERMISSIONS_LAW = {
  version: '1.0.0',
  status: 'mandatory',
  doctrine: {
    principle: 'least_privilege',
    default: 'deny_all',
    grant: 'explicit_required',
    escalation: 'requires_approval',
    revocation: 'immediate',
  },
  rbac: {
    roles: {
      citizen: {
        inherits: [],
        permissions: [
          'read:public_content',
          'vote:election',
          'verify:self',
          'community:join',
        ],
      },
      member: {
        inherits: ['citizen'],
        permissions: [
          'read:member_content',
          'pathway:enroll',
          'action:join',
          'fund:contribute',
        ],
      },
      volunteer: {
        inherits: ['member'],
        permissions: [
          'action:organize',
          'community:moderate',
          'event:manage',
        ],
      },
      organizer: {
        inherits: ['volunteer'],
        permissions: [
          'action:create',
          'fund:create',
          'pulse:create',
          'community:manage',
        ],
      },
      verifier: {
        inherits: ['member'],
        permissions: [
          'verification:review',
          'verification:approve',
          'verification:reject',
          'citizen:read_identity',
        ],
      },
      moderator: {
        inherits: ['organizer'],
        permissions: [
          'content:hide',
          'user:suspend',
          'community:admin',
          'audit:read',
        ],
      },
      admin: {
        inherits: ['moderator'],
        permissions: [
          'user:manage',
          'organization:manage',
          'policy:manage',
          'reports:view',
          'system:configure',
        ],
      },
      super_admin: {
        inherits: [],
        permissions: ['*'],
      },
    },
  },
  abac: {
    conditions: [
      'time_of_day',
      'ip_geolocation',
      'device_trust',
      'session_age',
      'mfa_status',
    ],
  },
  resourceOwnership: {
    user: {
      resources: ['profile', 'preferences', 'content'],
      permissions: ['create', 'read', 'update', 'delete'],
    },
    organization: {
      resources: ['content', 'members', 'actions'],
      permissions: ['create', 'read', 'update', 'delete', 'manage'],
    },
    system: {
      resources: ['config', 'users', 'permissions'],
      permissions: ['admin:full'],
    },
  },
  boundaries: {
    appsMayImport: ['packages', 'sdk'],
    appsMayNotImport: ['services'],
    packagesMayNotImport: ['apps'],
    servicesMayImport: ['packages'],
    packagesMayNotCrossImport: ['without_contract'],
  },
} as const;

export type RoleName = keyof typeof PERMISSIONS_LAW.rbac.roles;
export type PermissionAction = 'create' | 'read' | 'update' | 'delete' | 'manage' | 'admin:full' | '*';