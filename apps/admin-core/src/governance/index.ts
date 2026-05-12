/**
 * OK.OS — Admin.Core Governance
 */

export interface GovernanceRole {
  id: string;
  name: string;
  holders: number;
  permissions: string[];
}
