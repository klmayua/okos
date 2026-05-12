/**
 * OK.OS — TRACKING SERVICE
 * Tracks initiative engagement, donation conversion, PVC CTA clicks, volunteer signup flow, section scroll depth.
 */

import { analyticsService } from './analytics-service';

export function trackInitiativeEngagement(initiativeId: string): void {
  analyticsService.track({ name: 'initiative_engagement', category: 'initiatives', label: initiativeId });
}

export function trackDonationConversion(amount: number): void {
  analyticsService.track({ name: 'donation_conversion', category: 'donation', value: amount });
}

export function trackPVCClick(): void {
  analyticsService.track({ name: 'pvc_cta_click', category: 'conversion' });
}

export function trackVolunteerSignup(step: string): void {
  analyticsService.track({ name: 'volunteer_signup', category: 'volunteer', label: step });
}

export function trackScrollDepth(section: string, depth: number): void {
  analyticsService.track({ name: 'scroll_depth', category: 'engagement', label: section, value: depth });
}
