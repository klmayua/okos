export type InitiativeCategory =
  | 'education'
  | 'healthcare'
  | 'water'
  | 'sanitation'
  | 'empowerment'
  | 'digital_access'
  | 'emergency_relief'
  | 'agriculture'
  | 'climate'
  | 'transport';

export type InitiativeStatus =
  | 'draft'
  | 'proposal'
  | 'deliberation'
  | 'approved'
  | 'active'
  | 'completed'
  | 'failed'
  | 'audited';

export interface CommunityNeed {
  id: string;
  regionId: string;
  category: InitiativeCategory;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  affectedPopulation: number;
}

export interface Initiative {
  id: string;
  title: string;
  description: string;
  category: InitiativeCategory;
  status: InitiativeStatus;
  proposerId: string;
  regionId: string;
  targetAmount: number;
  raisedAmount: number;
  startDate: string;
  endDate?: string;
  milestones: Milestone[];
  volunteers: string[];
  beneficiaries: string[];
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  targetDate: string;
  completedDate?: string;
  budget: number;
  spent: number;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  deliverables: string[];
}

export interface NgoPartner {
  id: string;
  name: string;
  type: 'international' | 'local' | 'community';
  verified: boolean;
  regions: string[];
  initiativesCount: number;
  auditScore: number;
}

export interface Vendor {
  id: string;
  name: string;
  type: 'contractor' | 'supplier' | 'service';
  verified: boolean;
  regions: string[];
  contractsCount: number;
  rating: number;
}

export interface BudgetAllocation {
  id: string;
  initiativeId: string;
  amount: number;
  category: string;
  approvedAt: string;
  approvedBy: string;
}

export interface Audit {
  id: string;
  initiativeId: string;
  findings: string[];
  verdict: 'passed' | 'failed' | 'warnings';
  score: number;
  auditorId: string;
  timestamp: string;
}

export interface Volunteer {
  id: string;
  initiativeId: string;
  personaId: string;
  role: string;
  hoursContributed: number;
  joinedAt: string;
}

export interface Beneficiary {
  id: string;
  initiativeId: string;
  regionId: string;
  count: number;
  verified: boolean;
}

export interface CrisisEvent {
  id: string;
  type: 'flood' | 'fire' | 'disease' | 'conflict' | 'drought';
  regionId: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  affectedPopulation: number;
  startedAt: string;
  resolvedAt?: string;
}

export interface GeoMedia {
  id: string;
  initiativeId: string;
  type: 'photo' | 'video' | 'drone';
  url: string;
  location: string;
  timestamp: string;
  verified: boolean;
}

export interface Receipt {
  id: string;
  initiativeId: string;
  amount: number;
  description: string;
  vendorId: string;
  date: string;
  verified: boolean;
}

export interface Testimony {
  id: string;
  initiativeId: string;
  authorId: string;
  content: string;
  location: string;
  timestamp: string;
  verified: boolean;
}

function seededRandom(seed: string, index: number): number {
  let hash = 0;
  const str = seed + index.toString();
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash = hash & hash;
  }
  return Math.abs(hash % 1000) / 1000;
}

const CATEGORIES: InitiativeCategory[] = [
  'education', 'healthcare', 'water', 'sanitation', 'empowerment',
  'digital_access', 'emergency_relief', 'agriculture', 'climate', 'transport',
];

export function generateInitiative(seed: string, index: number): Initiative {
  const statuses: InitiativeStatus[] = ['draft', 'proposal', 'deliberation', 'approved', 'active', 'completed'];
  const regions = ['lagos', 'kano', 'rivers', 'oyo', 'kaduna', 'anambra'];
  const statusIdx = Math.floor(seededRandom(seed, index) * statuses.length);

  return {
    id: `initiative-${index}`,
    title: `Initiative ${index} - Community Project`,
    description: `A ${CATEGORIES[index % CATEGORIES.length]} initiative in ${regions[index % regions.length]}`,
    category: CATEGORIES[index % CATEGORIES.length] as InitiativeCategory,
    status: statuses[statusIdx] as InitiativeStatus,
    proposerId: `persona-${index}`,
    regionId: regions[index % regions.length] as string,
    targetAmount: 100000 + Math.floor(seededRandom(seed, index + 1) * 900000),
    raisedAmount: Math.floor(seededRandom(seed, index + 2) * 100000),
    startDate: new Date().toISOString(),
    milestones: generateMilestones(seed, index),
    volunteers: [],
    beneficiaries: [],
  };
}

