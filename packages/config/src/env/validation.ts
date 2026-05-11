import { z } from 'zod';

import { ENVIRONMENT_CONTRACTS } from './variable-registry.js';

const applicationSchema = z.object({
  APP_NAME: z.string().min(1),
  APP_ENV: z.enum(['local', 'development', 'staging', 'production']),
  APP_REGION: z.string().min(1),
  APP_TIMEZONE: z.string().min(1),
  APP_LOCALE: z.string().min(1),
  APP_BUILD_ID: z.string().min(1),
  APP_VERSION: z.string().min(1),
});

const securitySchema = z.object({
  SECURE_ENCRYPTION_KEY: z.string().min(32),
  SECURE_SIGNING_KEY: z.string().min(64),
  SECURE_ROTATION_KEY: z.string().min(1),
  SECURE_DEVICE_SALT: z.string().min(1),
  SECURE_AUDIT_SIGNATURE_KEY: z.string().min(64),
});

const authSchema = z.object({
  AUTH_SESSION_SECRET: z.string().min(32),
  AUTH_TOKEN_SECRET: z.string().min(32),
  AUTH_REFRESH_SECRET: z.string().min(32),
  AUTH_COOKIE_DOMAIN: z.string().min(1),
  AUTH_COOKIE_SECURE: z.boolean().or(z.string().transform((val) => val === 'true')),
});

const storageSchema = z.object({
  STORAGE_PROVIDER: z.enum(['local', 's3', 'gcs', 'azure']),
  STORAGE_BUCKET_PUBLIC: z.string().min(1),
  STORAGE_BUCKET_PRIVATE: z.string().min(1),
  STORAGE_MEDIA_RETENTION_DAYS: z.coerce.number().int().positive(),
});

const databaseSchema = z.object({
  INTERNAL_DATABASE_URL: z.string().url(),
  INTERNAL_DATABASE_POOL_MIN: z.coerce.number().int().min(1).max(100),
  INTERNAL_DATABASE_POOL_MAX: z.coerce.number().int().min(1).max(500),
  INTERNAL_DATABASE_TIMEOUT_MS: z.coerce.number().int().positive(),
});

const cacheSchema = z.object({
  INTERNAL_REDIS_URL: z.string().url(),
  INTERNAL_REDIS_PREFIX: z.string().min(1),
  INTERNAL_REDIS_TTL_DEFAULT: z.coerce.number().int().positive(),
});

const queueSchema = z.object({
  INTERNAL_QUEUE_PROVIDER: z.enum(['redis', 'sqs', 'nats']),
  INTERNAL_QUEUE_RETRY_LIMIT: z.coerce.number().int().min(0).max(10),
  INTERNAL_QUEUE_TIMEOUT: z.coerce.number().int().positive(),
});

const observabilitySchema = z.object({
  OBS_LOG_LEVEL: z.enum(['trace', 'debug', 'info', 'warn', 'error', 'fatal']),
  OBS_TRACE_ENABLED: z.boolean().or(z.string().transform((val) => val === 'true')),
  OBS_METRICS_ENABLED: z.boolean().or(z.string().transform((val) => val === 'true')),
  OBS_ALERT_WEBHOOK: z.string().url().optional().or(z.literal('')),
});

const messagingSchema = z.object({
  MSG_PROVIDER_WHATSAPP: z.string().min(1),
  MSG_PROVIDER_SMS: z.string().min(1),
  MSG_PROVIDER_EMAIL: z.string().min(1),
  MSG_PROVIDER_PUSH: z.string().min(1),
  MSG_PROVIDER_VOICE: z.string().min(1),
});

const geoSchema = z.object({
  GEO_PROVIDER: z.string().min(1),
  GEO_CACHE_TTL: z.coerce.number().int().positive(),
});

const aiSchema = z.object({
  AI_PROVIDER_PRIMARY: z.string().min(1),
  AI_PROVIDER_SECONDARY: z.string().optional(),
  AI_MODERATION_ENABLED: z.boolean().or(z.string().transform((val) => val === 'true')),
  AI_TRANSLATION_ENABLED: z.boolean().or(z.string().transform((val) => val === 'true')),
  AI_OCR_ENABLED: z.boolean().or(z.string().transform((val) => val === 'true')),
});

