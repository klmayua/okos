/**
 * OK.OS — ANALYTICS EVENTS
 */

export type AnalyticsEventName =
  | 'initiative_engagement'
  | 'donation_conversion'
  | 'pvc_cta_click'
  | 'volunteer_signup'
  | 'scroll_depth';

export interface EventPayload {
  name: AnalyticsEventName;
  timestamp: number;
  metadata?: Record<string, unknown>;
}
