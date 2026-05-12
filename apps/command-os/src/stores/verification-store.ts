/**
 * OK.OS — VERIFICATION STORE
 */

import { createStore } from './store-factory';

export interface VerificationSubmission {
  id: string;
  type: string;
  unit: string;
  status: 'pending' | 'processing' | 'flagged' | 'verified' | 'escalated' | 'archived';
  confidence: number;
  time: string;
}

interface State {
  submissions: VerificationSubmission[];
  stats: {
    incoming: number;
    processing: number;
    verified: number;
    flagged: number;
    escalated: number;
  };
}

type Action =
  | { type: 'SET_SUBMISSIONS'; payload: VerificationSubmission[] }
  | { type: 'UPDATE_SUBMISSION'; payload: VerificationSubmission }
  | { type: 'SET_STATS'; payload: State['stats'] };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_SUBMISSIONS':
      return { ...state, submissions: action.payload };
    case 'UPDATE_SUBMISSION': {
      const idx = state.submissions.findIndex((s) => s.id === action.payload.id);
      if (idx === -1) return { ...state, submissions: [action.payload, ...state.submissions] };
      const next = [...state.submissions];
      next[idx] = action.payload;
      return { ...state, submissions: next };
    }
    case 'SET_STATS':
      return { ...state, stats: action.payload };
    default:
      return state;
  }
}

const initialState: State = {
  submissions: [],
  stats: { incoming: 0, processing: 0, verified: 0, flagged: 0, escalated: 0 },
};

export const VerificationStore = createStore({ name: 'Verification', initialState, reducer });
