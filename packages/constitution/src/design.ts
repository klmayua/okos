export const DESIGN_LAW = {
  version: '1.0.0',
  status: 'mandatory',
  ui: {
    standard: 'premium_only',
    forbids: [
      'toy_ui',
      'generic_dashboard',
      'cramped_spacing',
      'weak_typography',
      'stock_feel',
      'amateur_motion',
      'inconsistent_states',
      'cheap_gradients',
      'low_trust_visual_language',
    ],
    requirements: {
      typography: {
        scale: 'comprehensive',
        weights: ['light', 'normal', 'medium', 'semibold', 'bold'],
        lineHeights: ['tight', 'snug', 'normal', 'relaxed'],
        tracking: 'precise',
      },
      spacing: {
        scale: '8px base unit',
        density: 'comfortable',
        consistency: 'systematic',
      },
      color: {
        system: 'semantic',
        accessibility: 'WCAG 2.1 AA minimum',
        contrast: '4.5:1 for text, 3:1 for UI',
      },
      motion: {
        duration: 'purposeful',
        easing: 'natural',
        purpose: 'clarity not decoration',
      },
      layout: {
        grid: '12-column',
        container: 'max-width based on breakpoints',
        responsive: 'mobile-first',
      },
    },
  },
  code: {
    standard: 'production_only',
    forbids: [
      'hacks',
      'quick_fixes',
      'todo_leftovers',
      'dead_code',
      'duplicated_logic',
      'magic_numbers',
      'weak_typing',
      'inline_business_logic',
      'hidden_side_effects',
    ],
  },
  architecture: {
    standard: 'modular_clean',
    requires: [
      'separation_of_concerns',
      'adapter_pattern',
      'event_driven_contracts',
      'auditability',
      'observability',
      'testability',
      'provider_abstraction',
      'schema_discipline',
    ],
  },
  qualityGates: {
    visual: [
      'no orphan UI elements',
      'consistent spacing rhythm',
      'aligned typography scale',
      'purposeful use of elevation',
      'clear visual hierarchy',
      'intuitive state indicators',
      'meaningful empty states',
      'helpful error messages',
      'loading state presence',
    ],
    interaction: [
      'predictable feedback',
      'clear action labels',
      'proper cursor states',
      'keyboard navigable',
      'focus visible',
      'touch targets >= 44px',
    ],
    performance: [
      'first contentful paint < 1.5s',
      'largest contentful paint < 2.5s',
      'cumulative layout shift < 0.1',
      'first input delay < 100ms',
    ],
  },
} as const;

export type UIStandard = 'premium_only';
export type CodeStandard = 'production_only';
export type ArchitectureStandard = 'modular_clean';