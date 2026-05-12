/**
 * OK.OS — MOTION REVEALS
 */

export const reveals = {
  fromBottom: { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } },
  fromTop: { initial: { opacity: 0, y: -20 }, animate: { opacity: 1, y: 0 } },
  fromLeft: { initial: { opacity: 0, x: -20 }, animate: { opacity: 1, x: 0 } },
  fromRight: { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 } },
  scaleIn: { initial: { opacity: 0, scale: 0.95 }, animate: { opacity: 1, scale: 1 } },
} as const;
