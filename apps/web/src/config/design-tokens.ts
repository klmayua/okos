/**
 * OK.OS — DESIGN TOKENS
 * All UI MUST use tokenized values. Hardcoded hex/spacing/motion forbidden.
 */

export const colors = {
  sovereignGreen: '#0D5C46',
  trustEmerald: '#0F7B5F',
  republicGold: '#C8A44D',
  constitutionalBlack: '#0A0A0B',
  civicWhite: '#FAFAF8',
  signalRed: '#D62839',
  fogWhite: '#F4F5F2',
  glassWhite: 'rgba(255,255,255,0.72)',
  borderSoft: 'rgba(255,255,255,0.18)',
  shadowDark: 'rgba(0,0,0,0.08)',
  shadowGreen: 'rgba(13,92,70,0.18)',
  goldGlow: 'rgba(200,164,77,0.22)',
} as const;

export const spacing = {
  baseUnit: 4,
  section: {
    desktop: { large: 140, medium: 100, small: 72 },
    tablet: { large: 100, medium: 72, small: 48 },
    mobile: { large: 96, medium: 72, small: 48 },
  },
  contentMax: 1440,
  readingMax: 760,
  gridGutter: { desktop: 24, tablet: 20, mobile: 16 },
} as const;

export const typography = {
  hero: { desktop: 88, mobile: 52, lineHeight: 0.95, weight: 800, letterSpacing: '-0.04em' },
  h1: { desktop: 64, mobile: 42 },
  h2: { desktop: 48, mobile: 34 },
  h3: { desktop: 32, mobile: 26 },
  bodyLarge: { size: 20, lineHeight: 1.7 },
  bodyBase: { size: 16, lineHeight: 1.7 },
} as const;

export const motion = {
  durations: { fast: 180, medium: 320, slow: 600 },
  easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
} as const;

export const shadows = {
  glass: '0 8px 32px rgba(0,0,0,0.06), 0 2px 12px rgba(13,92,70,0.08)',
  glassHover:
    '0 12px 40px rgba(0,0,0,0.08), 0 4px 16px rgba(13,92,70,0.12), 0 0 0 1px rgba(200,164,77,0.22)',
  navbar: '0 10px 40px rgba(0,0,0,0.06)',
} as const;
