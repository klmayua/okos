/**
 * OK.OS — HEATMAP SYSTEM
 */

export interface HeatmapDataPoint {
  lat: number;
  lng: number;
  intensity: number;
}

export function generateHeatmapData(points: HeatmapDataPoint[]): HeatmapDataPoint[] {
  return points;
}
