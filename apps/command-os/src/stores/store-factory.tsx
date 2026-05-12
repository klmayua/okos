/**
 * OK.OS — STORE INFRASTRUCTURE
 * Deterministic state mutations via useReducer.
 */

import React, { createContext, useContext, useReducer, useCallback } from 'react';

export interface StoreConfig<S, A> {
  name: string;
  initialState: S;
  reducer: (state: S, action: A) => S;
}

export function createStore<S, A>(config: StoreConfig<S, A>) {
  const StateContext = createContext<S | null>(null);
  const DispatchContext = createContext<React.Dispatch<A> | null>(null);

  function Provider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(config.reducer, config.initialState);
    return (
      <StateContext.Provider value={state}>
        <DispatchContext.Provider value={dispatch}>{children}</DispatchContext.Provider>
      </StateContext.Provider>
    );
  }

  function useStore(): S {
    const state = useContext(StateContext);
    if (state === null) {
      throw new Error(`${config.name}Provider required`);
    }
    return state;
  }

  function useDispatch(): React.Dispatch<A> {
    const dispatch = useContext(DispatchContext);
    if (dispatch === null) {
      throw new Error(`${config.name}Provider required`);
    }
    return dispatch;
  }

  function useAction<Args extends unknown[]>(
    creator: (...args: Args) => A
  ): (...args: Args) => void {
    const dispatch = useDispatch();
    return useCallback(
      (...args: Args) => {
        dispatch(creator(...args));
      },
      [dispatch, creator]
    );
  }

  return { Provider, useStore, useDispatch, useAction };
}
