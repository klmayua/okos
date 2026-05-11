import type {
  GeographicEntity,
  GeoType,
  LanguageDistribution,
  EconomicProfile,
  VotingProfile,
  GeoCoordinates,
} from '../types.js';

/**
 * NIGERIAN ADMINISTRATIVE HIERARCHY — CANONICAL STRUCTURE
 * Total States: 36
 * Total LGAs: 774 (including FCT Area Councils)
 * Total Zones: 6
 * FCT: Federal Capital Territory (not a state)
 */

const NIGERIA_ZONES = [
  { id: 'nw', name: 'North West', states: ['kano', 'katsina', 'kaduna', 'sokoto', 'kebbi', 'zamfara', 'jigawa'] },
  { id: 'ne', name: 'North East', states: ['bauchi', 'borno', 'yobe', 'gombe', 'taraba', 'adamawa'] },
  { id: 'nc', name: 'North Central', states: ['plateau', 'niger', 'benue', 'kogi', 'kwara', 'nasarawa'] },
  { id: 'sw', name: 'South West', states: ['lagos', 'ogun', 'oyo', 'osun', 'ondo', 'ekiti'] },
  { id: 'se', name: 'South East', states: ['anambra', 'enugu', 'imo', 'abia', 'ebonyi'] },
  { id: 'ss', name: 'South South', states: ['rivers', 'delta', 'akwa_ibom', 'cross_river', 'bayelsa', 'edo'] },
];

/** 36 States with exact LGA counts. Total: 768 LGAs */
const STATE_DATA: Record<string, { name: string; population: number; lgas: number }> = {
  abia: { name: 'Abia', population: 3720000, lgas: 17 },
  adamawa: { name: 'Adamawa', population: 3880000, lgas: 21 },
  akwa_ibom: { name: 'Akwa Ibom', population: 5500000, lgas: 31 },
  anambra: { name: 'Anambra', population: 5700000, lgas: 21 },
  bauchi: { name: 'Bauchi', population: 6400000, lgas: 20 },
  bayelsa: { name: 'Bayelsa', population: 2200000, lgas: 8 },
  benue: { name: 'Benue', population: 5500000, lgas: 23 },
  borno: { name: 'Borno', population: 5900000, lgas: 27 },
  cross_river: { name: 'Cross River', population: 3700000, lgas: 18 },
  delta: { name: 'Delta', population: 5700000, lgas: 25 },
  edo: { name: 'Edo', population: 4100000, lgas: 18 },
  ekiti: { name: 'Ekiti', population: 2600000, lgas: 16 },
  enugu: { name: 'Enugu', population: 4400000, lgas: 17 },
  gombe: { name: 'Gombe', population: 3100000, lgas: 11 },
  imo: { name: 'Imo', population: 4800000, lgas: 27 },
  jigawa: { name: 'Jigawa', population: 5200000, lgas: 27 },
  kaduna: { name: 'Kaduna', population: 7600000, lgas: 23 },
  kano: { name: 'Kano', population: 13000000, lgas: 44 },
  katsina: { name: 'Katsina', population: 7800000, lgas: 34 },
  kebbi: { name: 'Kebbi', population: 4200000, lgas: 21 },
  kogi: { name: 'Kogi', population: 4300000, lgas: 21 },
  kwara: { name: 'Kwara', population: 3100000, lgas: 16 },
  lagos: { name: 'Lagos', population: 15000000, lgas: 20 },
  nasarawa: { name: 'Nasarawa', population: 2400000, lgas: 13 },
  niger: { name: 'Niger', population: 5200000, lgas: 25 },
  ogun: { name: 'Ogun', population: 4700000, lgas: 20 },
  ondo: { name: 'Ondo', population: 4200000, lgas: 18 },
  osun: { name: 'Osun', population: 4100000, lgas: 30 },
  oyo: { name: 'Oyo', population: 7400000, lgas: 33 },
  plateau: { name: 'Plateau', population: 4000000, lgas: 17 },
  rivers: { name: 'Rivers', population: 7100000, lgas: 23 },
  sokoto: { name: 'Sokoto', population: 4700000, lgas: 23 },
  taraba: { name: 'Taraba', population: 2800000, lgas: 16 },
  yobe: { name: 'Yobe', population: 3200000, lgas: 17 },
  zamfara: { name: 'Zamfara', population: 4300000, lgas: 14 },
  ebonyi: { name: 'Ebonyi', population: 2800000, lgas: 13 },
};

