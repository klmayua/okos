/**
 * OK.OS — Command.OS Panels
 */

export interface PanelConfig {
  id: string;
  title: string;
  type: 'metric' | 'chart' | 'list' | 'map';
}
