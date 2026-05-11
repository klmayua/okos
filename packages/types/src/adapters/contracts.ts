import type { UUID } from '../domain/identity.js';

export interface AdapterResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: AdapterError;
  metadata?: Record<string, unknown>;
}

export interface AdapterError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

export interface StorageAdapter {
  upload(params: UploadParams): Promise<AdapterResponse<StorageFile>>;
  download(params: DownloadParams): Promise<AdapterResponse<Buffer>>;
  delete(params: DeleteParams): Promise<AdapterResponse<void>>;
  list(params: ListParams): Promise<AdapterResponse<StorageFile[]>>;
  getSignedUrl(params: SignedUrlParams): Promise<AdapterResponse<string>>;
}

export interface UploadParams {
  bucket: string;
  key: string;
  body: Buffer | string;
  contentType: string;
  metadata?: Record<string, string>;
}

export interface DownloadParams {
  bucket: string;
  key: string;
}

export interface DeleteParams {
  bucket: string;
  key: string;
}

export interface ListParams {
  bucket: string;
  prefix?: string;
  maxKeys?: number;
  continuationToken?: string;
}

export interface SignedUrlParams {
  bucket: string;
  key: string;
  expiresIn: number;
  action: 'read' | 'write' | 'delete';
}

export interface StorageFile {
  key: string;
  size: number;
  contentType: string;
  lastModified: string;
  metadata: Record<string, string>;
}

export interface MessagingAdapter {
  send(params: MessageParams): Promise<AdapterResponse<MessageResult>>;
  sendTemplate(params: TemplateMessageParams): Promise<AdapterResponse<MessageResult>>;
  getStatus(messageId: string): Promise<AdapterResponse<MessageStatus>>;
  getWebhooks(): Promise<AdapterResponse<WebhookEndpoint[]>>;
}

export type MessageChannel = 'email' | 'sms' | 'push' | 'whatsapp' | 'voice';

export interface MessageParams {
  channel: MessageChannel;
  to: string | string[];
  from?: string;
  subject?: string;
  body: string;
  attachments?: Attachment[];
  metadata?: Record<string, unknown>;
}

export interface TemplateMessageParams {
  channel: MessageChannel;
  to: string | string[];
  templateId: string;
  variables: Record<string, string>;
  metadata?: Record<string, unknown>;
}

export interface MessageResult {
  messageId: string;
  channel: MessageChannel;
  status: 'sent' | 'queued' | 'failed';
  sentAt: string;
}

export interface MessageStatus {
  messageId: string;
  status: 'pending' | 'sent' | 'delivered' | 'failed' | 'read';
  deliveredAt?: string;
  error?: string;
}

export interface Attachment {
  url: string;
  name: string;
  type: string;
}

export interface WebhookEndpoint {
  id: string;
  url: string;
  events: string[];
  active: boolean;
}

export interface GeoAdapter {
  reverseGeocode(params: GeoPointParams): Promise<AdapterResponse<GeoAddress>>;
  forwardGeocode(params: AddressParams): Promise<AdapterResponse<GeoPoint>>;
  getWard(code: string): Promise<AdapterResponse<WardInfo>>;
  getConstituency(code: string): Promise<AdapterResponse<ConstituencyInfo>>;
  getRegion(code: string): Promise<AdapterResponse<RegionInfo>>;
}

export interface GeoPointParams {
  lat: number;
  lng: number;
}

export interface AddressParams {
  address: string;
  country?: string;
}

export interface GeoPoint {
  lat: number;
  lng: number;
}

export interface GeoAddress {
  formatted: string;
  wardCode: string;
  constituencyCode: string;
  regionCode: string;
  country: string;
}

export interface WardInfo {
  code: string;
  name: string;
  constituencyCode: string;
  regionCode: string;
}

export interface ConstituencyInfo {
  code: string;
  name: string;
  regionCode: string;
  wardCount: number;
}

export interface RegionInfo {
  code: string;
  name: string;
  constituencyCount: number;
}

export interface AIAdapter {
  moderate(params: ModerateParams): Promise<AdapterResponse<ModerationResult>>;
  translate(params: TranslateParams): Promise<AdapterResponse<string>>;
  extractText(params: ExtractTextParams): Promise<AdapterResponse<string>>;
  generate(params: GenerateParams): Promise<AdapterResponse<string>>;
}

export interface ModerateParams {
  content: string;
  type: 'text' | 'image';
}

export interface TranslateParams {
  text: string;
  from: string;
  to: string;
}

export interface ExtractTextParams {
  url: string;
  type: 'url' | 'image';
}

export interface GenerateParams {
  prompt: string;
  maxTokens?: number;
  temperature?: number;
}

export interface ModerationResult {
  flagged: boolean;
  categories: Record<string, number>;
  suggestedAction?: 'approve' | 'review' | 'reject';
}

export interface SearchAdapter {
  index(params: IndexParams): Promise<AdapterResponse<void>>;
  search(params: SearchParams): Promise<AdapterResponse<SearchResult[]>>;
  delete(params: DeleteParams): Promise<AdapterResponse<void>>;
  suggest(params: SuggestParams): Promise<AdapterResponse<string[]>>;
}

export interface IndexParams {
  index: string;
  id: string;
  document: Record<string, unknown>;
}

export interface SearchParams {
  index: string;
  query: string;
  filters?: Record<string, unknown>;
  page?: number;
  limit?: number;
}

export interface SearchResult {
  id: string;
  score: number;
  document: Record<string, unknown>;
  highlights?: Record<string, string[]>;
}

export interface SuggestParams {
  index: string;
  field: string;
  prefix: string;
  limit?: number;
}

export interface PaymentAdapter {
  createPayment(params: PaymentParams): Promise<AdapterResponse<Payment>>;
  verifyPayment(paymentId: string): Promise<AdapterResponse<Payment>>;
  refundPayment(refundId: string): Promise<AdapterResponse<Refund>>;
}

export interface PaymentParams {
  amount: number;
  currency: string;
  customerId: string;
  description: string;
  metadata?: Record<string, unknown>;
}

export interface Payment {
  id: UUID;
  amount: number;
  currency: string;
  status: 'pending' | 'processing' | 'succeeded' | 'failed' | 'cancelled';
  customerId: string;
  description: string;
  createdAt: string;
  metadata: Record<string, unknown>;
}

export interface Refund {
  id: UUID;
  paymentId: string;
  amount: number;
  status: 'pending' | 'succeeded' | 'failed';
  createdAt: string;
}