/** FCT Area Councils — 6 councils (not LGAs, but equivalent) */
const FCT_AREA_COUNCILS = [
  { id: 'abuja_municipal', name: 'Abuja Municipal Area Council', population: 776000 },
  { id: 'bwari', name: 'Bwari Area Council', population: 310000 },
  { id: 'gwagwalada', name: 'Gwagwalada Area Council', population: 410000 },
  { id: 'kuje', name: 'Kuje Area Council', population: 270000 },
  { id: 'kwali', name: 'Kwali Area Council', population: 195000 },
  { id: 'abaji', name: 'Abaji Area Council', population: 148000 },
];

/** Expected totals */
const EXPECTED_STATE_COUNT = 36;
const EXPECTED_ZONE_COUNT = 6;
const EXPECTED_FCT_COUNCILS = 6;
const EXPECTED_TOTAL_LGA_EQUIVALENT = 774;

type NetworkQuality = 'excellent' | 'good' | 'fair' | 'poor' | 'none';
type SecurityRisk = 'low' | 'medium' | 'high' | 'critical';
type PrimarySector = 'agriculture' | 'trade' | 'services' | 'manufacturing' | 'mining';

const NETWORK_QUALITY_OPTIONS: NetworkQuality[] = ['excellent', 'good', 'fair', 'poor', 'none'];
const SECURITY_RISK_OPTIONS: SecurityRisk[] = ['low', 'medium', 'high', 'critical'];
const SECTOR_OPTIONS: PrimarySector[] = ['agriculture', 'trade', 'services', 'manufacturing', 'mining'];

function hashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
}

function seededRandom(seed: string, index: number): number {
  const hash = hashCode(seed + '-' + index);
  return (hash % 1000) / 1000;
}

function generateCoordinates(seed: string, index: number, region: string): GeoCoordinates {
  const baseCoords: Record<string, [number, number]> = {
    nw: [12.0, 8.0],
    ne: [12.5, 11.0],
    nc: [9.0, 8.5],
    sw: [6.5, 3.5],
    se: [5.5, 7.5],
    ss: [4.5, 5.5],
  };
  const coords = baseCoords[region];
  const baseLat = coords ? coords[0] : 9.0;
  const baseLon = coords ? coords[1] : 8.0;
  const latVar = (seededRandom(seed, index * 3) - 0.5) * 3;
  const lonVar = (seededRandom(seed, index * 3 + 1) - 0.5) * 3;
  return { latitude: baseLat + latVar, longitude: baseLon + lonVar };
}

const LANG_DIST_NW: LanguageDistribution[] = [
  { language: 'Hausa', percentage: 85 },
  { language: 'Fulani', percentage: 10 },
  { language: 'Yoruba', percentage: 3 },
  { language: 'Kanuri', percentage: 2 },
];

function generateLanguageDistribution(seed: string): LanguageDistribution[] {
  return LANG_DIST_NW.map(lang => ({
    ...lang,
    percentage: lang.percentage + (seededRandom(seed, lang.language.length) - 0.5) * 5,
  }));
}

function generateEconomicProfile(seed: string): EconomicProfile {
  const sectorIndex = Math.floor(seededRandom(seed, 1) * SECTOR_OPTIONS.length);
  return {
    primarySector: SECTOR_OPTIONS[sectorIndex] as PrimarySector,
    unemploymentRate: 15 + seededRandom(seed, 2) * 30,
    averageIncome: 50000 + seededRandom(seed, 3) * 500000,
  };
}

function generateVotingProfile(seed: string, population: number): VotingProfile {
  return {
    registeredVoters: Math.floor(population * 0.6),
    lastTurnout: 30 + seededRandom(seed, 5) * 40,
    partyAffiliation: {
      apc: 0.35 + seededRandom(seed, 1) * 0.1,
      pdp: 0.25 + seededRandom(seed, 2) * 0.1,
      lp: 0.15 + seededRandom(seed, 3) * 0.1,
      nnpp: 0.05 + seededRandom(seed, 4) * 0.05,
      others: 0.1,
    },
  };
}

