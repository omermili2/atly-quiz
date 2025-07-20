export const ROUTES = {
  QUIZ_END: '/quiz-end',
  INFO: (id: number) => `/quiz/${id}/info`,
  QUESTION: (id: number) => `/quiz/${id}`,
} as const;

export const SELECTION_DELAY = 200;

export const TESTIMONIAL_ANIMATION_DELAY = 50;
export const TESTIMONIAL_STAGGER_DELAY = 100;

export const ATLY_LOGO = "/atly-logo.png";

export const ATLY_WEBSITE = "https://www.atly.com/";

export const STORAGE_KEYS = {
  ANALYTICS_USER_ID: 'analytics_user_id',
  FIRST_VISIT: 'first_visit',
  USER_SEGMENT_ANSWER: 'user_segment_answer',
} as const; 