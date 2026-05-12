/**
 * OK.OS — MOTION PRESETS
 */

export const presets = {
  fadeSoft: { opacity: [0, 1], duration: 320, easing: 'ease-out' },
  blurReveal: { filter: ['blur(8px)', 'blur(0px)'], opacity: [0, 1], duration: 600 },
  glassLift: { transform: ['translateY(8px)', 'translateY(0)'], opacity: [0, 1], duration: 400 },
  scrollParallaxSubtle: { transform: ['translateY(20px)', 'translateY(0)'], opacity: [0, 1], duration: 600 },
  staggerFade: { opacity: [0, 1], duration: 300, stagger: 80 },
  cinematicReveal: { opacity: [0, 1], scale: [0.98, 1], duration: 800, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' },
} as const;