const searchSchema = z.object({
  SEARCH_PROVIDER: z.string().min(1),
  SEARCH_INDEX_PREFIX: z.string().min(1),
});

const featureFlagsSchema = z.object({
  FLAG_DEBUG_TOOLS: z.boolean().or(z.string().transform((val) => val === 'true')),
  FLAG_DEMO_MODE: z.boolean().or(z.string().transform((val) => val === 'true')),
  FLAG_LIVE_RAILS: z.boolean().or(z.string().transform((val) => val === 'true')),
  FLAG_ENABLE_AI: z.boolean().or(z.string().transform((val) => val === 'true')),
  FLAG_ENABLE_WHATSAPP: z.boolean().or(z.string().transform((val) => val === 'true')),
  FLAG_ENABLE_VOICE: z.boolean().or(z.string().transform((val) => val === 'true')),
  FLAG_ENABLE_SMS: z.boolean().or(z.string().transform((val) => val === 'true')),
  FLAG_ENABLE_PARTNER_PORTAL: z.boolean().or(z.string().transform((val) => val === 'true')),
});

export const envSchema = applicationSchema
  .merge(securitySchema)
  .merge(authSchema)
  .merge(storageSchema)
  .merge(databaseSchema)
  .merge(cacheSchema)
  .merge(queueSchema)
  .merge(observabilitySchema)
  .merge(messagingSchema)
  .merge(geoSchema)
  .merge(aiSchema)
  .merge(searchSchema)
  .merge(featureFlagsSchema);

export type ValidatedEnv = z.infer<typeof envSchema>;

const MISSING_VARS_ERROR = 'Missing required environment variables';
const VALIDATION_FAILED_ERROR = 'Environment validation failed';

export class EnvValidationError extends Error {
  constructor(
    message: string,
    public readonly missing: string[] = [],
    public readonly invalid: Record<string, string[]> = {}
  ) {
    super(message);
    this.name = 'EnvValidationError';
  }
}

const ALL_SCHEMA_KEYS = [
  ...Object.keys(applicationSchema.shape),
  ...Object.keys(securitySchema.shape),
  ...Object.keys(authSchema.shape),
  ...Object.keys(storageSchema.shape),
  ...Object.keys(databaseSchema.shape),
  ...Object.keys(cacheSchema.shape),
  ...Object.keys(queueSchema.shape),
  ...Object.keys(observabilitySchema.shape),
  ...Object.keys(messagingSchema.shape),
  ...Object.keys(geoSchema.shape),
  ...Object.keys(aiSchema.shape),
  ...Object.keys(searchSchema.shape),
  ...Object.keys(featureFlagsSchema.shape),
];

function loadEnv(): Record<string, string | undefined> {
  const env: Record<string, string | undefined> = {};

  for (const key of ALL_SCHEMA_KEYS) {
    env[key] = process.env[key];
  }

  return env;
}

export function validateEnvironment(): ValidatedEnv {
  const env = loadEnv();
  const missing: string[] = [];

  for (const key of ALL_SCHEMA_KEYS) {
    if (env[key] === undefined || env[key] === '') {
      missing.push(key);
    }
  }

  if (missing.length > 0) {
    throw new EnvValidationError(MISSING_VARS_ERROR, missing);
  }

  const result = envSchema.safeParse(env);

  if (!result.success) {
    const invalid: Record<string, string[]> = {};

    for (const issue of result.error.issues) {
      const path = issue.path.join('.');
      if (!invalid[path]) {
        invalid[path] = [];
      }
      invalid[path].push(issue.message);
    }

    throw new EnvValidationError(VALIDATION_FAILED_ERROR, [], invalid);
  }

  return result.data;
}

export function getEnvironmentContract(env: ValidatedEnv['APP_ENV']): typeof ENVIRONMENT_CONTRACTS[keyof typeof ENVIRONMENT_CONTRACTS] {
  return ENVIRONMENT_CONTRACTS[env];
}

export type RuntimeBoundary = 'browser' | 'server';

export function getRuntimeBoundary(context: RuntimeBoundary): string[] {
  if (context === 'browser') {
    return ['PUBLIC_*'];
  }
  return [
    'PUBLIC_*',
    'INTERNAL_*',
    'SECURE_*',
    'AUTH_*',
    'MSG_*',
    'PAY_*',
    'AI_*',
  ];
}