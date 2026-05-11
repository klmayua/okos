import type { Metric, MetricType } from './metrics.js';

function generateTraceId(): string {
  return `trace_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
}

function generateSpanId(): string {
  return Math.random().toString(36).substring(2, 11);
}

export interface Span {
  traceId: string;
  spanId: string;
  parentSpanId?: string;
  operationName: string;
  serviceName: string;
  startTime: string;
  endTime?: string;
  duration?: number;
  tags: Record<string, string>;
  logs: { timestamp: string; message: string; fields: Record<string, string> }[];
  status: 'ok' | 'error' | 'unset';
}

export class TracingService {
  private spans = new Map<string, Span>();
  private activeSpans = new Map<string, Span>();

  startSpan(operationName: string, serviceName: string, traceId?: string, parentSpanId?: string): Span {
    const trace = traceId ?? generateTraceId();
    const span: Span = {
      traceId: trace,
      spanId: generateSpanId(),
      parentSpanId,
      operationName,
      serviceName,
      startTime: new Date().toISOString(),
      tags: {},
      logs: [],
      status: 'unset',
    };

    this.activeSpans.set(span.spanId, span);
    this.spans.set(span.spanId, span);

    return span;
  }

  endSpan(spanId: string, status: 'ok' | 'error' = 'ok'): void {
    const span = this.activeSpans.get(spanId);
    if (!span) return;

    span.endTime = new Date().toISOString();
    span.duration = new Date(span.endTime).getTime() - new Date(span.startTime).getTime();
    span.status = status;

    this.activeSpans.delete(spanId);
  }

  addTag(spanId: string, key: string, value: string): void {
    const span = this.spans.get(spanId);
    if (span) {
      span.tags[key] = value;
    }
  }

  addLog(spanId: string, message: string, fields: Record<string, string> = {}): void {
    const span = this.spans.get(spanId);
    if (span) {
      span.logs.push({
        timestamp: new Date().toISOString(),
        message,
        fields,
      });
    }
  }

  getSpan(spanId: string): Span | undefined {
    return this.spans.get(spanId);
  }

  getTrace(traceId: string): Span[] {
    return [...this.spans.values()].filter(s => s.traceId === traceId);
  }

  getActiveSpans(): Span[] {
    return [...this.activeSpans.values()];
  }
}

export class MetricsService {
  private metrics = new Map<string, Metric[]>();

  record(type: MetricType, name: string, value: number, labels: Record<string, string> = {}): void {
    const key = `${name}_${JSON.stringify(labels)}`;

    const metric: Metric = {
      name,
      type,
      description: '',
      value,
      labels,
      timestamp: new Date().toISOString(),
    };

    const existing = this.metrics.get(key) ?? [];
    existing.push(metric);
    this.metrics.set(key, existing);
  }

  incrementCounter(name: string, labels: Record<string, string> = {}): void {
    this.record('counter', name, 1, labels);
  }

  setGauge(name: string, value: number, labels: Record<string, string> = {}): void {
    this.record('gauge', name, value, labels);
  }

  observeHistogram(name: string, value: number, labels: Record<string, string> = {}): void {
    this.record('histogram', name, value, labels);
  }

  getMetrics(name?: string): Metric[] {
    if (name) {
      return [...(this.metrics.get(name) ?? [])].flat();
    }
    return [...this.metrics.values()].flat();
  }

  clear(): void {
    this.metrics.clear();
  }
}

class ObservabilityService {
  tracing = new TracingService();
  metrics = new MetricsService();

  getGoldenSignals() {
    const metrics = this.metrics.getMetrics();
    const httpMetrics = metrics.filter(m => m.name.startsWith('http_'));

    const latency = httpMetrics.find(m => m.name === 'http_request_duration')?.value ?? 0;
    const traffic = httpMetrics.filter(m => m.name === 'http_requests_total').length;
    const errors = httpMetrics.filter(m => m.name === 'error_rate' && m.value > 0).length;
    const saturation = 0;

    return { latency, traffic, errors, saturation };
  }
}

const globalObservability = new ObservabilityService();

export function getObservability(): ObservabilityService {
  return globalObservability;
}

export function getTracing(): TracingService {
  return globalObservability.tracing;
}

export function getMetrics(): MetricsService {
  return globalObservability.metrics;
}