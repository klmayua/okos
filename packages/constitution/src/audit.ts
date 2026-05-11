export const AUDIT_LAW = {
  version: '1.0.0',
  status: 'mandatory',
  doctrine: {
    principle: 'immutable_record',
    integrity: 'cryptographic_verification',
    retention: 'regulatory_compliance',
    access: 'role_based',
  },
  logEvents: {
    mandatory: [
      'authentication:login',
      'authentication:logout',
      'authentication:failed',
      'authorization:granted',
      'authorization:revoked',
      'data:created',
      'data:read',
      'data:updated',
      'data:deleted',
      'configuration:changed',
      'security:event',
      'privacy:consent_changed',
      'payment:processed',
      'vote:cast',
      'verification:status_changed',
    ],
  },
  logEntry: {
    fields: [
      'timestamp',
      'actor_id',
      'actor_type',
      'action',
      'resource_type',
      'resource_id',
      'outcome',
      'ip_address',
      'user_agent',
      'correlation_id',
      'metadata',
    ],
  },
  integrity: {
    chain: 'hash_linked',
    algorithm: 'SHA-256',
    signature: 'asymmetric',
    rotation: '90 days',
  },
  retention: {
    security: '7 years',
    financial: '7 years',
    operational: '3 years',
    voting: '10 years',
  },
  access: {
    roles: ['admin', 'auditor', 'regulator'],
    approval: 'required_for_export',
    redaction: 'permitted_for_privacy',
  },
  verification: {
    automated: true,
    manual: 'quarterly',
    external: 'annual',
  },
} as const;

export type AuditEvent = typeof AUDIT_LAW.logEvents.mandatory[number];
export type RetentionPeriod = keyof typeof AUDIT_LAW.retention;