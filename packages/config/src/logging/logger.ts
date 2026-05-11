export const LOG_LEVELS = ['trace', 'debug', 'info', 'warn', 'error', 'fatal'] as const;
export type LogLevel = (typeof LOG_LEVELS)[number];

export interface LogEntry {
  timestamp: string;
  level: LogLevel;
  service: string;
  environment: string;
  correlationId?: string;
  actorId?: string;
  sessionId?: string;
  action: string;
  outcome: 'success' | 'failure' | 'pending';
  latencyMs?: number;
  message: string;
  extra?: Record<string, unknown>;
}

export interface LoggerConfig {
  service: string;
  environment: string;
  level: LogLevel;
  enableCorrelationId: boolean;
  enableActorId: boolean;
  enableSessionId: boolean;
}

export type LogContext = Partial<Pick<LogEntry, 'correlationId' | 'actorId' | 'sessionId' | 'action' | 'outcome' | 'latencyMs'>>;
export type ExtraData = Record<string, unknown>;

const LEVEL_PRIORITY: Record<LogLevel, number> = {
  trace: 0,
  debug: 1,
  info: 2,
  warn: 3,
  error: 4,
  fatal: 5,
};

export class OkosLogger {
  private config: LoggerConfig;
  private context: LogContext = {};

  constructor(config: LoggerConfig) {
    this.config = config;
  }

  private shouldLog(level: LogLevel): boolean {
    return LEVEL_PRIORITY[level] >= LEVEL_PRIORITY[this.config.level];
  }

  private buildEntry(level: LogLevel, message: string, extra?: ExtraData): LogEntry {
    return {
      timestamp: new Date().toISOString(),
      level,
      service: this.config.service,
      environment: this.config.environment,
      ...this.context,
      action: this.context.action ?? 'unknown',
      outcome: this.context.outcome ?? 'pending',
      message,
      extra,
    };
  }

  private log(level: LogLevel, message: string, extra?: ExtraData): void {
    if (!this.shouldLog(level)) {
      return;
    }

    const entry = this.buildEntry(level, message, extra);

    const jsonEntry = JSON.stringify(entry);
    switch (level) {
      case 'trace':
      case 'debug':
        console.debug(jsonEntry);
        break;
      case 'info':
        console.info(jsonEntry);
        break;
      case 'warn':
        console.warn(jsonEntry);
        break;
      case 'error':
      case 'fatal':
        console.error(jsonEntry);
        break;
      default:
        console.log(jsonEntry);
    }
  }

  setCorrelationId(correlationId: string): this {
    this.context.correlationId = correlationId;
    return this;
  }

  setActorId(actorId: string): this {
    this.context.actorId = actorId;
    return this;
  }

  setSessionId(sessionId: string): this {
    this.context.sessionId = sessionId;
    return this;
  }

  setAction(action: string): this {
    this.context.action = action;
    return this;
  }

  setOutcome(outcome: 'success' | 'failure' | 'pending'): this {
    this.context.outcome = outcome;
    return this;
  }

  setLatency(latencyMs: number): this {
    this.context.latencyMs = latencyMs;
    return this;
  }

  clearContext(): this {
    this.context = {};
    return this;
  }

  trace(message: string, extra?: ExtraData): void {
    this.log('trace', message, extra);
  }

  debug(message: string, extra?: ExtraData): void {
    this.log('debug', message, extra);
  }

  info(message: string, extra?: ExtraData): void {
    this.log('info', message, extra);
  }

  warn(message: string, extra?: ExtraData): void {
    this.log('warn', message, extra);
  }

  error(message: string, extra?: ExtraData): void {
    this.log('error', message, extra);
  }

  fatal(message: string, extra?: ExtraData): void {
    this.log('fatal', message, extra);
  }
}

export function createLogger(config: LoggerConfig): OkosLogger {
  return new OkosLogger(config);
}

export type Logger = OkosLogger;

function getEnv(key: string, fallback: string): string {
  if (typeof process === 'undefined' || !process.env) {
    return fallback;
  }
  const value = process.env[key];
  return value ?? fallback;
}

const DEFAULT_LOGGER_CONFIG: LoggerConfig = {
  service: 'ok-os',
  environment: getEnv('APP_ENV', 'development'),
  level: (getEnv('OBS_LOG_LEVEL', 'debug') as LogLevel) ?? 'debug',
  enableCorrelationId: true,
  enableActorId: true,
  enableSessionId: true,
};

let globalLogger: OkosLogger | null = null;

export function initLogger(partialConfig?: Partial<LoggerConfig>): Logger {
  globalLogger = createLogger({ ...DEFAULT_LOGGER_CONFIG, ...partialConfig });
  return globalLogger;
}

export function getLogger(): Logger {
  if (!globalLogger) {
    globalLogger = initLogger();
  }
  return globalLogger;
}