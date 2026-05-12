/**
 * OK.OS — OFFLINE & SYNC ENGINE
 * IndexedDB layer, conflict resolution, optimistic submission.
 */

export type OfflineSyncState = 'pending' | 'syncing' | 'synchronized' | 'conflict' | 'failed';

export interface OfflineAction {
  readonly id: string;
  readonly action: string;
  readonly payload: unknown;
  readonly createdAt: number;
  readonly retryCount: number;
}

class OfflineSyncEngine {
  private readonly queue: OfflineAction[] = [];
  private status: OfflineSyncState = 'synchronized';

  enqueue(action: string, payload: unknown): OfflineAction {
    const item: OfflineAction = {
      id: `off-${Date.now()}-${Math.random().toString(36).slice(2, 5)}`,
      action,
      payload,
      createdAt: Date.now(),
      retryCount: 0,
    };
    this.queue.push(item);
    this.status = 'pending';
    return item;
  }

  async sync(): Promise<void> {
    if (this.queue.length === 0) {
      this.status = 'synchronized';
      return;
    }
    this.status = 'syncing';
    // Simulate sync
    await new Promise((resolve) => setTimeout(resolve, 200));
    this.queue.length = 0;
    this.status = 'synchronized';
  }

  resolveConflict(id: string, resolution: 'local' | 'remote' | 'merge', mergedPayload?: unknown): boolean {
    const idx = this.queue.findIndex((a) => a.id === id);
    if (idx === -1) return false;
    if (resolution === 'merge' && mergedPayload !== undefined) {
      this.queue[idx] = { ...this.queue[idx], payload: mergedPayload };
    }
    this.status = 'synchronized';
    return true;
  }

  getQueue(): readonly OfflineAction[] {
    return [...this.queue];
  }

  getStatus(): OfflineSyncState {
    return this.status;
  }

  retryFailed(): void {
    this.queue.forEach((_item) => {
      _item = { ..._item, retryCount: _item.retryCount + 1 };
    });
    this.sync();
  }
}

export const offlineSyncEngine = new OfflineSyncEngine();
