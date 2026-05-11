export type MetricType = 'counter' | 'gauge' | 'histogram' | 'summary';

export interface Metric {
  name: string;
  type: MetricType;
  description: string;
  value: number;
  labels: Record<string, string>;
  timestamp: string;
}

export interface GoldenSignals {
  latency: number;
  traffic: number;
  errors: number;
  saturation: number;
}

export interface MetricSeries {
  name: string;
  data: { timestamp: string; value: number }[];
  labels: Record<string, string>;
}

export const METRIC_NAMES = {
  HTTP_REQUESTS_TOTAL: 'http_requests_total',
  HTTP_REQUEST_DURATION: 'http_request_duration',
  HTTP_REQUEST_SIZE: 'http_request_size',
  RESPONSE_SIZE: 'response_size',
  ACTIVE_CONNECTIONS: 'active_connections',
  ERROR_RATE: 'error_rate',
  CPU_USAGE: 'cpu_usage',
  MEMORY_USAGE: 'memory_usage',
  DISK_USAGE: 'disk_usage',
  WORKFLOW_EXECUTIONS: 'workflow_executions',
  WORKFLOW_DURATION: 'workflow_duration',
  EVENT_PUBLISHED: 'event_published',
  AUDIT_RECORDS: 'audit_records',
  NOTIFICATION_SENT: 'notification_sent',
} as const;