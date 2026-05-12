/**
 * OK.OS — TYPOGRAPHY SCALE
 */

export const fontScale = {
  hero: { size: 88, mobileSize: 52, lineHeight: 0.95, weight: 800, letterSpacing: '-0.04em' },
  h1: { size: 64, mobileSize: 42, lineHeight: 0.95, weight: 700, letterSpacing: '-0.02em' },
  h2: { size: 48, mobileSize: 34, lineHeight: 1.1, weight: 700, letterSpacing: '-0.02em' },
  h3: { size: 32, mobileSize: 26, lineHeight: 1.2, weight: 600, letterSpacing: '-0.01em' },
  bodyLarge: { size: 20, lineHeight: 1.7, weight: 400 },
  bodyBase: { size: 16, lineHeight: 1.7, weight: 400 },
  caption: { size: 13, lineHeight: 1.5, weight: 500, letterSpacing: '0.02em' },
} as const;
