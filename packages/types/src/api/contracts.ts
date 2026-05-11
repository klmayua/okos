import type { UUID } from '../domain/identity.js';

export interface ApiRequest<T = unknown> {
  method: HttpMethod;
  path: string;
  query?: Record<string, string>;
  headers?: Record<string, string>;
  body?: T;
}

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface ApiResponse<T = unknown> {
  statusCode: number;
  body?: T;
  headers?: Record<string, string>;
}

export interface PaginatedRequest {
  page: number;
  limit: number;
  sort?: string;
  order?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: PaginationMeta;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export interface ApiErrorResponse {
  code: string;
  message: string;
  details?: Record<string, unknown>;
  correlationId: string;
}

export interface ApiSuccessResponse<T> {
  data: T;
  meta?: Record<string, unknown>;
}

export interface CreateUserRequest {
  nationalId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  password: string;
}

export interface UpdateUserRequest {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  preferences?: Record<string, unknown>;
}

export interface AuthRequest {
  email: string;
  password: string;
  mfaCode?: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  user: UserResponse;
}

export interface UserResponse {
  id: UUID;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  verifiedAt: string | null;
}

export interface CreatePathwayRequest {
  title: string;
  description: string;
  category: string;
  difficulty: string;
  estimatedDuration: number;
  requirements: Record<string, unknown>[];
  milestones: CreateMilestoneRequest[];
}

export interface CreateMilestoneRequest {
  title: string;
  description: string;
  type: string;
  xpReward: number;
  tasks: CreateTaskRequest[];
}

export interface CreateTaskRequest {
  title: string;
  description: string;
  type: string;
  xpReward: number;
  completionCriteria: string;
}

export interface CreateActionRequest {
  title: string;
  description: string;
  type: string;
  category: string;
  startDate: string;
  endDate?: string;
  location?: ApiGeoPoint;
  targetCount?: number;
  visibility: string;
  tags: string[];
}

export interface ApiGeoPoint {
  lat: number;
  lng: number;
  address?: string;
}

export interface CreateFundRequest {
  title: string;
  description: string;
  type: string;
  targetAmount: number;
  currency: string;
  category: string;
  startDate: string;
  endDate?: string;
}

export interface CreatePulseRequest {
  title: string;
  description: string;
  type: string;
  startDate: string;
  endDate?: string;
  visibility: string;
  questions: CreateQuestionRequest[];
}

export interface CreateQuestionRequest {
  text: string;
  type: string;
  required: boolean;
  options?: { text: string }[];
}

export interface SubmitVoteRequest {
  electionId: UUID;
  ballotId: UUID;
  votes: VoteChoice[];
  signature: string;
}

export interface VoteChoice {
  candidateId: UUID;
  rank?: number;
}

export interface CreatePostRequest {
  communityId: UUID;
  title: string;
  content: string;
  type: string;
  visibility: string;
  tags: string[];
}

export interface SubmitVerificationRequest {
  type: string;
  documents: { type: string; url: string }[];
  data: Record<string, unknown>;
}

export interface CreateProposalRequest {
  title: string;
  description: string;
  type: string;
  category: string;
  deadline: string;
  threshold: number;
}