export const breakpoints = {
  xs: '0px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

export type BreakpointToken = keyof typeof breakpoints;

export const breakpointConfig = {
  xs: {
    min: breakpoints.xs,
    max: `calc(${breakpoints.sm} - 1px)`,
  },
  sm: {
    min: breakpoints.sm,
    max: `calc(${breakpoints.md} - 1px)`,
  },
  md: {
    min: breakpoints.md,
    max: `calc(${breakpoints.lg} - 1px)`,
  },
  lg: {
    min: breakpoints.lg,
    max: `calc(${breakpoints.xl} - 1px)`,
  },
  xl: {
    min: breakpoints.xl,
    max: `calc(${breakpoints['2xl']} - 1px)`,
  },
  '2xl': {
    min: breakpoints['2xl'],
    max: 'none',
  },
} as const;

export const containerMaxWidths = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
  full: '100%',
} as const;

export const columns = {
  1: '1fr',
  2: 'repeat(2, 1fr)',
  3: 'repeat(3, 1fr)',
  4: 'repeat(4, 1fr)',
  5: 'repeat(5, 1fr)',
  6: 'repeat(6, 1fr)',
  7: 'repeat(7, 1fr)',
  8: 'repeat(8, 1fr)',
  9: 'repeat(9, 1fr)',
  10: 'repeat(10, 1fr)',
  11: 'repeat(11, 1fr)',
  12: 'repeat(12, 1fr)',
} as const;

export const gap = {
  0: '0px',
  1: '0.25rem',
  2: '0.5rem',
  3: '0.75rem',
  4: '1rem',
  5: '1.25rem',
  6: '1.5rem',
  7: '1.75rem',
  8: '2rem',
  9: '2.25rem',
  10: '2.5rem',
  11: '2.75rem',
  12: '3rem',
  14: '3.5rem',
  16: '4rem',
  20: '5rem',
} as const;