/**
 * OK.OS — EVENT BUS
 * Central append-only event log with deterministic ordering.
 */

import type { OKEvent, EventDomain } from './event-types';

type EventHandler = (event: OKEvent) => void;

class EventBus {
  private readonly log: OKEvent[] = [];
  private readonly handlers = new Map<EventDomain, Set<EventHandler>>();
  private readonly globalHandlers = new Set<EventHandler>();
  private readonly deadLetterQueue: OKEvent[] = [];

  publish(event: OKEvent): void {
    this.log.push(event);
    const domainHandlers = this.handlers.get(event.domain);
    if (domainHandlers) {
      domainHandlers.forEach((h) => {
        try {
          h(event);
        } catch (err) {
          this.deadLetterQueue.push(event);
          console.error('[EventBus] Handler failed:', err);
        }
      });
    }
    this.globalHandlers.forEach((h) => {
      try {
        h(event);
      } catch (err) {
        console.error('[EventBus] Global handler failed:', err);
      }
    });
  }

  subscribe(domain: EventDomain, handler: EventHandler): () => void {
    if (!this.handlers.has(domain)) {
      this.handlers.set(domain, new Set());
    }
    this.handlers.get(domain)!.add(handler);
    return () => {
      this.handlers.get(domain)?.delete(handler);
    };
  }

  subscribeGlobal(handler: EventHandler): () => void {
    this.globalHandlers.add(handler);
    return () => this.globalHandlers.delete(handler);
  }

  getLog(): readonly OKEvent[] {
    return this.log;
  }

  getLogByDomain(domain: EventDomain): readonly OKEvent[] {
    return this.log.filter((e) => e.domain === domain);
  }

  getDeadLetterQueue(): readonly OKEvent[] {
    return this.deadLetterQueue;
  }
}

export const eventBus = new EventBus();
