/**
 * OK.OS — SCENARIO ENGINE
 * Central orchestrator for scenario-driven synthetic mutation.
 */

import type { ScenarioId, ScenarioState } from '../types';
import { scenarioPresets } from '../presets';
import { mutationEngine } from '../mutations/mutation-engine';

class ScenarioEngine {
  private state: ScenarioState = {
    currentScenario: 'quiet_day',
    previousScenario: null,
    startedAt: Date.now(),
    active: false,
  };

  private listeners = new Set<(state: ScenarioState) => void>();

  activate(scenarioId: ScenarioId): void {
    const preset = scenarioPresets[scenarioId];
    if (!preset) return;

    this.state = {
      currentScenario: scenarioId,
      previousScenario: this.state.currentScenario,
      startedAt: Date.now(),
      active: true,
    };

    mutationEngine.apply(preset);
    this.notify();
    this.persist();
  }

  deactivate(): void {
    this.state = { ...this.state, active: false };
    mutationEngine.clear();
    this.notify();
    this.persist();
  }

  getState(): ScenarioState {
    return { ...this.state };
  }

  subscribe(listener: (state: ScenarioState) => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify(): void {
    this.listeners.forEach((l) => l(this.state));
  }

  private persist(): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('okos-scenario', JSON.stringify(this.state));
    }
  }

  restore(): void {
    if (typeof window === 'undefined') return;
    const raw = localStorage.getItem('okos-scenario');
    if (!raw) return;
    try {
      const parsed = JSON.parse(raw) as ScenarioState;
      this.state = parsed;
      if (parsed.active) {
        const preset = scenarioPresets[parsed.currentScenario];
        if (preset) mutationEngine.apply(preset);
      }
      this.notify();
    } catch {
      // ignore corrupted state
    }
  }
}

export const scenarioEngine = new ScenarioEngine();
