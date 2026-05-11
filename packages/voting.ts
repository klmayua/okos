export const VOTING_LAW = {
  version: '1.0.0',
  status: 'mandatory',
  doctrine: {
    principle: 'free_fair_secret',
    integrity: 'verifiable',
    inclusivity: 'universal_accessible',
  },
  eligibility: {
    criteria: [
      'citizen',
      'age_18_or_above',
      'verified_identity',
      'registered',
    ],
    restrictions: [
      'convicted_of_voter_fraud',
      'mentally_incapacitated',
      'deceased',
    ],
  },
  votingMethods: {
    primary: 'electronic',
    fallback: ['paper', 'proxy'],
    accessibility: ['remote', 'in_person', 'assisted'],
  },
  security: {
    authentication: [
      'verified_identity',
      'mfa_required',
      'device_verification',
    ],
    ballot: {
      encryption: 'end_to_end',
      anonymity: 'separated_from_identity',
      verification: 'cryptographic_proof',
    },
    integrity: [
      'tamper_evident',
      'auditable_log',
      'redundant_verification',
    ],
  },
  electionTypes: {
    presidential: {
      cycle: '5 years',
      method: 'ranked_choice',
      threshold: '50% + 1',
    },
    parliamentary: {
      cycle: '5 years',
      method: 'mixed_member',
      threshold: '5% for_list',
    },
    local: {
      cycle: '5 years',
      method: 'first_past_post',
      threshold: 'relative_majority',
    },
    referendum: {
      trigger: 'petition_or_legislative',
      method: 'simple_majority',
      threshold: '50% + 1',
      quorum: '40% turnout',
    },
  },
  timeline: {
    phases: [
      'announcement',
      'nomination',
      'campaign',
      'pre_voting',
      'voting',
      'counting',
      'certification',
      'results',
    ],
    durations: {
      announcement: '-90 days',
      nomination: '14 days',
      campaign: '21 days',
      pre_voting: '7 days',
      voting: '1-3 days',
      counting: '3 days',
      certification: '7 days',
    },
  },
  audit: {
    type: 'post_election',
    sampleSize: 'statistically_significant',
    method: 'risk_limiting',
    certification: 'required',
  },
  disputeResolution: {
    grounds: [
      'irregularity',
      'fraud',
      'technical_failure',
      'procedural_violation',
    ],
    process: ['petition', 'review', 'tribunal', 'appeal'],
    deadline: '7 days post_results',
  },
} as const;

export type ElectionType = keyof typeof VOTING_LAW.electionTypes;
export type VotingMethod = keyof typeof VOTING_LAW.votingMethods;