/**
 * OK.OS — Admin.Core Queues
 */

export interface QueueItem {
  id: string;
  type: string;
  priority: 'low' | 'medium' | 'high';
  status: string;
}
