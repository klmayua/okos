import type { WorkflowDefinition, WorkflowType, ActiveWorkflow, WorkflowState } from './contracts.js';

function generateId(): string {
  return `wf_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
}

export class WorkflowEngine {
  private workflows = new Map<string, ActiveWorkflow>();
  private definitions = new Map<WorkflowType, WorkflowDefinition>();

  registerWorkflow(definition: WorkflowDefinition): void {
    this.definitions.set(definition.workflowType, definition);
  }

  async startWorkflow(workflowType: WorkflowType, initiator: string, initialPayload: Record<string, unknown> = {}): Promise<string> {
    const definition = this.definitions.get(workflowType);
    if (!definition) {
      throw new Error(`Workflow type ${workflowType} not registered`);
    }

    const workflowId = generateId();
    const workflow: ActiveWorkflow = {
      workflowId,
      workflowType,
      initiator,
      state: 'pending',
      currentStep: 0,
      payload: initialPayload,
      compensationPlan: [],
      timeout: definition.timeout,
      escalationPath: definition.escalationPath,
      correlationId: generateId(),
      startedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.workflows.set(workflowId, workflow);

    await this.executeWorkflow(workflowId);

    return workflowId;
  }

  private async executeWorkflow(workflowId: string): Promise<void> {
    const workflow = this.workflows.get(workflowId);
    if (!workflow) return;

    const definition = this.definitions.get(workflow.workflowType);
    if (!definition) return;

    workflow.state = 'running';

    while (workflow.currentStep < definition.steps.length) {
      const step = definition.steps[workflow.currentStep];
      if (!step) {
        break;
      }

      try {
        if (step.timeout) {
          await this.executeWithTimeout(() => step.handler(workflow.payload), step.timeout);
        } else {
          await step.handler(workflow.payload);
        }

        if (step.compensation) {
          workflow.compensationPlan.push(step.compensation);
        }

        workflow.currentStep++;
        workflow.updatedAt = new Date().toISOString();
      } catch (error) {
        await this.handleStepFailure(workflowId, error);
        return;
      }
    }

    workflow.state = 'completed';
    workflow.updatedAt = new Date().toISOString();
  }

  private async executeWithTimeout<T>(handler: () => Promise<T>, timeout: number): Promise<T> {
    return Promise.race([
      handler(),
      new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error(`Step timed out after ${timeout}ms`)), timeout)
      ),
    ]);
  }

  private async handleStepFailure(workflowId: string, error: unknown): Promise<void> {
    const workflow = this.workflows.get(workflowId);
    if (!workflow) return;

    workflow.state = 'failed';
    workflow.updatedAt = new Date().toISOString();

    console.error(`[workflow] Workflow ${workflowId} failed:`, error);

    await this.compensateWorkflow(workflowId);
  }

  async compensateWorkflow(workflowId: string): Promise<void> {
    const workflow = this.workflows.get(workflowId);
    if (!workflow) return;

    workflow.state = 'compensated';
    workflow.updatedAt = new Date().toISOString();

    const compensationSteps = workflow.compensationPlan.slice().reverse();

    for (const compensation of compensationSteps) {
      try {
        await compensation();
      } catch (error) {
        console.error(`[workflow] Compensation failed for ${workflowId}:`, error);
      }
    }
  }

  getWorkflow(workflowId: string): ActiveWorkflow | undefined {
    return this.workflows.get(workflowId);
  }

  getWorkflowsByInitiator(initiator: string): ActiveWorkflow[] {
    return [...this.workflows.values()].filter(w => w.initiator === initiator);
  }

  getWorkflowsByState(state: WorkflowState): ActiveWorkflow[] {
    return [...this.workflows.values()].filter(w => w.state === state);
  }

  cancelWorkflow(workflowId: string): boolean {
    const workflow = this.workflows.get(workflowId);
    if (!workflow || workflow.state === 'completed' || workflow.state === 'compensated') {
      return false;
    }

    workflow.state = 'failed';
    workflow.updatedAt = new Date().toISOString();
    return true;
  }
}

const globalWorkflowEngine = new WorkflowEngine();

export function getWorkflowEngine(): WorkflowEngine {
  return globalWorkflowEngine;
}

export function startWorkflow(workflowType: WorkflowType, initiator: string, payload?: Record<string, unknown>): Promise<string> {
  return getWorkflowEngine().startWorkflow(workflowType, initiator, payload ?? {});
}