export interface BudgetAllocation {
  totalBudget: number;
  allocatedBudget: number;
  availableBudget: number;
  currency: string;
}

export interface BudgetRecord {
  id: string;
  initiativeId: string;
  type: 'allocation' | 'disbursement' | 'expense' | 'adjustment';
  amount: number;
  currency: string;
  description: string;
  vendorId?: string;
  milestoneId?: string;
  approvedBy?: string;
  status: 'pending' | 'approved' | 'released' | 'rejected';
  createdAt: string;
  approvedAt?: string;
  releasedAt?: string;
}

export interface ProcurementRecord {
  id: string;
  initiativeId: string;
  vendorId: string;
  description: string;
  amount: number;
  currency: string;
  procurementType: 'service' | 'goods' | 'works';
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  documents: ProcurementDocument[];
  createdAt: string;
  approvedAt?: string;
}

export interface ProcurementDocument {
  type: 'invoice' | 'receipt' | 'contract' | 'report';
  url: string;
  uploadedAt: string;
  uploadedBy: string;
}

export class TransparentBudgetEngine {
  private allocations = new Map<string, BudgetAllocation>();
  private records: BudgetRecord[] = [];

  setBudget(initiativeId: string, totalBudget: number, currency: string = 'NGN'): void {
    this.allocations.set(initiativeId, {
      totalBudget,
      allocatedBudget: 0,
      availableBudget: totalBudget,
      currency,
    });
  }

  async approveDisbursement(initiativeId: string, milestoneId: string, amount: number, approverId: string): Promise<BudgetRecord> {
    const allocation = this.allocations.get(initiativeId);
    if (!allocation) throw new Error('Budget not allocated');
    if (amount > allocation.availableBudget) throw new Error('Insufficient budget');

    const record: BudgetRecord = {
      id: `bud_${Date.now()}`,
      initiativeId,
      type: 'disbursement',
      amount,
      currency: allocation.currency,
      description: `Milestone disbursement ${milestoneId}`,
      milestoneId,
      approvedBy: approverId,
      status: 'approved',
      createdAt: new Date().toISOString(),
      approvedAt: new Date().toISOString(),
    };

    allocation.allocatedBudget += amount;
    allocation.availableBudget -= amount;
    this.records.push(record);

    return record;
  }

  async releaseFunds(recordId: string): Promise<BudgetRecord> {
    const record = this.records.find(r => r.id === recordId);
    if (!record) throw new Error('Record not found');
    if (record.status !== 'approved') throw new Error('Record not approved');

    record.status = 'released';
    record.releasedAt = new Date().toISOString();

    return record;
  }

  async addExpense(initiativeId: string, amount: number, description: string, vendorId?: string): Promise<BudgetRecord> {
    const allocation = this.allocations.get(initiativeId);
    if (!allocation) throw new Error('Budget not allocated');

    const record: BudgetRecord = {
      id: `bud_${Date.now()}`,
      initiativeId,
      type: 'expense',
      amount,
      currency: allocation.currency,
      description,
      vendorId,
      status: 'approved',
      createdAt: new Date().toISOString(),
      approvedAt: new Date().toISOString(),
    };

    this.records.push(record);
    return record;
  }

  getBudgetVisibility(initiativeId: string): BudgetVisibility {
    const allocation = this.allocations.get(initiativeId);
    if (!allocation) throw new Error('Budget not found');

    const records = this.records.filter(r => r.initiativeId === initiativeId);

    return {
      totalBudget: allocation.totalBudget,
      allocatedBudget: allocation.allocatedBudget,
      availableBudget: allocation.availableBudget,
      currency: allocation.currency,
      transactions: records.map(r => ({
        type: r.type,
        amount: r.amount,
        status: r.status,
        createdAt: r.createdAt,
      })),
      vendors: this.getVendorSummary(initiativeId),
      auditTrail: records,
    };
  }

  private getVendorSummary(initiativeId: string): { vendorId: string; totalValue: number; transactionCount: number }[] {
    const vendorMap = new Map<string, { total: number; count: number }>();

    for (const record of this.records.filter(r => r.initiativeId === initiativeId && r.vendorId)) {
      const vendor = vendorMap.get(record.vendorId!) ?? { total: 0, count: 0 };
      vendor.total += record.amount;
      vendor.count++;
      vendorMap.set(record.vendorId!, vendor);
    }

    return [...vendorMap.entries()].map(([vendorId, data]) => ({
      vendorId,
      totalValue: data.total,
      transactionCount: data.count,
    }));
  }

  getAllocation(initiativeId: string): BudgetAllocation | undefined {
    return this.allocations.get(initiativeId);
  }
}

export interface BudgetVisibility {
  totalBudget: number;
  allocatedBudget: number;
  availableBudget: number;
  currency: string;
  transactions: { type: string; amount: number; status: string; createdAt: string }[];
  vendors: { vendorId: string; totalValue: number; transactionCount: number }[];
  auditTrail: BudgetRecord[];
}