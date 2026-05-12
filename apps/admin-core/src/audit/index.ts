/**
 * OK.OS — Admin.Core Audit
 */

export interface AuditLog {
  id: string;
  action: string;
  actor: string;
  timestamp: string;
  details: string;
}
