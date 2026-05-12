/**
 * OK.OS — SECTION REGISTRY
 * Every page MUST register its sections for orchestration.
 */

import type { SectionContract, SectionType } from '@/types/sections';

export interface RegisteredSection extends SectionContract {
  id: string;
  type: SectionType;
  component: string;
}

const registry = new Map<string, RegisteredSection>();

export function registerSection(section: RegisteredSection): void {
  registry.set(section.id, section);
}

export function getSection(id: string): RegisteredSection | undefined {
  return registry.get(id);
}

export function getSectionsByType(type: SectionType): RegisteredSection[] {
  return Array.from(registry.values()).filter((s) => s.type === type);
}

export function getAllSections(): RegisteredSection[] {
  return Array.from(registry.values());
}
