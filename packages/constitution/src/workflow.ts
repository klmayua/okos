export const WORKFLOW_LAW = {
  version: '1.0.0',
  status: 'mandatory',
  doctrine: {
    principle: 'explicit_orchestration',
    stateManagement: 'deterministic',
    errorHandling: 'compensating',
  },
  definitions: {
    workflow: {
      required: ['name', 'states', 'transitions', 'initialState'],
      optional: ['timeout', 'compensation', 'history'],
    },
    state: {
      types: ['awaiting', 'processing', 'completed', 'failed', 'cancelled'],
      entry: 'required_action',
      exit: 'optional_action',
    },
    transition: {
      required: ['from', 'to', 'trigger'],
      optional: ['conditions', 'timeout', 'compensation'],
    },
  },
  execution: {
    patterns: [
      'sequential',
      'parallel',
      'conditional',
      ' Saga',
    ],
    retry: {
      maxAttempts: 3,
      backoff: 'exponential',
      initialDelay: '1s',
      maxDelay: '5min',
    },
    compensation: {
      required: true,
      order: 'reverse_execution',
      timeout: '10 minutes',
    },
  },
  monitoring: {
    checkpoints: true,
    metrics: [
      'execution_time',
      'success_rate',
      'failure_reason',
      'queue_depth',
    ],
    alerting: {
      threshold: '5% failure rate',
      window: '5 minutes',
    },
  },
  commonWorkflows: [
    'identity_verification',
    'member_onboarding',
    'pathway_enrollment',
    'action_organization',
    'fund_creation',
    'election_setup',
    'proposal_submission',
    'incident_reporting',
  ],
} as const;

export type WorkflowStateType = typeof WORKFLOW_LAW.definitions.state.types[number];
export type ExecutionPattern = typeof WORKFLOW_LAW.execution.patterns[number];