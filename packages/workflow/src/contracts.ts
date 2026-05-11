export type WorkflowType =
  | 'onboarding'
  | 'credential_issuance'
  | 'civic_education_drip'
  | 'volunteer_mobilization'
  | 'polling_reminder'
  | 'election_day_escalation'
  | 'panic_sos'
  | 'moderation_review'
  | 'fund_approval_chain'
  | 'scorecard_review_cycle'
  | 'partner_onboarding'
  | 'whatsapp_bot_journey'
  | 'ai_agent_execution';

export type WorkflowState = 'pending' | 'running' | 'waiting' | 'completed' | 'failed' | 'compensated';

export interface WorkflowStep {
  stepId: string;
  name: string;
  action: string;
  handler: (payload: unknown) => Promise<void>;
  compensation?: () => Promise<void>;
  timeout?: number;
  retryCount?: number;
}

export interface WorkflowDefinition {
  workflowId: string;
  workflowType: WorkflowType;
  initiator: string;
  steps: WorkflowStep[];
  timeout: number;
  escalationPath: string[];
}

export interface ActiveWorkflow {
  workflowId: string;
  workflowType: WorkflowType;
  initiator: string;
  state: WorkflowState;
  currentStep: number;
  payload: Record<string, unknown>;
  compensationPlan: (() => Promise<void>)[];
  timeout: number;
  escalationPath: string[];
  correlationId: string;
  startedAt: string;
  updatedAt: string;
}