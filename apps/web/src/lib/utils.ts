/**
 * OK.OS — SHARED UTILITIES
 */

export function formatNumber(n: number): string {
  return n.toLocaleString('en-NG');
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}
