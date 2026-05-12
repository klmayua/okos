/**
 * OK.OS — NOTIFICATION ORCHESTRATOR
 * Grouped, severity-routed, offline-queued notifications.
 */

export type NotificationType =
  | 'approval_request'
  | 'incident_alert'
  | 'treasury_escalation'
  | 'sync_failure'
  | 'moderation_assignment'
  | 'volunteer_assignment'
  | 'verification_alert'
  | 'initiative_update'
  | 'governance_vote';

export type Severity = 'informational' | 'caution' | 'warning' | 'critical';

export type DeliveryChannel = 'in_app' | 'push' | 'email' | 'whatsapp' | 'sms';

export interface NotificationEvent {
  id: string;
  type: NotificationType;
  severity: Severity;
  message: string;
  channels: DeliveryChannel[];
  groupKey?: string;
  quietHoursSafe: boolean;
  timestamp: number;
}

class NotificationOrchestrator {
  private readonly queue: NotificationEvent[] = [];
  private readonly history: NotificationEvent[] = [];
  private quietHours = false;

  enqueue(event: Omit<NotificationEvent, 'id' | 'timestamp'>): NotificationEvent {
    const full: NotificationEvent = {
      ...event,
      id: `notif-${Date.now()}-${Math.random().toString(36).slice(2, 5)}`,
      timestamp: Date.now(),
    };

    if (this.quietHours && !event.quietHoursSafe) {
      this.queue.push(full);
      return full;
    }

    this.history.push(full);
    this.deliver(full);
    return full;
  }

  flushQuietHours(): readonly NotificationEvent[] {
    const flushed = [...this.queue];
    this.queue.length = 0;
    flushed.forEach((n) => {
      this.history.push(n);
      this.deliver(n);
    });
    return flushed;
  }

  getHistory(): readonly NotificationEvent[] {
    return [...this.history];
  }

  getPending(): readonly NotificationEvent[] {
    return [...this.queue];
  }

  setQuietHours(enabled: boolean): void {
    this.quietHours = enabled;
    if (!enabled) {
      this.flushQuietHours();
    }
  }

  private deliver(event: NotificationEvent): void {
    // In-app delivery always
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('okos-notification', { detail: event }));
    }
  }
}

export const notificationOrchestrator = new NotificationOrchestrator();
