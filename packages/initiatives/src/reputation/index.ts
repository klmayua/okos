export type ReputationLevel = 'observer' | 'contributor' | 'steward' | 'guardian' | 'elder';

export interface ReputationProfile {
  userId: string;
  level: ReputationLevel;
  score: number;
  verifiedContributions: number;
  initiativeSuccessRate: number;
  volunteerActivity: number;
  auditHistory: number;
  moderationHistory: number;
  communityFeedback: number;
  verificationAccuracy: number;
  financialIntegrity: number;
  responsiveness: number;
  createdAt: string;
  updatedAt: string;
}

export interface ReputationPenalty {
  userId: string;
  type: 'fraud' | 'misinformation' | 'abuse' | 'manipulation' | 'failed_audit';
  severity: 'low' | 'medium' | 'high' | 'severe';
  points: number;
  reason: string;
  appliedAt: string;
  expiresAt?: string;
}

export const REPUTATION_LEVELS: Record<ReputationLevel, { minScore: number; maxScore: number }> = {
  observer: { minScore: 0, maxScore: 100 },
  contributor: { minScore: 100, maxScore: 500 },
  steward: { minScore: 500, maxScore: 1000 },
  guardian: { minScore: 1000, maxScore: 2500 },
  elder: { minScore: 2500, maxScore: Infinity },
};

export const PENALTY_SCORES: Record<ReputationPenalty['type'], Record<ReputationPenalty['severity'], number>> = {
  fraud: { low: 50, medium: 100, high: 250, severe: 500 },
  misinformation: { low: 25, medium: 50, high: 100, severe: 200 },
  abuse: { low: 25, medium: 50, high: 100, severe: 200 },
  manipulation: { low: 50, medium: 100, high: 250, severe: 500 },
  failed_audit: { low: 25, medium: 50, high: 100, severe: 200 },
};

export class CivicReputationEngine {
  private profiles = new Map<string, ReputationProfile>();
  private penalties: ReputationPenalty[] = [];

  async updateProfile(userId: string, contributions: Partial<ReputationProfile>): Promise<ReputationProfile> {
    let profile = this.profiles.get(userId);

    if (!profile) {
      profile = {
        userId,
        level: 'observer',
        score: 0,
        verifiedContributions: 0,
        initiativeSuccessRate: 0,
        volunteerActivity: 0,
        auditHistory: 0,
        moderationHistory: 0,
        communityFeedback: 0,
        verificationAccuracy: 0,
        financialIntegrity: 0,
        responsiveness: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
    }

    const newScore = this.calculateScore(contributions);
    const level = this.determineLevel(newScore);

    this.profiles.set(userId, {
      ...profile,
      ...contributions,
      score: newScore,
      level,
      updatedAt: new Date().toISOString(),
    });

    return this.profiles.get(userId)!;
  }

  private calculateScore(contributions: Partial<ReputationProfile>): number {
    let score = 0;

    if (contributions.verifiedContributions) {
      score += contributions.verifiedContributions * 10;
    }
    if (contributions.initiativeSuccessRate) {
      score += contributions.initiativeSuccessRate * 5;
    }
    if (contributions.volunteerActivity) {
      score += contributions.volunteerActivity * 3;
    }
    if (contributions.auditHistory) {
      score += contributions.auditHistory * 5;
    }
    if (contributions.moderationHistory) {
      score += contributions.moderationHistory * 3;
    }
    if (contributions.communityFeedback) {
      score += contributions.communityFeedback * 2;
    }
    if (contributions.verificationAccuracy) {
      score += contributions.verificationAccuracy * 2;
    }
    if (contributions.financialIntegrity) {
      score += contributions.financialIntegrity * 5;
    }
    if (contributions.responsiveness) {
      score += contributions.responsiveness * 2;
    }

    return Math.max(0, score - this.getTotalPenalties(contributions.userId ?? ''));
  }

  private determineLevel(score: number): ReputationLevel {
    if (score >= 2500) return 'elder';
    if (score >= 1000) return 'guardian';
    if (score >= 500) return 'steward';
    if (score >= 100) return 'contributor';
    return 'observer';
  }

  async applyPenalty(userId: string, type: ReputationPenalty['type'], severity: ReputationPenalty['severity'], reason: string): Promise<ReputationPenalty> {
    const points = PENALTY_SCORES[type][severity];

    const penalty: ReputationPenalty = {
      userId,
      type,
      severity,
      points,
      reason,
      appliedAt: new Date().toISOString(),
    };

    this.penalties.push(penalty);

    const profile = this.profiles.get(userId);
    if (profile) {
      const newScore = Math.max(0, profile.score - points);
      profile.score = newScore;
      profile.level = this.determineLevel(newScore);
      profile.updatedAt = new Date().toISOString();
    }

    return penalty;
  }

  private getTotalPenalties(userId: string): number {
    return this.penalties
      .filter(p => p.userId === userId)
      .reduce((sum, p) => sum + p.points, 0);
  }

  getProfile(userId: string): ReputationProfile | undefined {
    return this.profiles.get(userId);
  }

  getPenalties(userId: string): ReputationPenalty[] {
    return this.penalties.filter(p => p.userId === userId);
  }

  getLeaderboard(limit: number = 10): ReputationProfile[] {
    return [...this.profiles.values()]
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);
  }
}