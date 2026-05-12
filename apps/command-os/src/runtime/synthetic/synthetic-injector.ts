/**
 * OK.OS — SYNTHETIC INJECTION ADAPTERS
 * All operational surfaces must accept synthetic streams.
 */

import { eventBus } from '../events/event-bus';
import { createEvent } from '../events/event-types';
import type { EventDomain } from '../events/event-types';
import { activityFeedEngine } from '../feeds/feed-engine';
import { queueOrchestrator } from '../queues/queue-orchestrator';
import { realtimeAdapter } from '../realtime/realtime-adapter';
import { timelineEngine } from '../timelines/timeline-engine';
import { workflowEngine } from '../workflows/workflow-engine';

export interface SyntheticStreamConfig {
  streamId: string;
  intervalMs: number;
  eventDomain: EventDomain;
  eventType: string;
  payloadGenerator: () => Record<string, unknown>;
}

class SyntheticInjector {
  private timers = new Map<string, ReturnType<typeof setInterval>>();

  startStream(config: SyntheticStreamConfig): void {
    if (this.timers.has(config.streamId)) return;
    const timer = setInterval(() => {
      const payload = config.payloadGenerator();
      const event = createEvent(config.eventDomain, config.eventType, payload, config.streamId);
      eventBus.publish(event);
      realtimeAdapter.publish('operational_feed' as import('../realtime/realtime-adapter').StreamId, event);
    }, config.intervalMs);
    this.timers.set(config.streamId, timer);
  }

  stopStream(streamId: string): void {
    const timer = this.timers.get(streamId);
    if (timer) {
      clearInterval(timer);
      this.timers.delete(streamId);
    }
  }

  stopAll(): void {
    this.timers.forEach((timer) => clearInterval(timer));
    this.timers.clear();
  }

  injectEvent(domain: EventDomain, type: string, payload: Record<string, unknown>, correlationId = 'synthetic'): void {
    const event = createEvent(domain, type, payload, correlationId);
    eventBus.publish(event);
  }

  injectQueueItem(queueId: import('../queues/queue-orchestrator').QueueId, payload: Record<string, unknown>): void {
    queueOrchestrator.enqueue(queueId, {
      id: `synth-${Date.now()}`,
      priority: Math.floor(Math.random() * 5) + 1,
      payload,
      createdAt: Date.now(),
      retries: 0,
      maxRetries: 3,
      slaDeadline: Date.now() + 3600000,
    });
  }

  createWorkflow(workflowId: import('../workflows/workflow-engine').WorkflowId, instanceId: string): void {
    workflowEngine.create(instanceId, workflowId);
  }

  addTimelineEntry(
    domain: import('../timelines/timeline-engine').TimelineDomain,
    targetId: string,
    type: import('../timelines/timeline-engine').TimelineEntry['type'],
    actor: string,
    description: string
  ): void {
    timelineEngine.addEntry({ domain, targetId, type, actor, description, metadata: {} });
  }

  appendFeed(
    feedId: import('../feeds/feed-engine').FeedId,
    actor: string,
    action: string,
    target: string
  ): void {
    activityFeedEngine.append(feedId, { feedId, actor, action, target });
  }
}

export const syntheticInjector = new SyntheticInjector();
