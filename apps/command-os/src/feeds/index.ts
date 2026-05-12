/**
 * OK.OS — Command.OS Feeds
 * Realtime activity feeds
 */

export interface FeedItem {
  id: string;
  type: string;
  message: string;
  timestamp: string;
  severity: 'info' | 'caution' | 'warning' | 'critical';
}
