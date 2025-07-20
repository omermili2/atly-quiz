'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Check } from 'lucide-react';
import { getQuestionById, getTotalQuestions } from '@/lib/questions';
import { ROUTES, SELECTION_DELAY } from '@/lib/constants';
import { saveSingleAnswer } from '@/lib/storage';
import Card from '@/components/ui/Card';
import analytics from '@/lib/analytics';

type Props = {
  questionId: number;
  answer: string;
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

export default function AnswerCard({ questionId, answer }: Props) {
  const router = useRouter();
  const [isSelected, setIsSelected] = useState(false);

  const handleSelect = () => {
    if (isSelected) return;
    
    setIsSelected(true);
    
    analytics.trackAnswerSelected(questionId, answer, 'single');
    
    saveSingleAnswer(questionId, answer);
    
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
    </Card>
  );
}