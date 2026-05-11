export type PartnerType = 'ngo' | 'cso' | 'ingo' | 'foundation';

export interface NGOProfile {
  id: string;
  name: string;
  type: PartnerType;
  verified: boolean;
  verificationLevel: number;
  operatingRegions: string[];
  focusAreas: string[];
  auditHistory: { date: string; result: 'passed' | 'failed' }[];
  partnershipHistory: { initiativeId: string; role: string; outcome: string }[];
  contactEmail: string;
  contactPhone: string;
  totalFunding: number;
  projectsCompleted: number;
  rating: number;
  createdAt: string;
}

export interface PartnershipRequest {
  id: string;
  ngoId: string;
  initiativeId: string;
  type: 'co_funding' | 'auditing' | 'execution' | 'verification' | 'emergency' | 'impact_reporting' | 'governance_observation' | 'field_validation';
  status: 'pending' | 'approved' | 'rejected';
  amount?: number;
  rationale: string;
  requestedAt: string;
  respondedAt?: string;
}

export class PartnershipEngine {
  private partners = new Map<string, NGOProfile>();
  private requests: PartnershipRequest[] = [];

  async registerPartner(profile: Omit<NGOProfile, 'id' | 'createdAt'>): Promise<NGOProfile> {
    const partner: NGOProfile = {
      ...profile,
      id: `ngo_${Date.now()}`,
      createdAt: new Date().toISOString(),
    };

    this.partners.set(partner.id, partner);
    return partner;
  }

  async requestPartnership(
    ngoId: string,
    initiativeId: string,
    type: PartnershipRequest['type'],
    amount?: number,
    rationale?: string
  ): Promise<PartnershipRequest> {
    const request: PartnershipRequest = {
      id: `req_${Date.now()}`,
      ngoId,
      initiativeId,
      type,
      status: 'pending',
      amount,
      rationale: rationale ?? '',
      requestedAt: new Date().toISOString(),
    };

    this.requests.push(request);
    return request;
  }

  async approvePartnership(requestId: string): Promise<PartnershipRequest> {
    const request = this.requests.find(r => r.id === requestId);
    if (!request) throw new Error('Request not found');

    request.status = 'approved';
    request.respondedAt = new Date().toISOString();

    const partner = this.partners.get(request.ngoId);
    if (partner) {
      partner.partnershipHistory.push({
        initiativeId: request.initiativeId,
        role: request.type,
        outcome: 'active',
      });
    }

    return request;
  }

  async rejectPartnership(requestId: string): Promise<PartnershipRequest> {
    const request = this.requests.find(r => r.id === requestId);
    if (!request) throw new Error('Request not found');

    request.status = 'rejected';
    request.respondedAt = new Date().toISOString();

    return request;
  }

  getPartner(id: string): NGOProfile | undefined {
    return this.partners.get(id);
  }

  getPartnersByRegion(region: string): NGOProfile[] {
    return [...this.partners.values()].filter(p => p.operatingRegions.includes(region));
  }

  getPartnersByFocus(focusArea: string): NGOProfile[] {
    return [...this.partners.values()].filter(p => p.focusAreas.includes(focusArea));
  }

  getPendingRequests(initiativeId?: string): PartnershipRequest[] {
    return this.requests.filter(r => 
      r.status === 'pending' && 
      (!initiativeId || r.initiativeId === initiativeId)
    );
  }
}