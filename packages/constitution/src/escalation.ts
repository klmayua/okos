export const ESCALATION_LAW = {
  version: '1.0.0',
  status: 'mandatory',
  doctrine: {
    principle: 'proportional_response',
    urgency: 'time_bound',
    resolution: 'definitive',
  },
  levels: [
    {
      level: 1,
      name: 'self_service',
      description: 'User resolves using available resources',
      timeToResolve: '24 hours',
    },
    {
      level: 2,
      name: 'first_line',
      description: 'Community support or automated assistance',
      timeToResolve: '8 hours',
    },
    {
      level: 3,
      name: 'support',
      description: 'Staff support with escalation capability',
      timeToResolve: '4 hours',
    },
    {
      level: 4,
      name: 'specialist',
      description: 'Domain expert intervention required',
      timeToResolve: '2 hours',
    },
    {
      level: 5,
      name: 'management',
      description: 'Manager or senior staff involvement',
      timeToResolve: '1 hour',
    },
    {
      level: 6,
      name: 'executive',
      description: 'Executive decision required',
      timeToResolve: '30 minutes',
    },
    {
      level: 7,
      name: 'emergency',
      description: 'Critical system or security issue',
      timeToResolve: '15 minutes',
    },
  ],
  triggers: [
    {
      category: 'technical',
      examples: [
        'system_outage',
        'data_loss',
        'security_breach',
        'performance_degradation',
      ],
      initialLevel: 4,
      autoEscalate: true,
    },
    {
      category: 'operational',
      examples: [
        'policy_violation',
        'content_dispute',
        'access_issue',
      ],
      initialLevel: 2,
      autoEscalate: true,
    },
    {
      category: 'safety',
      examples: [
        'threat_to_individual',
        'harmful_content',
        'illegal_activity',
      ],
      initialLevel: 6,
      autoEscalate: true,
    },
    {
      category: 'governance',
      examples: [
        'election_integrity',
        'fraud_allegation',
        'official_misconduct',
      ],
      initialLevel: 5,
      autoEscalate: true,
    },
  ],
  escalationPath: {
    mustInclude: [
      'documentation',
      'impact_assessment',
      'stakeholder_notification',
      'resolution_plan',
    ],
    optional: [
      'external_review',
      'legal_consultation',
      'media_engagement',
    ],
  },
  routing: {
    byType: true,
    byUrgency: true,
    byComplexity: true,
    loadBalancing: true,
  },
  monitoring: {
    metrics: [
      'escalation_rate',
      'resolution_time',
      'escalation_accuracy',
      'sla_compliance',
    ],
    review: 'weekly',
  },
} as const;

export type EscalationLevel = typeof ESCALATION_LAW.levels[number]['level'];
export type EscalationCategory = typeof ESCALATION_LAW.triggers[number]['category'];