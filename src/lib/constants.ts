export const ROUTES = {
  QUIZ_END: '/quiz-end',
  INFO: (id: number) => `/quiz/${id}/info`,
  QUESTION: (id: number) => `/quiz/${id}`,
} as const;

export const ATLY_LOGO = "/atly-logo.png";

export const SELECTION_DELAY = 400;
export const TESTIMONIAL_ANIMATION_DELAY = 250;
export const TESTIMONIAL_STAGGER_DELAY = 120;

export const ATLY_WEBSITE = "https://www.atly.com/";

export const STORAGE_KEYS = {
  QUIZ_ANSWERS: 'quizAnswers',
  ANALYTICS_USER_ID: 'analytics_user_id',
  FIRST_VISIT: 'first_visit',
} as const; 