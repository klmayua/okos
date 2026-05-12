/**
 * OK.OS — Command.OS Maps
 */

export interface MapLayer {
  id: string;
  name: string;
  visible: boolean;
}

export const operationalMapLayers: MapLayer[] = [
  { id: 'initiatives', name: 'Initiatives', visible: true },
  { id: 'incidents', name: 'Incidents', visible: true },
  { id: 'verification', name: 'Verification', visible: true },
  { id: 'volunteers', name: 'Volunteers', visible: true },
  { id: 'donations', name: 'Donations', visible: false },
  { id: 'narratives', name: 'Narratives', visible: false },
  { id: 'turnout', name: 'Turnout', visible: false },
  { id: 'emergencies', name: 'Emergencies', visible: true },
];
