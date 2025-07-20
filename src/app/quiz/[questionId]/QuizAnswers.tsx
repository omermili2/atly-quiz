'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { type QuizQuestion, getTotalQuestions } from '@/lib/questions';
import { ROUTES } from '@/lib/constants';
import { saveMultipleAnswers } from '@/lib/storage';
import Button from '@/components/ui/Button';
import AnswerCard from './AnswerCard';
import MultipleChoiceCard from './MultipleChoiceCard';

type Props = {
  question: QuizQuestion;
  isMultipleChoice: boolean;
};

export default function QuizAnswers({ question, isMultipleChoice }: Props) {
  const router = useRouter();
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [isAnswerSelected, setIsAnswerSelected] = useState(false);

  const handleMultipleChoiceChange = (answer: string, isSelected: boolean) => {
    const newSelectedAnswers = isSelected
      ? [...selectedAnswers, answer]
      : selectedAnswers.filter(a => a !== answer);
    
    setSelectedAnswers(newSelectedAnswers);
    saveMultipleAnswers(question.id, newSelectedAnswers);
  };

  const handleSingleAnswerSelection = () => {
    setIsAnswerSelected(true);
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
      <div className="grid grid-cols-1 gap-3 md:gap-6">
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
              disabled={isAnswerSelected}
              onSelect={handleSingleAnswerSelection}
            />
          )
        ))}
      </div>

      {isMultipleChoice && (
        <div className="mt-6 md:mt-8">
          <div className={`transition-opacity duration-300 ${
            selectedAnswers.length > 0 ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}>
            <Button
              onClick={handleContinue}
              className="max-w-xs"
              fullWidth
            >
              Continue
            </Button>
          </div>
        </div>
      )}
    </>
  );
} 