/**
 * OK.OS — SCENARIO RUNTIME TYPES
 */

export type ScenarioId =
  | 'quiet_day'
  | 'pvc_mobilization_surge'
  | 'election_day'
  | 'treasury_audit_week'
  | 'misinformation_wave'
  | 'verification_crisis'
  | 'national_incident_escalation'
  | 'volunteer_activation_wave';

export interface ScenarioConfig {
  id: ScenarioId;
  label: string;
  description: string;
  intensity: 'low' | 'medium' | 'high' | 'extreme';
  mutations: ScenarioMutation[];
}

export interface ScenarioMutation {
  target: string;
  property: string;
  value: unknown;
  duration?: number;
}

export interface ScenarioState {
  currentScenario: ScenarioId;
  previousScenario: ScenarioId | null;
  startedAt: number;
  active: boolean;
}
