import { describe, it, expect } from '@jest/globals';
import { generateHierarchy, validateHierarchy } from '../generators/hierarchy.js';

describe('Geography Hierarchy Validation', () => {
  it('should generate exactly 36 states', () => {
    const entities = generateHierarchy('test-seed');
    const result = validateHierarchy(entities);
    expect(result.stateCount).toBe(36);
    expect(result.errors).not.toContain(expect.stringMatching(/State count mismatch/));
  });

  it('should generate exactly 6 zones', () => {
    const entities = generateHierarchy('test-seed');
    const result = validateHierarchy(entities);
    expect(result.zoneCount).toBe(6);
    expect(result.errors).not.toContain(expect.stringMatching(/Zone count mismatch/));
  });

  it('should generate exactly 774 LGA-equivalent units', () => {
    const entities = generateHierarchy('test-seed');
    const result = validateHierarchy(entities);
    expect(result.lgaCount).toBe(774);
    expect(result.totalLgaEquivalent).toBe(774);
  });

  it('should generate exactly 6 FCT area councils', () => {
    const entities = generateHierarchy('test-seed');
    const result = validateHierarchy(entities);
    expect(result.fctCouncilCount).toBe(6);
  });

  it('should have all LGAs with parent states', () => {
    const entities = generateHierarchy('test-seed');
    const result = validateHierarchy(entities);
    const lgaErrors = result.errors.filter(e => e.includes('has no parent'));
    expect(lgaErrors.length).toBe(0);
  });

  it('should have no duplicate geoIds', () => {
    const entities = generateHierarchy('test-seed');
    const result = validateHierarchy(entities);
    const dupErrors = result.errors.filter(e => e.includes('Duplicate geoIds'));
    expect(dupErrors.length).toBe(0);
  });

  it('should pass full hierarchy validation', () => {
    const entities = generateHierarchy('test-seed');
    const result = validateHierarchy(entities);
    expect(result.valid).toBe(true);
    expect(result.errors.length).toBe(0);
  });
});

describe('Deterministic Generation', () => {
  it('should produce identical output with same seed', () => {
    const entities1 = generateHierarchy('deterministic-test');
    const entities2 = generateHierarchy('deterministic-test');

    expect(entities1.length).toBe(entities2.length);
    expect(entities1.map(e => e.geoId)).toEqual(entities2.map(e => e.geoId));
    expect(entities1.map(e => e.name)).toEqual(entities2.map(e => e.name));
  });

  it('should produce different output with different seeds', () => {
    const entities1 = generateHierarchy('seed-a');
    const entities2 = generateHierarchy('seed-b');

    const pop1 = entities1.find(e => e.geoId === 'state-lagos')?.populationEstimate;
    const pop2 = entities2.find(e => e.geoId === 'state-lagos')?.populationEstimate;
    expect(pop1).toBe(pop2); // Population is fixed

    const civic1 = entities1.find(e => e.geoId === 'state-lagos')?.civicEngagementIndex;
    const civic2 = entities2.find(e => e.geoId === 'state-lagos')?.civicEngagementIndex;
    expect(civic1).toBe(civic2); // Deterministic
  });
});

describe('Hierarchy Consistency', () => {
  it('should have country as root', () => {
    const entities = generateHierarchy('test');
    const country = entities.find(e => e.type === 'country');
    expect(country).toBeDefined();
    expect(country?.parentId).toBeNull();
  });

  it('should have all states linked to zones', () => {
    const entities = generateHierarchy('test');
    const states = entities.filter(e => e.type === 'state' && e.geoId !== 'territory-fct');
    for (const state of states) {
      expect(state.parentId).toMatch(/^zone-/);
    }
  });

  it('should have FCT directly under country', () => {
    const entities = generateHierarchy('test');
    const fct = entities.find(e => e.geoId === 'territory-fct');
    expect(fct).toBeDefined();
    expect(fct?.parentId).toBe('nga');
  });

  it('should have FCT area councils under FCT', () => {
    const entities = generateHierarchy('test');
    const fctCouncils = entities.filter(e => e.parentId === 'territory-fct');
    expect(fctCouncils.length).toBe(6);
    for (const council of fctCouncils) {
      expect(council.type).toBe('lga');
    }
  });
});
