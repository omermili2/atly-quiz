'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getTotalQuestions, type QuizQuestion } from '@/lib/questions';
import { ROUTES } from '@/lib/routes';
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
      <div className="grid grid-cols-1 gap-6 md:gap-6">
        {question.answers.map((answer: string, index: number) => (
          isMultipleChoice ? (
            <MultipleChoiceCard
              key={index}
              questionId={question.id}
              questionText={question.question}
              answer={answer}
              onSelectionChange={handleMultipleChoiceChange}
            />
          ) : (
            <AnswerCard
              key={index}
              questionId={question.id}
              questionText={question.question}
              answer={answer}
              disabled={isAnswerSelected}
              onSelect={handleSingleAnswerSelection}
            />
          )
        ))}
      </div>

      {isMultipleChoice && (
        <div className="mt-4 md:mt-8">
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