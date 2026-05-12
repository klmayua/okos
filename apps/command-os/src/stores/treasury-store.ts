/**
 * OK.OS — TREASURY STORE
 */

import { createStore } from './store-factory';

export interface TreasuryTransaction {
  id: string;
  type: string;
  amount: number;
  donor: string;
  initiative: string;
  status: 'confirmed' | 'pending_cso' | 'approved' | 'audited';
  time: string;
}

interface State {
  balance: number;
  incomingToday: number;
  transactions: TreasuryTransaction[];
  pendingReleases: number;
}

type Action =
  | { type: 'SET_BALANCE'; value: number }
  | { type: 'ADD_TRANSACTION'; tx: TreasuryTransaction }
  | { type: 'SET_TRANSACTIONS'; txs: TreasuryTransaction[] }
  | { type: 'SET_INCOMING_TODAY'; value: number }
  | { type: 'SET_PENDING_RELEASES'; value: number };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_BALANCE':
      return { ...state, balance: action.value };
    case 'ADD_TRANSACTION':
      return { ...state, transactions: [action.tx, ...state.transactions] };
    case 'SET_TRANSACTIONS':
      return { ...state, transactions: action.txs };
    case 'SET_INCOMING_TODAY':
      return { ...state, incomingToday: action.value };
    case 'SET_PENDING_RELEASES':
      return { ...state, pendingReleases: action.value };
    default:
      return state;
  }
}

const initialState: State = {
  balance: 0,
  incomingToday: 0,
  transactions: [],
  pendingReleases: 0,
};

export const TreasuryStore = createStore({ name: 'Treasury', initialState, reducer });
