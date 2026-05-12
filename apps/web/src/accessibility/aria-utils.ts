/**
 * OK.OS — ARIA UTILITIES
 */

export function generateAriaId(prefix: string): string {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}`;
}

export function describeElement(describedBy: string, description: string): Record<string, string> {
  return { 'aria-describedby': describedBy, title: description };
}
