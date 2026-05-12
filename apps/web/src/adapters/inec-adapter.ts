/**
 * OK.OS — INEC ADAPTER
 * Bridges frontend to INEC data sources.
 */

export interface INECRegistrationData {
  totalRegistered: number;
  statesCovered: number;
  lgasCovered: number;
  deadline: string;
}

export async function fetchINECRegistrationData(): Promise<INECRegistrationData> {
  return {
    totalRegistered: 2847391,
    statesCovered: 36,
    lgasCovered: 774,
    deadline: '2026-06-30',
  };
}
