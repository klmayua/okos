/**
 * OK.OS — VOLUNTEER STORE
 */

import { createStore } from './store-factory';

export interface Volunteer {
  id: string;
  name: string;
  region: string;
  status: 'active' | 'inactive' | 'pending';
  assignments: number;
}

interface State {
  volunteers: Volunteer[];
  activeCount: number;
}

type Action =
  | { type: 'SET_VOLUNTEERS'; payload: Volunteer[] }
  | { type: 'UPDATE_VOLUNTEER'; payload: Volunteer }
  | { type: 'SET_ACTIVE_COUNT'; count: number };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_VOLUNTEERS':
      return { ...state, volunteers: action.payload };
    case 'UPDATE_VOLUNTEER': {
      const idx = state.volunteers.findIndex((v) => v.id === action.payload.id);
      if (idx === -1) return { ...state, volunteers: [action.payload, ...state.volunteers] };
      const next = [...state.volunteers];
      next[idx] = action.payload;
      return { ...state, volunteers: next };
    }
    case 'SET_ACTIVE_COUNT':
      return { ...state, activeCount: action.count };
    default:
      return state;
  }
}

const initialState: State = {
  volunteers: [],
  activeCount: 0,
};

export const VolunteerStore = createStore({ name: 'Volunteer', initialState, reducer });
