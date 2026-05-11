import type { AuditRecord, AuditAction } from './record.js';

function generateRecordId(): string {
  return `audit_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
}

function hashData(data: string): string {
  let hash = 0;
  for (let i = 0; i < data.length; i++) {
    const char = data.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(16).padStart(8, '0');
}

function generateSignature(record: AuditRecord): string {
  const data = `${record.id}.${record.entityType}.${record.entityId}.${record.action}.${record.actorId}.${record.createdAt}`;
  return `sig_${hashData(data)}`;
}

function generateHash(previousHash: string, currentRecord: Partial<AuditRecord>): string {
  const data = `${previousHash}.${JSON.stringify(currentRecord)}`;
  return hashData(data);
}

export class AuditEngine {
  private records: AuditRecord[] = [];
  private currentHash = '0'.repeat(64);

  record(
    entityType: string,
    entityId: string,
    action: AuditAction,
    actorId: string,
    before: Record<string, unknown> | null = null,
    after: Record<string, unknown> | null = null,
    reason: string = '',
    correlationId?: string,
    ipHash: string = '',
    geoHash: string = '',
    deviceHash: string = ''
  ): AuditRecord {
    const id = generateRecordId();
    const createdAt = new Date().toISOString();

    const record: AuditRecord = {
      id,
      entityType,
      entityId,
      action,
      actorId,
      before,
      after,
      reason,
      correlationId: correlationId ?? generateRecordId(),
      ipHash: hashData(ipHash),
      geoHash: hashData(geoHash),
      deviceHash: hashData(deviceHash),
      createdAt,
      signatureHash: '',
      previousHash: this.currentHash,
    };

    record.signatureHash = generateSignature(record);
    this.currentHash = generateHash(record.previousHash, record);
    this.records.push(record);

    return record;
  }

  getRecords(entityType?: string, entityId?: string, fromDate?: string): AuditRecord[] {
    let result = [...this.records];

    if (entityType) {
      result = result.filter(r => r.entityType === entityType);
    }
    if (entityId) {
      result = result.filter(r => r.entityId === entityId);
    }
    if (fromDate) {
      result = result.filter(r => r.createdAt > fromDate);
    }

    return result;
  }

  verifyChain(): { valid: boolean; brokenAt?: number } {
    for (let i = 0; i < this.records.length; i++) {
      const record = this.records[i];
      const previousRecord = this.records[i - 1];
      if (i === 0 && record && record.previousHash !== '0'.repeat(64)) {
        return { valid: false, brokenAt: 0 };
      }
      if (i > 0 && record && previousRecord && record.previousHash !== previousRecord.signatureHash) {
        return { valid: false, brokenAt: i };
      }
    }
    return { valid: true };
  }

  getCurrentHash(): string {
    return this.currentHash;
  }

  getRecordCount(): number {
    return this.records.length;
  }

  exportRecords(): AuditRecord[] {
    return [...this.records];
  }

  clear(): void {
    this.records = [];
    this.currentHash = '0'.repeat(64);
  }
}

const globalAuditEngine = new AuditEngine();

export function getAuditEngine(): AuditEngine {
  return globalAuditEngine;
}

export function audit(
  entityType: string,
  entityId: string,
  action: AuditAction,
  actorId: string,
  before?: Record<string, unknown> | null,
  after?: Record<string, unknown> | null,
  reason?: string
): AuditRecord {
  return getAuditEngine().record(entityType, entityId, action, actorId, before ?? null, after ?? null, reason ?? '');
}