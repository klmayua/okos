import { generatePersonas, filterPersonas } from '../generators/personas.js';
import type { Persona, PersonaCategory, PersonaOptions } from '../types.js';

const cachedPersonas: Map<string, Persona[]> = new Map();

export function createPersonas(options: PersonaOptions = {}): Persona[] {
  const { seed = 'default', count = 1000, ...rest } = options;
  const cacheKey = `${seed}-${count}-${JSON.stringify(rest)}`;

  if (cachedPersonas.has(cacheKey)) {
    return cachedPersonas.get(cacheKey)!;
  }

  const personas = generatePersonas(options);
  cachedPersonas.set(cacheKey, personas);
  return personas;
}

export function filterByState(personas: Persona[], state: string): Persona[] {
  return filterPersonas(personas, { state });
}

export function filterByCategory(personas: Persona[], category: string): Persona[] {
  return filterPersonas(personas, { category: category as PersonaCategory });
}

export function getVoters(personas: Persona[], minScore: number = 0.3): Persona[] {
  return filterPersonas(personas, { minCivicScore: minScore });
}

export function getVolunteers(personas: Persona[], minProb: number = 0.5): Persona[] {
  return personas.filter(p => p.volunteerProbability >= minProb);
}

export function getDonors(personas: Persona[], minProb: number = 0.2): Persona[] {
  return personas.filter(p => p.donationProbability >= minProb);
}

export function getActiveCivic(personas: Persona[], minScore: number = 0.6): Persona[] {
  return filterPersonas(personas, { minCivicScore: minScore });
}

export function resetCache(): void {
  cachedPersonas.clear();
}
