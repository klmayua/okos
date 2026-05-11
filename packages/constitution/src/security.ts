export const SECURITY_LAW = {
  version: '1.0.0',
  status: 'mandatory',
  doctrine: {
    principle: 'defense_in_depth',
    assume: ['breach', 'compromise'],
    trust: 'never_implicit',
    verify: 'always',
    zero_trust: true,
  },
  authentication: {
    methods: ['password', 'totp', 'sms', 'email', 'biometric'],
    password: {
      minLength: 12,
      complexity: 'uppercase, lowercase, number, symbol',
      expiry: 90,
      history: 12,
      lockout: { attempts: 5, duration: '15min' },
    },
    mfa: {
      required: ['admin', 'verifier', 'finance'],
      optional: ['member', 'citizen'],
      gracePeriod: '7 days',
    },
    session: {
      maxAge: '8 hours',
      idleTimeout: '30 minutes',
      secure: true,
      httpOnly: true,
      sameSite: 'strict',
    },
  },
  authorization: {
    model: 'rbac_with_abac',
    permissions: 'explicit_grant',
    inheritance: 'controlled',
    escalation: 'audited',
  },
  dataProtection: {
    encryption: {
      atRest: 'AES-256-GCM',
      inTransit: 'TLS 1.3',
      keyRotation: '90 days',
    },
    classification: ['public', 'internal', 'confidential', 'restricted'],
    pii: {
      anonymize: true,
      retention: 'as required by law',
      consent: 'explicit required',
    },
  },
  inputValidation: {
    rules: ['sanitize', 'validate', 'constrain', 'escape'],
    forbidden: ['raw_sql', 'raw_html', 'eval', 'exec'],
    rateLimiting: {
      api: '100 req/min per user',
      auth: '5 req/min',
      write: '10 req/min',
    },
  },
  auditing: {
    mandatory: [
      'authentication',
      'authorization',
      'data_access',
      'data_modification',
      'configuration_change',
      'privilege_escalation',
      'security_event',
    ],
    retention: '7 years',
    integrity: 'cryptographically signed',
  },
  vulnerabilityHandling: {
    severity: ['critical', 'high', 'medium', 'low', 'info'],
    sla: {
      critical: '24 hours',
      high: '7 days',
      medium: '30 days',
      low: '90 days',
    },
    disclosure: 'coordinated',
  },
} as const;

export type AuthenticationMethod = typeof SECURITY_LAW.authentication.methods[number];
export type DataClassification = typeof SECURITY_LAW.dataProtection.classification[number];
export type SeverityLevel = typeof SECURITY_LAW.vulnerabilityHandling.severity[number];