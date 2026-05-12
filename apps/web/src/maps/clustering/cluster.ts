/**
 * OK.OS — MAP CLUSTERING
 */

export interface ClusterPoint {
  id: string;
  lat: number;
  lng: number;
}

export interface Cluster {
  id: string;
  lat: number;
  lng: number;
  count: number;
  points: ClusterPoint[];
}

export function clusterPoints(points: ClusterPoint[], _radius: number): Cluster[] {
  return points.map((p) => ({
    id: p.id,
    lat: p.lat,
    lng: p.lng,
    count: 1,
    points: [p],
  }));
}
