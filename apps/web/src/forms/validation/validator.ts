/**
 * OK.OS — FORM VALIDATION
 */

export interface ValidationRule<T> {
  test: (value: T) => boolean;
  message: string;
}

export function validate<T>(value: T, rules: ValidationRule<T>[]): string[] {
  return rules.filter((rule) => !rule.test(value)).map((rule) => rule.message);
}
