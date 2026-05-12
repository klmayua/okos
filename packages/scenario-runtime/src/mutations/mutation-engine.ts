/**
 * OK.OS — SCENARIO MUTATION ENGINE
 * Applies scenario mutations to operational stores.
 */

import type { ScenarioConfig, ScenarioMutation } from '../types';

export class MutationEngine {
  private activeMutations: ScenarioMutation[] = [];

  apply(scenario: ScenarioConfig): void {
    this.activeMutations = scenario.mutations;
    this.activeMutations.forEach((m) => {
      if (typeof window !== 'undefined') {
        window.dispatchEvent(
          new CustomEvent('okos-scenario-mutation', {
            detail: { scenario: scenario.id, mutation: m },
          })
        );
      }
    });
  }

  clear(): void {
    this.activeMutations = [];
  }

  getActive(): readonly ScenarioMutation[] {
    return this.activeMutations;
  }
}

export const mutationEngine = new MutationEngine();
