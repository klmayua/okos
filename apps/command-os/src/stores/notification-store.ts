/**
 * OK.OS — NOTIFICATION STORE
 */

import { createStore } from './store-factory';

export interface Notification {
  id: string;
  type: string;
  severity: 'informational' | 'caution' | 'warning' | 'critical';
  message: string;
  read: boolean;
  timestamp: number;
  groupKey?: string;
}

interface State {
  notifications: Notification[];
  unreadCount: number;
}

type Action =
  | { type: 'ADD_NOTIFICATION'; payload: Notification }
  | { type: 'MARK_READ'; id: string }
  | { type: 'MARK_ALL_READ' }
  | { type: 'DISMISS'; id: string };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'ADD_NOTIFICATION': {
      const next = [action.payload, ...state.notifications];
      return {
        ...state,
        notifications: next,
        unreadCount: next.filter((n) => !n.read).length,
      };
    }
    case 'MARK_READ': {
      const next = state.notifications.map((n) =>
        n.id === action.id ? { ...n, read: true } : n
      );
      return { ...state, notifications: next, unreadCount: next.filter((n) => !n.read).length };
    }
    case 'MARK_ALL_READ': {
      const next = state.notifications.map((n) => ({ ...n, read: true }));
      return { ...state, notifications: next, unreadCount: 0 };
    }
    case 'DISMISS': {
      const next = state.notifications.filter((n) => n.id !== action.id);
      return { ...state, notifications: next, unreadCount: next.filter((n) => !n.read).length };
    }
    default:
      return state;
  }
}

const initialState: State = {
  notifications: [],
  unreadCount: 0,
};

export const NotificationStore = createStore({ name: 'Notification', initialState, reducer });
