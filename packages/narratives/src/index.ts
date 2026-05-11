export type NarrativeType =
  | 'election_disinformation'
  | 'ethnic_division'
  | 'anti_youth_narratives'
  | 'fake_results'
  | 'corruption_allegations'
  | 'initiative_smear_campaigns'
  | 'panic_inducement'
  | 'trust_erosion';

export type PropagationMode =
  | 'whatsapp_spread'
  | 'influencer_amplification'
  | 'regional_diffusion'
  | 'outrage_acceleration'
  | 'trust_decay'
  | 'counter_narrative_recovery';

export interface Rumor {
  id: string;
  content: string;
  origin: string;
  timestamp: string;
  verified: boolean;
  factCheckResult?: string;
  confidenceScore: number;
  spreadReach: number;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

export interface Narrative {
  id: string;
  type: NarrativeType;
  title: string;
  description: string;
  originRegion: string;
  targetRegion: string;
  createdAt: string;
  isActive: boolean;
  sentimentScore: number;
  reachMultiplier: number;
}

export interface Influencer {
  id: string;
  name: string;
  platform: 'twitter' | 'facebook' | 'whatsapp' | 'instagram' | 'tiktok';
  followerCount: number;
  credibilityScore: number;
  alignmentScore: number;
  reachRegions: string[];
  isBot: boolean;
}

export interface BotNetwork {
  id: string;
  size: number;
  targetRegions: string[];
  activationTime: string;
  activityPattern: 'burst' | 'gradual' | 'periodic';
}

export interface MediaSource {
  id: string;
  name: string;
  type: 'mainstream' | 'alternative' | 'social' | 'state';
  credibilityScore: number;
  bias: 'left' | 'right' | 'center' | 'mixed';
  reach: number;
}

export interface FactCheck {
  id: string;
  claim: string;
  verdict: 'true' | 'false' | 'misleading' | 'unverified';
  source: string;
  timestamp: string;
  corrections?: string[];
}

export interface PropagandaCampaign {
  id: string;
  narrativeId: string;
  startTime: string;
  endTime?: string;
  targetRegions: string[];
  budget: number;
  active: boolean;
}

export interface CoordinatedAttack {
  id: string;
  targetType: 'person' | 'organization' | 'event' | 'result';
  targetId: string;
  methods: string[];
  origins: string[];
  detectedAt: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

export interface NarrativePropagationModel {
  mode: PropagationMode;
  speed: number;
  decayRate?: number;
  recoveryRate?: number;
}

export interface PulseOkRequirements {
  rumorDetectionEnabled: boolean;
  factCheckPipelineEnabled: boolean;
  confidenceScoringEnabled: boolean;
  escalationLogicEnabled: boolean;
  analystReviewEnabled: boolean;
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

export function generateNarrative(seed: string, index: number): Narrative {
  const types: NarrativeType[] = [
    'election_disinformation', 'ethnic_division', 'anti_youth_narratives',
    'fake_results', 'corruption_allegations', 'initiative_smear_campaigns',
    'panic_inducement', 'trust_erosion',
  ];
  const regions = ['nw', 'ne', 'nc', 'sw', 'se', 'ss'];

  const typeIndex = Math.floor(seededRandom(seed, index) * types.length);
  const originIndex = Math.floor(seededRandom(seed, index + 10) * regions.length);
  const targetIndex = Math.floor(seededRandom(seed, index + 20) * regions.length);
  const descIndex = index % types.length;

  return {
    id: `narrative-${index}`,
    type: types[typeIndex] as NarrativeType,
    title: `Narrative ${index}`,
    description: `Generated narrative about ${types[descIndex]}`,
    originRegion: regions[originIndex] as string,
    targetRegion: regions[targetIndex] as string,
    createdAt: new Date().toISOString(),
    isActive: seededRandom(seed, index + 30) > 0.3,
    sentimentScore: Math.round(seededRandom(seed, index + 40) * 100) / 100,
    reachMultiplier: 1 + seededRandom(seed, index + 50) * 5,
  };
}

export function generateRumor(seed: string, index: number): Rumor {
  const severities: Rumor['severity'][] = ['low', 'medium', 'high', 'critical'];
  const severityIndex = Math.floor(seededRandom(seed, index + 400) * severities.length);
  return {
    id: `rumor-${index}`,
    content: `Rumor content ${index}`,
    origin: `region-${Math.floor(seededRandom(seed, index) * 6)}`,
    timestamp: new Date().toISOString(),
    verified: seededRandom(seed, index + 100) > 0.5,
    confidenceScore: Math.round(seededRandom(seed, index + 200) * 100) / 100,
    spreadReach: Math.floor(seededRandom(seed, index + 300) * 10000),
    severity: severities[severityIndex] as Rumor['severity'],
  };
}

export function generateInfluencer(seed: string, index: number): Influencer {
  const platforms: Influencer['platform'][] = ['twitter', 'facebook', 'whatsapp', 'instagram', 'tiktok'];
  const platformIndex = Math.floor(seededRandom(seed, index) * platforms.length);
  return {
    id: `influencer-${index}`,
    name: `Influencer ${index}`,
    platform: platforms[platformIndex] as Influencer['platform'],
    followerCount: Math.floor(1000 + seededRandom(seed, index + 1) * 100000),
    credibilityScore: Math.round(seededRandom(seed, index + 2) * 100) / 100,
    alignmentScore: Math.round(seededRandom(seed, index + 3) * 100) / 100,
    reachRegions: ['nw', 'sw', 'se'].slice(0, 1 + Math.floor(seededRandom(seed, index + 4) * 2)),
    isBot: seededRandom(seed, index + 5) > 0.7,
  };
}

export function propagateNarrative(
  narrative: Narrative,
  regions: string[],
  mode: PropagationMode,
  timeSteps: number
): Record<string, number[]> {
  const propagation: Record<string, number[]> = {};
  const baseSpeed = mode === 'whatsapp_spread' ? 0.8 : mode === 'outrage_acceleration' ? 1.2 : 0.5;

  regions.forEach(region => {
    propagation[region] = [];
    let current = narrative.reachMultiplier;
    for (let t = 0; t < timeSteps; t++) {
      current *= (1 + baseSpeed * seededRandom(region, t));
      propagation[region].push(Math.floor(current));
    }
  });

  return propagation;
}

export function calculateTrustDecay(
  initialTrust: number,
  minutes: number,
  attackIntensity: number = 1
): number {
  const decayRate = 0.01 * attackIntensity;
  return Math.max(0, initialTrust * Math.exp(-decayRate * minutes));
}

export function calculateRecovery(
  currentTrust: number,
  counterNarrativeStrength: number,
  minutes: number
): number {
  const recoveryRate = 0.005 * counterNarrativeStrength;
  return Math.min(1, currentTrust + recoveryRate * minutes);
}

export function getPulseOkRequirements(): PulseOkRequirements {
  return {
    rumorDetectionEnabled: true,
    factCheckPipelineEnabled: true,
    confidenceScoringEnabled: true,
    escalationLogicEnabled: true,
    analystReviewEnabled: true,
  };
}