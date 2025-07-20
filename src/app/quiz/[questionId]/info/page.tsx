import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { 
  getQuestionById, 
  getQuestionsWithInfo, 
  getTotalQuestions,
  type QuizQuestion 
} from '@/lib/questions';
import type { QuestionPageParams } from '@/lib/types';
import Button from '@/components/ui/Button';
import InfoIllustration from './InfoIllustration';
import QuizHeader from '../components/QuizHeader';
import InfoTracker from './InfoTracker';
import PageLayout from '@/components/layout/PageLayout';

type Props = {
  params: Promise<QuestionPageParams>;
};

interface InfoData {
  icon: string;
  title: string;
  subtitle: string;
  facts: Array<{
    icon: string;
    text: string;
    highlight?: string;
  }>;
  cta: string;
}

const INFO_DATA: Record<string, InfoData> = {
  "Personalized for You": {
    icon: "🎯",
    title: "Tailored Just for You",
    subtitle: "Your gluten-free journey, personalized",
    facts: [
      { icon: "🧬", text: "Custom recommendations based on your condition" },
      { icon: "📍", text: "Local spots that match your safety requirements" },
      { icon: "⚡", text: "Save 2+ hours per week finding safe places", highlight: "2+ hours" }
    ],
    cta: "Get personalized recommendations"
  },
  "Find Gluten-Free Places Fast": {
    icon: "🛡️",
    title: "Expert Vetted & Safety-First",
    subtitle: "Places you can actually trust",
    facts: [
      { icon: "👩‍⚕️", text: "Vetted by celiac healthcare professionals" },
      { icon: "🔍", text: "Know which places are 100% gluten-free vs accommodating", highlight: "100%" },
      { icon: "📋", text: "Every review moderated by real experts" }
    ],
    cta: "Find truly safe places near you"
  },
  "Delicious Recipes & Tips": {
    icon: "🌍",
    title: "Smart Search & Global Map",
    subtitle: "From Paris bakeries to NYC brunch spots",
    facts: [
      { icon: "🎛️", text: "Smart filters by risk level, food type & vibe" },
      { icon: "🗺️", text: "270k+ verified locations growing daily", highlight: "270k+" },
      { icon: "🆓", text: "Free trial with full map access" }
    ],
    cta: "Explore the global gluten-free map"
  },
  "Guidance at Every Step": {
    icon: "🤝",
    title: "Never Feel Lost Again",
    subtitle: "Support for every stage of your journey",
    facts: [
      { icon: "👥", text: "24/7 community support from 50k+ members", highlight: "50k+" },
      { icon: "📖", text: "Step-by-step guides for dining out safely" },
      { icon: "🎓", text: "95% of users feel more confident after 1 week", highlight: "95%" }
    ],
    cta: "Join the community"
  }
};

function getNextPageUrl(questionId: number): string {
  const nextId = questionId + 1;
  const totalQuestions = getTotalQuestions();
  
  return nextId <= totalQuestions 
    ? `/quiz/${nextId}` 
    : '/quiz-end';
}

function AnimatedFact({ fact, delay }: { fact: InfoData['facts'][0], delay: number }) {
  return (
    <div className="flex justify-center w-full">
      <div 
        className="inline-flex items-center gap-4 text-white/90 animate-fade-in bg-white/10 backdrop-blur-sm rounded-xl p-4 max-w-fit"
        style={{ animationDelay: `${delay}ms` }}
      >
        <span 
          className="text-3xl animate-bounce flex-shrink-0" 
          style={{ 
            animationDelay: `${delay + 200}ms`,
            animationDuration: '1s',
            animationIterationCount: '2'
          }}
        >
          {fact.icon}
        </span>
        <span className="text-base md:text-lg font-medium text-left">
          {fact.highlight ? (
            <>
              {fact.text.split(fact.highlight)[0]}
              <span className="text-pink-300 font-bold">{fact.highlight}</span>
              {fact.text.split(fact.highlight)[1]}
            </>
          ) : (
            fact.text
          )}
        </span>
      </div>
    </div>
  );
}

function InfoContent({ question }: { question: QuizQuestion }) {
  if (!question.info) return null;
  
  const infoData = INFO_DATA[question.info.title];
  if (!infoData) return null;
  
  return (
    <div className="w-full flex flex-col items-center pt-4 md:pt-12 px-4 max-w-3xl mx-auto">
      {/* Header Image */}
      <InfoIllustration title={question.info.title} />
      
      {/* Title & Subtitle */}
      <h1 className="text-xl md:text-4xl font-extrabold text-white mb-2 drop-shadow-lg text-center whitespace-nowrap">
        {infoData.title}
      </h1>
      
      <p className="text-lg md:text-xl text-white/80 mb-8 font-medium text-center">
        {infoData.subtitle}
      </p>
      
      {/* Facts Container */}
      <div className="w-full space-y-4 md:space-y-6 max-w-2xl">
        {infoData.facts.map((fact, index) => (
          <AnimatedFact 
            key={index} 
            fact={fact} 
            delay={300 + (index * 150)} 
          />
        ))}
      </div>
      
      {/* CTA Text */}
      <div className="mt-8 text-center">
        <p className="text-pink-200 font-semibold text-lg md:text-xl">
          {infoData.cta}
        </p>
      </div>
    </div>
  );
}

function InfoNavigation({ questionId }: { questionId: number }) {
  const nextPageUrl = getNextPageUrl(questionId);
  const previousPageUrl = `/quiz/${questionId}`;
  
  return (
    <div className="w-full max-w-xs mt-8">
      <Link href={nextPageUrl} className="w-full">
        <Button fullWidth className="mb-4">
          Continue
        </Button>
      </Link>
      
      <div className="text-center">
        <a 
          href={previousPageUrl} 
          className="text-gray-300 text-base hover:text-gray-200 transition-colors duration-150"
        >
          Back
        </a>
      </div>
    </div>
  );
}

export function generateStaticParams() {
  return getQuestionsWithInfo().map(q => ({ 
    questionId: q.id.toString() 
  }));
}

export default async function InfoPage({ params }: Props) {
  const { questionId } = await params;
  const questionIdNum = parseInt(questionId, 10);
  const question = getQuestionById(questionIdNum);
  
  if (!question?.info) {
    return notFound();
  }

  return (
    <PageLayout variant="default">
      <InfoTracker 
        questionId={questionIdNum} 
        infoTitle={question.info.title} 
      />
      
      <QuizHeader />
      
      <InfoContent question={question} />
      
      <InfoNavigation questionId={questionIdNum} />
    </PageLayout>
  );
} 