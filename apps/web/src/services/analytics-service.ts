/**
 * OK.OS — ANALYTICS SERVICE
 * Privacy-first tracking. No surveillance patterns.
 */

export interface AnalyticsEvent {
  name: string;
  category: string;
  label?: string;
  value?: number;
}

class AnalyticsService {
  private events: AnalyticsEvent[] = [];

  track(event: AnalyticsEvent): void {
    this.events.push(event);
    if (typeof window !== 'undefined' && window.console) {
      window.console.log('[Analytics]', event);
    }
  }

  getEvents(): readonly AnalyticsEvent[] {
    return this.events;
  }
}

export const analyticsService = new AnalyticsService();
