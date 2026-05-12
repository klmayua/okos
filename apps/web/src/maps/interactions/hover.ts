/**
 * OK.OS — MAP INTERACTIONS
 */

export interface HoverInteraction {
  layerId: string;
  onHover: (featureId: string) => void;
  onLeave: () => void;
}

export function createHoverInteraction(config: HoverInteraction): HoverInteraction {
  return config;
}
