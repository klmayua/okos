/**
 * OK.OS — Command.OS Orchestration
 */

export interface CommandRoute {
  path: string;
  label: string;
  requiresAuth: boolean;
}

export const commandRoutes: CommandRoute[] = [
  { path: '/overview', label: 'Overview', requiresAuth: true },
  { path: '/operations', label: 'Operations', requiresAuth: true },
  { path: '/initiatives', label: 'Initiatives', requiresAuth: true },
  { path: '/verify', label: 'Verify', requiresAuth: true },
  { path: '/track', label: 'Track', requiresAuth: true },
  { path: '/pulse', label: 'Pulse', requiresAuth: true },
  { path: '/regions', label: 'Regions', requiresAuth: true },
  { path: '/alerts', label: 'Alerts', requiresAuth: true },
  { path: '/volunteers', label: 'Volunteers', requiresAuth: true },
  { path: '/incidents', label: 'Incidents', requiresAuth: true },
  { path: '/moderation', label: 'Moderation', requiresAuth: true },
  { path: '/analytics', label: 'Analytics', requiresAuth: true },
];
