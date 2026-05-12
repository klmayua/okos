/**
 * OK.OS — ACTIVITY FEED ENGINE
 * 7 feeds with deduplication and realtime append.
 */

export type FeedId =
  | 'national_feed'
  | 'regional_feed'
  | 'initiative_feed'
  | 'treasury_feed'
  | 'verification_feed'
  | 'governance_feed'
  | 'moderation_feed';

export interface FeedEntry {
  readonly id: string;
  readonly feedId: FeedId;
  readonly actor: string;
  readonly action: string;
  readonly target: string;
  readonly region?: string;
  readonly timestamp: number;
  readonly grouped: boolean;
}

class ActivityFeedEngine {
  private readonly feeds = new Map<FeedId, FeedEntry[]>();
  private readonly dedupWindow = new Map<string, number>();
  private readonly dedupWindowMs = 30000; // 30 seconds

  constructor() {
    const feedIds: FeedId[] = [
      'national_feed',
      'regional_feed',
      'initiative_feed',
      'treasury_feed',
      'verification_feed',
      'governance_feed',
      'moderation_feed',
    ];
    feedIds.forEach((id) => this.feeds.set(id, []));
  }

  append(feedId: FeedId, entry: Omit<FeedEntry, 'id' | 'timestamp' | 'grouped'>): FeedEntry | null {
    const dedupKey = `${feedId}:${entry.actor}:${entry.action}:${entry.target}`;
    const lastSeen = this.dedupWindow.get(dedupKey);
    const now = Date.now();

    let grouped = false;
    if (lastSeen && now - lastSeen < this.dedupWindowMs) {
      grouped = true;
    }
    this.dedupWindow.set(dedupKey, now);

    const full: FeedEntry = {
      ...entry,
      id: `feed-${now}-${Math.random().toString(36).slice(2, 5)}`,
      timestamp: now,
      grouped,
    };

    const feed = this.feeds.get(feedId) ?? [];
    feed.unshift(full);
    // Keep last 500 entries per feed
    if (feed.length > 500) feed.length = 500;
    this.feeds.set(feedId, feed);

    return full;
  }

  getFeed(feedId: FeedId, limit = 50): readonly FeedEntry[] {
    return (this.feeds.get(feedId) ?? []).slice(0, limit);
  }

  getAllFeeds(): ReadonlyMap<FeedId, readonly FeedEntry[]> {
    const result = new Map<FeedId, readonly FeedEntry[]>();
    this.feeds.forEach((entries, id) => result.set(id, [...entries]));
    return result;
  }
}

export const activityFeedEngine = new ActivityFeedEngine();
