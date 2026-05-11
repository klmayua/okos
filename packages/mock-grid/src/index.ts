export interface MockGridConfig {
  seed: string;
  population?: number;
  includeAllGeographicLevels?: boolean;
  mode?: 'development' | 'production' | 'demo';
}

export interface MockGridState {
  initialized: boolean;
  seed: string;
  entityCounts: { geographic: number; personas: number; initiatives: number; narratives: number; incidents: number };
  currentTime: string;
  simulationStatus: string;
}

export interface GenerationResult {
  geography: unknown[];
  personas: unknown[];
  initiatives: unknown[];
  narratives: unknown[];
  rumors: unknown[];
  crises: unknown[];
  scenarios: unknown[];
}

let gridState: MockGridState = {
  initialized: false,
  seed: '',
  entityCounts: { geographic: 0, personas: 0, initiatives: 0, narratives: 0, incidents: 0 },
  currentTime: new Date().toISOString(),
  simulationStatus: 'idle',
};

let cachedEntities: GenerationResult | null = null;

export function initializeGrid(config: MockGridConfig): MockGridState {
  const { seed = 'default', population = 10000 } = config;

  gridState = {
    initialized: true,
    seed,
    entityCounts: { geographic: 0, personas: population, initiatives: 0, narratives: 0, incidents: 0 },
    currentTime: new Date().toISOString(),
    simulationStatus: 'idle',
  };

  cachedEntities = null;
  return gridState;
}

export function generateAll(seed?: string): GenerationResult {
  if (cachedEntities && (!seed || seed === gridState.seed)) {
    return cachedEntities;
  }

  const result: GenerationResult = {
    geography: [],
    personas: [],
    initiatives: [],
    narratives: [],
    rumors: [],
    crises: [],
    scenarios: [],
  };

  gridState.entityCounts.geographic = result.geography.length;
  gridState.entityCounts.personas = result.personas.length;
  gridState.entityCounts.initiatives = result.initiatives.length;
  gridState.entityCounts.narratives = result.narratives.length;
  gridState.entityCounts.incidents = result.crises.length;

  cachedEntities = result;
  return result;
}

export function getGridState(): MockGridState {
  return { ...gridState, currentTime: new Date().toISOString() };
}

export async function runScenario(scenarioId: string): Promise<unknown> {
  return {
    id: `exec-${Date.now()}`,
    scenarioId,
    mode: 'sandbox',
    status: 'running',
    startedAt: new Date().toISOString(),
    progress: 0,
    currentStep: 0,
    totalSteps: 100,
  };
}

export function simulateTimeSteps(steps: number): void {
  const now = new Date(gridState.currentTime);
  now.setMinutes(now.getMinutes() + steps * 60);
  gridState.currentTime = now.toISOString();
}

export function createSnapshot(): { id: string; timestamp: string; state: MockGridState; entities: GenerationResult | null } {
  return {
    id: `snapshot-${Date.now()}`,
    timestamp: new Date().toISOString(),
    state: getGridState(),
    entities: cachedEntities,
  };
}

export function loadSnapshot(_snapshotId: string): boolean {
  return true;
}

export function resetGrid(): void {
  gridState = {
    initialized: false,
    seed: '',
    entityCounts: { geographic: 0, personas: 0, initiatives: 0, narratives: 0, incidents: 0 },
    currentTime: new Date().toISOString(),
    simulationStatus: 'idle',
  };
  cachedEntities = null;
}

export function getPerformanceMetrics(): { generationSpeed: number; memoryUsage: number; entitiesPerMinute: number } {
  return { generationSpeed: 100000, memoryUsage: 0, entitiesPerMinute: 100000 };
}
