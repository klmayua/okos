/**
 * OK.OS — SCENARIO PRESETS
 * 8 curated scenarios for synthetic platform mutation.
 */

import type { ScenarioConfig } from '../types';

export const scenarioPresets: Record<string, ScenarioConfig> = {
  quiet_day: {
    id: 'quiet_day',
    label: 'Quiet Day',
    description: 'Normal operational rhythm. Low activity across all systems.',
    intensity: 'low',
    mutations: [
      { target: 'incidents', property: 'rate', value: 2 },
      { target: 'treasury', property: 'activity', value: 10 },
      { target: 'verification', property: 'load', value: 15 },
      { target: 'feeds', property: 'velocity', value: 20 },
    ],
  },
  pvc_mobilization_surge: {
    id: 'pvc_mobilization_surge',
    label: 'PVC Mobilization Surge',
    description: 'Nationwide PVC registration drive. High volunteer and initiative activity.',
    intensity: 'high',
    mutations: [
      { target: 'initiatives', property: 'activity', value: 85 },
      { target: 'volunteers', property: 'presence', value: 90 },
      { target: 'donations', property: 'density', value: 60 },
      { target: 'feeds', property: 'velocity', value: 75 },
    ],
  },
  election_day: {
    id: 'election_day',
    label: 'Election Day',
    description: 'Peak operational load. Extreme verification and incident activity.',
    intensity: 'extreme',
    mutations: [
      { target: 'verification', property: 'clusters', value: 100 },
      { target: 'incidents', property: 'rate', value: 80 },
      { target: 'alerts', property: 'frequency', value: 95 },
      { target: 'maps', property: 'activity', value: 100 },
    ],
  },
  treasury_audit_week: {
    id: 'treasury_audit_week',
    label: 'Treasury Audit Week',
    description: 'Intense financial scrutiny. Extreme treasury and elevated governance activity.',
    intensity: 'extreme',
    mutations: [
      { target: 'treasury', property: 'activity', value: 100 },
      { target: 'governance', property: 'activity', value: 70 },
      { target: 'alerts', property: 'frequency', value: 40 },
    ],
  },
  misinformation_wave: {
    id: 'misinformation_wave',
    label: 'Misinformation Wave',
    description: 'Coordinated false narrative campaign. Extreme moderation queue and high narrative spread.',
    intensity: 'extreme',
    mutations: [
      { target: 'moderation', property: 'queue', value: 100 },
      { target: 'narratives', property: 'spread', value: 85 },
      { target: 'alerts', property: 'frequency', value: 70 },
    ],
  },
  verification_crisis: {
    id: 'verification_crisis',
    label: 'Verification Crisis',
    description: 'System under verification stress. Elevated sync failures and high incident escalations.',
    intensity: 'high',
    mutations: [
      { target: 'sync', property: 'failures', value: 60 },
      { target: 'incidents', property: 'escalations', value: 75 },
      { target: 'verification', property: 'backlog', value: 80 },
    ],
  },
  national_incident_escalation: {
    id: 'national_incident_escalation',
    label: 'National Incident Escalation',
    description: 'Severe national emergency. Extreme alerts and operator workload.',
    intensity: 'extreme',
    mutations: [
      { target: 'emergency', property: 'alerts', value: 100 },
      { target: 'operators', property: 'workload', value: 100 },
      { target: 'incidents', property: 'rate', value: 95 },
      { target: 'maps', property: 'activity', value: 90 },
    ],
  },
  volunteer_activation_wave: {
    id: 'volunteer_activation_wave',
    label: 'Volunteer Activation Wave',
    description: 'Mass volunteer mobilization. High initiative activity and elevated coordination requests.',
    intensity: 'high',
    mutations: [
      { target: 'initiatives', property: 'activity', value: 80 },
      { target: 'coordination', property: 'requests', value: 70 },
      { target: 'volunteers', property: 'presence', value: 85 },
    ],
  },
};

export const scenarioList = Object.values(scenarioPresets);
