export interface FeatureFlag {
  key: string;
  description: string;
  owner: string;
  rolloutScope: 'global' | 'user' | 'org' | 'region';
  createdAt: string;
  sunsetReviewDate: string;
  defaultValue: boolean;
}

export const FEATURE_FLAG_REGISTRY: Record<string, Omit<FeatureFlag, 'key'>> = {
  FLAG_DEBUG_TOOLS: {
    description: 'Enable debug tools and developer mode features',
    owner: 'platform-team',
    rolloutScope: 'global',
    createdAt: '2026-01-01T00:00:00Z',
    sunsetReviewDate: '2026-12-31T00:00:00Z',
    defaultValue: false,
  },
  FLAG_DEMO_MODE: {
    description: 'Enable demo mode with mock data and sandboxed interactions',
    owner: 'platform-team',
    rolloutScope: 'global',
    createdAt: '2026-01-01T00:00:00Z',
    sunsetReviewDate: '2026-12-31T00:00:00Z',
    defaultValue: false,
  },
  FLAG_LIVE_RAILS: {
    description: 'Enable production-ready features and live integrations',
    owner: 'platform-team',
    rolloutScope: 'global',
    createdAt: '2026-01-01T00:00:00Z',
    sunsetReviewDate: '2026-12-31T00:00:00Z',
    defaultValue: false,
  },
  FLAG_ENABLE_AI: {
    description: 'Enable AI-powered features and automation',
    owner: 'ai-team',
    rolloutScope: 'global',
    createdAt: '2026-01-01T00:00:00Z',
    sunsetReviewDate: '2026-12-31T00:00:00Z',
    defaultValue: false,
  },
  FLAG_ENABLE_WHATSAPP: {
    description: 'Enable WhatsApp messaging integration',
    owner: 'messaging-team',
    rolloutScope: 'global',
    createdAt: '2026-01-01T00:00:00Z',
    sunsetReviewDate: '2026-12-31T00:00:00Z',
    defaultValue: false,
  },
  FLAG_ENABLE_VOICE: {
    description: 'Enable voice communication features',
    owner: 'messaging-team',
    rolloutScope: 'global',
    createdAt: '2026-01-01T00:00:00Z',
    sunsetReviewDate: '2026-12-31T00:00:00Z',
    defaultValue: false,
  },
  FLAG_ENABLE_SMS: {
    description: 'Enable SMS messaging integration',
    owner: 'messaging-team',
    rolloutScope: 'global',
    createdAt: '2026-01-01T00:00:00Z',
    sunsetReviewDate: '2026-12-31T00:00:00Z',
    defaultValue: false,
  },
  FLAG_ENABLE_PARTNER_PORTAL: {
    description: 'Enable partner portal and integration features',
    owner: 'partnership-team',
    rolloutScope: 'global',
    createdAt: '2026-01-01T00:00:00Z',
    sunsetReviewDate: '2026-12-31T00:00:00Z',
    defaultValue: false,
  },
};

export type FeatureFlagKey = keyof typeof FEATURE_FLAG_REGISTRY;

export class FeatureFlagRegistry {
  private overrides: Map<string, boolean> = new Map();

  isEnabled(flag: FeatureFlagKey): boolean {
    if (this.overrides.has(flag)) {
      return this.overrides.get(flag)!;
    }

    const envValue = process.env[flag];
    if (envValue !== undefined) {
      return envValue === 'true';
    }

    const flagDef = FEATURE_FLAG_REGISTRY[flag];
    return flagDef?.defaultValue ?? false;
  }

  getFlag(flag: FeatureFlagKey): FeatureFlag | undefined {
    const def = FEATURE_FLAG_REGISTRY[flag];
    if (!def) return undefined;

    return {
      key: flag,
      ...def,
    };
  }

  listFlags(): FeatureFlag[] {
    return Object.entries(FEATURE_FLAG_REGISTRY).map(([key, def]) => ({
      key,
      ...def,
    }));
  }

  override(flag: FeatureFlagKey, value: boolean): void {
    this.overrides.set(flag, value);
  }

  clearOverrides(): void {
    this.overrides.clear();
  }

  getOverrides(): Record<string, boolean> {
    return Object.fromEntries(this.overrides);
  }
}

const globalRegistry = new FeatureFlagRegistry();

export function getFeatureFlags(): FeatureFlagRegistry {
  return globalRegistry;
}

export function isFeatureEnabled(flag: FeatureFlagKey): boolean {
  return globalRegistry.isEnabled(flag);
}