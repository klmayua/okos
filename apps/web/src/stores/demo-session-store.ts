'use client';

import { useReducer, useCallback, useEffect } from 'react';

export type ScenarioId =
  | 'quiet_day'
  | 'pvc_mobilization_surge'
  | 'election_day'
  | 'treasury_audit_week'
  | 'misinformation_wave'
  | 'verification_crisis'
  | 'national_incident_escalation'
  | 'volunteer_activation_wave';

export type DemoRole =
  | 'citizen-view'
  | 'operations-command'
  | 'verification-desk'
  | 'treasury-oversight'
  | 'initiative-coordination'
  | 'moderation-center'
  | 'governance-chamber'
  | 'cso-observer'
  | 'emergency-response'
  | 'admin-core';

interface State {
  selectedRole: DemoRole | null;
  selectedScenario: ScenarioId;
  sessionInitialized: boolean;
  workspaceLoading: boolean;
  initializationProgress: number;
}

type Action =
  | { type: 'SET_ROLE'; role: DemoRole }
  | { type: 'SET_SCENARIO'; scenario: ScenarioId }
  | { type: 'START_INITIALIZATION' }
  | { type: 'SET_PROGRESS'; progress: number }
  | { type: 'COMPLETE_INITIALIZATION' }
  | { type: 'CLEAR_SESSION' };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_ROLE':
      return { ...state, selectedRole: action.role };
    case 'SET_SCENARIO':
      return { ...state, selectedScenario: action.scenario };
    case 'START_INITIALIZATION':
      return { ...state, workspaceLoading: true, initializationProgress: 0 };
    case 'SET_PROGRESS':
      return { ...state, initializationProgress: action.progress };
    case 'COMPLETE_INITIALIZATION':
      return { ...state, workspaceLoading: false, sessionInitialized: true, initializationProgress: 100 };
    case 'CLEAR_SESSION':
      return {
        selectedRole: null,
        selectedScenario: 'quiet_day',
        sessionInitialized: false,
        workspaceLoading: false,
        initializationProgress: 0,
      };
    default:
      return state;
  }
}

const STORAGE_KEY = 'okos-demo-session';

function loadInitialState(): State {
  if (typeof window === 'undefined') {
    return {
      selectedRole: null,
      selectedScenario: 'quiet_day',
      sessionInitialized: false,
      workspaceLoading: false,
      initializationProgress: 0,
    };
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        selectedRole: parsed.selectedRole ?? null,
        selectedScenario: parsed.selectedScenario ?? 'quiet_day',
        sessionInitialized: false,
        workspaceLoading: false,
        initializationProgress: 0,
      };
    }
  } catch {
    // ignore
  }
  return {
    selectedRole: null,
    selectedScenario: 'quiet_day',
    sessionInitialized: false,
    workspaceLoading: false,
    initializationProgress: 0,
  };
}

export function useDemoSession() {
  const [state, dispatch] = useReducer(reducer, loadInitialState());

  const setRole = useCallback((role: DemoRole) => {
    dispatch({ type: 'SET_ROLE', role });
  }, []);

  const setScenario = useCallback((scenario: ScenarioId) => {
    dispatch({ type: 'SET_SCENARIO', scenario });
  }, []);

  const initializeWorkspace = useCallback(() => {
    dispatch({ type: 'START_INITIALIZATION' });
    const steps = [20, 40, 60, 80, 100];
    steps.forEach((progress, i) => {
      setTimeout(() => {
        dispatch({ type: 'SET_PROGRESS', progress });
        if (progress === 100) {
          dispatch({ type: 'COMPLETE_INITIALIZATION' });
        }
      }, (i + 1) * 280);
    });
  }, []);

  const clearSession = useCallback(() => {
    dispatch({ type: 'CLEAR_SESSION' });
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        selectedRole: state.selectedRole,
        selectedScenario: state.selectedScenario,
      })
    );
  }, [state.selectedRole, state.selectedScenario]);

  return {
    state,
    setRole,
    setScenario,
    initializeWorkspace,
    clearSession,
  };
}
