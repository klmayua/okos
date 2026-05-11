export type ProofType = 'before_photo' | 'after_photo' | 'video' | 'receipt' | 'invoice' | 'testimony' | 'drone' | 'progress_report' | 'independent_verification' | 'community_feedback';

export interface ProofEvidence {
  id: string;
  initiativeId: string;
  milestoneId: string;
  type: ProofType;
  url: string;
  description: string;
  geoLocation?: { lat: number; lng: number };
  uploadedBy: string;
  uploadedAt: string;
  verified: boolean;
  verifiedBy?: string;
  verifiedAt?: string;
  aiAnomalyScore?: number;
}

export interface Verification {
  id: string;
  initiativeId: string;
  verifierId: string;
  verifierType: 'community' | 'ngo' | 'steward' | 'ai';
  proofId: string;
  status: 'pending' | 'verified' | 'rejected';
  confidence: number;
  notes?: string;
  verifiedAt: string;
}

export interface ImpactMeasurement {
  initiativeId: string;
  metrics: ImpactMetric[];
  beneficiaryCount: number;
  beneficiariesReached: number;
  satisfactionScore: number;
  sustainabilityScore: number;
  createdAt: string;
}

export interface ImpactMetric {
  name: string;
  target: number;
  achieved: number;
  unit: string;
  percentage: number;
}

export class ProofOfImpactEngine {
  private proofs: ProofEvidence[] = [];
  private verifications: Verification[] = [];
  private measurements: ImpactMeasurement[] = [];

  async submitProof(
    initiativeId: string,
    milestoneId: string,
    type: ProofType,
    url: string,
    description: string,
    uploadedBy: string,
    geoLocation?: { lat: number; lng: number }
  ): Promise<ProofEvidence> {
    const proof: ProofEvidence = {
      id: `prf_${Date.now()}`,
      initiativeId,
      milestoneId,
      type,
      url,
      description,
      geoLocation,
      uploadedBy,
      uploadedAt: new Date().toISOString(),
      verified: false,
    };

    this.proofs.push(proof);
    return proof;
  }

  async verifyProof(proofId: string, verifierId: string, verifierType: Verification['verifierType'], status: 'verified' | 'rejected', confidence: number, notes?: string): Promise<Verification> {
    const proof = this.proofs.find(p => p.id === proofId);
    if (!proof) throw new Error('Proof not found');

    const verification: Verification = {
      id: `vrf_${Date.now()}`,
      initiativeId: proof.initiativeId,
      verifierId,
      verifierType,
      proofId,
      status,
      confidence,
      notes,
      verifiedAt: new Date().toISOString(),
    };

    this.verifications.push(verification);

    if (status === 'verified') {
      proof.verified = true;
      proof.verifiedBy = verifierId;
      proof.verifiedAt = verification.verifiedAt;
    }

    return verification;
  }

  async recordImpact(initiativeId: string, metrics: { name: string; target: number; achieved: number; unit: string }[], beneficiariesReached: number): Promise<ImpactMeasurement> {
    const measurement: ImpactMeasurement = {
      initiativeId,
      metrics: metrics.map(m => ({
        ...m,
        percentage: m.target > 0 ? (m.achieved / m.target) * 100 : 0,
      })),
      beneficiaryCount: beneficiariesReached,
      beneficiariesReached,
      satisfactionScore: 0,
      sustainabilityScore: 0,
      createdAt: new Date().toISOString(),
    };

    this.measurements.push(measurement);
    return measurement;
  }

  getProofs(initiativeId: string, milestoneId?: string): ProofEvidence[] {
    return this.proofs.filter(p => 
      p.initiativeId === initiativeId && 
      (!milestoneId || p.milestoneId === milestoneId)
    );
  }

  getVerifications(initiativeId: string): Verification[] {
    return this.verifications.filter(v => v.initiativeId === initiativeId);
  }

  getImpactMeasurement(initiativeId: string): ImpactMeasurement | undefined {
    return this.measurements.find(m => m.initiativeId === initiativeId);
  }

  getVerificationStatus(initiativeId: string): { verified: number; pending: number; rejected: number } {
    const proofs = this.proofs.filter(p => p.initiativeId === initiativeId);
    return {
      verified: proofs.filter(p => p.verified).length,
      pending: proofs.filter(p => !p.verified && !this.verifications.some(v => v.proofId === p.id && v.status !== 'pending')).length,
      rejected: proofs.filter(p => this.verifications.some(v => v.proofId === p.id && v.status === 'rejected')).length,
    };
  }
}