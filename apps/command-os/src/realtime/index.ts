/**
 * OK.OS — Command.OS Realtime
 */

export interface RealtimeConfig {
  throttleMs: number;
  batchSize: number;
}

export const defaultRealtimeConfig: RealtimeConfig = {
  throttleMs: 500,
  batchSize: 50,
};
