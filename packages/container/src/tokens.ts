export const CONTAINER_TOKENS = {
  CONFIG: 'config',
  LOGGER: 'logger',
  EVENT_BUS: 'event-bus',
  AUDIT_ENGINE: 'audit-engine',
  PERMISSION_ENGINE: 'permission-engine',
  NOTIFICATION_ENGINE: 'notification-engine',
  WORKFLOW_ENGINE: 'workflow-engine',
  ADAPTER_REGISTRY: 'adapter-registry',
  OBSERVABILITY: 'observability',
  SECURITY_ENGINE: 'security-engine',
} as const;

export type ContainerToken = typeof CONTAINER_TOKENS[keyof typeof CONTAINER_TOKENS];

export const SCOPE = {
  TRANSIENT: 'transient',
  SCOPED: 'scoped',
  SINGLETON: 'singleton',
} as const;

export type ScopeType = typeof SCOPE[keyof typeof SCOPE];