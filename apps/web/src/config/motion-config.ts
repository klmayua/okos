/**
 * OK.OS — MOTION CONFIGURATION
 */

export const motionConfig = {
  durations: {
    fast: 180,
    medium: 320,
    slow: 600,
  },
  easing: {
    standard: 'cubic-bezier(0.22, 1, 0.36, 1)',
  },
  presets: {
    fadeSoft: { opacity: [0, 1], duration: 320, easing: 'ease-out' },
    blurReveal: { filter: ['blur(8px)', 'blur(0px)'], opacity: [0, 1], duration: 600 },
    glassLift: { transform: ['translateY(8px)', 'translateY(0)'], opacity: [0, 1], duration: 400 },
    staggerFade: { opacity: [0, 1], duration: 300, stagger: 80 },
  },
  blob: {
    durationMin: 18,
    durationMax: 30,
    easing: 'ease-in-out',
  },
} as const;
