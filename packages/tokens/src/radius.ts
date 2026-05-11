export const radius = {
  none: '0px',
  xs: '0.125rem',
  sm: '0.25rem',
  DEFAULT: '0.375rem',
  md: '0.375rem',
  lg: '0.5rem',
  xl: '0.75rem',
  '2xl': '1rem',
  '3xl': '1.5rem',
  full: '9999px',
} as const;

export type RadiusToken = keyof typeof radius;

export const shape = {
  none: {
    borderRadius: radius.none,
  },
  sm: {
    borderRadius: radius.sm,
  },
  default: {
    borderRadius: radius.md,
  },
  md: {
    borderRadius: radius.lg,
  },
  lg: {
    borderRadius: radius.xl,
  },
  xl: {
    borderRadius: radius['2xl'],
  },
  full: {
    borderRadius: radius.full,
  },
  circle: {
    borderRadius: '50%',
  },
  pill: {
    borderRadius: radius.full,
  },
} as const;

export type ShapeVariant = keyof typeof shape;