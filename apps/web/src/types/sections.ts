/**
 * OK.OS — SECTION TYPE SYSTEM
 */

export type SectionType =
  | 'foundational'
  | 'operational'
  | 'storytelling'
  | 'conversion';

export type FoundationalSection = 'hero' | 'trust' | 'metrics' | 'explainer';
export type OperationalSection = 'initiatives' | 'verification' | 'transparency' | 'scorecards';
export type StorytellingSection = 'narratives' | 'documentaries' | 'testimonials' | 'reports';
export type ConversionSection = 'donation' | 'volunteer' | 'registration' | 'participation';

export interface SectionContract {
  title: string;
  spacing: 'large' | 'medium' | 'small';
  animation: string;
  responsive: boolean;
  accessibility: boolean;
}
