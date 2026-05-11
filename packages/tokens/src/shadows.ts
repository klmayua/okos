export const shadows = {
  none: 'none',
  xs: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  sm: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  DEFAULT: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  md: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  lg: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  xl: '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
  innerSm: 'inset 0 1px 2px 0 rgb(0 0 0 / 0.05)',
  innerLg: 'inset 0 7px 9px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  outline: '0 0 0 3px rgb(14 165 233 / 0.45)',
  outlineFocus: '0 0 0 4px rgb(14 165 233 / 0.6)',
  colored: {
    primary: '0 4px 14px 0 rgb(14 165 233 / 0.4)',
    success: '0 4px 14px 0 rgb(34 197 94 / 0.4)',
    warning: '0 4px 14px 0 rgb(245 158 11 / 0.4)',
    error: '0 4px 14px 0 rgb(239 68 68 / 0.4)',
  },
  elevated: {
    sm: '0 2px 8px -2px rgb(0 0 0 / 0.15), 0 4px 8px -4px rgb(0 0 0 / 0.1)',
    md: '0 4px 16px -4px rgb(0 0 0 / 0.15), 0 8px 24px -8px rgb(0 0 0 / 0.1)',
    lg: '0 8px 30px -6px rgb(0 0 0 / 0.15), 0 20px 40px -12px rgb(0 0 0 / 0.1)',
  },
  modal: '0 25px 50px -12px rgb(0 0 0 / 0.5)',
} as const;

export type ShadowToken = keyof typeof shadows;