function getNetworkQuality(seed: string, index: number): NetworkQuality {
  const idx = Math.floor(seededRandom(seed, index) * NETWORK_QUALITY_OPTIONS.length);
  return NETWORK_QUALITY_OPTIONS[idx] as NetworkQuality;
}

function getSecurityRisk(seed: string, index: number): SecurityRisk {
  const idx = Math.floor(seededRandom(seed, index) * SECURITY_RISK_OPTIONS.length);
  return SECURITY_RISK_OPTIONS[idx] as SecurityRisk;
}

/**
 * Generate the complete Nigerian geographic hierarchy.
 * Guarantees exact counts:
 * - 1 Country
 * - 6 Zones
 * - 36 States
 * - 768 LGAs (state-level)
 * - 6 FCT Area Councils
 * - 774 total LGA-equivalent units
 */
export function generateHierarchy(seed: string = 'default'): GeographicEntity[] {
  const entities: GeographicEntity[] = [];
  let entityIndex = 0;

  // Country
  const country: GeographicEntity = {
    geoId: 'nga',
    name: 'Nigeria',
    type: 'country',
    populationEstimate: 220000000,
    urbanizationLevel: 50,
    networkQuality: 'good',
    languageDistribution: [
      { language: 'Hausa', percentage: 30 },
      { language: 'Yoruba', percentage: 15 },
      { language: 'Igbo', percentage: 15 },
      { language: 'Fulani', percentage: 10 },
      { language: 'Others', percentage: 30 },
    ],
    economicProfile: { primarySector: 'services', unemploymentRate: 33, averageIncome: 250000 },
    votingProfile: { registeredVoters: 94000000, lastTurnout: 35, partyAffiliation: { apc: 0.35, pdp: 0.25, lp: 0.15, others: 0.25 } },
    initiativeDensity: 0.3,
    securityRiskLevel: 'medium',
    civicEngagementIndex: 0.4,
    connectivityIndex: 0.5,
    coordinates: { latitude: 9.082, longitude: 8.6753 },
    parentId: null,
  };
  entities.push(country);

  // FCT (separate from states, directly under country)
  const fctEntity: GeographicEntity = {
    geoId: 'territory-fct',
    name: 'Federal Capital Territory',
    type: 'state', // Using 'state' type for FCT as it is at the same administrative level
    populationEstimate: 2109000,
    urbanizationLevel: 65,
    networkQuality: 'good',
    languageDistribution: [
      { language: 'English', percentage: 40 },
      { language: 'Hausa', percentage: 20 },
      { language: 'Igbo', percentage: 15 },
      { language: 'Yoruba', percentage: 15 },
      { language: 'Others', percentage: 10 },
    ],
    economicProfile: { primarySector: 'services', unemploymentRate: 25, averageIncome: 450000 },
    votingProfile: { registeredVoters: 1260000, lastTurnout: 40, partyAffiliation: { apc: 0.35, pdp: 0.25, lp: 0.15, others: 0.25 } },
    initiativeDensity: 0.5,
    securityRiskLevel: 'medium',
    civicEngagementIndex: 0.5,
    connectivityIndex: 0.7,
    coordinates: { latitude: 9.0765, longitude: 7.3986 },
    parentId: 'nga',
  };
  entities.push(fctEntity);

  // FCT Area Councils (6)
  for (let i = 0; i < FCT_AREA_COUNCILS.length; i++) {
    const council = FCT_AREA_COUNCILS[i];
    if (!council) continue;
    entities.push({
      geoId: `fct-council-${council.id}`,
      name: council.name,
      type: 'lga',
      populationEstimate: council.population,
      urbanizationLevel: 20 + seededRandom(seed, entityIndex++) * 60,
      networkQuality: getNetworkQuality(seed, entityIndex++),
      languageDistribution: generateLanguageDistribution(seed),
      economicProfile: generateEconomicProfile(seed),
      votingProfile: generateVotingProfile(seed, council.population),
      initiativeDensity: seededRandom(seed, entityIndex++) * 0.5,
      securityRiskLevel: getSecurityRisk(seed, entityIndex++),
      civicEngagementIndex: seededRandom(seed, entityIndex++) * 0.7,
      connectivityIndex: seededRandom(seed, entityIndex++) * 0.6,
      coordinates: generateCoordinates(seed, entityIndex++, 'nc'),
      parentId: 'territory-fct',
    });
  }

  // Zones and States
  for (const zone of NIGERIA_ZONES) {
    const zonePop = zone.states.length * 4000000;
    const zoneId = `zone-${zone.id}`;
    const zoneEntity: GeographicEntity = {
      geoId: zoneId,
      name: zone.name,
      type: 'zone',
      populationEstimate: zonePop,
      urbanizationLevel: 30 + seededRandom(seed, entityIndex++) * 30,
      networkQuality: getNetworkQuality(seed, entityIndex++),
      languageDistribution: generateLanguageDistribution(seed),
      economicProfile: generateEconomicProfile(seed),
      votingProfile: generateVotingProfile(seed, zonePop),
      initiativeDensity: 0.2 + seededRandom(seed, entityIndex++) * 0.3,
      securityRiskLevel: zone.id === 'ne' ? 'high' : zone.id === 'nw' ? 'medium' : 'low',
      civicEngagementIndex: 0.3 + seededRandom(seed, entityIndex++) * 0.3,
      connectivityIndex: 0.3 + seededRandom(seed, entityIndex++) * 0.4,
      coordinates: generateCoordinates(seed, entityIndex++, zone.id),
      parentId: 'nga',
    };
    entities.push(zoneEntity);

    for (const stateId of zone.states) {
      const stateData = STATE_DATA[stateId];
      if (!stateData) continue;
      const stateEntity: GeographicEntity = {
        geoId: `state-${stateId}`,
        name: stateData.name,
        type: 'state',
        populationEstimate: stateData.population,
        urbanizationLevel: 20 + seededRandom(seed, entityIndex++) * 50,
        networkQuality: getNetworkQuality(seed, entityIndex++),
        languageDistribution: generateLanguageDistribution(seed),
        economicProfile: generateEconomicProfile(seed),
        votingProfile: generateVotingProfile(seed, stateData.population),
        initiativeDensity: 0.1 + seededRandom(seed, entityIndex++) * 0.4,
        securityRiskLevel: getSecurityRisk(seed, entityIndex++),
        civicEngagementIndex: 0.2 + seededRandom(seed, entityIndex++) * 0.5,
        connectivityIndex: 0.2 + seededRandom(seed, entityIndex++) * 0.5,
        coordinates: generateCoordinates(seed, entityIndex++, zone.id),
        parentId: zoneId,
      };
      entities.push(stateEntity);

      // Generate EXACT number of LGAs for this state
      for (let l = 0; l < stateData.lgas; l++) {
        const lgaPop = Math.floor(stateData.population / stateData.lgas * (0.8 + seededRandom(seed, entityIndex++) * 0.4));
        entities.push({
          geoId: `lga-${stateId}-${l}`,
          name: `${stateData.name} LGA ${l + 1}`,
          type: 'lga',
          populationEstimate: lgaPop,
          urbanizationLevel: 10 + seededRandom(seed, entityIndex++) * 60,
          networkQuality: getNetworkQuality(seed, entityIndex++),
          languageDistribution: generateLanguageDistribution(seed),
          economicProfile: generateEconomicProfile(seed),
          votingProfile: generateVotingProfile(seed, lgaPop),
          initiativeDensity: seededRandom(seed, entityIndex++) * 0.5,
          securityRiskLevel: getSecurityRisk(seed, entityIndex++),
          civicEngagementIndex: seededRandom(seed, entityIndex++) * 0.7,
          connectivityIndex: seededRandom(seed, entityIndex++) * 0.6,
          coordinates: generateCoordinates(seed, entityIndex++, zone.id),
          parentId: `state-${stateId}`,
        });
      }
    }
  }

  return entities;
}

