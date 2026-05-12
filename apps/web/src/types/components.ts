/**
 * OK.OS — COMPONENT TYPE SYSTEM
 */

export type ComponentLayer = 'base' | 'composed' | 'feature' | 'surface' | 'experimental';

export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface CardType {
  variant: 'glass' | 'metric' | 'initiative' | 'transparency' | 'verification' | 'testimonial';
}

export interface ButtonVariant {
  variant: 'primary' | 'secondary' | 'premium';
}
