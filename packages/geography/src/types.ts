export type GeoType =
  | 'country'
  | 'zone'
  | 'state'
  | 'lga'
  | 'ward'
  | 'polling_unit'
  | 'community'
  | 'settlement';

export interface GeoCoordinates {
  latitude: number;
  longitude: number;
}

export interface LanguageDistribution {
  language: string;
  percentage: number;
}

export interface EconomicProfile {
  primarySector: 'agriculture' | 'trade' | 'services' | 'manufacturing' | 'mining';
  unemploymentRate: number;
  averageIncome: number;
}

export interface VotingProfile {
  registeredVoters: number;
  lastTurnout: number;
  partyAffiliation: Record<string, number>;
}

export interface GeographicEntity {
  geoId: string;
  name: string;
  type: GeoType;
  populationEstimate: number;
  urbanizationLevel: number;
  networkQuality: 'excellent' | 'good' | 'fair' | 'poor' | 'none';
  languageDistribution: LanguageDistribution[];
  economicProfile: EconomicProfile;
  votingProfile: VotingProfile;
  initiativeDensity: number;
  securityRiskLevel: 'low' | 'medium' | 'high' | 'critical';
  civicEngagementIndex: number;
  connectivityIndex: number;
  coordinates: GeoCoordinates;
  parentId: string | null;
}

export interface HierarchyNode {
  entity: GeographicEntity;
  children: HierarchyNode[];
}

export interface TravelTimeEstimate {
  fromId: string;
  toId: string;
  estimatedMinutes: number;
  mode: 'road' | 'air' | 'boat';
}

export interface ConnectivityDisruption {
  regionId: string;
  startTime: string;
  endTime: string | null;
  severity: 'partial' | 'full';
  affectedAreas: string[];
}

export interface TurnoutVariance {
  regionId: string;
  baseline: number;
  variance: number;
  reason: string;
}

export interface CrisisSpreadModel {
  originId: string;
  spreadRate: number;
  affectedRegions: string[];
  containmentDifficulty: number;
}

export interface NarrativePropagation {
  originId: string;
  propagationSpeed: number;
  regionalSpread: Record<string, number>;
  sentimentTrajectory: number[];
}

export interface SeedConfig {
  seed: string;
  includeAllLevels: boolean;
  maxPopulation: number;
}

export interface GeographyOptions {
  seed?: string;
  includeZones?: boolean;
  includeStates?: boolean;
  includeLgas?: boolean;
  includeWards?: boolean;
  includePollingUnits?: boolean;
  maxPopulation?: number;
}