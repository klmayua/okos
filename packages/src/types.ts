export type PersonaCategory =
  | 'student'
  | 'artisan'
  | 'farmer'
  | 'trader'
  | 'civil_servant'
  | 'unemployed_youth'
  | 'ngo_worker'
  | 'journalist'
  | 'party_agent'
  | 'election_observer'
  | 'civic_organizer'
  | 'religious_leader'
  | 'security_personnel'
  | 'tech_worker'
  | 'diaspora_supporter';

export type Gender = 'male' | 'female' | 'other';

export type AgeBand = '18-24' | '25-34' | '35-44' | '45-54' | '55-64' | '65+';

export type EducationLevel =
  | 'none'
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'postgraduate';

export type EmploymentStatus =
  | 'employed'
  | 'self_employed'
  | 'unemployed'
  | 'student'
  | 'retired';

export type Language = 'english' | 'hausa' | 'yoruba' | 'igbo' | 'fulani' | 'kanuri' | 'others';

export type ConnectivityLevel = 'none' | '2g' | '3g' | '4g' | '5g';

export type SmartphoneCapability = 'none' | 'basic' | 'smart' | 'flagship';

export interface Persona {
  personaId: string;
  fullName: string;
  ageBand: AgeBand;
  gender: Gender;
  languageProfile: Language[];
  educationLevel: EducationLevel;
  employmentProfile: EmploymentStatus;
  category: PersonaCategory;
  state: string;
  lga: string;
  ward: string;
  connectivityLevel: ConnectivityLevel;
  smartphoneCapability: SmartphoneCapability;
  civicEngagementScore: number;
  trustScore: number;
  initiativeParticipationHistory: InitiativeParticipation[];
  movementAlignmentScore: number;
  misinformationSusceptibility: number;
  volunteerProbability: number;
  donationProbability: number;
  turnoutProbability: number;
  riskTolerance: number;
  socialGraphDensity: number;
  createdAt: string;
}

export interface InitiativeParticipation {
  initiativeId: string;
  role: 'proposer' | 'supporter' | 'volunteer' | 'beneficiary' | 'donor';
  date: string;
}

export interface BehavioralModel {
  type: 'civic_growth' | 'trust_evolution' | 'donation_behavior' | 'turnout_behavior' | 'misinformation_reaction' | 'volunteer_activation' | 'outrage_cascade' | 'trust_recovery';
  parameters: Record<string, number>;
}

export interface PersonaOptions {
  seed?: string;
  count?: number;
  state?: string;
  category?: PersonaCategory;
}

export interface PersonaFilters {
  state?: string;
  lga?: string;
  category?: PersonaCategory;
  ageBand?: AgeBand;
  employmentStatus?: EmploymentStatus;
  minCivicScore?: number;
  minTrustScore?: number;
}