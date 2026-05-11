export const TRUST_LAW = {
  version: '1.0.0',
  status: 'mandatory',
  doctrine: {
    principle: 'verifiable_trust',
    foundation: 'verified_identity',
    growth: 'consistent_behavior',
    decay: 'verified_violations',
  },
  trustScore: {
    range: {
      min: 0,
      max: 100,
    },
    thresholds: {
      unverified: 0,
      low: 25,
      medium: 50,
      high: 75,
      trusted: 90,
    },
    factors: {
      identity: {
        weight: 30,
        components: [
          'verification_level',
          'document_validity',
          'biometric_match',
        ],
      },
      activity: {
        weight: 25,
        components: [
          'participation_frequency',
          'community_contribution',
          'pathway_completion',
        ],
      },
      consistency: {
        weight: 20,
        components: [
          'behavior_pattern_stability',
          'voting_consistency',
          'policy_adherence',
        ],
      },
      verification: {
        weight: 15,
        components: [
          'verification_recency',
          'verification_depth',
          'verification_source_quality',
        ],
      },
      community: {
        weight: 10,
        components: [
          'endorsements',
          'peer_reviews',
          'community_standing',
        ],
      },
    },
  },
  decay: {
    events: [
      { type: 'verification_rejected', impact: -20 },
      { type: 'policy_violation', impact: -15 },
      { type: 'community_guideline_violation', impact: -10 },
      { type: 'inactive_90_days', impact: -5 },
      { type: 'inactive_180_days', impact: -10 },
    ],
    recovery: {
      verification: '+10 per verification',
      positive_contribution: '+1 per action',
      community_service: '+5 per milestone',
    },
  },
  verification: {
    levels: [
      { level: 1, name: 'email', description: 'email verified' },
      { level: 2, name: 'phone', description: 'phone verified' },
      { level: 3, name: 'identity_document', description: 'ID document verified' },
      { level: 4, name: 'biometric', description: 'biometric verified' },
      { level: 5, name: 'in_person', description: 'in-person verification' },
    ],
  },
  trustworthiness: {
    indicators: [
      'verification_level',
      'account_age',
      'community_standing',
      'contribution_history',
      'consistency_score',
      'endorsement_count',
    ],
  },
} as const;

export type TrustThreshold = keyof typeof TRUST_LAW.trustScore.thresholds;
export type VerificationLevel = typeof TRUST_LAW.verification.levels[number]['level'];