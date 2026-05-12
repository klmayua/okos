/**
 * OK.OS — GOVERNANCE STORE
 */

import { createStore } from './store-factory';

export interface GovernanceRole {
  role: string;
  holders: number;
  description: string;
}

export interface GovernanceModule {
  id: string;
  title: string;
  description: string;
  count: number;
}

interface State {
  modules: GovernanceModule[];
  roles: GovernanceRole[];
}

type Action =
  | { type: 'SET_MODULES'; payload: GovernanceModule[] }
  | { type: 'SET_ROLES'; payload: GovernanceRole[] };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_MODULES':
      return { ...state, modules: action.payload };
    case 'SET_ROLES':
      return { ...state, roles: action.payload };
    default:
      return state;
  }
}

const initialState: State = {
  modules: [],
  roles: [],
};

export const GovernanceStore = createStore({ name: 'Governance', initialState, reducer });
