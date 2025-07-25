'use client';

import { notFound } from 'next/navigation';
import { useParams } from 'next/navigation';
import { 
  getQuestionById, 
  getTotalQuestions, 
  isMultipleChoiceQuestion,
} from '@/lib/questions';
import { ROUTES } from '@/lib/routes';
import PageLayout from '@/components/layout/PageLayout';
import Section from '@/components/layout/Section';
import ProgressBar from '@/components/ui/ProgressBar';
import QuizAnswers from './QuizAnswers';
import QuestionTracker from './QuestionTracker';

export default function QuestionPage() {
  const params = useParams();
  const questionId = params.questionId as string;
  const questionIdNum = parseInt(questionId, 10);
  const question = getQuestionById(questionIdNum);

  if (!question) {
    return notFound();
  }

  const totalQuestions = getTotalQuestions();
  const progress = (questionIdNum / totalQuestions) * 100;
  
  const getPreviousPageUrl = (): string | null => {
    if (questionIdNum === 1) return null;
    
    const prevQuestionId = questionIdNum - 1;
    const prevQuestion = getQuestionById(prevQuestionId);
    
    return prevQuestion?.info 
      ? ROUTES.INFO(prevQuestionId)
      : ROUTES.QUESTION(prevQuestionId);
  };

  const isMultipleChoice = isMultipleChoiceQuestion(question);
  const previousPageUrl = getPreviousPageUrl();
  
  // Calculate skip URL
  const skipUrl = question.info 
    ? ROUTES.INFO(questionIdNum)
    : questionIdNum + 1 > totalQuestions 
      ? ROUTES.QUIZ_END 
      : ROUTES.QUESTION(questionIdNum + 1);

  return (
    <div className="flex-1">
      <QuestionTracker 
        questionId={questionIdNum}
        questionText={question.question}
      />
      
      <PageLayout variant="default">
        <Section maxWidth="2xl" spacing="sm" className="mt-0 md:mt-0 flex-1 flex flex-col pt-4 md:pt-6">
          <div className="space-y-2 md:space-y-6">
            <h1 className="text-base md:text-4xl font-bold text-white drop-shadow-lg leading-tight">
              {question.question}
            </h1>
            
            <ProgressBar 
              progress={progress}
              backUrl={previousPageUrl}
              skipUrl={skipUrl}
              questionId={questionIdNum}
              questionText={question.question}
              className=""
            />

            {isMultipleChoice && (
              <p className="text-white/80 text-sm">Select all that apply</p>
            )}

            <QuizAnswers 
              question={question}
              isMultipleChoice={isMultipleChoice}
            />
          </div>
        </Section>
      </PageLayout>
    </div>
  );
}