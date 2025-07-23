export type PlanType = 'annual' | 'monthly';

export type QuizAnswer = string | string[];

export interface Testimonial {
  quote: string;
  name: string;
  avatar: string;
  stars: number;
} 