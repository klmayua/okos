import type {
  Persona,
  PersonaCategory,
  Gender,
  AgeBand,
  EducationLevel,
  EmploymentStatus,
  Language,
  ConnectivityLevel,
  SmartphoneCapability,
  PersonaOptions,
} from '../types.js';

const FIRST_NAMES_MALE = [
  'Muhammad', 'Baba', 'Ibrahim', 'Abdullahi', ' Musa', 'Abubakar', 'Oluwaseun', 'Chukwuemeka',
  'Emmanuel', 'David', 'John', 'Peter', 'Samuel', 'James', 'Michael', 'Blessing', 'Godwin',
  'Tochukwu', 'Ndubuisi', 'Ebuka', 'Stanley', 'Kingsley', 'Chidi', 'Uchenna', 'Obinna',
];

const FIRST_NAMES_FEMALE = [
  'Fatima', 'Aisha', 'Halima', 'Maryam', 'Zainab', 'Hadiza', 'Rukaya', 'Amina', 'Blessing',
  'Grace', 'Esther', 'Faith', 'Joy', 'Peace', 'Chidinma', 'Adaeze', 'Chiamaka', 'Ngozi',
  'Nneka', 'Uju', 'Ifeoma', 'Adaora', 'Chioma', 'Oluchi', 'Nkechi', 'Amara',
];

const LAST_NAMES = [
  'Abubakar', 'Musa', 'Ibrahim', 'Abdullahi', 'Aliyu', 'Bello', 'Garba', 'Umar', 'Mohammed',
  'Okonkwo', 'Eze', 'Okafor', 'Iwu', 'Nwosu', 'Ogbonna', 'Emeka', 'Chukwu', 'Nnamdi',
  'Adeniyi', 'Ojo', 'Olaniyan', 'Adebayo', 'Olawale', 'Ayodele', 'Samuel', 'Williams',
  'Obi', 'Nnadi', 'Okeke', 'Ezeh', 'Uche', 'Onuoha', 'Ogwu', 'Abiodun', 'Sanni',
];

const CATEGORY_WEIGHTS: { category: PersonaCategory; weight: number }[] = [
  { category: 'student', weight: 0.15 },
  { category: 'farmer', weight: 0.12 },
  { category: 'trader', weight: 0.12 },
  { category: 'unemployed_youth', weight: 0.10 },
  { category: 'artisan', weight: 0.10 },
  { category: 'civil_servant', weight: 0.08 },
  { category: 'ngo_worker', weight: 0.05 },
  { category: 'journalist', weight: 0.03 },
  { category: 'party_agent', weight: 0.05 },
  { category: 'election_observer', weight: 0.03 },
  { category: 'civic_organizer', weight: 0.04 },
  { category: 'religious_leader', weight: 0.04 },
  { category: 'tech_worker', weight: 0.03 },
  { category: 'diaspora_supporter', weight: 0.02 },
  { category: 'security_personnel', weight: 0.04 },
];

const AGE_BAND_WEIGHTS: { band: AgeBand; weight: number }[] = [
  { band: '18-24', weight: 0.22 },
  { band: '25-34', weight: 0.28 },
  { band: '35-44', weight: 0.20 },
  { band: '45-54', weight: 0.15 },
  { band: '55-64', weight: 0.10 },
  { band: '65+', weight: 0.05 },
];

const EDUCATION_BY_AGE: Record<AgeBand, { level: EducationLevel; weight: number }[]> = {
  '18-24': [
    { level: 'secondary', weight: 0.50 },
    { level: 'tertiary', weight: 0.25 },
    { level: 'primary', weight: 0.20 },
    { level: 'none', weight: 0.05 },
  ],
  '25-34': [
    { level: 'tertiary', weight: 0.35 },
    { level: 'secondary', weight: 0.35 },
    { level: 'primary', weight: 0.20 },
    { level: 'none', weight: 0.10 },
  ],
  '35-44': [
    { level: 'secondary', weight: 0.35 },
    { level: 'tertiary', weight: 0.25 },
    { level: 'primary', weight: 0.30 },
    { level: 'none', weight: 0.10 },
  ],
  '45-54': [
    { level: 'secondary', weight: 0.25 },
    { level: 'primary', weight: 0.40 },
    { level: 'tertiary', weight: 0.20 },
    { level: 'none', weight: 0.15 },
  ],
  '55-64': [
    { level: 'primary', weight: 0.45 },
    { level: 'secondary', weight: 0.25 },
    { level: 'none', weight: 0.20 },
    { level: 'tertiary', weight: 0.10 },
  ],
  '65+': [
    { level: 'none', weight: 0.40 },
    { level: 'primary', weight: 0.40 },
    { level: 'secondary', weight: 0.15 },
    { level: 'tertiary', weight: 0.05 },
  ],
};