/**
 * VALIDATION ASSERTIONS
 * These functions verify the integrity of the generated hierarchy.
 */

export function validateHierarchy(entities: GeographicEntity[]): {
  valid: boolean;
  stateCount: number;
  zoneCount: number;
  lgaCount: number;
  fctCouncilCount: number;
  totalLgaEquivalent: number;
  errors: string[];
} {
  const errors: string[] = [];

  const zones = entities.filter(e => e.type === 'zone');
  const states = entities.filter(e => e.type === 'state' && e.geoId !== 'territory-fct');
  const lgas = entities.filter(e => e.type === 'lga');
  const fctCouncils = entities.filter(e => e.parentId === 'territory-fct');

  const stateCount = states.length;
  const zoneCount = zones.length;
  const lgaCount = lgas.length;
  const fctCouncilCount = fctCouncils.length;

  // FCT is counted as a 'state' type entity
  const totalLgaEquivalent = lgaCount;

  if (stateCount !== EXPECTED_STATE_COUNT) {
    errors.push(`State count mismatch: expected ${EXPECTED_STATE_COUNT}, got ${stateCount}`);
  }

  if (zoneCount !== EXPECTED_ZONE_COUNT) {
    errors.push(`Zone count mismatch: expected ${EXPECTED_ZONE_COUNT}, got ${zoneCount}`);
  }

  if (lgaCount !== EXPECTED_TOTAL_LGA_EQUIVALENT) {
    errors.push(`LGA count mismatch: expected ${EXPECTED_TOTAL_LGA_EQUIVALENT}, got ${lgaCount}`);
  }

  if (fctCouncilCount !== EXPECTED_FCT_COUNCILS) {
    errors.push(`FCT council count mismatch: expected ${EXPECTED_FCT_COUNCILS}, got ${fctCouncilCount}`);
  }

  // Verify all LGAs have a parent state or FCT
  for (const lga of lgas) {
    if (!lga.parentId) {
      errors.push(`LGA ${lga.geoId} has no parent`);
    }
  }

  // Verify no duplicate geoIds
  const geoIds = entities.map(e => e.geoId);
  const duplicates = geoIds.filter((id, idx) => geoIds.indexOf(id) !== idx);
  if (duplicates.length > 0) {
    errors.push(`Duplicate geoIds found: ${duplicates.join(', ')}`);
  }

  return {
    valid: errors.length === 0,
    stateCount,
    zoneCount,
    lgaCount,
    fctCouncilCount,
    totalLgaEquivalent,
    errors,
  };
}

