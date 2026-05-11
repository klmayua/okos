export type ScenarioExecutionMode = 'replay' | 'sandbox' | 'stress_test' | 'investor_demo' | 'training_mode';

export interface TriggerCondition {
  type: 'time' | 'event' | 'threshold' | 'manual';
  config: Record<string, unknown>;
}

export interface EscalationPath {
  step: number;
  action: string;
  responseTime: string;
  actor: string;
}

export interface ExpectedOutcome {
  description: string;
  probability: number;
  metrics: Record<string, number>;
}

export interface FailureMode {
  mode: string;
  probability: number;
  impact: string;
  recovery: string;
}

export interface ObservabilityHook {
  event: string;
  callback: (data: Record<string, unknown>) => void;
}

export interface Scenario {
  scenarioId: string;
  title: string;
  description: string;
  triggerConditions: TriggerCondition[];
  participatingEntities: string[];
  timeline: { events: { time: string; action: string }[]; duration: number };
  escalationPaths: EscalationPath[];
  expectedOutcomes: ExpectedOutcome[];
  failureModes: FailureMode[];
  observabilityHooks: ObservabilityHook[];
}

export interface ScenarioExecution {
  id: string;
  scenarioId: string;
  mode: ScenarioExecutionMode;
  status: 'pending' | 'running' | 'completed' | 'failed';
  startedAt: string;
  completedAt?: string;
  progress: number;
  currentStep: number;
  totalSteps: number;
}

