export type CrisisType = 'flood' | 'displacement' | 'election_violence' | 'food_crisis' | 'medical' | 'community_security';
export type CrisisSeverity = 'low' | 'medium' | 'high' | 'critical';
export type CrisisStatus = 'active' | 'responding' | 'resolved';

export interface CrisisEvent {
  id: string;
  type: CrisisType;
  title: string;
  description: string;
  location: { lat: number; lng: number; address: string; ward: string; lga: string; state: string };
  affectedCount: number;
  severity: CrisisSeverity;
  status: CrisisStatus;
  startDate: string;
  endDate?: string;
  needs: string[];
  resourcesRequired: ResourceRequirement[];
}

export interface ResourceRequirement {
  type: 'food' | 'medical' | 'shelter' | 'clothing' | 'transport' | 'volunteers' | 'funding';
  quantity: number;
  unit: string;
  urgency: CrisisSeverity;
}

export interface VolunteerDeployment {
  id: string;
  crisisId: string;
  volunteerId: string;
  role: string;
  location: { lat: number; lng: number };
  deployedAt: string;
  status: 'assigned' | 'active' | 'completed';
}

export interface RapidFundraising {
  crisisId: string;
  targetAmount: number;
  raisedAmount: number;
  currency: string;
  donors: number;
  status: 'active' | 'completed';
  createdAt: string;
}

export class EmergencyResponseEngine {
  private crises = new Map<string, CrisisEvent>();
  private deployments: VolunteerDeployment[] = [];
  private fundraisings = new Map<string, RapidFundraising>();

  async declareCrisis(
    type: CrisisType,
    title: string,
    description: string,
    location: CrisisEvent['location'],
    affectedCount: number,
    severity: CrisisSeverity,
    needs: string[]
  ): Promise<CrisisEvent> {
    const crisis: CrisisEvent = {
      id: `crisis_${Date.now()}`,
      type,
      title,
      description,
      location,
      affectedCount,
      severity,
      status: 'active',
      startDate: new Date().toISOString(),
      needs,
      resourcesRequired: [],
    };

    this.crises.set(crisis.id, crisis);
    return crisis;
  }

  async respondToCrisis(crisisId: string): Promise<CrisisEvent> {
    const crisis = this.crises.get(crisisId);
    if (!crisis) throw new Error('Crisis not found');

    crisis.status = 'responding';
    return crisis;
  }

  async resolveCrisis(crisisId: string): Promise<CrisisEvent> {
    const crisis = this.crises.get(crisisId);
    if (!crisis) throw new Error('Crisis not found');

    crisis.status = 'resolved';
    crisis.endDate = new Date().toISOString();
    return crisis;
  }

  async deployVolunteer(crisisId: string, volunteerId: string, role: string, location: { lat: number; lng: number }): Promise<VolunteerDeployment> {
    const deployment: VolunteerDeployment = {
      id: `dep_${Date.now()}`,
      crisisId,
      volunteerId,
      role,
      location,
      deployedAt: new Date().toISOString(),
      status: 'assigned',
    };

    this.deployments.push(deployment);
    return deployment;
  }

  async startRapidFundraising(crisisId: string, targetAmount: number, currency: string = 'NGN'): Promise<RapidFundraising> {
    const fundraising: RapidFundraising = {
      crisisId,
      targetAmount,
      raisedAmount: 0,
      currency,
      donors: 0,
      status: 'active',
      createdAt: new Date().toISOString(),
    };

    this.fundraisings.set(crisisId, fundraising);
    return fundraising;
  }

  async contributeToFundraising(crisisId: string, amount: number): Promise<void> {
    const fundraising = this.fundraisings.get(crisisId);
    if (!fundraising) throw new Error('Fundraising not found');

    fundraising.raisedAmount += amount;
    fundraising.donors += 1;
  }

  getActiveCrises(): CrisisEvent[] {
    return [...this.crises.values()].filter(c => c.status !== 'resolved');
  }

  getCrisis(crisisId: string): CrisisEvent | undefined {
    return this.crises.get(crisisId);
  }

  getDeployments(crisisId: string): VolunteerDeployment[] {
    return this.deployments.filter(d => d.crisisId === crisisId);
  }

  getFundraising(crisisId: string): RapidFundraising | undefined {
    return this.fundraisings.get(crisisId);
  }
}