export function generateMilestones(seed: string, initiativeIndex: number): Milestone[] {
  const count = 3 + Math.floor(seededRandom(seed, initiativeIndex) * 3);
  const milestones: Milestone[] = [];
  const statuses: Milestone['status'][] = ['pending', 'in_progress', 'completed'];

  for (let i = 0; i < count; i++) {
    const statusIdx = Math.floor(seededRandom(seed, initiativeIndex * 30 + i) * statuses.length);
    milestones.push({
      id: `milestone-${initiativeIndex}-${i}`,
      title: `Milestone ${i + 1}`,
      description: `Milestone description ${i + 1}`,
      targetDate: new Date().toISOString(),
      budget: 50000 + Math.floor(seededRandom(seed, initiativeIndex * 10 + i) * 100000),
      spent: Math.floor(seededRandom(seed, initiativeIndex * 20 + i) * 50000),
      status: statuses[statusIdx] as Milestone['status'],
      deliverables: [`deliverable-${i}`],
    });
  }

  return milestones;
}

export function generateNgoPartner(seed: string, index: number): NgoPartner {
  const types: NgoPartner['type'][] = ['international', 'local', 'community'];
  const regions = ['lagos', 'kano', 'rivers', 'uyo', 'abuja'];
  const typeIdx = Math.floor(seededRandom(seed, index) * types.length);

  return {
    id: `ngo-${index}`,
    name: `NGO Partner ${index}`,
    type: types[typeIdx] as NgoPartner['type'],
    verified: seededRandom(seed, index + 1) > 0.3,
    regions: regions.slice(0, 1 + Math.floor(seededRandom(seed, index + 2) * 3)),
    initiativesCount: Math.floor(seededRandom(seed, index + 3) * 20),
    auditScore: Math.round((0.5 + seededRandom(seed, index + 4) * 0.5) * 100) / 100,
  };
}

export function generateCrisisEvent(seed: string, index: number): CrisisEvent {
  const types: CrisisEvent['type'][] = ['flood', 'fire', 'disease', 'conflict', 'drought'];
  const severities: CrisisEvent['severity'][] = ['low', 'medium', 'high', 'critical'];
  const regions = ['north_east', 'north_west', 'south_south', 'delta', 'rivers'];
  const typeIdx = Math.floor(seededRandom(seed, index) * types.length);
  const regionIdx = Math.floor(seededRandom(seed, index + 10) * regions.length);
  const sevIdx = Math.floor(seededRandom(seed, index + 20) * severities.length);

  return {
    id: `crisis-${index}`,
    type: types[typeIdx] as CrisisEvent['type'],
    regionId: regions[regionIdx] as string,
    severity: severities[sevIdx] as CrisisEvent['severity'],
    affectedPopulation: Math.floor(1000 + seededRandom(seed, index + 30) * 99000),
    startedAt: new Date().toISOString(),
  };
}

export function simulateBudgetOverrun(initiative: Initiative): boolean {
  const totalBudget = initiative.milestones.reduce((sum, m) => sum + m.budget, 0);
  const totalSpent = initiative.milestones.reduce((sum, m) => sum + m.spent, 0);
  return totalSpent > totalBudget;
}

export function simulateCorruptionAttempt(initiative: Initiative, seed: string): boolean {
  const riskScore = initiative.targetAmount / 100000;
  return seededRandom(seed, initiative.id.length) < Math.min(0.3, riskScore / 100);
}

export function simulateAuditFailure(audit: Audit): boolean {
  return audit.findings.length > 3 || audit.verdict === 'failed';
}

export function generateProofOfImpact(initiativeId: string, seed: string): { geoMedia: GeoMedia[]; receipts: Receipt[]; testimonies: Testimony[] } {
  const geoMedia: GeoMedia[] = [];
  const receipts: Receipt[] = [];
  const testimonies: Testimony[] = [];

  const mediaCount = 2 + Math.floor(seededRandom(seed, 1) * 5);
  for (let i = 0; i < mediaCount; i++) {
    geoMedia.push({
      id: `geo-${initiativeId}-${i}`,
      initiativeId,
      type: (['photo', 'video', 'drone'][Math.floor(seededRandom(seed, i) * 3)]) as GeoMedia['type'],
      url: `https://example.com/media/${i}`,
      location: `region-${i}`,
      timestamp: new Date().toISOString(),
      verified: seededRandom(seed, i + 100) > 0.3,
    });
  }

  const receiptCount = 3 + Math.floor(seededRandom(seed, 2) * 7);
  for (let i = 0; i < receiptCount; i++) {
    receipts.push({
      id: `receipt-${initiativeId}-${i}`,
      initiativeId,
      amount: 1000 + Math.floor(seededRandom(seed, i + 200) * 50000),
      description: `Expense ${i + 1}`,
      vendorId: `vendor-${i}`,
      date: new Date().toISOString(),
      verified: seededRandom(seed, i + 300) > 0.4,
    });
  }

  const testimonyCount = 2 + Math.floor(seededRandom(seed, 3) * 4);
  for (let i = 0; i < testimonyCount; i++) {
    testimonies.push({
      id: `testimony-${initiativeId}-${i}`,
      initiativeId,
      authorId: `persona-${i}`,
      content: `Testimony about initiative impact`,
      location: `region-${i}`,
      timestamp: new Date().toISOString(),
      verified: seededRandom(seed, i + 400) > 0.3,
    });
  }

  return { geoMedia, receipts, testimonies };
}