/**
 * OK.OS — TIMELINE ENGINE
 * Institutional chronology for all operational domains.
 */

export type TimelineDomain = 'initiatives' | 'treasury' | 'incidents' | 'verification' | 'moderation' | 'governance';

export interface TimelineEntry {
  readonly id: string;
  readonly domain: TimelineDomain;
  readonly targetId: string;
  readonly type: 'creation' | 'assignment' | 'escalation' | 'approval' | 'rejection' | 'completion' | 'audit';
  readonly actor: string;
  readonly description: string;
  readonly timestamp: number;
  readonly metadata: Record<string, unknown>;
}

class TimelineEngine {
  private readonly entries: TimelineEntry[] = [];

  addEntry(entry: Omit<TimelineEntry, 'id' | 'timestamp'>): TimelineEntry {
    const full: TimelineEntry = {
      ...entry,
      id: `tl-${Date.now()}-${Math.random().toString(36).slice(2, 5)}`,
      timestamp: Date.now(),
    };
    this.entries.push(full);
    return full;
  }

  getEntriesByTarget(targetId: string): readonly TimelineEntry[] {
    return this.entries.filter((e) => e.targetId === targetId).sort((a, b) => a.timestamp - b.timestamp);
  }

  getEntriesByDomain(domain: TimelineDomain): readonly TimelineEntry[] {
    return this.entries.filter((e) => e.domain === domain).sort((a, b) => a.timestamp - b.timestamp);
  }

  getAllEntries(): readonly TimelineEntry[] {
    return [...this.entries].sort((a, b) => a.timestamp - b.timestamp);
  }
}

export const timelineEngine = new TimelineEngine();
