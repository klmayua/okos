/**
 * OK.OS — ANALYTICS TRACKERS
 */

import { analyticsService } from '@/services/analytics-service';

export function trackPageView(path: string): void {
  analyticsService.track({ name: 'page_view', category: 'navigation', label: path });
}

export function trackError(error: Error): void {
  analyticsService.track({ name: 'error', category: 'system', label: error.message });
}
