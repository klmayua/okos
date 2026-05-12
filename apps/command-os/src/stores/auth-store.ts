/**
 * OK.OS — AUTH STORE
 */

import { createStore } from './store-factory';

export interface OperatorProfile {
  id: string;
  name: string;
  role: string;
  region: string;
  permissions: string[];
}

interface State {
  authenticated: boolean;
  profile: OperatorProfile | null;
  token: string | null;
}

type Action =
  | { type: 'LOGIN'; profile: OperatorProfile; token: string }
  | { type: 'LOGOUT' }
  | { type: 'UPDATE_PROFILE'; profile: Partial<OperatorProfile> };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'LOGIN':
      return { authenticated: true, profile: action.profile, token: action.token };
    case 'LOGOUT':
      return { authenticated: false, profile: null, token: null };
    case 'UPDATE_PROFILE':
      return state.profile
        ? { ...state, profile: { ...state.profile, ...action.profile } }
        : state;
    default:
      return state;
  }
}

const initialState: State = {
  authenticated: false,
  profile: null,
  token: null,
};

export const AuthStore = createStore({ name: 'Auth', initialState, reducer });
