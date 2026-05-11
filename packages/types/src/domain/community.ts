import type { UUID, DateTimeISO, BaseEntity } from './identity.js';

export interface Community extends BaseEntity {
  name: string;
  slug: string;
  description: string;
  type: CommunityType;
  status: CommunityStatus;
  visibility: 'public' | 'private' | 'invite_only';
  ownerId: UUID;
  rules: string[];
  imageUrl: string | null;
  memberCount: number;
  postCount: number;
  createdAt: DateTimeISO;
}

export type CommunityType = 
  | 'neighborhood'
  | 'ward'
  | 'constituency'
  | 'region'
  | 'interest'
  | 'issue'
  | 'project';

export type CommunityStatus = 'active' | 'inactive' | 'archived';

export interface CommunityMember extends BaseEntity {
  communityId: UUID;
  userId: UUID;
  role: MemberRole;
  joinedAt: DateTimeISO;
  contributions: number;
  status: 'active' | 'suspended';
}

export type MemberRole = 'member' | 'moderator' | 'admin' | 'owner';

export interface Post extends BaseEntity {
  communityId: UUID;
  authorId: UUID;
  title: string;
  content: string;
  type: PostType;
  status: PostStatus;
  visibility: 'public' | 'members' | 'connections';
  pinned: boolean;
  locked: boolean;
  upvotes: number;
  downvotes: number;
  commentCount: number;
  shareCount: number;
  tags: string[];
  attachments: string[];
}

export type PostType = 'text' | 'image' | 'video' | 'link' | 'event' | 'poll';
export type PostStatus = 'draft' | 'published' | 'removed' | 'archived';

export interface Comment extends BaseEntity {
  postId: UUID;
  authorId: UUID;
  parentId: UUID | null;
  content: string;
  upvotes: number;
  downvotes: number;
  status: 'published' | 'hidden' | 'deleted';
}

export interface Discussion extends BaseEntity {
  communityId: UUID;
  title: string;
  description: string;
  createdBy: UUID;
  status: 'active' | 'closed' | 'archived';
  participantCount: number;
}

export interface CommunityEvent extends BaseEntity {
  communityId: UUID;
  title: string;
  description: string;
  type: 'meeting' | 'workshop' | 'rally' | 'volunteer' | 'social';
  startDate: DateTimeISO;
  endDate: DateTimeISO | null;
  location: string | null;
  isVirtual: boolean;
  rsvpCount: number;
  createdBy: UUID;
  status: 'scheduled' | 'ongoing' | 'completed' | 'cancelled';
}