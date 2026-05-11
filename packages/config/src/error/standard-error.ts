export const ERROR_CATEGORIES = [
  'validation',
  'auth',
  'permission',
  'conflict',
  'dependency',
  'external_provider',
  'timeout',
  'security',
  'unknown',
] as const;

export type ErrorCategory = (typeof ERROR_CATEGORIES)[number];

export interface StandardError {
  code: string;
  message: string;
  category: ErrorCategory;
  correlationId: string;
  timestamp: string;
  retryable: boolean;
  details?: Record<string, unknown>;
}

export interface ErrorOptions {
  code: string;
  message: string;
  category: ErrorCategory;
  correlationId?: string;
  retryable?: boolean;
  details?: Record<string, unknown>;
}

function generateCorrelationId(): string {
  return `err_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
}

function getDefaultRetryable(category: ErrorCategory): boolean {
  return [
    'dependency',
    'external_provider',
    'timeout',
  ].includes(category);
}

export class OkosError extends Error implements StandardError {
  public readonly code: string;
  public readonly category: ErrorCategory;
  public readonly correlationId: string;
  public readonly timestamp: string;
  public readonly retryable: boolean;
  public readonly details?: Record<string, unknown>;

  constructor(options: ErrorOptions) {
    super(options.message);

    this.name = 'OkosError';
    this.code = options.code;
    this.category = options.category;
    this.correlationId = options.correlationId ?? generateCorrelationId();
    this.timestamp = new Date().toISOString();
    this.retryable = options.retryable ?? getDefaultRetryable(options.category);
    this.details = options.details;
  }

  toJSON(): StandardError {
    return {
      code: this.code,
      message: this.message,
      category: this.category,
      correlationId: this.correlationId,
      timestamp: this.timestamp,
      retryable: this.retryable,
      details: this.details,
    };
  }

  toString(): string {
    return `[${this.category}] ${this.code}: ${this.message} (correlation: ${this.correlationId})`;
  }
}

export class ValidationError extends OkosError {
  constructor(options: Omit<ErrorOptions, 'category'>) {
    super({ ...options, category: 'validation' });
    this.name = 'ValidationError';
  }
}

export class AuthError extends OkosError {
  constructor(options: Omit<ErrorOptions, 'category'>) {
    super({ ...options, category: 'auth', retryable: false });
    this.name = 'AuthError';
  }
}

export class PermissionError extends OkosError {
  constructor(options: Omit<ErrorOptions, 'category'>) {
    super({ ...options, category: 'permission', retryable: false });
    this.name = 'PermissionError';
  }
}

export class ConflictError extends OkosError {
  constructor(options: Omit<ErrorOptions, 'category'>) {
    super({ ...options, category: 'conflict', retryable: false });
    this.name = 'ConflictError';
  }
}

export class DependencyError extends OkosError {
  constructor(options: Omit<ErrorOptions, 'category'>) {
    super({ ...options, category: 'dependency', retryable: true });
    this.name = 'DependencyError';
  }
}

export class ExternalProviderError extends OkosError {
  constructor(options: Omit<ErrorOptions, 'category'>) {
    super({ ...options, category: 'external_provider', retryable: true });
    this.name = 'ExternalProviderError';
  }
}

export class TimeoutError extends OkosError {
  constructor(options: Omit<ErrorOptions, 'category'>) {
    super({ ...options, category: 'timeout', retryable: true });
    this.name = 'TimeoutError';
  }
}

export class SecurityError extends OkosError {
  constructor(options: Omit<ErrorOptions, 'category'>) {
    super({ ...options, category: 'security', retryable: false });
    this.name = 'SecurityError';
  }
}

export function isOkosError(value: unknown): value is OkosError {
  return value instanceof OkosError;
}

export function extractErrorCategory(error: unknown): ErrorCategory {
  if (isOkosError(error)) {
    return error.category;
  }
  return 'unknown';
}

export function createErrorResponse(error: OkosError): StandardError {
  return error.toJSON();
}