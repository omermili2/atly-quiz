// Core application types and interfaces

import type { QuestionType } from './questions';

/**
 * User segment types based on quiz responses
 */
export type UserSegment = 
  | 'celiac_diagnosed'
  | 'gluten_sensitive' 
  | 'wellness_focused'
  | 'performance_athlete'
  | 'supporting_family'
  | 'unknown';

/**
 * Primary motivation categories
 */
export type PrimaryMotivation = 
  | 'medical_necessity'
  | 'health_conscious'
  | 'lifestyle_choice'
  | 'performance_optimization'
  | 'family_support'
  | 'unknown';

/**
 * Analytics event types for type-safe tracking
 */
export type AnalyticsEventType = 
  | 'Page Viewed'
  | 'Landing Page Loaded'
  | 'Landing Page Interaction'
  | 'Quiz Started'
  | 'Question Viewed'
  | 'Answer Selected'
  | 'Question Skipped'
  | 'Back Navigation'
  | 'Info Page Viewed'
  | 'Quiz Completed'
  | 'Analysis Started'
  | 'Analysis Progress'
  | 'Pricing Page Viewed'
  | 'Plan Selected'
  | 'Checkout Started'
  | 'User Dropped Off'
  | 'Error Occurred'
  | 'User Segment Identified';

/**
 * Pricing plan types
 */
export type PlanType = 'annual' | 'monthly';

/**
 * Landing page interaction types
 */
export type LandingPageAction = 'testimonial_viewed' | 'continue_clicked' | 'logo_clicked';

/**
 * Quiz answer types - can be single string or array of strings
 */
export type QuizAnswer = string | string[];

/**
 * Quiz answers storage interface
 */
export interface QuizAnswers {
  [questionId: number]: QuizAnswer;
}

/**
 * Analytics event properties for different event types
 */
export interface BaseEventProperties {
  session_id: string;
  timestamp: string;
}

export interface PageViewProperties extends BaseEventProperties {
  page: string;
  url: string;
  path: string;
  question_id?: number;
  question_type?: QuestionType;
  info_title?: string;
  event_type?: string;
}

export interface QuestionEventProperties extends BaseEventProperties {
  question_id: number;
  question_text: string;
  question_type: QuestionType;
  answers_so_far?: number;
  time_spent_on_question?: number;
  answer?: QuizAnswer;
  total_answers?: number;
}

// Flexible analytics properties that can accommodate any event type
export interface AnalyticsProperties extends BaseEventProperties {
  // Page and navigation properties
  page?: string;
  url?: string;
  path?: string;
  
  // Question related properties
  question_id?: number;
  question_text?: string;
  question_type?: QuestionType;
  answers_so_far?: number;
  time_spent_on_question?: number;
  answer?: QuizAnswer;
  total_answers?: number;
  
  // Navigation properties
  from_question?: number;
  to_question?: number;
  
  // Analysis and progress properties
  percentage?: number;
  current_step?: string;
  
  // Pricing and plan properties
  plan_type?: PlanType;
  plan_price?: number;
  
  // Landing page properties
  action?: LandingPageAction;
  time_on_page?: number;
  time_to_start?: number;
  
  // Completion and dropout properties
  reason?: string;
  time_spent_before_dropout?: number;
  answers_collected?: number;
  total_time_spent?: number;
  questions_answered?: number;
  questions_skipped?: number;
  completion_rate?: number;
  all_answers?: QuizAnswers;
  
  // Error properties
  error_message?: string;
  error_stack?: string;
  context?: string;
  
  // User segmentation properties
  user_segment?: UserSegment;
  primary_motivation?: PrimaryMotivation;
  total_funnel_time?: number;
  
  // Info page properties
  info_title?: string;
  
  // Generic properties for extensibility
  [key: string]: string | number | boolean | QuizAnswers | QuizAnswer | undefined;
}

/**
 * User properties interface for analytics
 */
export interface UserProperties {
  first_visit?: string;
  last_active?: string;
  quiz_started?: boolean;
  quiz_completed?: boolean;
  quiz_completion_date?: string;
  total_questions_answered?: number;
  questions_skipped?: number;
  time_to_complete_quiz?: number;
  reached_pricing?: boolean;
  user_agent?: string;
  referrer?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  user_segment?: UserSegment;
  primary_motivation?: PrimaryMotivation;
  [key: `question_${number}_answer`]: QuizAnswer;
  last_question_answered?: number;
  final_completion_rate?: number;
  pricing_page_views?: number;
}

/**
 * Component prop interfaces for better type safety
 */
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface SelectableItemProps extends BaseComponentProps {
  isSelected?: boolean;
  onClick?: () => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLDivElement>) => void;
  'aria-label'?: string;
  'aria-pressed'?: boolean;
  'aria-checked'?: boolean;
}

/**
 * Route parameter types
 */
export interface QuestionPageParams {
  questionId: string;
}

/**
 * API response types (for future use)
 */
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

/**
 * Storage operation result types
 */
export interface StorageResult {
  success: boolean;
  error?: string;
}

/**
 * Testimonial interface
 */
export interface Testimonial {
  quote: string;
  name: string;
  avatar: string;
  stars: number;
} 