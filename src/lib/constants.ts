export const ROUTES = {
  QUIZ_END: '/quiz-end',
  INFO: (id: number) => `/quiz/${id}/info`,
  QUESTION: (id: number) => `/quiz/${id}`,
} as const;

export const SELECTION_DELAY = 800;

export const TESTIMONIAL_ANIMATION_DELAY = 2000;
export const TESTIMONIAL_STAGGER_DELAY = 300;

export const ATLY_LOGO = "https://res.cloudinary.com/dn7no8zun/image/upload/v1735326936/atly-logo_eehbj4.png";

export const ATLY_WEBSITE = "https://www.atly.com/";

export const STORAGE_KEYS = {
  ANALYTICS_USER_ID: 'analytics_user_id',
  FIRST_VISIT: 'first_visit',
  USER_SEGMENT_ANSWER: 'user_segment_answer',
} as const; 