// src/app/quiz/[questionId]/page.tsx

import { notFound } from 'next/navigation';
import { 
  getQuestionById, 
  getTotalQuestions, 
  isMultipleChoiceQuestion,
  type QuizQuestion 
} from '@/lib/questions';
import QuizAnswers from './QuizAnswers';

// Constants
const ROUTES = {
  PRE_SUMMARY: '/pre-summary',
  INFO: (id: number) => `/quiz/${id}/info`,
  QUESTION: (id: number) => `/quiz/${id}`,
} as const;

type Props = {
  params: Promise<{
    questionId: string;
  }>;
};

// Main component
export default async function QuestionPage({ params }: Props) {
  const { questionId } = await params;
  const questionIdNum = parseInt(questionId, 10);
  const question = getQuestionById(questionIdNum);

  // Validation
  if (!question) {
    return notFound();
  }

  // Calculate values for client component
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

  const getSkipUrl = (): string => {
    if (question.info) {
      return ROUTES.INFO(questionIdNum);
    }
    
    const nextId = questionIdNum + 1;
    return nextId > totalQuestions 
      ? ROUTES.PRE_SUMMARY 
      : ROUTES.QUESTION(nextId);
  };

  const isMultipleChoice = isMultipleChoiceQuestion(question);
  const previousPageUrl = getPreviousPageUrl();
  const skipUrl = getSkipUrl();

  return (
    <main className="flex flex-col items-center min-h-screen p-8 text-center bg-gradient-to-br from-[#2b2e7a] via-[#5a2d91] to-[#a259c6]">
      {/* QuizHeader component inline */}
      <div className="w-full flex justify-center items-start pt-0 -mt-8 mb-8">
        <a href="https://www.atly.com/" target="_blank" rel="noopener noreferrer">
          <img 
            src="/atly-logo.png" 
            alt="Atly logo" 
            className="h-28 w-auto drop-shadow-2xl rounded-2xl backdrop-blur-lg cursor-pointer hover:scale-105 transition-transform duration-200" 
            style={{ background: 'none' }} 
          />
        </a>
      </div>
      
      <div className="w-full max-w-2xl" style={{ marginTop: '30px' }}>
        <h1 className="text-2xl md:text-4xl font-bold text-white mb-8 drop-shadow-lg">
          {question.question}
        </h1>
        
        {/* QuizProgress component inline */}
        <div className="flex items-center justify-between mb-8 w-full">
          <div className="flex-shrink-0 w-16">
            {previousPageUrl ? (
              <a 
                href={previousPageUrl} 
                className="text-gray-300 text-base hover:text-gray-200 transition-colors duration-150 flex items-center"
              >
                Back
              </a>
            ) : (
              <div></div>
            )}
          </div>
          
          <div className="flex-1 mx-4">
            <div className="w-full bg-white/30 rounded-full h-2.5 shadow-inner">
              <div
                className="bg-blue-400 h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          
          <div className="flex-shrink-0 w-16 text-right">
            <a 
              href={skipUrl} 
              className="text-gray-300 text-base hover:text-gray-200 transition-colors duration-150"
            >
              Skip
            </a>
          </div>
        </div>

        {isMultipleChoice && (
          <p className="text-white/80 text-sm mb-4">Select all that apply</p>
        )}

        <QuizAnswers 
          question={question}
          isMultipleChoice={isMultipleChoice}
          skipUrl={skipUrl}
        />
      </div>
    </main>
  );
}