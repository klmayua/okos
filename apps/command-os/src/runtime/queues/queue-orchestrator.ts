/**
 * OK.OS — QUEUE ORCHESTRATOR
 * 8 queues with priority, retry, SLA tracking.
 */

export interface QueueItem {
  readonly id: string;
  readonly queueId: string;
  readonly priority: number; // 1-5, lower is higher
  readonly payload: Record<string, unknown>;
  readonly createdAt: number;
  readonly assignedTo?: string;
  readonly retries: number;
  readonly maxRetries: number;
  readonly slaDeadline: number;
}

export type QueueId =
  | 'initiative_review_queue'
  | 'treasury_release_queue'
  | 'moderation_queue'
  | 'verification_queue'
  | 'incident_queue'
  | 'escalation_queue'
  | 'governance_approval_queue'
  | 'narrative_review_queue';

class QueueOrchestrator {
  private readonly queues = new Map<QueueId, QueueItem[]>();

  constructor() {
    const queueIds: QueueId[] = [
      'initiative_review_queue',
      'treasury_release_queue',
      'moderation_queue',
      'verification_queue',
      'incident_queue',
      'escalation_queue',
      'governance_approval_queue',
      'narrative_review_queue',
    ];
    queueIds.forEach((id) => this.queues.set(id, []));
  }

  enqueue(queueId: QueueId, item: Omit<QueueItem, 'queueId'>): void {
    const queue = this.queues.get(queueId) ?? [];
    const fullItem: QueueItem = { ...item, queueId };
    queue.push(fullItem);
    queue.sort((a, b) => a.priority - b.priority);
    this.queues.set(queueId, queue);
  }

  dequeue(queueId: QueueId): QueueItem | undefined {
    const queue = this.queues.get(queueId) ?? [];
    const item = queue.shift();
    this.queues.set(queueId, queue);
    return item;
  }

  peek(queueId: QueueId): QueueItem | undefined {
    return this.queues.get(queueId)?.[0];
  }

  getQueue(queueId: QueueId): readonly QueueItem[] {
    return this.queues.get(queueId) ?? [];
  }

  getCount(queueId: QueueId): number {
    return this.queues.get(queueId)?.length ?? 0;
  }

  assign(queueId: QueueId, itemId: string, operatorId: string): boolean {
    const queue = this.queues.get(queueId);
    if (!queue) return false;
    const idx = queue.findIndex((i) => i.id === itemId);
    if (idx === -1) return false;
    const next = [...queue];
    next[idx] = { ...next[idx], assignedTo: operatorId };
    this.queues.set(queueId, next);
    return true;
  }

  retry(queueId: QueueId, itemId: string): boolean {
    const queue = this.queues.get(queueId);
    if (!queue) return false;
    const idx = queue.findIndex((i) => i.id === itemId);
    if (idx === -1) return false;
    const item = queue[idx];
    if (item.retries >= item.maxRetries) return false;
    const next = [...queue];
    next[idx] = { ...item, retries: item.retries + 1 };
    this.queues.set(queueId, next);
    return true;
  }

  getOverdue(queueId: QueueId): readonly QueueItem[] {
    const now = Date.now();
    return (this.queues.get(queueId) ?? []).filter((i) => i.slaDeadline < now);
  }
}

export const queueOrchestrator = new QueueOrchestrator();
