import type { UUID, DateTimeISO, BaseEntity } from './identity.js';

export interface Pathway extends BaseEntity {
  title: string;
  slug: string;
  description: string;
  category: PathwayCategory;
  status: PathwayStatus;
  difficulty: PathwayDifficulty;
  estimatedDuration: number;
  imageUrl: string | null;
  tags: string[];
  requirements: PathwayRequirement[];
  milestones: PathwayMilestone[];
  createdBy: UUID;
  publishedAt: DateTimeISO | null;
}

export type PathwayCategory = 
  | 'civic_education'
  | 'volunteering'
  | 'leadership'
  | 'advocacy'
  | 'community_building'
  | 'policy'
  | 'election';

export type PathwayStatus = 'draft' | 'published' | 'archived' | 'featured';

export type PathwayDifficulty = 'beginner' | 'intermediate' | 'advanced' | 'expert';

export interface PathwayRequirement {
  type: 'age' | 'location' | 'membership' | 'verification' | 'skill';
  condition: string;
  metadata?: Record<string, unknown>;
}

export interface PathwayMilestone extends BaseEntity {
  pathwayId: UUID;
  title: string;
  description: string;
  order: number;
  type: MilestoneType;
  xpReward: number;
  badgeRewardId: UUID | null;
  tasks: PathwayTask[];
}

export type MilestoneType = 'learning' | 'action' | 'reflection' | 'collaboration';

export interface PathwayTask extends BaseEntity {
  milestoneId: UUID;
  title: string;
  description: string;
  type: TaskType;
  order: number;
  xpReward: number;
  completionCriteria: string;
  resources: TaskResource[];
  deadline: DateTimeISO | null;
}

export type TaskType = 
  | 'read'
  | 'watch'
  | 'quiz'
  | 'survey'
  | 'action'
  | 'reflection'
  | 'collaboration'
  | 'event';

export interface TaskResource {
  id: UUID;
  type: 'article' | 'video' | 'document' | 'link' | 'quiz';
  title: string;
  url: string;
}

export interface PathwayProgress extends BaseEntity {
  pathwayId: UUID;
  userId: UUID;
  status: 'not_started' | 'in_progress' | 'completed';
  startedAt: DateTimeISO | null;
  completedAt: DateTimeISO | null;
  currentMilestoneId: UUID | null;
  milestoneProgress: MilestoneProgress[];
  totalXp: number;
}

export interface MilestoneProgress {
  milestoneId: UUID;
  status: 'locked' | 'unlocked' | 'in_progress' | 'completed';
  completedTasks: UUID[];
  xpEarned: number;
  completedAt: DateTimeISO | null;
}

export interface LearningRecord extends BaseEntity {
  userId: UUID;
  pathwayId: UUID;
  taskId: UUID;
  type: TaskType;
  score: number | null;
  completedAt: DateTimeISO;
  timeSpent: number;
}