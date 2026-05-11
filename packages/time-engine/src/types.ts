export type TimeMode =
  | 'campaign_season'
  | 'election_day'
  | 'post_election'
  | 'quarterly_governance'
  | 'emergency_response'
  | 'initiative_execution'
  | 'misinformation_crisis';

export interface VirtualClock {
  currentTime: string;
  mode: TimeMode;
  speed: number;
  startedAt: string;
  isPaused: boolean;
}

export interface TimelineSnapshot {
  id: string;
  timestamp: string;
  mode: TimeMode;
  events: TimelineEvent[];
}

export interface TimelineEvent {
  id: string;
  type: string;
  timestamp: string;
  data: Record<string, unknown>;
}

export interface TimeOptions {
  seed?: string;
  startTime?: string;
  mode?: TimeMode;
  speed?: number;
}

export interface TimeRange {
  start: string;
  end: string;
}

export interface TimelineBranch {
  id: string;
  name: string;
  createdAt: string;
  parentBranchId: string | null;
}

export interface HistoricalSnapshot {
  id: string;
  timestamp: string;
  mode: TimeMode;
  state: Record<string, unknown>;
}