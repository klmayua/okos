/**
 * OK.OS — Command.OS Incidents
 */

export interface Incident {
  id: string;
  level: 'low' | 'moderate' | 'severe' | 'emergency';
  title: string;
  region: string;
  assignee: string;
  status: 'Open' | 'In Progress' | 'Escalated' | 'Resolved';
  time: string;
}
