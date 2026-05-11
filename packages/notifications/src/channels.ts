export type NotificationChannel = 'in_app' | 'email' | 'sms' | 'whatsapp' | 'push' | 'voice' | 'webhook';

export type NotificationPriority = 'low' | 'normal' | 'high' | 'urgent';

export interface NotificationMessage {
  templateId: string;
  audience: string[];
  priority: NotificationPriority;
  channelStrategy: NotificationChannel[];
  personalization: Record<string, string>;
  locale: string;
  correlationId: string;
  auditRequired: boolean;
}

export interface ChannelConfig {
  enabled: boolean;
  retryCount: number;
  timeout: number;
}

export interface UserPreferences {
  userId: string;
  channels: Record<NotificationChannel, boolean>;
  quietHoursStart?: string;
  quietHoursEnd?: string;
  digestPreference: 'realtime' | 'daily' | 'weekly' | 'none';
}

export const DEFAULT_CHANNEL_CONFIGS: Record<NotificationChannel, ChannelConfig> = {
  in_app: { enabled: true, retryCount: 0, timeout: 1000 },
  email: { enabled: true, retryCount: 3, timeout: 30000 },
  sms: { enabled: true, retryCount: 3, timeout: 15000 },
  whatsapp: { enabled: true, retryCount: 3, timeout: 15000 },
  push: { enabled: true, retryCount: 2, timeout: 10000 },
  voice: { enabled: false, retryCount: 2, timeout: 30000 },
  webhook: { enabled: true, retryCount: 3, timeout: 20000 },
};

export const NOTIFICATION_CHANNELS: NotificationChannel[] = [
  'in_app',
  'email',
  'sms',
  'whatsapp',
  'push',
  'voice',
  'webhook',
];