const MANDATORY_SCENARIOS: Omit<Scenario, 'scenarioId'>[] = [
  {
    title: 'Peaceful Election', description: 'Normal election day with no major disruptions',
    triggerConditions: [{ type: 'time', config: { electionDay: true } }],
    participatingEntities: ['voters', 'observers', 'election_officials'],
    timeline: { events: [], duration: 24 }, escalationPaths: [],
    expectedOutcomes: [{ description: 'Smooth election', probability: 0.85, metrics: { turnout: 0.4 } }],
    failureModes: [{ mode: 'low_turnout', probability: 0.1, impact: 'low', recovery: 'awareness_campaign' }],
    observabilityHooks: [],
  },
  {
    title: 'Network Blackout Kano', description: 'Complete network failure in Kano state',
    triggerConditions: [{ type: 'event', config: { region: 'kano', failure: true } }],
    participatingEntities: ['voters', 'agents', 'observers'],
    timeline: { events: [], duration: 6 }, escalationPaths: [],
    expectedOutcomes: [{ description: 'Manual voting continues', probability: 0.7, metrics: { affected: 5000000 } }],
    failureModes: [{ mode: 'data_loss', probability: 0.2, impact: 'high', recovery: 'backup_restore' }],
    observabilityHooks: [],
  },
  {
    title: 'Coordinated WhatsApp Attack', description: 'Mass misinformation spread via WhatsApp',
    triggerConditions: [{ type: 'threshold', config: { rumorCount: 100 } }],
    participatingEntities: ['citizens', 'fact_checkers', 'influencers'],
    timeline: { events: [], duration: 4 }, escalationPaths: [],
    expectedOutcomes: [{ description: 'Contain misinformation', probability: 0.75, metrics: { reach: 100000 } }],
    failureModes: [{ mode: 'panic_spread', probability: 0.25, impact: 'critical', recovery: 'trust_recovery' }],
    observabilityHooks: [],
  },
  {
    title: 'Polling Unit Violence', description: 'Violent incident at polling unit',
    triggerConditions: [{ type: 'event', config: { type: 'violence', region: 'rivers' } }],
    participatingEntities: ['voters', 'security', 'observers'],
    timeline: { events: [], duration: 2 }, escalationPaths: [],
    expectedOutcomes: [{ description: 'Incident contained', probability: 0.8, metrics: { injured: 5 } }],
    failureModes: [{ mode: 'escalation', probability: 0.15, impact: 'high', recovery: 'national_guard' }],
    observabilityHooks: [],
  },
  {
    title: 'Youth Turnout Surge', description: 'Unexpectedly high youth voter turnout',
    triggerConditions: [{ type: 'threshold', config: { youthTurnout: 0.8 } }],
    participatingEntities: ['youth', 'election_officials', 'party_agents'],
    timeline: { events: [], duration: 3 }, escalationPaths: [],
    expectedOutcomes: [{ description: 'Smooth processing', probability: 0.6, metrics: { delay: 120 } }],
    failureModes: [{ mode: 'chaos', probability: 0.3, impact: 'medium', recovery: 'queue_management' }],
    observabilityHooks: [],
  },
  {
    title: 'Treasury Corruption Attempt', description: 'Attempted misappropriation of initiative funds',
    triggerConditions: [{ type: 'event', config: { type: 'fraud', amount: 1000000 } }],
    participatingEntities: ['treasury_officials', 'auditors', 'ngo_partners'],
    timeline: { events: [], duration: 24 }, escalationPaths: [],
    expectedOutcomes: [{ description: 'Funds recovered', probability: 0.9, metrics: { recovered: 0.95 } }],
    failureModes: [{ mode: 'funds_laundered', probability: 0.1, impact: 'critical', recovery: 'investigation' }],
    observabilityHooks: [],
  },
  {
    title: 'Misinformation Flood', description: 'Coordinated false narrative about election results',
    triggerConditions: [{ type: 'threshold', config: { falseClaims: 1000 } }],
    participatingEntities: ['media', 'fact_checkers', 'politicians'],
    timeline: { events: [], duration: 12 }, escalationPaths: [],
    expectedOutcomes: [{ description: 'Narrative debunked', probability: 0.7, metrics: { corrections: 50 } }],
    failureModes: [{ mode: 'trust_eroded', probability: 0.3, impact: 'high', recovery: 'awareness' }],
    observabilityHooks: [],
  },
  {
    title: 'NGO Audit Failure', description: 'Major NGO fails financial audit',
    triggerConditions: [{ type: 'event', config: { auditScore: 0.4 } }],
    participatingEntities: ['ngo', 'donors', 'government'],
    timeline: { events: [], duration: 48 }, escalationPaths: [],
    expectedOutcomes: [{ description: 'Reform initiated', probability: 0.6, metrics: { score: 0.7 } }],
    failureModes: [{ mode: 'shutdown', probability: 0.2, impact: 'high', recovery: 'replacement' }],
    observabilityHooks: [],
  },
  {
    title: 'Nationwide Flood Response', description: 'Emergency response to flooding',
    triggerConditions: [{ type: 'event', config: { type: 'flood', severity: 'critical' } }],
    participatingEntities: ['victims', 'rescue_teams', 'ngos', 'military'],
    timeline: { events: [], duration: 168 }, escalationPaths: [],
    expectedOutcomes: [{ description: 'Lives saved', probability: 0.85, metrics: { rescued: 10000 } }],
    failureModes: [{ mode: 'resource_shortage', probability: 0.25, impact: 'medium', recovery: 'international_aid' }],
    observabilityHooks: [],
  },
  {
    title: 'Initiative Budget Scandal', description: 'Expose of budget misuse in large initiative',
    triggerConditions: [{ type: 'event', config: { type: 'whistleblower' } }],
    participatingEntities: ['initiators', 'journalists', 'auditors', 'public'],
    timeline: { events: [], duration: 72 }, escalationPaths: [],
    expectedOutcomes: [{ description: 'Accountability', probability: 0.8, metrics: { resigned: 3 } }],
    failureModes: [{ mode: 'cover_up', probability: 0.15, impact: 'critical', recovery: 'protest' }],
    observabilityHooks: [],
  },
  {
    title: 'Candidate Health Crisis', description: 'Leading candidate suffers health emergency',
    triggerConditions: [{ type: 'event', config: { type: 'health_emergency' } }],
    participatingEntities: ['candidate', 'medical_team', 'party', 'media'],
    timeline: { events: [], duration: 48 }, escalationPaths: [],
    expectedOutcomes: [{ description: 'Recovered', probability: 0.7, metrics: { days: 7 } }],
    failureModes: [{ mode: 'withdrawal', probability: 0.2, impact: 'high', recovery: 'new_candidate' }],
    observabilityHooks: [],
  },
  {
    title: 'Massive Observer Activation', description: '10,000+ election observers deployed',
    triggerConditions: [{ type: 'threshold', config: { observers: 10000 } }],
    participatingEntities: ['observers', 'logistics', 'security'],
    timeline: { events: [], duration: 6 }, escalationPaths: [],
    expectedOutcomes: [{ description: 'Full deployment', probability: 0.9, metrics: { deployed: 10000 } }],
    failureModes: [{ mode: 'logistics_fail', probability: 0.1, impact: 'medium', recovery: 'airlift' }],
    observabilityHooks: [],
  },
];

export function getMandatoryScenarios(): Scenario[] {
  return MANDATORY_SCENARIOS.map((s, idx) => ({ ...s, scenarioId: `scenario-${idx}` }));
}

export function getScenarioById(id: string): Scenario | undefined {
  return getMandatoryScenarios().find(s => s.scenarioId === id);
}

let currentExecution: ScenarioExecution | null = null;
const currentTime = new Date().toISOString();

export function executeScenario(scenarioId: string, mode: ScenarioExecutionMode = 'sandbox'): ScenarioExecution {
  const scenario = getScenarioById(scenarioId);
  if (!scenario) {
    throw new Error(`Scenario ${scenarioId} not found`);
  }

  currentExecution = {
    id: `exec-${Date.now()}`,
    scenarioId,
    mode,
    status: 'running',
    startedAt: currentTime,
    progress: 0,
    currentStep: 0,
    totalSteps: scenario.timeline.duration,
  };

  return currentExecution;
}

export function getCurrentExecution(): ScenarioExecution | null {
  return currentExecution;
}

export function updateProgress(progress: number): void {
  if (currentExecution) {
    currentExecution.progress = progress;
    currentExecution.currentStep = Math.floor(progress * currentExecution.totalSteps / 100);
  }
}

export function completeExecution(success: boolean): void {
  if (currentExecution) {
    currentExecution.status = success ? 'completed' : 'failed';
    currentExecution.completedAt = currentTime;
  }
}