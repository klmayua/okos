/**
 * OK.OS — Admin.Core Compliance
 */

export interface ComplianceRule {
  id: string;
  name: string;
  category: string;
  status: 'compliant' | 'pending' | 'violation';
}