const STATE_DISTRIBUTION = [
  { state: 'lagos', weight: 0.12 },
  { state: 'kano', weight: 0.09 },
  { state: 'katsina', weight: 0.06 },
  { state: 'kaduna', weight: 0.06 },
  { state: 'ogun', weight: 0.05 },
  { state: 'oyo', weight: 0.05 },
  { state: 'rivers', weight: 0.05 },
  { state: 'borno', weight: 0.04 },
  { state: 'jigawa', weight: 0.04 },
  { state: 'sokoto', weight: 0.04 },
  { state: 'benue', weight: 0.04 },
  { state: 'anambra', weight: 0.04 },
  { state: 'delta', weight: 0.04 },
  { state: 'imo', weight: 0.03 },
  { state: 'plateau', weight: 0.03 },
];

function seededRandom(seed: string, index: number): number {
  let hash = 0;
  for (let i = 0; i < seed.length + index.toString().length; i++) {
    const char = (seed + index).charCodeAt(i % (seed.length + index.toString().length));
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash % 1000) / 1000;
}

function weightedRandom(seed: string, index: number, weights: { weight: number }[]): number {
  const total = weights.reduce((sum, w) => sum + w.weight, 0);
  const random = seededRandom(seed, index);
  let cumulative = 0;
  for (let i = 0; i < weights.length; i++) {
    const weight = weights[i];
    if (!weight) continue;
    cumulative += weight.weight / total;
    if (random < cumulative) return i;
  }
  return weights.length - 1;
}

function generateName(gender: Gender, seed: string, index: number): string {
  const firstNames = gender === 'male' ? FIRST_NAMES_MALE : FIRST_NAMES_FEMALE;
  const firstName = firstNames[Math.floor(seededRandom(seed, index * 2) * firstNames.length)] || 'Unknown';
  const lastName = LAST_NAMES[Math.floor(seededRandom(seed, index * 2 + 1) * LAST_NAMES.length)] || 'Person';
  return `${firstName} ${lastName}`;
}

function generateAgeBand(seed: string, index: number): AgeBand {
  const idx = weightedRandom(seed, index, AGE_BAND_WEIGHTS);
  const band = AGE_BAND_WEIGHTS[idx]?.band;
  return band || '25-34';
}

function generateGender(seed: string, index: number): Gender {
  return seededRandom(seed, index) > 0.5 ? 'male' : 'female';
}

function generateEducation(ageBand: AgeBand, seed: string, index: number): EducationLevel {
  const dist = EDUCATION_BY_AGE[ageBand];
  if (!dist || dist.length === 0) return 'secondary';
  const idx = weightedRandom(seed, index, dist);
  return dist[idx]?.level || 'secondary';
}

function generateEmployment(_education: EducationLevel, category: PersonaCategory, seed: string, index: number): EmploymentStatus {
  if (category === 'student') return 'student';
  if (category === 'unemployed_youth') return 'unemployed';
  const rand = seededRandom(seed, index);
  if (rand < 0.4) return 'employed';
  if (rand < 0.7) return 'self_employed';
  return 'unemployed';
}

function generateConnectivity(seed: string, index: number): ConnectivityLevel {
  const rand = seededRandom(seed, index);
  if (rand < 0.15) return 'none';
  if (rand < 0.30) return '2g';
  if (rand < 0.60) return '3g';
  if (rand < 0.90) return '4g';
  return '5g';
}

function generateSmartphone(conn: ConnectivityLevel, seed: string, index: number): SmartphoneCapability {
  if (conn === 'none') return 'none';
  const rand = seededRandom(seed, index);
  if (rand < 0.3) return 'basic';
  if (rand < 0.7) return 'smart';
  return 'flagship';
}

function generateCategory(seed: string, index: number): PersonaCategory {
  const idx = weightedRandom(seed, index, CATEGORY_WEIGHTS);
  return CATEGORY_WEIGHTS[idx]?.category || 'unemployed_youth';
}

function generateState(seed: string, index: number): string {
  const idx = weightedRandom(seed, index, STATE_DISTRIBUTION);
  return STATE_DISTRIBUTION[idx]?.state || 'lagos';
}

function generateLanguage(state: string, seed: string, index: number): Language[] {
  const hausaStates = ['kano', 'katsina', 'kaduna', 'sokoto', 'jigawa', 'zamfara', 'kebbi', 'borno', 'yobe'];
  const yorubaStates = ['lagos', 'ogun', 'oyo', 'osun', 'ondo', 'ekiti'];
  const igboStates = ['anambra', 'enugu', 'imo', 'abia', 'ebonyi'];

  const languages: Language[] = [];
  if (hausaStates.includes(state)) {
    languages.push('hausa', 'english');
    if (seededRandom(seed, index) > 0.7) languages.push('fulani');
  } else if (yorubaStates.includes(state)) {
    languages.push('yoruba', 'english');
    if (seededRandom(seed, index) > 0.7) languages.push('hausa');
  } else if (igboStates.includes(state)) {
    languages.push('igbo', 'english');
  } else {
    languages.push('english', 'others');
  }
  return languages;
}

