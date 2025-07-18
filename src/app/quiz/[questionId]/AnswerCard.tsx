// src/app/quiz/[questionId]/AnswerCard.tsx
'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Check } from 'lucide-react';
import { getQuestionById, getTotalQuestions } from '@/lib/questions';

type Props = {
  questionId: number;
  answer: string;
  nextPage: string;
};

const SELECTION_DELAY = 400;
const ROUTES = {
  PRE_SUMMARY: '/pre-summary',
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
  
  // Otherwise go to next question or summary
  const nextId = questionId + 1;
  return nextId <= totalQuestions 
    ? ROUTES.QUESTION(nextId) 
    : ROUTES.PRE_SUMMARY;
}

export default function AnswerCard({ questionId, answer, nextPage }: Props) {
  const router = useRouter();
  const [isSelected, setIsSelected] = useState(false);

  const handleSelect = () => {
    // Prevent double selection
    if (isSelected) return;
    
    // Update UI state
    setIsSelected(true);
    
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
        w-full p-4 rounded-2xl cursor-pointer transition-all duration-300
        ${isSelected 
          ? 'bg-gradient-to-r from-[#ff7eb3] to-[#ff758c] text-white shadow-lg' 
          : 'bg-white/95 hover:bg-white border border-white/50 hover:border-[#ff7eb3]/50 shadow-md hover:shadow-xl'
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
      <div className="flex items-center justify-between">
        <p className={`text-base md:text-lg font-semibold ${
          isSelected ? 'text-white' : 'text-[#2b2e7a]'
        }`}>
          {answer}
        </p>
        {isSelected && (
          <div
            className="bg-white/25 rounded-full h-6 w-6 flex items-center justify-center transition-all duration-300"
            aria-hidden="true"
          >
            <Check size={16} className="text-white" />
          </div>
        )}
      </div>
    </div>
  );
}