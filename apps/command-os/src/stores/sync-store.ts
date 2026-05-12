/**
 * OK.OS — SYNC STORE
 */

import { createStore } from './store-factory';

export type SyncState = 'pending' | 'syncing' | 'synchronized' | 'conflict' | 'failed' | 'offline';

interface State {
  status: SyncState;
  pendingCount: number;
  lastSyncAt: number | null;
  queue: Array<{ id: string; action: string; payload: unknown }>;
}

type Action =
  | { type: 'SET_STATUS'; status: SyncState }
  | { type: 'QUEUE_ACTION'; id: string; action: string; payload: unknown }
  | { type: 'REMOVE_FROM_QUEUE'; id: string }
  | { type: 'SET_LAST_SYNC'; at: number }
  | { type: 'SET_PENDING_COUNT'; count: number };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_STATUS':
      return { ...state, status: action.status };
    case 'QUEUE_ACTION':
      return {
        ...state,
        queue: [...state.queue, { id: action.id, action: action.action, payload: action.payload }],
        pendingCount: state.pendingCount + 1,
      };
    case 'REMOVE_FROM_QUEUE':
      return {
        ...state,
        queue: state.queue.filter((q) => q.id !== action.id),
        pendingCount: Math.max(0, state.pendingCount - 1),
      };
    case 'SET_LAST_SYNC':
      return { ...state, lastSyncAt: action.at };
    case 'SET_PENDING_COUNT':
      return { ...state, pendingCount: action.count };
    default:
      return state;
  }
}

const initialState: State = {
  status: 'synchronized',
  pendingCount: 0,
  lastSyncAt: null,
  queue: [],
};

export const SyncStore = createStore({ name: 'Sync', initialState, reducer });
