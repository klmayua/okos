import { DEFAULT_CHANNEL_CONFIGS, type NotificationChannel, type NotificationMessage, type ChannelConfig } from './channels.js';

interface SentNotification {
  id: string;
  message: NotificationMessage;
  channel: NotificationChannel;
  status: 'pending' | 'sent' | 'delivered' | 'failed';
  sentAt?: string;
  deliveredAt?: string;
  error?: string;
}

function generateId(): string {
  return `notif_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
}

export class NotificationEngine {
  private sentNotifications: SentNotification[] = [];
  private userPreferences = new Map<string, { channels: Record<string, boolean>; quietHours: { start?: string; end?: string } }>();
  private channelConfigs = new Map<NotificationChannel, ChannelConfig>(Object.entries(DEFAULT_CHANNEL_CONFIGS) as [NotificationChannel, ChannelConfig][]);

  async send(message: NotificationMessage): Promise<string> {
    const notificationId = generateId();

    for (const channel of message.channelStrategy) {
      const config = this.channelConfigs.get(channel);
      if (!config?.enabled) {
        continue;
      }

      const audienceId = message.audience[0] ?? 'default';
      const userPrefs = this.getUserPreferences(audienceId);
      if (!userPrefs.channels[channel]) {
        continue;
      }

      if (this.isInQuietHours(userPrefs.quietHours)) {
        continue;
      }

      try {
        await this.sendToChannel(notificationId, message, channel);
        this.sentNotifications.push({
          id: notificationId,
          message,
          channel,
          status: 'sent',
          sentAt: new Date().toISOString(),
        });
      } catch (error) {
        this.sentNotifications.push({
          id: notificationId,
          message,
          channel,
          status: 'failed',
          error: error instanceof Error ? error.message : 'Unknown error',
        });

        if (config.retryCount > 0) {
          await this.retryWithBackoff(notificationId, message, channel, config.retryCount);
        }
      }
    }

    return notificationId;
  }

  private async sendToChannel(id: string, message: NotificationMessage, channel: NotificationChannel): Promise<void> {
    console.log(`[notifications] Sending to ${channel}:`, {
      id,
      templateId: message.templateId,
      audience: message.audience.length,
      priority: message.priority,
    });
  }

  private async retryWithBackoff(id: string, message: NotificationMessage, channel: NotificationChannel, retries: number): Promise<void> {
    for (let attempt = 1; attempt <= retries; attempt++) {
      const delay = Math.pow(2, attempt) * 1000;
      await new Promise(resolve => setTimeout(resolve, delay));
      try {
        await this.sendToChannel(id, message, channel);
        const existing = this.sentNotifications.find(n => n.id === id && n.channel === channel);
        if (existing) {
          existing.status = 'sent';
          existing.sentAt = new Date().toISOString();
        }
        return;
      } catch {
        // continue to next retry
      }
    }
  }

  private isInQuietHours(quietHours: { start?: string; end?: string }): boolean {
    if (!quietHours.start || !quietHours.end) return false;
    const now = new Date();
    const currentTime = now.toTimeString().slice(0, 5);
    return currentTime >= quietHours.start && currentTime <= quietHours.end;
  }

  private getUserPreferences(userId: string): { channels: Record<string, boolean>; quietHours: { start?: string; end?: string } } {
    return this.userPreferences.get(userId) ?? {
      channels: { in_app: true, email: true, sms: true, whatsapp: true, push: true, voice: true, webhook: true },
      quietHours: {},
    };
  }

  setUserPreferences(userId: string, preferences: { channels?: Record<string, boolean>; quietHours?: { start?: string; end?: string } }): void {
    const existing = this.getUserPreferences(userId);
    this.userPreferences.set(userId, {
      channels: preferences.channels ?? existing.channels,
      quietHours: preferences.quietHours ?? existing.quietHours,
    });
  }

  configureChannel(channel: NotificationChannel, config: Partial<ChannelConfig>): void {
    const existing = this.channelConfigs.get(channel) ?? DEFAULT_CHANNEL_CONFIGS[channel];
    this.channelConfigs.set(channel, { ...existing, ...config });
  }

  getSentNotifications(userId?: string): SentNotification[] {
    if (userId) {
      return this.sentNotifications.filter(n => n.message.audience.includes(userId));
    }
    return [...this.sentNotifications];
  }

  getDeliveryStats(channel?: NotificationChannel): { sent: number; delivered: number; failed: number } {
    const notifications = channel
      ? this.sentNotifications.filter(n => n.channel === channel)
      : this.sentNotifications;

    return {
      sent: notifications.filter(n => n.status === 'sent').length,
      delivered: notifications.filter(n => n.status === 'delivered').length,
      failed: notifications.filter(n => n.status === 'failed').length,
    };
  }

  clearHistory(): void {
    this.sentNotifications = [];
  }
}

const globalNotificationEngine = new NotificationEngine();

export function getNotificationEngine(): NotificationEngine {
  return globalNotificationEngine;
}

export function sendNotification(message: NotificationMessage): Promise<string> {
  return getNotificationEngine().send(message);
}