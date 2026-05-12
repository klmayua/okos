/**
 * OK.OS — MODERATION STORE
 */

import { createStore } from './store-factory';

export interface ModerationItem {
  id: string;
  queue: string;
  report: string;
  reporter: string;
  status: 'pending' | 'under_review' | 'flagged';
  assignedTo?: string;
}

interface State {
  items: ModerationItem[];
  queueCounts: Record<string, number>;
}

type Action =
  | { type: 'SET_ITEMS'; payload: ModerationItem[] }
  | { type: 'UPDATE_ITEM'; payload: ModerationItem }
  | { type: 'SET_QUEUE_COUNTS'; payload: Record<string, number> };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_ITEMS':
      return { ...state, items: action.payload };
    case 'UPDATE_ITEM': {
      const idx = state.items.findIndex((i) => i.id === action.payload.id);
      if (idx === -1) return { ...state, items: [action.payload, ...state.items] };
      const next = [...state.items];
      next[idx] = action.payload;
      return { ...state, items: next };
    }
    case 'SET_QUEUE_COUNTS':
      return { ...state, queueCounts: action.payload };
    default:
      return state;
  }
}

const initialState: State = {
  items: [],
  queueCounts: {},
};

export const ModerationStore = createStore({ name: 'Moderation', initialState, reducer });