function generateScores(category: PersonaCategory, education: EducationLevel, seed: string, index: number) {
  const civicBase = category === 'civic_organizer' ? 0.8 : category === 'ngo_worker' ? 0.7 : category === 'election_observer' ? 0.6 : 0.3;
  const trustBase = education === 'postgraduate' ? 0.7 : education === 'tertiary' ? 0.6 : 0.4;

  const civicEngagement = Math.min(1, civicBase + seededRandom(seed, index) * 0.3);
  const trust = Math.min(1, trustBase + seededRandom(seed, index + 1) * 0.3);
  const misinformation = 0.3 + seededRandom(seed, index + 2) * 0.5;
  const volunteerProb = category === 'civic_organizer' ? 0.8 : category === 'ngo_worker' ? 0.6 : 0.2 + seededRandom(seed, index + 3) * 0.3;
  const donationProb = trust > 0.5 ? 0.1 + seededRandom(seed, index + 4) * 0.3 : 0.05;
  const turnout = 0.3 + seededRandom(seed, index + 5) * 0.5;
  const riskTol = 0.2 + seededRandom(seed, index + 6) * 0.4;
  const socialDensity = 0.3 + seededRandom(seed, index + 7) * 0.5;
  const movementAlign = seededRandom(seed, index + 8);

  return {
    civicEngagementScore: Math.round(civicEngagement * 100) / 100,
    trustScore: Math.round(trust * 100) / 100,
    misinformationSusceptibility: Math.round(misinformation * 100) / 100,
    volunteerProbability: Math.round(volunteerProb * 100) / 100,
    donationProbability: Math.round(donationProb * 100) / 100,
    turnoutProbability: Math.round(turnout * 100) / 100,
    riskTolerance: Math.round(riskTol * 100) / 100,
    socialGraphDensity: Math.round(socialDensity * 100) / 100,
    movementAlignmentScore: Math.round(movementAlign * 100) / 100,
  };
}

export function generatePersona(seed: string, index: number): Persona {
  const gender = generateGender(seed, index);
  const fullName = generateName(gender, seed, index);
  const ageBand = generateAgeBand(seed, index);
  const category = generateCategory(seed, index);
  const state = generateState(seed, index);
  const lga = `lga-${state}-${Math.floor(seededRandom(seed, index + 10) * 20)}`;
  const ward = `ward-${lga}-${Math.floor(seededRandom(seed, index + 11) * 10)}`;
  const education = generateEducation(ageBand, seed, index);
  const employment = generateEmployment(education, category, seed, index);
  const connectivity = generateConnectivity(seed, index);
  const smartphone = generateSmartphone(connectivity, seed, index);
  const scores = generateScores(category, education, seed, index);
  const languages = generateLanguage(state, seed, index);

  return {
    personaId: `persona-${index}-${seed}`,
    fullName,
    ageBand,
    gender,
    languageProfile: languages,
    educationLevel: education,
    employmentProfile: employment,
    category,
    state,
    lga,
    ward,
    connectivityLevel: connectivity,
    smartphoneCapability: smartphone,
    ...scores,
    initiativeParticipationHistory: [],
    createdAt: new Date().toISOString(),
  };
}

export function generatePersonas(options: PersonaOptions = {}): Persona[] {
  const {
    seed = 'default',
    count = 1000,
    state: filterState,
    category: filterCategory,
  } = options;

  const personas: Persona[] = [];
  for (let i = 0; i < count; i++) {
    const persona = generatePersona(seed, i);
    if (filterState && persona.state !== filterState) continue;
    if (filterCategory && persona.category !== filterCategory) continue;
    personas.push(persona);
  }
  return personas;
}

export function filterPersonas(personas: Persona[], filters: {
  state?: string;
  lga?: string;
  category?: PersonaCategory;
  minCivicScore?: number;
  minTrustScore?: number;
}): Persona[] {
  return personas.filter(p => {
    if (filters.state && p.state !== filters.state) return false;
    if (filters.lga && p.lga !== filters.lga) return false;
    if (filters.category && p.category !== filters.category) return false;
    if (filters.minCivicScore && p.civicEngagementScore < filters.minCivicScore) return false;
    if (filters.minTrustScore && p.trustScore < filters.minTrustScore) return false;
    return true;
  });
}