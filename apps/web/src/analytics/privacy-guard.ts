/**
 * OK.OS — PRIVACY GUARD
 * Prevents surveillance patterns. Privacy-first tracking only.
 */

export function isTrackingAllowed(): boolean {
  if (typeof window === 'undefined') return false;
  const consent = localStorage.getItem('okos_tracking_consent');
  return consent === 'true';
}

export function guardTracking<T>(fn: () => T): T | undefined {
  if (isTrackingAllowed()) {
    return fn();
  }
  return undefined;
}
