import { z } from 'zod';

export const GeoCoordinatesSchema = z.object({
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
});

export const LanguageDistributionSchema = z.object({
  language: z.string(),
  percentage: z.number().min(0).max(100),
});

export const EconomicProfileSchema = z.object({
  primarySector: z.enum(['agriculture', 'trade', 'services', 'manufacturing', 'mining']),
  unemploymentRate: z.number().min(0).max(100),
  averageIncome: z.number().min(0),
});

export const VotingProfileSchema = z.object({
  registeredVoters: z.number().min(0),
  lastTurnout: z.number().min(0).max(100),
  partyAffiliation: z.record(z.string(), z.number()),
});

export const GeographicEntitySchema = z.object({
  geoId: z.string(),
  name: z.string(),
  type: z.enum(['country', 'zone', 'state', 'lga', 'ward', 'polling_unit', 'community', 'settlement']),
  populationEstimate: z.number().min(0),
  urbanizationLevel: z.number().min(0).max(100),
  networkQuality: z.enum(['excellent', 'good', 'fair', 'poor', 'none']),
  languageDistribution: z.array(LanguageDistributionSchema),
  economicProfile: EconomicProfileSchema,
  votingProfile: VotingProfileSchema,
  initiativeDensity: z.number().min(0).max(1),
  securityRiskLevel: z.enum(['low', 'medium', 'high', 'critical']),
  civicEngagementIndex: z.number().min(0).max(1),
  connectivityIndex: z.number().min(0).max(1),
  coordinates: GeoCoordinatesSchema,
  parentId: z.string().nullable(),
});

export const GeographyOptionsSchema = z.object({
  seed: z.string().optional(),
  includeZones: z.boolean().optional(),
  includeStates: z.boolean().optional(),
  includeLgas: z.boolean().optional(),
  includeWards: z.boolean().optional(),
  includePollingUnits: z.boolean().optional(),
  maxPopulation: z.number().optional(),
});

export type ZodGeographicEntity = z.infer<typeof GeographicEntitySchema>;
export type ZodGeographyOptions = z.infer<typeof GeographyOptionsSchema>;