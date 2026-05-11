export type AuditAction =
  | 'auth.login'
  | 'auth.logout'
  | 'auth.failed'
  | 'permission.grant'
  | 'permission.revoke'
  | 'treasury.transfer'
  | 'treasury.approve'
  | 'moderation.hide'
  | 'moderation.suspend'
  | 'moderation.ban'
  | 'data.export'
  | 'credential.issue'
  | 'credential.revoke'
  | 'panic.trigger'
  | 'panic.resolve'
  | 'workflow.execute'
  | 'workflow.compensate'
  | 'config.update'
  | 'admin.access';

export interface AuditRecord {
  id: string;
  entityType: string;
  entityId: string;
  action: AuditAction;
  actorId: string;
  before: Record<string, unknown> | null;
  after: Record<string, unknown> | null;
  reason: string;
  correlationId: string;
  ipHash: string;
  geoHash: string;
  deviceHash: string;
  createdAt: string;
  signatureHash: string;
  previousHash: string;
}

export const MANDATORY_AUDITS: AuditAction[] = [
  'auth.login',
  'auth.logout',
  'auth.failed',
  'permission.grant',
  'permission.revoke',
  'treasury.transfer',
  'treasury.approve',
  'moderation.hide',
  'moderation.suspend',
  'moderation.ban',
  'data.export',
  'credential.issue',
  'credential.revoke',
  'panic.trigger',
  'panic.resolve',
  'workflow.execute',
  'workflow.compensate',
  'config.update',
  'admin.access',
];