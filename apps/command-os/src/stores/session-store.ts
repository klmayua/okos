/**
 * OK.OS — SESSION STORE
 */

import { createStore } from './store-factory';

interface State {
  sessionId: string | null;
  startedAt: number | null;
  expiresAt: number | null;
  lastActivity: number | null;
  locked: boolean;
}

type Action =
  | { type: 'START_SESSION'; sessionId: string; expiresAt: number }
  | { type: 'END_SESSION' }
  | { type: 'PING' }
  | { type: 'LOCK' }
  | { type: 'UNLOCK' };

function reducer(state: State, action: Action): State {
  const now = Date.now();
  switch (action.type) {
    case 'START_SESSION':
      return {
        sessionId: action.sessionId,
        startedAt: now,
        expiresAt: action.expiresAt,
        lastActivity: now,
        locked: false,
      };
    case 'END_SESSION':
      return { sessionId: null, startedAt: null, expiresAt: null, lastActivity: null, locked: false };
    case 'PING':
      return { ...state, lastActivity: now };
    case 'LOCK':
      return { ...state, locked: true };
    case 'UNLOCK':
      return { ...state, locked: false };
    default:
      return state;
  }
}

const initialState: State = {
  sessionId: null,
  startedAt: null,
  expiresAt: null,
  lastActivity: null,
  locked: false,
};

export const SessionStore = createStore({ name: 'Session', initialState, reducer });
