/**
 * OK.OS — Admin.Core Panels
 */

export interface PanelConfig {
  id: string;
  title: string;
  type: 'metric' | 'chart' | 'list';
}
