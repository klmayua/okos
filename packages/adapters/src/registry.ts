export type AdapterType =
  | 'messaging'
  | 'maps'
  | 'storage'
  | 'ai'
  | 'identity'
  | 'payments'
  | 'search'
  | 'analytics'
  | 'media';

export interface Adapter<T = unknown> {
  type: AdapterType;
  name: string;
  version: string;
  initialize: (config: Record<string, unknown>) => Promise<void>;
  execute: (operation: string, params: Record<string, unknown>) => Promise<T>;
  healthCheck: () => Promise<boolean>;
}

export interface AdapterRegistration<T = unknown> {
  type: AdapterType;
  adapter: Adapter<T>;
  priority: number;
  fallback?: AdapterType;
}

export const MANDATORY_ADAPTERS: AdapterType[] = [
  'messaging',
  'maps',
  'storage',
  'ai',
  'identity',
  'payments',
  'search',
  'analytics',
  'media',
];

export class AdapterRegistry {
  private adapters = new Map<AdapterType, AdapterRegistration[]>();
  private activeAdapters = new Map<AdapterType, Adapter>();

  register<T>(registration: AdapterRegistration<T>): void {
    const existing = this.adapters.get(registration.type) ?? [];
    existing.push(registration as AdapterRegistration);
    existing.sort((a, b) => b.priority - a.priority);
    this.adapters.set(registration.type, existing);
  }

  async initialize(type: AdapterType): Promise<void> {
    const registrations = this.adapters.get(type);
    if (!registrations || registrations.length === 0) {
      throw new Error(`No adapter registered for type: ${type}`);
    }

    const registration = registrations[0];
    if (!registration) {
      throw new Error(`Adapter registration invalid for type: ${type}`);
    }
    await registration.adapter.initialize({});

    if (registration.fallback) {
      const fallbackRegistrations = this.adapters.get(registration.fallback);
      const fallbackReg = fallbackRegistrations?.[0];
      if (fallbackReg) {
        await fallbackReg.adapter.initialize({});
        this.activeAdapters.set(registration.fallback, fallbackReg.adapter);
      }
    }

    this.activeAdapters.set(type, registration.adapter);
  }

  async execute<T>(type: AdapterType, operation: string, params: Record<string, unknown>): Promise<T> {
    const adapter = this.activeAdapters.get(type);
    if (!adapter) {
      throw new Error(`Adapter not initialized for type: ${type}`);
    }

    return adapter.execute(operation, params) as Promise<T>;
  }

  async healthCheck(type: AdapterType): Promise<boolean> {
    const adapter = this.activeAdapters.get(type);
    if (!adapter) {
      return false;
    }

    try {
      return await adapter.healthCheck();
    } catch {
      return false;
    }
  }

  getAdapter(type: AdapterType): Adapter | undefined {
    return this.activeAdapters.get(type);
  }

  getRegisteredAdapters(type?: AdapterType): AdapterType[] {
    if (type) {
      return this.adapters.has(type) ? [type] : [];
    }
    return [...this.adapters.keys()];
  }

  getActiveAdapters(): AdapterType[] {
    return [...this.activeAdapters.keys()];
  }

  isAdapterReady(type: AdapterType): boolean {
    return this.activeAdapters.has(type);
  }
}

const globalAdapterRegistry = new AdapterRegistry();

export function getAdapterRegistry(): AdapterRegistry {
  return globalAdapterRegistry;
}

export function registerAdapter<T>(registration: AdapterRegistration<T>): void {
  getAdapterRegistry().register(registration);
}

export async function initializeAdapters(types: AdapterType[]): Promise<void> {
  for (const type of types) {
    await getAdapterRegistry().initialize(type);
  }
}