export const VARIABLE_REGISTRY = {
  application: [
    'APP_NAME',
    'APP_ENV',
    'APP_REGION',
    'APP_TIMEZONE',
    'APP_LOCALE',
    'APP_BUILD_ID',
    'APP_VERSION',
  ],
  security: [
    'SECURE_ENCRYPTION_KEY',
    'SECURE_SIGNING_KEY',
    'SECURE_ROTATION_KEY',
    'SECURE_DEVICE_SALT',
    'SECURE_AUDIT_SIGNATURE_KEY',
  ],
  auth: [
    'AUTH_SESSION_SECRET',
    'AUTH_TOKEN_SECRET',
    'AUTH_REFRESH_SECRET',
    'AUTH_COOKIE_DOMAIN',
    'AUTH_COOKIE_SECURE',
  ],
  storage: [
    'STORAGE_PROVIDER',
    'STORAGE_BUCKET_PUBLIC',
    'STORAGE_BUCKET_PRIVATE',
    'STORAGE_MEDIA_RETENTION_DAYS',
  ],
  database: [
    'INTERNAL_DATABASE_URL',
    'INTERNAL_DATABASE_POOL_MIN',
    'INTERNAL_DATABASE_POOL_MAX',
    'INTERNAL_DATABASE_TIMEOUT_MS',
  ],
  cache: [
    'INTERNAL_REDIS_URL',
    'INTERNAL_REDIS_PREFIX',
    'INTERNAL_REDIS_TTL_DEFAULT',
  ],
  queue: [
    'INTERNAL_QUEUE_PROVIDER',
    'INTERNAL_QUEUE_RETRY_LIMIT',
    'INTERNAL_QUEUE_TIMEOUT',
  ],
  observability: [
    'OBS_LOG_LEVEL',
    'OBS_TRACE_ENABLED',
    'OBS_METRICS_ENABLED',
    'OBS_ALERT_WEBHOOK',
  ],
  messaging: [
    'MSG_PROVIDER_WHATSAPP',
    'MSG_PROVIDER_SMS',
    'MSG_PROVIDER_EMAIL',
    'MSG_PROVIDER_PUSH',
    'MSG_PROVIDER_VOICE',
  ],
  geo: ['GEO_PROVIDER', 'GEO_CACHE_TTL'],
  ai: [
    'AI_PROVIDER_PRIMARY',
    'AI_PROVIDER_SECONDARY',
    'AI_MODERATION_ENABLED',
    'AI_TRANSLATION_ENABLED',
    'AI_OCR_ENABLED',
  ],
  search: ['SEARCH_PROVIDER', 'SEARCH_INDEX_PREFIX'],
  featureFlags: [
    'FLAG_DEBUG_TOOLS',
    'FLAG_DEMO_MODE',
    'FLAG_LIVE_RAILS',
    'FLAG_ENABLE_AI',
    'FLAG_ENABLE_WHATSAPP',
    'FLAG_ENABLE_VOICE',
    'FLAG_ENABLE_SMS',
    'FLAG_ENABLE_PARTNER_PORTAL',
  ],
} as const;

export type VariableCategory = keyof typeof VARIABLE_REGISTRY;
export type ApplicationVariable = (typeof VARIABLE_REGISTRY.application)[number];
export type SecurityVariable = (typeof VARIABLE_REGISTRY.security)[number];
export type AuthVariable = (typeof VARIABLE_REGISTRY.auth)[number];
export type StorageVariable = (typeof VARIABLE_REGISTRY.storage)[number];
export type DatabaseVariable = (typeof VARIABLE_REGISTRY.database)[number];
export type CacheVariable = (typeof VARIABLE_REGISTRY.cache)[number];
export type QueueVariable = (typeof VARIABLE_REGISTRY.queue)[number];
export type ObservabilityVariable = (typeof VARIABLE_REGISTRY.observability)[number];
export type MessagingVariable = (typeof VARIABLE_REGISTRY.messaging)[number];
export type GeoVariable = (typeof VARIABLE_REGISTRY.geo)[number];
export type AiVariable = (typeof VARIABLE_REGISTRY.ai)[number];
export type SearchVariable = (typeof VARIABLE_REGISTRY.search)[number];
export type FeatureFlagVariable = (typeof VARIABLE_REGISTRY.featureFlags)[number];

export type AllVariables = 
  | ApplicationVariable
  | SecurityVariable
  | AuthVariable
  | StorageVariable
  | DatabaseVariable
  | CacheVariable
  | QueueVariable
  | ObservabilityVariable
  | MessagingVariable
  | GeoVariable
  | AiVariable
  | SearchVariable
  | FeatureFlagVariable;

export const RUNTIME_BOUNDARIES = {
  browser: {
    mayAccess: ['PUBLIC_*'],
    mayNotAccess: ['INTERNAL_*', 'SECURE_*', 'AUTH_*'],
  },
  server: {
    mayAccess: [
      'PUBLIC_*',
      'INTERNAL_*',
      'SECURE_*',
      'AUTH_*',
      'MSG_*',
      'PAY_*',
      'AI_*',
    ],
  },
} as const;

export const ENVIRONMENT_CONTRACTS = {
  local: {
    mockGrid: 'enabled',
    externalAdapters: 'mocked',
    auditMode: 'verbose',
    loggingLevel: 'debug',
    seedRequired: true,
  },
  development: {
    mockGrid: 'enabled',
    externalAdapters: 'mixed',
    auditMode: 'full',
    loggingLevel: 'debug',
    seedRequired: true,
  },
  staging: {
    mockGrid: 'optional',
    externalAdapters: 'provider_simulated',
    auditMode: 'full',
    loggingLevel: 'info',
    seedRequired: 'controlled',
  },
  production: {
    mockGrid: 'disabled_by_default',
    externalAdapters: 'live_or_approved_simulated',
    auditMode: 'strict',
    loggingLevel: 'warn',
    seedRequired: 'prohibited_unless_explicit',
  },
} as const;

export type EnvironmentType = keyof typeof ENVIRONMENT_CONTRACTS;