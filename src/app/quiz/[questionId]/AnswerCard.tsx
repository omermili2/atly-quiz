'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Check } from 'lucide-react';
import { getQuestionById, getTotalQuestions } from '@/lib/questions';
import { ROUTES, SELECTION_DELAY } from '@/lib/constants';
import Card from '@/components/ui/Card';
import analytics from '@/lib/analytics';

type Props = {
  questionId: number;
  answer: string;
  disabled?: boolean;
  onSelect?: () => void;
};

function getNextRoute(questionId: number): string {
  const currentQuestion = getQuestionById(questionId);
  const totalQuestions = getTotalQuestions();
  
  if (currentQuestion?.info) {
    return ROUTES.INFO(questionId);
  }
  
  const nextId = questionId + 1;
  return nextId <= totalQuestions 
    ? ROUTES.QUESTION(nextId) 
    : ROUTES.QUIZ_END;
}

export default function AnswerCard({ questionId, answer, disabled = false, onSelect }: Props) {
  const router = useRouter();
  const [isSelected, setIsSelected] = useState(false);

  const handleSelect = () => {
    if (isSelected || disabled) return;
    
    setIsSelected(true);
    onSelect?.();
    
    analytics.trackAnswerSelected(questionId, answer, 'single');
    
    setTimeout(() => {
      const nextRoute = getNextRoute(questionId);
      router.push(nextRoute);
    }, SELECTION_DELAY);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleSelect();
    }
  };

  return (
    <Card
      isSelected={isSelected}
      onClick={handleSelect}
      onKeyDown={handleKeyDown}
      ariaPressed={isSelected}
      className={disabled && !isSelected ? 'pointer-events-none' : ''}
    >
      <div className="flex items-center justify-between">
        <p className={`text-sm md:text-lg font-semibold leading-snug break-words hyphens-none pr-2 flex-1 text-left ${
          isSelected ? 'text-white' : 'text-[#2b2e7a]'
        }`}>
          {answer}
        </p>
        {isSelected && (
          <div
            className="bg-white/25 rounded-full h-5 w-5 md:h-6 md:w-6 flex items-center justify-center transition-all duration-300 ml-3 flex-shrink-0"
            aria-hidden="true"
          >
            <Check size={14} className="text-white md:w-4 md:h-4" />
          </div>
        )}
      </div>
    </Card>
  );
}