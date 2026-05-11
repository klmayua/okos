export const motion = {
  duration: {
    instant: '0ms',
    fastest: '75ms',
    faster: '100ms',
    fast: '150ms',
    normal: '200ms',
    slow: '300ms',
    slower: '500ms',
    slowest: '700ms',
    minute: '1000ms',
  },
  easing: {
    linear: 'linear',
    ease: 'ease',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    easeInBack: 'cubic-bezier(0.36, 0, 0.66, -0.56)',
    easeOutBack: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    easeInOutBack: 'cubic-bezier(0.68, -0.6, 0.32, 1.6)',
    spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    springFast: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    springGentle: 'cubic-bezier(0.25, 1, 0.5, 1)',
  },
} as const;

export type DurationToken = keyof typeof motion.duration;
export type EasingToken = keyof typeof motion.easing;

export const transitions = {
  instant: `all ${motion.duration.instant} ${motion.easing.linear}`,
  fast: `all ${motion.duration.faster} ${motion.easing.easeOut}`,
  normal: `all ${motion.duration.normal} ${motion.easing.easeInOut}`,
  slow: `all ${motion.duration.slow} ${motion.easing.easeInOut}`,
  entrance: `all ${motion.duration.slow} ${motion.easing.easeOut}`,
  exit: `all ${motion.duration.fast} ${motion.easing.easeIn}`,
  expand: `all ${motion.duration.slow} ${motion.easing.easeOutBack}`,
  collapse: `all ${motion.duration.slower} ${motion.easing.easeInBack}`,
} as const;

export type TransitionToken = keyof typeof transitions;

export const keyframes = {
  fadeIn: {
    from: { opacity: '0' },
    to: { opacity: '1' },
  },
  fadeOut: {
    from: { opacity: '1' },
    to: { opacity: '0' },
  },
  slideInUp: {
    from: { transform: 'translateY(10px)', opacity: '0' },
    to: { transform: 'translateY(0)', opacity: '1' },
  },
  slideInDown: {
    from: { transform: 'translateY(-10px)', opacity: '0' },
    to: { transform: 'translateY(0)', opacity: '1' },
  },
  slideInLeft: {
    from: { transform: 'translateX(10px)', opacity: '0' },
    to: { transform: 'translateX(0)', opacity: '1' },
  },
  slideInRight: {
    from: { transform: 'translateX(-10px)', opacity: '0' },
    to: { transform: 'translateX(0)', opacity: '1' },
  },
  scaleIn: {
    from: { transform: 'scale(0.95)', opacity: '0' },
    to: { transform: 'scale(1)', opacity: '1' },
  },
  pulse: {
    '0%, 100%': { opacity: '1' },
    '50%': { opacity: '0.5' },
  },
  shimmer: {
    from: { transform: 'translateX(-100%)' },
    to: { transform: 'translateX(100%)' },
  },
} as const;