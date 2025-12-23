// ============================================
// SHARED TYPES & ENUMS
// ============================================

export enum UserRole {
  USER = 'user',
  BUSINESS = 'business',
  ADMIN = 'admin',
  MODERATOR = 'moderator',
}

export enum VerificationStatus {
  PENDING = 'pending',
  VERIFIED = 'verified',
  REJECTED = 'rejected',
}

export enum PetStatus {
  AVAILABLE = 'available',
  PENDING = 'pending',
  ADOPTED = 'adopted',
  BREEDING = 'breeding',
  HIDDEN = 'hidden',
  DECEASED = 'deceased',
}

export enum PetType {
  DOG = 'dog',
  CAT = 'cat',
  BIRD = 'bird',
  RABBIT = 'rabbit',
  HAMSTER = 'hamster',
  OTHER = 'other',
}

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  UNKNOWN = 'unknown',
}

export enum EnergyLevel {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  VERY_HIGH = 'very_high',
}

export enum Size {
  TINY = 'tiny',
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
  GIANT = 'giant',
}

export enum HomeType {
  APARTMENT = 'apartment',
  HOUSE_SMALL = 'house_small',
  HOUSE_MEDIUM = 'house_medium',
  HOUSE_LARGE = 'house_large',
  FARM = 'farm',
}

export enum ExperienceLevel {
  BEGINNER = 'beginner',
  INTERMEDIATE = 'intermediate',
  ADVANCED = 'advanced',
  EXPERT = 'expert',
}

export enum MatchStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
  EXPIRED = 'expired',
}

export enum SwipeAction {
  LIKE = 'like',
  PASS = 'pass',
  SUPER_LIKE = 'super_like',
}

export enum ReportType {
  SPAM = 'spam',
  ABUSE = 'abuse',
  FRAUD = 'fraud',
  INAPPROPRIATE_CONTENT = 'inappropriate_content',
  FAKE_LISTING = 'fake_listing',
  OTHER = 'other',
}

export enum ReportStatus {
  PENDING = 'pending',
  INVESTIGATING = 'investigating',
  RESOLVED = 'resolved',
  DISMISSED = 'dismissed',
}

export enum BookingStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

export enum PaymentStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  FAILED = 'failed',
  REFUNDED = 'refunded',
}

export enum MessageType {
  TEXT = 'text',
  IMAGE = 'image',
  VIDEO = 'video',
  AUDIO = 'audio',
  FILE = 'file',
  LOCATION = 'location',
  PET_INFO = 'pet_info',
  SYSTEM = 'system',
}

export enum DeviceType {
  MOBILE = 'mobile',
  TABLET = 'tablet',
  DESKTOP = 'desktop',
  UNKNOWN = 'unknown',
}

export enum FraudEventType {
  SUSPICIOUS_LISTING = 'suspicious_listing',
  MULTIPLE_ACCOUNTS = 'multiple_accounts',
  RAPID_SWIPES = 'rapid_swipes',
  FAKE_PROFILE = 'fake_profile',
  PAYMENT_FRAUD = 'payment_fraud',
  SPAM_BEHAVIOR = 'spam_behavior',
}

export enum ActionTaken {
  NONE = 'none',
  FLAGGED = 'flagged',
  SUSPENDED = 'suspended',
  BLOCKED = 'blocked',
  REQUIRE_VERIFICATION = 'require_verification',
}

// ============================================
// SHARED INTERFACES
// ============================================

export interface IUser {
  id: string;
  email: string;
  phone?: string;
  role: UserRole;
  verification_status: VerificationStatus;
  first_name?: string;
  last_name?: string;
  display_name?: string;
  avatar_url?: string;
  bio?: string;
  date_of_birth?: Date;
  country?: string;
  city?: string;
  postal_code?: string;
  trust_score: number;
  identity_verified: boolean;
  is_active: boolean;
  is_blocked: boolean;
  email_verified: boolean;
  phone_verified: boolean;
  created_at: Date;
  updated_at: Date;
  last_login?: Date;
}

