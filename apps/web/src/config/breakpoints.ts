/**
 * OK.OS — BREAKPOINT SYSTEM
 */

export const breakpoints = {
  mobile: { max: 767 },
  tablet: { min: 768, max: 1023 },
  desktop: { min: 1024, max: 1439 },
  wide: { min: 1440 },
} as const;

export type BreakpointKey = keyof typeof breakpoints;
