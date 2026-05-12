/**
 * OK.OS — INCIDENT STORE
 */

import { createStore } from './store-factory';

export interface Incident {
  id: string;
  level: 'low' | 'moderate' | 'severe' | 'emergency';
  title: string;
  region: string;
  assignee: string;
  status: 'open' | 'in_progress' | 'escalated' | 'resolved';
  time: string;
}

interface State {
  incidents: Incident[];
  levelCounts: Record<Incident['level'], number>;
}

type Action =
  | { type: 'SET_INCIDENTS'; payload: Incident[] }
  | { type: 'UPDATE_INCIDENT'; payload: Incident }
  | { type: 'SET_LEVEL_COUNTS'; payload: State['levelCounts'] };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_INCIDENTS':
      return { ...state, incidents: action.payload };
    case 'UPDATE_INCIDENT': {
      const idx = state.incidents.findIndex((i) => i.id === action.payload.id);
      if (idx === -1) return { ...state, incidents: [action.payload, ...state.incidents] };
      const next = [...state.incidents];
      next[idx] = action.payload;
      return { ...state, incidents: next };
    }
    case 'SET_LEVEL_COUNTS':
      return { ...state, levelCounts: action.payload };
    default:
      return state;
  }
}

const initialState: State = {
  incidents: [],
  levelCounts: { low: 0, moderate: 0, severe: 0, emergency: 0 },
};

export const IncidentStore = createStore({ name: 'Incident', initialState, reducer });
