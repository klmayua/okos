export type ExecutionStatus = 'pending' | 'in_progress' | 'completed' | 'delayed' | 'failed' | 'cancelled';

export interface ExecutionWorkflow {
  initiativeId: string;
  currentStep: number;
  steps: ExecutionStep[];
  status: ExecutionStatus;
  startDate: string;
  endDate?: string;
}

export interface ExecutionStep {
  step: number;
  name: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed' | 'skipped';
  assignedTo: string[];
  startDate?: string;
  endDate?: string;
  expectedDate?: string;
  actualDate?: string;
}

export interface ExecutionUpdate {
  id: string;
  initiativeId: string;
  stepNumber: number;
  status: ExecutionStatus;
  description: string;
  media: string[];
  issues: Issue[];
  createdAt: string;
  createdBy: string;
}

export interface Issue {
  id: string;
  type: 'delay' | 'budget_overrun' | 'quality' | 'resource' | 'external';
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  resolution?: string;
  createdAt: string;
  resolvedAt?: string;
}

export interface Escalation {
  id: string;
  initiativeId: string;
  stepNumber: number;
  reason: string;
  escalatedTo: string;
  escalatedAt: string;
  resolved: boolean;
  resolution?: string;
  resolvedAt?: string;
}

export class InitiativeExecutionEngine {
  private workflows = new Map<string, ExecutionWorkflow>();
  private updates: ExecutionUpdate[] = [];
  private issues: Issue[] = [];
  private escalations: Escalation[] = [];

  async startExecution(initiativeId: string, steps: string[]): Promise<ExecutionWorkflow> {
    const workflow: ExecutionWorkflow = {
      initiativeId,
      currentStep: 0,
      steps: steps.map((name, index) => ({
        step: index,
        name,
        description: '',
        status: index === 0 ? 'in_progress' : 'pending',
        assignedTo: [],
        expectedDate: undefined,
      })),
      status: 'pending',
      startDate: new Date().toISOString(),
    };

    this.workflows.set(initiativeId, workflow);
    return workflow;
  }

  async updateProgress(initiativeId: string, stepNumber: number, status: ExecutionStatus, description: string, media: string[] = [], userId: string): Promise<ExecutionUpdate> {
    const workflow = this.workflows.get(initiativeId);
    if (!workflow) throw new Error('Workflow not found');

    const step = workflow.steps[stepNumber];
    if (step) {
      step.status = status === 'completed' ? 'completed' : 'in_progress';
      step.actualDate = new Date().toISOString();
    }

    if (stepNumber < workflow.steps.length - 1) {
      const nextStepIndex = stepNumber + 1;
      if (workflow.steps[nextStepIndex]) {
        workflow.steps[nextStepIndex].status = 'in_progress';
      }
    }

    workflow.status = status;

    const update: ExecutionUpdate = {
      id: `upd_${Date.now()}`,
      initiativeId,
      stepNumber,
      status,
      description,
      media,
      issues: [],
      createdAt: new Date().toISOString(),
      createdBy: userId,
    };

    this.updates.push(update);
    return update;
  }

  async reportIssue(_initiativeId: string, type: Issue['type'], severity: Issue['severity'], description: string): Promise<Issue> {
    const issue: Issue = {
      id: `iss_${Date.now()}`,
      type,
      severity,
      description,
      createdAt: new Date().toISOString(),
    };

    this.issues.push(issue);
    return issue;
  }

  async escalate(initiativeId: string, stepNumber: number, reason: string, escalatedTo: string): Promise<Escalation> {
    const escalation: Escalation = {
      id: `esc_${Date.now()}`,
      initiativeId,
      stepNumber,
      reason,
      escalatedTo,
      escalatedAt: new Date().toISOString(),
      resolved: false,
    };

    this.escalations.push(escalation);
    return escalation;
  }

  getWorkflow(initiativeId: string): ExecutionWorkflow | undefined {
    return this.workflows.get(initiativeId);
  }

  getUpdates(initiativeId: string): ExecutionUpdate[] {
    return this.updates.filter(u => u.initiativeId === initiativeId);
  }

  getIssues(_initiativeId: string): Issue[] {
    return this.issues;
  }

  getEscalations(initiativeId: string): Escalation[] {
    return this.escalations.filter(e => e.initiativeId === initiativeId);
  }
}