export const TRANSPARENCY_LAW = {
  version: '1.0.0',
  status: 'mandatory',
  doctrine: {
    principle: 'public_by_default',
    classification: 'required_for_all',
    exception: 'legally_required',
  },
  publicDisclosure: {
    mandatory: [
      'electoral_results',
      'financial_reports',
      'policy_documents',
      'decision_making_proceedings',
      'performance_metrics',
      'conflict_of_interest_register',
      'procurement_contracts',
      'expenditure_reports',
    ],
    frequency: {
      financial: 'quarterly',
      operational: 'monthly',
      electoral: 'real_time',
      policy: 'on_change',
    },
  },
  accessibility: {
    formats: ['html', 'pdf', 'json', 'csv'],
    languages: ['en', 'regional_languages'],
    standards: 'WCAG 2.1 AA',
    alternativeFormats: true,
  },
  dataPortability: {
    formats: ['json', 'csv', 'xml'],
    retention: 'perpetual',
    exportTime: '< 48 hours',
  },
  metrics: {
    disclosure: [
      'request_count',
      'response_time',
      'completion_rate',
      'appeal_count',
    ],
    publication: 'monthly',
  },
  exemptions: {
    categories: [
      'national_security',
      'personal_privacy',
      'ongoing_investigation',
      'commercial_confidentiality',
      'legal_privilege',
    ],
    process: 'formal_review_required',
    reviewPeriod: '30 days',
    appealAvailable: true,
  },
} as const;

export type DisclosureFrequency = typeof TRANSPARENCY_LAW.publicDisclosure.frequency;
export type ExemptionCategory = typeof TRANSPARENCY_LAW.exemptions.categories[number];