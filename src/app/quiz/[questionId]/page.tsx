import { notFound } from 'next/navigation';
import { 
  getQuestionById, 
  getTotalQuestions, 
  isMultipleChoiceQuestion,
} from '@/lib/questions';
import { ROUTES } from '@/lib/constants';
import type { QuestionPageParams } from '@/lib/types';
import QuizAnswers from './QuizAnswers';
import QuestionTracker from './components/QuestionTracker';
import QuizHeader from './components/QuizHeader';

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
    <main className="flex flex-col items-center min-h-screen p-8 text-center bg-gradient-to-br from-[#2b2e7a] via-[#5a2d91] to-[#a259c6]">
      <QuestionTracker 
        questionId={questionIdNum}
        questionText={question.question}
        questionType={isMultipleChoice ? 'multiple' : 'single'}
        isFirstQuestion={questionIdNum === 1}
      />
      
      <QuizHeader />
      
      <div className="w-full max-w-2xl" style={{ marginTop: '30px' }}>
        <h1 className="text-2xl md:text-4xl font-bold text-white mb-8 drop-shadow-lg">
          {question.question}
        </h1>
        
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
        />
      </div>
    </main>
  );
}