export interface IUserPreferences {
  id: string;
  user_id: string;
  home_type?: HomeType;
  has_yard: boolean;
  has_children: boolean;
  children_ages?: number[];
  has_other_pets: boolean;
  other_pets_types?: PetType[];
  experience_level: ExperienceLevel;
  years_of_experience: number;
  preferred_pet_types?: PetType[];
  preferred_pet_sizes?: Size[];
  preferred_energy_levels?: EnergyLevel[];
  max_age?: number;
  min_age?: number;
  special_needs_ok: boolean;
  medical_conditions_ok: boolean;
  willing_to_travel_km: number;
  preferred_gender?: Gender[];
  created_at: Date;
  updated_at: Date;
}

export interface IPet {
  id: string;
  owner_id: string;
  name: string;
  pet_type: PetType;
  breed?: string;
  mixed_breed: boolean;
  gender: Gender;
  date_of_birth?: Date;
  age_years?: number;
  age_months?: number;
  weight_kg?: number;
  size?: Size;
  color?: string;
  energy_level?: EnergyLevel;
  temperament?: string[];
  good_with_children?: boolean;
  good_with_dogs?: boolean;
  good_with_cats?: boolean;
  house_trained?: boolean;
  spayed_neutered?: boolean;
  vaccinated?: boolean;
  vaccination_date?: Date;
  microchipped?: boolean;
  microchip_number?: string;
  has_special_needs: boolean;
  special_needs_description?: string;
  medical_conditions?: string[];
  medications?: string[];
  status: PetStatus;
  is_stray: boolean;
  rescue_story?: string;
  pedigree_certified: boolean;
  pedigree_number?: string;
  genetic_tests_done: boolean;
  genetic_test_results?: any;
  breeding_history?: any;
  photos?: string[];
  videos?: string[];
  primary_photo_url?: string;
  city?: string;
  country?: string;
  description?: string;
  adoption_fee?: number;
  approved: boolean;
  approved_by?: string;
  approved_at?: Date;
  flagged: boolean;
  flag_reason?: string;
  view_count: number;
  like_count: number;
  match_count: number;
  created_at: Date;
  updated_at: Date;
}

export interface IMatch {
  id: string;
  user_id: string;
  pet_id: string;
  owner_id: string;
  status: MatchStatus;
  compatibility_score?: number;
  lifestyle_match_score?: number;
  experience_match_score?: number;
  location_score?: number;
  matched_at: Date;
  accepted_at?: Date;
  rejected_at?: Date;
  expires_at?: Date;
  chat_room_id?: string;
  last_message_at?: Date;
  adopted: boolean;
  adoption_date?: Date;
  adoption_notes?: string;
  created_at: Date;
  updated_at: Date;
}

export interface ISwipe {
  id: string;
  user_id: string;
  pet_id: string;
  action: SwipeAction;
  created_at: Date;
}

