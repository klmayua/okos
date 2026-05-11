export interface Party {
  id: string;
  name: string;
  abbreviation: string;
  color: string;
  ideology: string;
}

export interface Candidate {
  id: string;
  name: string;
  partyId: string;
  state: string;
  age: number;
  experience: string;
  imageUrl?: string;
}

export interface Rally {
  id: string;
  candidateId: string;
  state: string;
  lga?: string;
  expectedAttendance: number;
  actualAttendance?: number;
  date: string;
  incidents?: string[];
}

export interface Debate {
  id: string;
  date: string;
  moderator: string;
  participants: string[];
  topics: string[];
  transcript?: string;
}

export interface Manifesto {
  id: string;
  candidateId: string;
  title: string;
  promises: Promise[];
  sourceUrl?: string;
}

export interface Promise {
  id: string;
  description: string;
  category: string;
  estimatedCost?: number;
  timeline?: string;
}

export interface PollingUnit {
  id: string;
  state: string;
  lga: string;
  ward: string;
  registeredVoters: number;
  totalVotes: number;
  results: Record<string, number>;
  timestamp: string;
}

export interface ElectionResult {
  id: string;
  state: string;
  winner: string;
  totalVotes: number;
  turnout: number;
  margin: number;
  timestamp: string;
}

export interface Incident {
  id: string;
  type: 'violence' | 'fraud' | 'intimidation' | 'blackout' | 'delay' | 'other';
  location: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  timestamp: string;
  reportedBy?: string;
}

export interface Observer {
  id: string;
  name: string;
  organization: string;
  state: string;
  lga?: string;
  checkInTime?: string;
  status: 'deployed' | 'on_route' | 'checked_in' | 'off_duty';
}

export interface PartyAgent {
  id: string;
  partyId: string;
  state: string;
  pollingUnitId: string;
  status: 'active' | 'inactive';
}

export interface ElectionSimulationConfig {
  seed?: string;
  states?: string[];
  startDate?: string;
  includeRallies?: boolean;
  includeDebates?: boolean;
}

export const NIGERIAN_PARTIES: Party[] = [
  { id: 'apc', name: 'All Progressives Congress', abbreviation: 'APC', color: '#00A3E0', ideology: 'conservative' },
  { id: 'pdp', name: 'Peoples Democratic Party', abbreviation: 'PDP', color: '#E31837', ideology: 'centrist' },
  { id: 'lp', name: 'Labour Party', abbreviation: 'LP', color: '#FFD700', ideology: 'progressive' },
  { id: 'nnpp', name: 'New Nigeria Peoples Party', abbreviation: 'NNPP', color: '#800000', ideology: 'regional' },
  { id: 'apga', name: 'All Progressives Grand Alliance', abbreviation: 'APGA', color: '#006400', ideology: 'regional' },
  { id: 'zp', name: 'Zenith Labour Party', abbreviation: 'ZP', color: '#FF8C00', ideology: 'labour' },
];

function seededRandom(seed: string, index: number): number {
  let hash = 0;
  const str = seed + index.toString();
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash = hash & hash;
  }
  return Math.abs(hash % 1000) / 1000;
}

export function generateCandidates(seed: string = 'default'): Candidate[] {
  const candidates: Candidate[] = [];
  const names = [
    'Bola Tinubu', 'Atiku Abubakar', 'Peter Obi', 'Rabiu Kwankwaso', 'Ameachi',
    'Olusegun Oni', 'Bukola Saraki', 'Ibrahim Shekarau', 'Sani Bello', 'Umaru Musa',
  ];

  NIGERIAN_PARTIES.forEach((party, idx) => {
    const stateOptions = ['lagos', 'kano', 'abuja', 'rivers', 'oyo'];
    const experienceOptions = ['governor', 'senator', 'minister', 'business', 'labor'];
    candidates.push({
      id: `candidate-${idx}`,
      name: names[idx] || `Candidate ${idx}`,
      partyId: party.id,
      state: stateOptions[idx % stateOptions.length] as string,
      age: 50 + Math.floor(seededRandom(seed, idx) * 30),
      experience: experienceOptions[idx % experienceOptions.length] as string,
    });
  });

  return candidates;
}

export function generateRallies(candidates: Candidate[], seed: string = 'default'): Rally[] {
  const rallies: Rally[] = [];
  const states = ['lagos', 'kano', 'rivers', 'oyo', 'kaduna', 'anambra', 'delta', 'abuja'];

  candidates.forEach((candidate, idx) => {
    const numRallies = 3 + Math.floor(seededRandom(seed, idx) * 5);
    for (let i = 0; i < numRallies; i++) {
      const stateIdx = Math.floor(seededRandom(seed, idx * 10 + i) * states.length);
      rallies.push({
        id: `rally-${idx}-${i}`,
        candidateId: candidate.id,
        state: states[stateIdx] as string,
        expectedAttendance: 1000 + Math.floor(seededRandom(seed, idx * 20 + i) * 9000),
        date: new Date().toISOString(),
      });
    }
  });

  return rallies;
}

export function generateIncidents(seed: string = 'default', count: number = 20): Incident[] {
  const incidents: Incident[] = [];
  const types: Incident['type'][] = ['violence', 'fraud', 'intimidation', 'blackout', 'delay'];
  const locations = ['kano', 'rivers', 'lagos', 'borno', 'kogi', 'delta', 'anambra', 'kaduna'];

  for (let i = 0; i < count; i++) {
    const typeIdx = Math.floor(seededRandom(seed, i) * types.length);
    const locIdx = Math.floor(seededRandom(seed, i + 100) * locations.length);
    const sevIdx = Math.floor(seededRandom(seed, i + 200) * 4);
    const severities: Incident['severity'][] = ['low', 'medium', 'high', 'critical'];
    incidents.push({
      id: `incident-${i}`,
      type: types[typeIdx] as Incident['type'],
      location: locations[locIdx] as string,
      severity: severities[sevIdx] as Incident['severity'],
      description: `Incident reported at ${locations[i % locations.length]}`,
      timestamp: new Date().toISOString(),
    });
  }

  return incidents;
}

export function calculateTurnout(region: string, baseline: number = 35, _seed: string = 'default'): number {
  const variance = (seededRandom(region, baseline) - 0.5) * 20;
  return Math.min(80, Math.max(10, baseline + variance));
}

export function calculateRegionalVolatility(
  region: string,
  _seed: string = 'default'
): { partyShift: number; volatility: number } {
  const baseVolatility = seededRandom(region, 1);
  const partyShift = (seededRandom(region, 2) - 0.5) * 0.15;
  return {
    partyShift: Math.round(partyShift * 100) / 100,
    volatility: Math.round(baseVolatility * 100) / 100,
  };
}