/**
 * OK.OS — WORKFLOW STATE MACHINES
 * Deterministic state transitions for initiatives, treasury, verification, incidents.
 */

export type WorkflowId = 'initiatives' | 'treasury' | 'verification' | 'incidents';

export interface WorkflowState {
  id: string;
  workflow: WorkflowId;
  currentState: string;
  history: string[];
  startedAt: number;
  updatedAt: number;
}

const workflows: Record<WorkflowId, readonly string[]> = {
  initiatives: ['draft', 'review', 'voting', 'approval', 'activation', 'execution', 'proof_review', 'completed'],
  treasury: ['submitted', 'under_review', 'CSO_validation', 'approved', 'released', 'audited'],
  verification: ['received', 'OCR_processing', 'confidence_review', 'community_validation', 'verified', 'archived'],
  incidents: ['reported', 'acknowledged', 'triaged', 'assigned', 'escalated', 'resolved'],
};

const transitions: Record<WorkflowId, Record<string, readonly string[]>> = {
  initiatives: {
    draft: ['review'],
    review: ['voting', 'draft'],
    voting: ['approval', 'draft'],
    approval: ['activation', 'draft'],
    activation: ['execution'],
    execution: ['proof_review'],
    proof_review: ['completed'],
    completed: [],
  },
  treasury: {
    submitted: ['under_review'],
    under_review: ['CSO_validation', 'submitted'],
    CSO_validation: ['approved', 'submitted'],
    approved: ['released'],
    released: ['audited'],
    audited: [],
  },
  verification: {
    received: ['OCR_processing'],
    OCR_processing: ['confidence_review', 'received'],
    confidence_review: ['community_validation', 'received'],
    community_validation: ['verified', 'received'],
    verified: ['archived'],
    archived: [],
  },
  incidents: {
    reported: ['acknowledged'],
    acknowledged: ['triaged'],
    triaged: ['assigned', 'escalated'],
    assigned: ['escalated', 'resolved'],
    escalated: ['resolved'],
    resolved: [],
  },
};

class WorkflowEngine {
  private readonly states = new Map<string, WorkflowState>();

  create(id: string, workflow: WorkflowId): WorkflowState {
    const state: WorkflowState = {
      id,
      workflow,
      currentState: workflows[workflow][0],
      history: [workflows[workflow][0]],
      startedAt: Date.now(),
      updatedAt: Date.now(),
    };
    this.states.set(id, state);
    return state;
  }

  canTransition(id: string, toState: string): boolean {
    const state = this.states.get(id);
    if (!state) return false;
    const allowed = transitions[state.workflow][state.currentState];
    return allowed?.includes(toState) ?? false;
  }

  transition(id: string, toState: string): WorkflowState | null {
    if (!this.canTransition(id, toState)) return null;
    const state = this.states.get(id)!;
    const next: WorkflowState = {
      ...state,
      currentState: toState,
      history: [...state.history, toState],
      updatedAt: Date.now(),
    };
    this.states.set(id, next);
    return next;
  }

  getState(id: string): WorkflowState | undefined {
    return this.states.get(id);
  }

  getStatesByWorkflow(workflow: WorkflowId): readonly WorkflowState[] {
    return Array.from(this.states.values()).filter((s) => s.workflow === workflow);
  }

  getAllStates(): readonly WorkflowState[] {
    return Array.from(this.states.values());
  }
}

export const workflowEngine = new WorkflowEngine();
