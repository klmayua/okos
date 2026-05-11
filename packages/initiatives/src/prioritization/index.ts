export interface VotingWeight {
  geographicProximity: number;
  civicReputation: number;
  participationHistory: number;
  verifiedIdentity: boolean;
  expertiseRelevance: number;
  affectedPopulation: boolean;
  contributionHistory: number;
  localResidency: boolean;
  trustScore: number;
}

export interface PrioritizedInitiative {
  initiativeId: string;
  score: number;
  rank: number;
  totalVotes: number;
  supportVotes: number;
  opposeVotes: number;
  abstainVotes: number;
  weightedVotes: number;
}

export interface AnomalyDetection {
  type: 'sybil' | 'brigading' | 'vote_buying' | 'coordinated';
  detectedAt: string;
  affectedVoters: string[];
  severity: 'low' | 'medium' | 'high' | 'critical';
  actionTaken: string;
}

export class PrioritizationEngine {
  private votes = new Map<string, InitiativeVote[]>();
  private prioritizedList: PrioritizedInitiative[] = [];
  private anomalies: AnomalyDetection[] = [];

  async vote(initiativeId: string, voterId: string, weight: VotingWeight, voteType: 'support' | 'oppose' | 'abstain', rationale?: string): Promise<void> {
    const calculatedWeight = this.calculateWeight(weight);
    const vote = {
      initiativeId,
      voterId,
      weight: calculatedWeight,
      voteType,
      rationale,
      votedAt: new Date().toISOString(),
    };

    const existingVotes = this.votes.get(initiativeId) ?? [];
    existingVotes.push(vote);
    this.votes.set(initiativeId, existingVotes);

    this.detectAnomalies(initiativeId);
    this.updatePrioritization();
  }

  private calculateWeight(weight: VotingWeight): number {
    let score = 0;

    if (weight.geographicProximity > 0) score += weight.geographicProximity * 0.1;
    if (weight.civicReputation > 0) score += weight.civicReputation * 0.15;
    if (weight.participationHistory > 0) score += weight.participationHistory * 0.1;
    if (weight.verifiedIdentity) score += 0.2;
    if (weight.expertiseRelevance > 0) score += weight.expertiseRelevance * 0.1;
    if (weight.affectedPopulation) score += 0.15;
    if (weight.contributionHistory > 0) score += weight.contributionHistory * 0.1;
    if (weight.localResidency) score += 0.1;
    if (weight.trustScore > 0) score += (weight.trustScore / 100) * 0.1;

    return Math.min(1, score);
  }

  private detectAnomalies(initiativeId: string): void {
    const votes = this.votes.get(initiativeId) ?? [];
    const voterGroups = new Map<string, string[]>();

    for (const vote of votes) {
      const voterId = vote.voterId;
      const group = voterId.split('_')[0] ?? 'default';
      const existing = voterGroups.get(group) ?? [];
      existing.push(voterId);
      voterGroups.set(group, existing);
    }

    for (const [_group, voters] of voterGroups) {
      if (voters.length > 5) {
        this.anomalies.push({
          type: 'brigading',
          detectedAt: new Date().toISOString(),
          affectedVoters: voters,
          severity: voters.length > 20 ? 'critical' : 'high',
          actionTaken: 'votes_held_for_review',
        });
      }
    }
  }

  private updatePrioritization(): void {
    const initiativeScores = new Map<string, PrioritizedInitiative>();

    for (const [initiativeId, votes] of this.votes) {
      let totalVotes = 0;
      let weightedVotes = 0;
      let supportVotes = 0;
      let opposeVotes = 0;
      let abstainVotes = 0;

      for (const vote of votes) {
        totalVotes++;
        weightedVotes += vote.weight;

        if (vote.voteType === 'support') {
          supportVotes++;
          weightedVotes += vote.weight;
        } else if (vote.voteType === 'oppose') {
          opposeVotes++;
          weightedVotes -= vote.weight;
        } else {
          abstainVotes++;
        }
      }

      initiativeScores.set(initiativeId, {
        initiativeId,
        score: weightedVotes,
        rank: 0,
        totalVotes,
        supportVotes,
        opposeVotes,
        abstainVotes,
        weightedVotes,
      });
    }

    this.prioritizedList = [...initiativeScores.values()].sort((a, b) => b.score - a.score);

    for (let i = 0; i < this.prioritizedList.length; i++) {
      const item = this.prioritizedList[i];
      if (item) item.rank = i + 1;
    }
  }

  getPrioritizedList(): PrioritizedInitiative[] {
    return [...this.prioritizedList];
  }

  getAnomalies(): AnomalyDetection[] {
    return [...this.anomalies];
  }

  getInitiativeVotes(initiativeId: string): InitiativeVote[] {
    return this.votes.get(initiativeId) ?? [];
  }
}

interface InitiativeVote {
  initiativeId: string;
  voterId: string;
  weight: number;
  voteType: 'support' | 'oppose' | 'abstain';
  rationale?: string;
  votedAt: string;
}