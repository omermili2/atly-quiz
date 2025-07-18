'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { type QuizQuestion, getTotalQuestions } from '@/lib/questions';
import AnswerCard from './AnswerCard';
import MultipleChoiceCard from './MultipleChoiceCard';

type Props = {
  question: QuizQuestion;
  isMultipleChoice: boolean;
};

const ROUTES = {
    QUIZ_END: '/quiz-end',
  INFO: (id: number) => `/quiz/${id}/info`,
  QUESTION: (id: number) => `/quiz/${id}`,
} as const;

// Utility function for localStorage operations
function saveAnswersToStorage(questionId: number, answers: string[]) {
  try {
    const savedAnswers = JSON.parse(localStorage.getItem('quizAnswers') || '{}');
    savedAnswers[questionId] = answers;
    localStorage.setItem('quizAnswers', JSON.stringify(savedAnswers));
  } catch (error) {
    console.error('Failed to save answers to localStorage:', error);
  }
}

export default function QuizAnswers({ question, isMultipleChoice }: Props) {
  const router = useRouter();
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);

  const handleMultipleChoiceChange = (answer: string, isSelected: boolean) => {
    const newSelectedAnswers = isSelected
      ? [...selectedAnswers, answer]
      : selectedAnswers.filter(a => a !== answer);
    
    setSelectedAnswers(newSelectedAnswers);
    saveAnswersToStorage(question.id, newSelectedAnswers);
  };

  const handleContinue = () => {
    if (question.info) {
      router.push(ROUTES.INFO(question.id));
    } else {
      const nextId = question.id + 1;
      const totalQuestions = getTotalQuestions();
      const destination = nextId > totalQuestions 
        ? ROUTES.QUIZ_END 
        : ROUTES.QUESTION(nextId);
      router.push(destination);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-6">
        {question.answers.map((answer, index) => (
          isMultipleChoice ? (
            <MultipleChoiceCard
              key={index}
              questionId={question.id}
              answer={answer}
              onSelectionChange={handleMultipleChoiceChange}
            />
          ) : (
            <AnswerCard
              key={index}
              questionId={question.id}
              answer={answer}
            />
          )
        ))}
      </div>

      {/* Continue button for multiple choice */}
      {isMultipleChoice && (
        <div className="mt-8">
          <div className={`transition-opacity duration-300 ${
            selectedAnswers.length > 0 ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}>
            <button
              onClick={handleContinue}
              className="w-full max-w-xs bg-gradient-to-r from-[#ff7eb3] via-[#ff758c] to-[#ff7eb3] text-white font-bold py-4 rounded-xl text-lg shadow-xl hover:scale-105 transition-transform duration-200"
            >
              Continue
            </button>
          </div>
        </div>
      )}
    </>
  );
} 