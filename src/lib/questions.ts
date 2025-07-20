/**
 * Quiz Configuration and Data Types
 */

export type QuestionType = 'single' | 'multiple';

export interface InfoSection {
  title: string;
  text: string;
}

export interface QuizQuestion {
  id: number;
  type: QuestionType;
  question: string;
  answers: string[];
  info?: InfoSection;
}


export const QUESTION_TYPES = {
  SINGLE: 'single' as const,
  MULTIPLE: 'multiple' as const,
} as const;


export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    type: QUESTION_TYPES.SINGLE,
    question: "What's your main reason for eating gluten-free?",
    answers: [
      "I have a Celiac disease diagnosis",
      "I suspect I have a non-celiac gluten sensitivity",
      "It is a wellness & lifestyle choice",
      "I'm an athlete looking for a performance edge.",
      "To support a friend or family member",
    ],
    info: {
      title: "Personalized for You",
      text: "Atly tailors your experience based on your motivation so you get the most relevant tips, restaurants, and products for your gluten-free journey."
    },
  },
  {
    id: 2,
    type: QUESTION_TYPES.MULTIPLE,
    question: "When choosing a place, what matters most to you?",
    answers: [
      "Staff knowledge & cross-contamination details",
      "Reviews from people with my condition",
      "Specific GF menu items",
      "The restaurant's overall rating & vibe",
    ],
    info: {
      title: "Find Gluten-Free Places Fast",
      text: "Atly's map and reviews help you quickly discover safe gluten-free restaurants and stores, wherever you are."
    },
  },
  {
    id: 3,
    type: QUESTION_TYPES.MULTIPLE,
    question: "Before today, where did you usually look for gluten-free friendly places?",
    answers: [
      "General map apps (e.g., Google Maps)",
      "Social media",
      "Dedicated gluten-free blogs or websites",
      "Recommendations from friends or community groups",
      "I don't have a go-to source",
    ],
  },
  {
    id: 4,
    type: QUESTION_TYPES.MULTIPLE,
    question: "What types of places do you need help finding?",
    answers: [
      "Restaurants",
      "Cafes & Bakeries",
      "Bars & Pubs",
      "Grocery Stores",
      "Options while traveling",
    ],
    info: {
      title: "Delicious Recipes & Tips",
      text: "Get access to a curated library of gluten-free recipes, meal plans, and cooking tips for every lifestyle."
    },
  },
  {
    id: 5,
    type: QUESTION_TYPES.MULTIPLE,
    question: "What are you hoping to achieve?",
    answers: [
      "Reduce anxiety when dining out or ordering online",
      "Discover new & tasty gluten-free spots",
      "Save time on searching places to eat",
      "Make traveling easier",
    ],
    info: {
      title: "Guidance at Every Step",
      text: "Whether you're new or experienced, Atly provides resources, guides, and community support tailored to your level."
    },
  },
];

export const getQuestionById = (id: number): QuizQuestion | undefined => {
  return quizQuestions.find(question => question.id === id);
};

export const getTotalQuestions = (): number => {
  return quizQuestions.length;
};

export const isMultipleChoiceQuestion = (question: QuizQuestion): boolean => {
  return question.type === QUESTION_TYPES.MULTIPLE;
};

export const isSingleChoiceQuestion = (question: QuizQuestion): boolean => {
  return question.type === QUESTION_TYPES.SINGLE;
};