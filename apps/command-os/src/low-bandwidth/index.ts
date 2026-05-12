/**
 * OK.OS — Command.OS Low Bandwidth Mode
 */

export interface LowBandwidthConfig {
  reducedMotion: boolean;
  compressedMaps: boolean;
  simplifiedCards: boolean;
  deferredImages: boolean;
  lightweightTables: boolean;
  offlineQueueing: boolean;
}

export const defaultLowBandwidthConfig: LowBandwidthConfig = {
  reducedMotion: true,
  compressedMaps: true,
  simplifiedCards: true,
  deferredImages: true,
  lightweightTables: true,
  offlineQueueing: true,
};
