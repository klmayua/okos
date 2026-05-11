export interface SimulationConfig {
  seed: string;
  initialTime?: string;
  speed?: number;
  mode?: 'replay' | 'sandbox' | 'stress_test' | 'investor_demo' | 'training_mode';
}

export interface SimulationState {
  status: 'idle' | 'running' | 'paused' | 'completed' | 'error';
  currentStep: number;
  totalSteps: number;
  startTime: string;
  elapsedMs: number;
}

export interface SimulationEvent {
  type: string;
  timestamp: string;
  data: Record<string, unknown>;
}

export interface SimulationStepHandler {
  (state: SimulationState, events: SimulationEvent[]): void;
}

let simulationState: SimulationState = {
  status: 'idle',
  currentStep: 0,
  totalSteps: 0,
  startTime: '',
  elapsedMs: 0,
};

const eventHandlers: Map<string, SimulationStepHandler[]> = new Map();
let simulationEvents: SimulationEvent[] = [];
let currentTime = new Date().toISOString();

export function initSimulation(config: SimulationConfig): void {
  currentTime = config.initialTime || new Date().toISOString();

  simulationState = {
    status: 'idle',
    currentStep: 0,
    totalSteps: 0,
    startTime: currentTime,
    elapsedMs: 0,
  };

  simulationEvents = [];
}

export function startSimulation(totalSteps: number): void {
  simulationState.status = 'running';
  simulationState.totalSteps = totalSteps;
  simulationState.startTime = currentTime;
}

export function runStep(stepHandler?: SimulationStepHandler): void {
  if (simulationState.status !== 'running') return;

  const beforeTime = Date.now();
  const now = new Date(currentTime);
  now.setMinutes(now.getMinutes() + 1);
  currentTime = now.toISOString();
  simulationState.currentStep++;

  const events = simulationEvents.filter(e => e.timestamp === currentTime);
  if (stepHandler) {
    stepHandler(simulationState, events);
  }

  simulationState.elapsedMs += Date.now() - beforeTime;
  emitEvent('simulation.step', { step: simulationState.currentStep });
}

export function pauseSimulation(): void {
  simulationState.status = 'paused';
}

export function resumeSimulation(): void {
  simulationState.status = 'running';
}

export function stopSimulation(): void {
  simulationState.status = 'completed';
}

export function getSimulationState(): SimulationState {
  return { ...simulationState };
}

export function emitEvent(type: string, data: Record<string, unknown> = {}): void {
  const event: SimulationEvent = {
    type,
    timestamp: currentTime,
    data,
  };
  simulationEvents.push(event);

  const handlers = eventHandlers.get(type);
  if (handlers) {
    handlers.forEach(handler => handler(simulationState, [event]));
  }
}

export function onEvent(type: string, handler: SimulationStepHandler): void {
  if (!eventHandlers.has(type)) {
    eventHandlers.set(type, []);
  }
  eventHandlers.get(type)!.push(handler);
}

export function clearEventHandlers(): void {
  eventHandlers.clear();
}

export function resetSimulation(): void {
  simulationState = {
    status: 'idle',
    currentStep: 0,
    totalSteps: 0,
    startTime: '',
    elapsedMs: 0,
  };
  simulationEvents = [];
}