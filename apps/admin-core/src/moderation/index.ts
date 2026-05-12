/**
 * OK.OS — Admin.Core Moderation
 */

export interface ModerationQueue {
  id: string;
  name: string;
  pendingCount: number;
  avgReviewTime: string;
}
