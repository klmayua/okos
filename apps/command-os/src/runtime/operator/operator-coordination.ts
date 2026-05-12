/**
 * OK.OS — OPERATOR COORDINATION
 * Assignments, acknowledgements, handoffs, workload visibility.
 */

export type OperatorRole = 'operator' | 'verifier' | 'moderator' | 'coordinator' | 'auditor' | 'CSO_partner';

export interface Operator {
  readonly id: string;
  readonly name: string;
  readonly role: OperatorRole;
  readonly region: string;
  readonly activeAssignments: string[];
  readonly workloadScore: number; // 0-100
  readonly status: 'available' | 'busy' | 'offline';
  readonly lastSeen: number;
}

class OperatorCoordination {
  private readonly operators = new Map<string, Operator>();

  register(operator: Operator): void {
    this.operators.set(operator.id, operator);
  }

  assign(operatorId: string, taskId: string): boolean {
    const op = this.operators.get(operatorId);
    if (!op || op.status === 'offline') return false;
    const next: Operator = {
      ...op,
      activeAssignments: [...op.activeAssignments, taskId],
      workloadScore: Math.min(100, op.workloadScore + 10),
      status: op.workloadScore > 80 ? 'busy' : op.status,
    };
    this.operators.set(operatorId, next);
    return true;
  }

  handoff(fromId: string, toId: string, taskId: string): boolean {
    const from = this.operators.get(fromId);
    const to = this.operators.get(toId);
    if (!from || !to || to.status === 'offline') return false;
    this.unassign(fromId, taskId);
    return this.assign(toId, taskId);
  }

  unassign(operatorId: string, taskId: string): boolean {
    const op = this.operators.get(operatorId);
    if (!op) return false;
    const next: Operator = {
      ...op,
      activeAssignments: op.activeAssignments.filter((a) => a !== taskId),
      workloadScore: Math.max(0, op.workloadScore - 10),
      status: op.workloadScore <= 80 ? 'available' : op.status,
    };
    this.operators.set(operatorId, next);
    return true;
  }

  acknowledge(operatorId: string, _taskId: string): boolean {
    const op = this.operators.get(operatorId);
    if (!op) return false;
    this.operators.set(operatorId, { ...op, lastSeen: Date.now() });
    return true;
  }

  getOperator(id: string): Operator | undefined {
    return this.operators.get(id);
  }

  getOperatorsByRole(role: OperatorRole): readonly Operator[] {
    return Array.from(this.operators.values()).filter((o) => o.role === role);
  }

  getAvailableOperators(): readonly Operator[] {
    return Array.from(this.operators.values()).filter((o) => o.status === 'available');
  }

  getWorkload(): readonly { id: string; name: string; score: number }[] {
    return Array.from(this.operators.values())
      .map((o) => ({ id: o.id, name: o.name, score: o.workloadScore }))
      .sort((a, b) => b.score - a.score);
  }
}

export const operatorCoordination = new OperatorCoordination();
