// src/app/quiz/[questionId]/info/page.tsx
import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { 
  getQuestionById, 
  getQuestionsWithInfo, 
  getTotalQuestions,
  type QuizQuestion 
} from '@/lib/questions';
import QuizHeader from '../components/QuizHeader';
import InfoIllustration from './InfoIllustration';

type Props = {
  params: Promise<{
    questionId: string;
  }>;
};

// Utility functions
function formatTextIntoLines(text: string): React.ReactElement {
  const words = text.split(' ');
  const midpoint = Math.ceil(words.length / 2);
  const firstLine = words.slice(0, midpoint).join(' ');
  const secondLine = words.slice(midpoint).join(' ');
  
  return (
    <>
      <span>{firstLine}</span>
      <br />
      <span>{secondLine}</span>
    </>
  );
}

function getNextPageUrl(questionId: number): string {
  const nextId = questionId + 1;
  const totalQuestions = getTotalQuestions();
  
  return nextId <= totalQuestions 
    ? `/quiz/${nextId}` 
    : '/pre-summary';
}

// Reusable components
function InfoContent({ question }: { question: QuizQuestion }) {
  if (!question.info) return null;
  
  return (
    <div className="w-full flex flex-col items-center animate-fade-in" style={{ marginTop: '30px' }}>
      <InfoIllustration title={question.info.title} />
      
      <h1 className="text-2xl md:text-4xl font-extrabold text-white mb-4 drop-shadow-[0_2px_8px_rgba(255,126,179,0.7)] animate-fade-in">
        {question.info.title}
      </h1>
      
      <p className="text-lg md:text-xl text-white mb-8 font-medium drop-shadow-[0_2px_8px_rgba(255,126,179,0.7)] animate-fade-in">
        {formatTextIntoLines(question.info.text)}
      </p>
    </div>
  );
}

function InfoNavigation({ questionId }: { questionId: number }) {
  const nextPageUrl = getNextPageUrl(questionId);
  const previousPageUrl = `/quiz/${questionId}`;
  
  return (
    <>
      <Link href={nextPageUrl} className="w-full max-w-xs">
        <button className="w-full bg-gradient-to-r from-[#ff7eb3] via-[#ff758c] to-[#ff7eb3] text-white font-bold py-4 rounded-xl text-lg shadow-xl hover:scale-105 transition-transform duration-200">
          Continue
        </button>
      </Link>
      
      <div className="mt-4">
        <a 
          href={previousPageUrl} 
          className="text-gray-300 text-base hover:text-gray-200 transition-colors duration-150"
        >
          Back
        </a>
      </div>
    </>
  );
}

// Static generation
export function generateStaticParams() {
  return getQuestionsWithInfo().map(q => ({ 
    questionId: q.id.toString() 
  }));
}

// Main component
export default async function InfoPage({ params }: Props) {
  const { questionId } = await params;
  const questionIdNum = parseInt(questionId, 10);
  const question = getQuestionById(questionIdNum);
  
  // Validation
  if (!question?.info) {
    return notFound();
  }

  return (
    <main className="flex flex-col items-center min-h-screen p-8 text-center bg-gradient-to-br from-[#2b2e7a] via-[#5a2d91] to-[#a259c6]">
      <QuizHeader />
      
      <InfoContent question={question} />
      
      <InfoNavigation questionId={questionIdNum} />
    </main>
  );
} 