export interface IReview {
  id: string;
  reviewer_id: string;
  reviewee_id: string;
  match_id?: string;
  rating: number;
  comment?: string;
  communication_rating?: number;
  reliability_rating?: number;
  pet_care_rating?: number;
  is_visible: boolean;
  flagged: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface IBusinessProfile {
  id: string;
  user_id: string;
  business_name: string;
  business_type?: string;
  description?: string;
  business_email?: string;
  business_phone?: string;
  website_url?: string;
  address?: string;
  city?: string;
  country?: string;
  postal_code?: string;
  verified: boolean;
  license_number?: string;
  license_document_url?: string;
  logo_url?: string;
  cover_photo_url?: string;
  photos?: string[];
  business_hours?: any;
  average_rating: number;
  total_reviews: number;
  created_at: Date;
  updated_at: Date;
}

export interface IService {
  id: string;
  business_id: string;
  name: string;
  description?: string;
  category?: string;
  price?: number;
  price_unit?: string;
  discount_percentage?: number;
  duration_minutes?: number;
  max_capacity?: number;
  photos?: string[];
  is_active: boolean;
  is_bookable: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface IBooking {
  id: string;
  service_id: string;
  user_id: string;
  pet_id?: string;
  booking_date: Date;
  booking_time?: string;
  duration_minutes?: number;
  status: BookingStatus;
  total_amount?: number;
  payment_status: PaymentStatus;
  notes?: string;
  created_at: Date;
  updated_at: Date;
  cancelled_at?: Date;
}

export interface IReport {
  id: string;
  reporter_id: string;
  reported_user_id?: string;
  reported_pet_id?: string;
  reported_review_id?: string;
  report_type: ReportType;
  description: string;
  evidence_urls?: string[];
  status: ReportStatus;
  assigned_to?: string;
  moderator_notes?: string;
  resolution?: string;
  resolved_at?: Date;
  created_at: Date;
  updated_at: Date;
}

export interface INotification {
  id: string;
  user_id: string;
  type: string;
  title: string;
  message: string;
  related_user_id?: string;
  related_pet_id?: string;
  related_match_id?: string;
  data?: any;
  read: boolean;
  read_at?: Date;
  created_at: Date;
}

// ============================================
// MESSAGE TYPES (MongoDB)
// ============================================

export interface IChatRoom {
  _id?: string;
  match_id: string;
  participants: IParticipant[];
  pet_id?: string;
  is_active: boolean;
  blocked: boolean;
  blocked_by?: string;
  metadata?: any;
  created_at: Date;
  updated_at: Date;
}

export interface IParticipant {
  user_id: string;
  role: 'adopter' | 'owner';
  last_read_at?: Date;
  notifications_enabled: boolean;
}

export interface IMessage {
  _id?: string;
  chat_room_id: string;
  sender_id: string;
  message_type: MessageType;
  content?: string;
  media_urls?: IMediaAttachment[];
  reply_to?: string;
  metadata?: any;
  read_by?: IReadReceipt[];
  flagged: boolean;
  flag_reason?: string;
  deleted: boolean;
  deleted_at?: Date;
  created_at: Date;
  updated_at: Date;
}

export interface IMediaAttachment {
  url: string;
  type: 'image' | 'video' | 'audio' | 'file';
  thumbnail_url?: string;
  size_bytes?: number;
  mime_type?: string;
}

export interface IReadReceipt {
  user_id: string;
  read_at: Date;
}

export interface IActivityLog {
  _id?: string;
  user_id: string;
  action: string;
  entity_type?: string;
  entity_id?: string;
  details?: any;
  session_id?: string;
  ip_address?: string;
  user_agent?: string;
  device_info?: IDeviceInfo;
  location?: IGeoLocation;
  timestamp: Date;
}

export interface IDeviceInfo {
  device_type: DeviceType;
  os?: string;
  browser?: string;
}

export interface IGeoLocation {
  type: 'Point';
  coordinates: [number, number]; // [longitude, latitude]
}

export interface IUserSession {
  _id?: string;
  user_id: string;
  session_id: string;
  device_info?: {
    device_id?: string;
    device_type?: DeviceType;
    os?: string;
    os_version?: string;
    app_version?: string;
  };
  fcm_token?: string;
  apns_token?: string;
  is_active: boolean;
  last_activity_at: Date;
  created_at: Date;
  expires_at: Date;
}

export interface IFraudLog {
  _id?: string;
  user_id: string;
  event_type: FraudEventType;
  risk_score: number;
  risk_factors?: IRiskFactor[];
  entity_id?: string;
  entity_type?: string;
  action_taken: ActionTaken;
  reviewed: boolean;
  reviewed_by?: string;
  review_notes?: string;
  timestamp: Date;
}

export interface IRiskFactor {
  factor: string;
  weight: number;
  description?: string;
}

// ============================================
// DTO TYPES
// ============================================

export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  phone?: string;
  role?: UserRole;
}

export interface OAuthLoginDto {
  provider: 'google' | 'apple' | 'line';
  token: string;
  profile?: any;
}

export interface CreatePetDto {
  name: string;
  pet_type: PetType;
  breed?: string;
  gender: Gender;
  date_of_birth?: Date;
  description?: string;
  photos?: string[];
}

export interface UpdatePetDto extends Partial<CreatePetDto> {
  status?: PetStatus;
}

export interface SwipeDto {
  pet_id: string;
  action: SwipeAction;
}

export interface SendMessageDto {
  chat_room_id: string;
  message_type: MessageType;
  content?: string;
  media_urls?: IMediaAttachment[];
  reply_to?: string;
}

export interface CreateReportDto {
  reported_user_id?: string;
  reported_pet_id?: string;
  reported_review_id?: string;
  report_type: ReportType;
  description: string;
  evidence_urls?: string[];
}

// ============================================
// API RESPONSE TYPES
// ============================================

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  timestamp: Date;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  total_pages: number;
  has_next: boolean;
  has_prev: boolean;
}

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  user: IUser;
}

