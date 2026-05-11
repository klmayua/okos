export interface Discussion {
  initiativeId: string;
  comments: Comment[];
  amendments: Amendment[];
  objections: Objection[];
  feasibilityScore: number;
  sentimentAnalysis: SentimentAnalysis;
  civicHealthScore: number;
}

export interface Comment {
  id: string;
  authorId: string;
  content: string;
  upvotes: number;
  downvotes: number;
  isExpertReview: boolean;
  factChecks: FactCheck[];
  flags: ModerationFlag[];
  createdAt: string;
  updatedAt: string;
}

export interface Amendment {
  id: string;
  authorId: string;
  originalText: string;
  proposedText: string;
  rationale: string;
  status: 'pending' | 'accepted' | 'rejected';
  votes: number;
  createdAt: string;
}

export interface Objection {
  id: string;
  authorId: string;
  content: string;
  severity: 'minor' | 'moderate' | 'severe' | 'blocking';
  resolved: boolean;
  resolution?: string;
  createdAt: string;
}

export interface FactCheck {
  id: string;
  claim: string;
  verified: boolean;
  verdict: 'true' | 'false' | 'unverified' | 'misleading';
  source?: string;
  checkedAt: string;
}

export interface ModerationFlag {
  type: 'abuse' | 'hate_speech' | 'misinformation' | 'coordinated_manipulation' | 'spam';
  severity: 'low' | 'medium' | 'high';
  flaggedBy: string;
  resolved: boolean;
  createdAt: string;
}

export interface SentimentAnalysis {
  overallSentiment: 'positive' | 'neutral' | 'negative';
  confidence: number;
  keyThemes: string[];
  concerns: string[];
  supportLevel: number;
}

export class DeliberationEngine {
  private discussions = new Map<string, Discussion>();

  async createDiscussion(initiativeId: string): Promise<Discussion> {
    const discussion: Discussion = {
      initiativeId,
      comments: [],
      amendments: [],
      objections: [],
      feasibilityScore: 0,
      sentimentAnalysis: {
        overallSentiment: 'neutral',
        confidence: 0,
        keyThemes: [],
        concerns: [],
        supportLevel: 0,
      },
      civicHealthScore: 100,
    };
    this.discussions.set(initiativeId, discussion);
    return discussion;
  }

  async addComment(initiativeId: string, authorId: string, content: string, isExpertReview: boolean = false): Promise<Comment> {
    const discussion = this.discussions.get(initiativeId);
    if (!discussion) throw new Error('Discussion not found');

    const comment: Comment = {
      id: `cmt_${Date.now()}`,
      authorId,
      content,
      upvotes: 0,
      downvotes: 0,
      isExpertReview,
      factChecks: [],
      flags: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    discussion.comments.push(comment);
    this.updateSentiment(discussion);
    return comment;
  }

  async submitAmendment(initiativeId: string, authorId: string, originalText: string, proposedText: string, rationale: string): Promise<Amendment> {
    const discussion = this.discussions.get(initiativeId);
    if (!discussion) throw new Error('Discussion not found');

    const amendment: Amendment = {
      id: `amd_${Date.now()}`,
      authorId,
      originalText,
      proposedText,
      rationale,
      status: 'pending',
      votes: 0,
      createdAt: new Date().toISOString(),
    };

    discussion.amendments.push(amendment);
    return amendment;
  }

  async submitObjection(initiativeId: string, authorId: string, content: string, severity: 'minor' | 'moderate' | 'severe' | 'blocking'): Promise<Objection> {
    const discussion = this.discussions.get(initiativeId);
    if (!discussion) throw new Error('Discussion not found');

    const objection: Objection = {
      id: `obj_${Date.now()}`,
      authorId,
      content,
      severity,
      resolved: false,
      createdAt: new Date().toISOString(),
    };

    discussion.objections.push(objection);
    return objection;
  }

  private updateSentiment(discussion: Discussion): void {
    const positiveComments = discussion.comments.filter(c => c.upvotes > c.downvotes).length;
    const totalComments = discussion.comments.length;
    discussion.sentimentAnalysis.supportLevel = totalComments > 0 ? positiveComments / totalComments : 0;
  }

  calculateFeasibilityScore(discussion: Discussion): number {
    const expertReviews = discussion.comments.filter(c => c.isExpertReview).length;
    const unresolvedObjections = discussion.objections.filter((o: Objection) => !o.resolved).length;
    const score = Math.min(100, (expertReviews * 10) - (unresolvedObjections * 5));
    return Math.max(0, score);
  }

  calculateCivicHealthScore(discussion: Discussion): number {
    const flags = discussion.comments.flatMap(c => c.flags).filter(f => !f.resolved).length;
    const spam = discussion.comments.filter(c => c.flags.some(f => f.type === 'spam')).length;
    return Math.max(0, 100 - (flags * 5) - (spam * 2));
  }

  getDiscussion(initiativeId: string): Discussion | undefined {
    return this.discussions.get(initiativeId);
  }
}