export function getEntitiesByType(entities: GeographicEntity[], type: GeoType): GeographicEntity[] {
  return entities.filter(e => e.type === type);
}

export function getEntityById(entities: GeographicEntity[], geoId: string): GeographicEntity | undefined {
  return entities.find(e => e.geoId === geoId);
}

export function getChildren(entities: GeographicEntity[], parentId: string): GeographicEntity[] {
  return entities.filter(e => e.parentId === parentId);
}

export function getDescendants(entities: GeographicEntity[], parentId: string): GeographicEntity[] {
  const children = getChildren(entities, parentId);
  const descendants: GeographicEntity[] = [];
  for (const child of children) {
    descendants.push(child);
    descendants.push(...getDescendants(entities, child.geoId));
  }
  return descendants;
}

export function calculateTravelTime(fromId: string, toId: string, entities: GeographicEntity[]): number {
  const from = getEntityById(entities, fromId);
  const to = getEntityById(entities, toId);
  if (!from || !to) return 120;
  const latDiff = Math.abs(from.coordinates.latitude - to.coordinates.latitude);
  const lonDiff = Math.abs(from.coordinates.longitude - to.coordinates.longitude);
  const distanceKm = Math.sqrt(latDiff * 111 + lonDiff * 111) * 111;
  return Math.floor(distanceKm / 60 + 30);
}

export function findNearbyEntities(entities: GeographicEntity[], geoId: string, radiusKm: number = 50): GeographicEntity[] {
  const center = getEntityById(entities, geoId);
  if (!center) return [];
  return entities.filter(e => {
    if (e.geoId === geoId) return false;
    const latDiff = Math.abs(e.coordinates.latitude - center.coordinates.latitude);
    const lonDiff = Math.abs(e.coordinates.longitude - center.coordinates.longitude);
    const distance = Math.sqrt(latDiff * 111 + lonDiff * 111) * 111;
    return distance <= radiusKm;
  });
}
