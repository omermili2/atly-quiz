// src/app/quiz/[questionId]/AnswerCard.tsx
'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Check } from 'lucide-react';
import { getQuestionById, getTotalQuestions } from '@/lib/questions';
import analytics from '@/lib/analytics';

type Props = {
  questionId: number;
  answer: string;
};

const SELECTION_DELAY = 400;
const ROUTES = {
  QUIZ_END: '/quiz-end',
  INFO: (id: number) => `/quiz/${id}/info`,
  QUESTION: (id: number) => `/quiz/${id}`,
} as const;

// Utility function for localStorage operations
function saveSingleAnswerToStorage(questionId: number, answer: string): void {
  try {
    const savedAnswers = JSON.parse(localStorage.getItem('quizAnswers') || '{}');
    savedAnswers[questionId] = answer;
    localStorage.setItem('quizAnswers', JSON.stringify(savedAnswers));
  } catch (error) {
    console.error('Failed to save answer to localStorage:', error);
  }
}

// Navigation logic for single choice questions
function getNextRoute(questionId: number): string {
  const currentQuestion = getQuestionById(questionId);
  const totalQuestions = getTotalQuestions();
  
  // If current question has info, go to info page
  if (currentQuestion?.info) {
    return ROUTES.INFO(questionId);
  }
  
  // Otherwise go to next question or loader
  const nextId = questionId + 1;
  return nextId <= totalQuestions 
    ? ROUTES.QUESTION(nextId) 
    : ROUTES.QUIZ_END;
}

export default function AnswerCard({ questionId, answer }: Props) {
  const router = useRouter();
  const [isSelected, setIsSelected] = useState(false);

  const handleSelect = () => {
    // Prevent double selection
    if (isSelected) return;
    
    // Update UI state
    setIsSelected(true);
    
    // Track answer selection
    analytics.trackAnswerSelected(questionId, answer, 'single');
    
    // Save answer
    saveSingleAnswerToStorage(questionId, answer);
    
    // Navigate after delay for visual feedback
    setTimeout(() => {
      const nextRoute = getNextRoute(questionId);
      router.push(nextRoute);
    }, SELECTION_DELAY);
  };

  return (
    <div
      className={`
        w-full p-4 sm:p-4 md:p-6 rounded-2xl cursor-pointer transition-all duration-300 min-h-[56px] flex items-center
        ${isSelected 
          ? 'bg-gradient-to-r from-[#ff7eb3] to-[#ff758c] text-white shadow-lg transform scale-[0.98]' 
          : 'bg-white/95 hover:bg-white border border-white/50 hover:border-[#ff7eb3]/50 shadow-md hover:shadow-xl active:scale-[0.98]'
        }
      `}
      onClick={handleSelect}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleSelect();
        }
      }}
      aria-pressed={isSelected}
    >
      <div className="flex items-center justify-between w-full">
        <p className={`text-sm sm:text-base md:text-lg font-semibold leading-relaxed pr-3 ${
          isSelected ? 'text-white' : 'text-[#2b2e7a]'
        }`}>
          {answer}
        </p>
        {isSelected && (
          <div
            className="bg-white/25 rounded-full h-7 w-7 sm:h-6 sm:w-6 flex items-center justify-center transition-all duration-300 flex-shrink-0"
            aria-hidden="true"
          >
            <Check size={16} className="text-white" />
          </div>
        )}
      </div>
    </div>
  );
}