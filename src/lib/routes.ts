export const ROUTES = {
  QUIZ_END: '/quiz-end',
  INFO: (id: number) => `/quiz/${id}/info`,
  QUESTION: (id: number) => `/quiz/${id}`,
} as const; 