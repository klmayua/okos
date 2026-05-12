/**
 * OK.OS — INITIATIVES STORE
 */

import { createStore } from './store-factory';

export interface Initiative {
  id: string;
  title: string;
  state: InitiativeState;
  volunteers: number;
  funding: number;
  impact: string;
  createdAt: number;
  updatedAt: number;
}

export type InitiativeState =
  | 'draft'
  | 'under_review'
  | 'voting'
  | 'approved'
  | 'active'
  | 'paused'
  | 'escalated'
  | 'completed'
  | 'archived';

interface State {
  initiatives: Initiative[];
  selectedId: string | null;
}

type Action =
  | { type: 'SET_INITIATIVES'; payload: Initiative[] }
  | { type: 'UPDATE_INITIATIVE'; payload: Initiative }
  | { type: 'SELECT_INITIATIVE'; id: string | null };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_INITIATIVES':
      return { ...state, initiatives: action.payload };
    case 'UPDATE_INITIATIVE': {
      const idx = state.initiatives.findIndex((i) => i.id === action.payload.id);
      if (idx === -1) return { ...state, initiatives: [...state.initiatives, action.payload] };
      const next = [...state.initiatives];
      next[idx] = action.payload;
      return { ...state, initiatives: next };
    }
    case 'SELECT_INITIATIVE':
      return { ...state, selectedId: action.id };
    default:
      return state;
  }
}

const initialState: State = {
  initiatives: [],
  selectedId: null,
};

export const InitiativesStore = createStore({ name: 'Initiatives', initialState, reducer });
