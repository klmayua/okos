export const GOVERNANCE_LAW = {
  version: '1.0.0',
  status: 'mandatory',
  doctrine: {
    principle: 'democratic_stakeholder',
    decisionMaking: 'transparent_inclusive',
    representation: 'proportional',
  },
  structure: {
    bodies: [
      { name: 'general_assembly', type: 'supreme', members: 'all_citizens' },
      { name: 'executive_council', type: 'executive', members: 'elected' },
      { name: 'policy_committee', type: 'legislative', members: 'elected' },
      { name: 'judicial_tribunal', type: 'judicial', members: 'appointed' },
      { name: 'oversight_committee', type: 'watchdog', members: 'independent' },
    ],
  },
  decisionMaking: {
    methods: [
      'direct_democracy',
      'representative_vote',
      'consensus_building',
      'expert_panel',
    ],
    thresholds: {
      ordinary: 'simple_majority',
      special: '2/3 majority',
      constitutional: '3/4 majority',
      unanimous: '100%',
    },
  },
  policies: {
    lifecycle: [
      'draft',
      'published',
      'comment_period',
      'revision',
      'voting',
      'ratified',
      'effective',
      'amended',
      'repealed',
    ],
    categories: [
      'constitution',
      'regulation',
      'procedure',
      'guideline',
      'code_of_conduct',
    ],
  },
  representation: {
    geographic: [
      'region',
      'constituency',
      'ward',
      'neighborhood',
    ],
    sectoral: [
      'youth',
      'women',
      'disability',
      'labor',
      'business',
      'civil_society',
    ],
  },
  accountability: {
    reporting: {
      frequency: 'quarterly',
      public: true,
    },
    recall: {
      threshold: '10% signatures',
      voteRequired: '2/3 majority',
    },
    removal: {
      causes: [
        'misconduct',
        'incapacity',
        'non_attendance',
        'conflict_of_interest',
      ],
      process: 'due_process',
    },
  },
} as const;

export type DecisionThreshold = keyof typeof GOVERNANCE_LAW.decisionMaking.thresholds;
export type PolicyCategory = typeof GOVERNANCE_LAW.policies.categories[number];
export type BodyType = typeof GOVERNANCE_LAW.structure.bodies[number]['type'];