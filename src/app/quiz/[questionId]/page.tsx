import { notFound } from 'next/navigation';
import { 
  getQuestionById, 
  getTotalQuestions, 
  isMultipleChoiceQuestion,
} from '@/lib/questions';
import QuizAnswers from './QuizAnswers';
import QuestionTracker from './components/QuestionTracker';

// Constants
const ROUTES = {
  QUIZ_END: '/quiz-end',
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
      ? ROUTES.QUIZ_END 
      : ROUTES.QUESTION(nextId);
  };

  const isMultipleChoice = isMultipleChoiceQuestion(question);
  const previousPageUrl = getPreviousPageUrl();
  const skipUrl = getSkipUrl();

  return (
    <main className="flex flex-col items-center min-h-screen px-4 py-6 sm:p-8 text-center bg-gradient-to-br from-[#2b2e7a] via-[#5a2d91] to-[#a259c6]">
      <QuestionTracker 
        questionId={questionIdNum}
        questionText={question.question}
        questionType={isMultipleChoice ? 'multiple' : 'single'}
        isFirstQuestion={questionIdNum === 1}
      />
      
      {/* QuizHeader component inline - Mobile Optimized */}
      <div className="w-full flex justify-center items-start mb-6 sm:mb-8">
        <a href="https://www.atly.com/" target="_blank" rel="noopener noreferrer">
          <img 
            src="/atly-logo.png" 
            alt="Atly logo" 
            className="h-16 sm:h-20 md:h-28 w-auto drop-shadow-2xl rounded-2xl backdrop-blur-lg cursor-pointer hover:scale-105 transition-transform duration-200" 
            style={{ background: 'none' }} 
          />
        </a>
      </div>
      
      <div className="w-full max-w-2xl px-2 sm:px-0">
        <h1 className="text-xl sm:text-2xl md:text-4xl font-bold text-white mb-6 sm:mb-8 drop-shadow-lg leading-tight">
          {question.question}
        </h1>
        
        {/* QuizProgress component inline - Mobile Optimized */}
        <div className="flex items-center justify-between mb-6 sm:mb-8 w-full">
          <div className="flex-shrink-0 w-12 sm:w-16">
            {previousPageUrl ? (
              <a 
                href={previousPageUrl} 
                className="text-gray-300 text-sm sm:text-base hover:text-gray-200 transition-colors duration-150 flex items-center min-h-[44px] justify-center"
              >
                Back
              </a>
            ) : (
              <div className="w-12 sm:w-16"></div>
            )}
          </div>
          
          <div className="flex-1 mx-3 sm:mx-4">
            <div className="w-full bg-white/30 rounded-full h-2.5 shadow-inner">
              <div
                className="bg-blue-400 h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          
          <div className="flex-shrink-0 w-12 sm:w-16 text-right">
            <a 
              href={skipUrl} 
              className="text-gray-300 text-sm sm:text-base hover:text-gray-200 transition-colors duration-150 min-h-[44px] flex items-center justify-center"
            >
              Skip
            </a>
          </div>
        </div>

        {isMultipleChoice && (
          <p className="text-white/80 text-sm sm:text-base mb-4 sm:mb-6">Select all that apply</p>
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