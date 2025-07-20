import { notFound } from 'next/navigation';
import { 
  getQuestionById, 
  getTotalQuestions, 
  isMultipleChoiceQuestion,
} from '@/lib/questions';
import { ROUTES } from '@/lib/constants';
import type { QuestionPageParams } from '@/lib/types';
import PageLayout from '@/components/layout/PageLayout';
import Header from '@/components/layout/Header';
import Section from '@/components/layout/Section';
import ProgressBar from '@/components/ui/ProgressBar';
import QuizAnswers from './QuizAnswers';
import QuestionTracker from './components/QuestionTracker';

type Props = {
  params: Promise<QuestionPageParams>;
};

export default async function QuestionPage({ params }: Props) {
  const { questionId } = await params;
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
    <PageLayout variant="default">
      <QuestionTracker 
        questionId={questionIdNum}
        questionText={question.question}
        questionType={isMultipleChoice ? 'multiple' : 'single'}
        isFirstQuestion={questionIdNum === 1}
      />
      
      <Header logoSize="xl" spacing="lg" className="-mt-8" />
      
      <Section maxWidth="2xl" spacing="md" className="mt-[30px]">
        <h1 className="text-2xl md:text-4xl font-bold text-white mb-8 drop-shadow-lg">
          {question.question}
        </h1>
        
        <ProgressBar 
          progress={progress}
          backUrl={previousPageUrl}
          skipUrl={skipUrl}
        />

        {isMultipleChoice && (
          <p className="text-white/80 text-sm mb-4">Select all that apply</p>
        )}

        <QuizAnswers 
          question={question}
          isMultipleChoice={isMultipleChoice}
        />
      </Section>
    </PageLayout>
  );
}