export interface MatchRecommendation {
  pet: IPet;
  owner: IUser;
  compatibility_score: number;
  lifestyle_match_score: number;
  experience_match_score: number;
  location_score: number;
  distance_km?: number;
  reasons: string[];
}

export interface TrustScoreBreakdown {
  total_score: number;
  profile_completeness: number;
  verification_score: number;
  review_score: number;
  activity_score: number;
  time_on_platform_score: number;
}

// ============================================
// ML SERVICE TYPES
// ============================================

export interface RecommendationRequest {
  user_id: string;
  user_preferences: IUserPreferences;
  location?: IGeoLocation;
  limit?: number;
  exclude_pet_ids?: string[];
}

export interface RecommendationResponse {
  recommendations: MatchRecommendation[];
  model_version: string;
  timestamp: Date;
}

export interface FraudDetectionRequest {
  user_id: string;
  action: string;
  entity_id?: string;
  entity_type?: string;
  context?: any;
}

export interface FraudDetectionResponse {
  is_suspicious: boolean;
  risk_score: number;
  risk_factors: IRiskFactor[];
  recommended_action: ActionTaken;
  explanation: string;
}

export interface BreedingCompatibilityRequest {
  pet_a_id: string;
  pet_b_id: string;
}

export interface BreedingCompatibilityResponse {
  compatible: boolean;
  compatibility_score: number;
  inbreeding_risk: number;
  health_risk_score: number;
  warnings: string[];
  recommendations: string[];
}

// ============================================
// EVENT TYPES (Message Queue)
// ============================================

export interface BaseEvent {
  event_id: string;
  event_type: string;
  timestamp: Date;
  source_service: string;
}

export interface UserCreatedEvent extends BaseEvent {
  event_type: 'user.created';
  user_id: string;
  user: IUser;
}

export interface PetCreatedEvent extends BaseEvent {
  event_type: 'pet.created';
  pet_id: string;
  owner_id: string;
  pet: IPet;
}

export interface MatchCreatedEvent extends BaseEvent {
  event_type: 'match.created';
  match_id: string;
  user_id: string;
  pet_id: string;
  owner_id: string;
}

export interface MessageSentEvent extends BaseEvent {
  event_type: 'message.sent';
  message_id: string;
  chat_room_id: string;
  sender_id: string;
  recipient_id: string;
}

export interface AdoptionCompletedEvent extends BaseEvent {
  event_type: 'adoption.completed';
  match_id: string;
  user_id: string;
  pet_id: string;
  adoption_date: Date;
}

export type AppEvent =
  | UserCreatedEvent
  | PetCreatedEvent
  | MatchCreatedEvent
  | MessageSentEvent
  | AdoptionCompletedEvent;
