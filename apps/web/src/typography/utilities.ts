/**
 * OK.OS — TYPOGRAPHY UTILITIES
 */

import { fontScale } from './scale';

export function getFontSize(key: keyof typeof fontScale): string {
  return `${fontScale[key].size}px`;
}

export function getLineHeight(key: keyof typeof fontScale): string {
  return String(fontScale[key].lineHeight);
}

export function getFontWeight(key: keyof typeof fontScale): number {
  return fontScale[key].weight;
}
