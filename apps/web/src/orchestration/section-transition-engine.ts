/**
 * OK.OS — SECTION TRANSITION ENGINE
 */

export type TransitionName = 'fade' | 'slide-up' | 'blur-reveal' | 'none';

export interface SectionTransition {
  from: string;
  to: string;
  transition: TransitionName;
  duration: number;
}

const transitions: SectionTransition[] = [];

export function addTransition(transition: SectionTransition): void {
  transitions.push(transition);
}

export function getTransitions(): readonly SectionTransition[] {
  return transitions;
}
