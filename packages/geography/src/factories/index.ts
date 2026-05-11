import { generateHierarchy, getEntitiesByType, getEntityById } from '../generators/hierarchy.js';
import type { GeographicEntity, GeographyOptions } from '../types.js';

const cachedEntities: Map<string, GeographicEntity[]> = new Map();

export function createGeography(options: GeographyOptions = {}): GeographicEntity[] {
  const seed = options.seed || 'default';
  const cacheKey = `${seed}-${JSON.stringify(options)}`;

  if (cachedEntities.has(cacheKey)) {
    return cachedEntities.get(cacheKey)!;
  }

  const entities = generateHierarchy(seed);
  cachedEntities.set(cacheKey, entities);
  return entities;
}

export function getStates(entities: GeographicEntity[]): GeographicEntity[] {
  return getEntitiesByType(entities, 'state');
}

export function getLgas(entities: GeographicEntity[]): GeographicEntity[] {
  return getEntitiesByType(entities, 'lga');
}

export function getWards(entities: GeographicEntity[]): GeographicEntity[] {
  return getEntitiesByType(entities, 'ward');
}

export function getPollingUnits(entities: GeographicEntity[]): GeographicEntity[] {
  return getEntitiesByType(entities, 'polling_unit');
}

export function getZones(entities: GeographicEntity[]): GeographicEntity[] {
  return getEntitiesByType(entities, 'zone');
}

export function getCountry(entities: GeographicEntity[]): GeographicEntity | undefined {
  return entities.find(e => e.type === 'country');
}

export function findById(entities: GeographicEntity[], geoId: string): GeographicEntity | undefined {
  return getEntityById(entities, geoId);
}

export function resetCache(): void {
  cachedEntities.clear();
}
