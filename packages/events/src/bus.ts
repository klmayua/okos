import type { Event, EventStream, EventSubscription } from './schemas.js';

function generateEventId(): string {
  return `evt_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
}

function generateSignature(event: Event): string {
  const payload = JSON.stringify(event.payload);
  const data = `${event.id}.${event.name}.${event.version}.${event.stream}.${event.actorId}.${event.occurredAt}.${payload}`;
  return `sig_${btoa(data).substring(0, 64)}`;
}

export class EventBus {
  private subscriptions: Map<EventStream, EventSubscription[]> = new Map();
  private deadLetterQueue: Event[] = [];
  private eventHistory: Event[] = [];

  subscribe(subscription: EventSubscription): () => void {
    const existing = this.subscriptions.get(subscription.stream) ?? [];
    existing.push(subscription);
    this.subscriptions.set(subscription.stream, existing);

    return () => {
      const subs = this.subscriptions.get(subscription.stream) ?? [];
      const index = subs.indexOf(subscription);
      if (index > -1) {
        subs.splice(index, 1);
      }
    };
  }

  async publish<T>(stream: EventStream, name: string, payload: T, actorId: string, correlationId?: string, causationId?: string, metadata: Record<string, unknown> = {}): Promise<Event<T>> {
    const event: Event<T> = {
      id: generateEventId(),
      name,
      version: '1.0.0',
      stream,
      actorId,
      correlationId: correlationId ?? generateEventId(),
      causationId,
      payload,
      metadata,
      occurredAt: new Date().toISOString(),
      signature: '',
    };

    event.signature = generateSignature(event);

    this.eventHistory.push(event);

    const subscriptions = this.subscriptions.get(stream) ?? [];

    for (const sub of subscriptions) {
      try {
        if (sub.filter && !sub.filter(event)) {
          continue;
        }
        await sub.handler(event);
      } catch (error) {
        console.error(`[event-bus] Handler error for ${name}:`, error);
        this.deadLetterQueue.push(event);
      }
    }

    return event;
  }

  getEventHistory(stream?: EventStream): Event[] {
    if (stream) {
      return this.eventHistory.filter(e => e.stream === stream);
    }
    return [...this.eventHistory];
  }

  getDeadLetterQueue(): Event[] {
    return [...this.deadLetterQueue];
  }

  replay(stream: EventStream, fromTimestamp?: string): Event[] {
    const events = this.eventHistory.filter(e => e.stream === stream);
    if (fromTimestamp) {
      return events.filter(e => e.occurredAt > fromTimestamp);
    }
    return events;
  }

  clear(): void {
    this.subscriptions.clear();
    this.eventHistory = [];
    this.deadLetterQueue = [];
  }
}

const globalEventBus = new EventBus();

export function getEventBus(): EventBus {
  return globalEventBus;
}

export function publishEvent<T>(stream: EventStream, name: string, payload: T, actorId: string, correlationId?: string): PromiseEvent<T> {
  return new Promise((resolve, reject) => {
    getEventBus()
      .publish(stream, name, payload, actorId, correlationId)
      .then(resolve)
      .catch(reject);
  });
}

type PromiseEvent<T> = Promise<Event<T>>;