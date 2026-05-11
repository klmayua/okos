import type {
  VirtualClock,
  TimeMode,
  TimelineSnapshot,
  TimelineEvent,
  TimeOptions,
  TimelineBranch,
  HistoricalSnapshot,
} from './types.js';

let globalClock: VirtualClock | null = null;
let eventLog: TimelineEvent[] = [];
const branches: Map<string, TimelineBranch> = new Map();
const snapshots: Map<string, TimelineSnapshot> = new Map();

export function initializeClock(options: TimeOptions = {}): VirtualClock {
  const {
    startTime = new Date().toISOString(),
    mode = 'campaign_season',
    speed = 1,
  } = options;

  globalClock = {
    currentTime: startTime,
    mode,
    speed,
    startedAt: startTime,
    isPaused: false,
  };

  eventLog = [];
  return globalClock;
}

export function getClock(): VirtualClock | null {
  return globalClock;
}

export function getCurrentTime(): string {
  return globalClock?.currentTime || new Date().toISOString();
}

export function advanceTime(minutes: number = 1): void {
  if (!globalClock || globalClock.isPaused) return;

  const current = new Date(globalClock.currentTime);
  current.setMinutes(current.getMinutes() + minutes * globalClock.speed);
  globalClock.currentTime = current.toISOString();
}

export function setMode(mode: TimeMode): void {
  if (globalClock) {
    globalClock.mode = mode;
  }
}

export function setSpeed(speed: number): void {
  if (globalClock) {
    globalClock.speed = Math.max(0.1, Math.min(100, speed));
  }
}

export function pause(): void {
  if (globalClock) {
    globalClock.isPaused = true;
  }
}

export function resume(): void {
  if (globalClock) {
    globalClock.isPaused = false;
  }
}

export function addEvent(type: string, data: Record<string, unknown> = {}): TimelineEvent {
  const event: TimelineEvent = {
    id: `event-${Date.now()}-${Math.random().toString(36).slice(2)}`,
    type,
    timestamp: getCurrentTime(),
    data,
  };
  eventLog.push(event);
  return event;
}

export function getEvents(type?: string): TimelineEvent[] {
  if (type) {
    return eventLog.filter(e => e.type === type);
  }
  return [...eventLog];
}

export function clearEvents(): void {
  eventLog = [];
}

export function createSnapshot(): TimelineSnapshot {
  const snapshot: TimelineSnapshot = {
    id: `snapshot-${Date.now()}`,
    timestamp: getCurrentTime(),
    mode: globalClock?.mode || 'campaign_season',
    events: [...eventLog],
  };
  snapshots.set(snapshot.id, snapshot);
  return snapshot;
}

export function loadSnapshot(snapshotId: string): boolean {
  const snapshot = snapshots.get(snapshotId);
  if (!snapshot || !globalClock) return false;

  globalClock.currentTime = snapshot.timestamp;
  globalClock.mode = snapshot.mode;
  eventLog = [...snapshot.events];
  return true;
}

export function getSnapshots(): TimelineSnapshot[] {
  return Array.from(snapshots.values());
}

export function createBranch(name: string, parentBranchId: string | null = null): TimelineBranch {
  const branch: TimelineBranch = {
    id: `branch-${Date.now()}`,
    name,
    createdAt: getCurrentTime(),
    parentBranchId,
  };
  branches.set(branch.id, branch);
  return branch;
}

export function getBranches(): TimelineBranch[] {
  return Array.from(branches.values());
}

export function saveHistoricalSnapshot(state: Record<string, unknown>): HistoricalSnapshot {
  return {
    id: `history-${Date.now()}`,
    timestamp: getCurrentTime(),
    mode: globalClock?.mode || 'campaign_season',
    state,
  };
}

export function resetClock(): void {
  globalClock = null;
  eventLog = [];
  branches.clear();
  snapshots.clear();
}

export const TIME_MODES: TimeMode[] = [
  'campaign_season',
  'election_day',
  'post_election',
  'quarterly_governance',
  'emergency_response',
  'initiative_execution',
  'misinformation_crisis',
];

export {
  type VirtualClock,
  type TimelineEvent,
  type TimelineSnapshot,
  type TimelineBranch,
  type HistoricalSnapshot,
  type TimeMode,
};