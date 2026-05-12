/**
 * OK.OS — REALTIME STORE
 */

import { createStore } from './store-factory';

export type RealtimeStatus = 'connected' | 'degraded' | 'reconnecting' | 'offline' | 'synchronized';

interface State {
  status: RealtimeStatus;
  latency: number;
  activeStreams: string[];
}

type Action =
  | { type: 'SET_STATUS'; status: RealtimeStatus }
  | { type: 'SET_LATENCY'; ms: number }
  | { type: 'SET_STREAMS'; streams: string[] };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_STATUS':
      return { ...state, status: action.status };
    case 'SET_LATENCY':
      return { ...state, latency: action.ms };
    case 'SET_STREAMS':
      return { ...state, activeStreams: action.streams };
    default:
      return state;
  }
}

const initialState: State = {
  status: 'offline',
  latency: 0,
  activeStreams: [],
};

export const RealtimeStore = createStore({ name: 'Realtime', initialState, reducer });
