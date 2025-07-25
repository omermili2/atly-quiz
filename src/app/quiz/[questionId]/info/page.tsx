'use client';

import React from 'react';
import { notFound, useParams } from 'next/navigation';
import Link from 'next/link';
import { 
  getQuestionById, 
  getTotalQuestions,
  type QuizQuestion 
} from '@/lib/questions';
import { COMPOUND_STYLES, COLORS, TYPOGRAPHY, LAYOUT, COMPONENTS, RESPONSIVE } from '@/lib/design';
import Button from '@/components/ui/Button';
import InfoIllustration from './InfoIllustration';
import InfoTracker from './InfoTracker';

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
      { icon: "⚡", text: "Save time per week finding safe places", highlight: "Save time" }
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

function StaticFact({ fact }: { fact: InfoData['facts'][0] }) {
  return (
    <div className="flex justify-center">
      <div className={`${LAYOUT.FLEX_CENTER} ${RESPONSIVE.GAP_2_4} ${COLORS.WHITE_90} ${COMPONENTS.CARD_GLASS} ${LAYOUT.P_2_4} w-fit max-w-full`}>
        <span className={COMPONENTS.ICON_MEDIUM}>
          {fact.icon}
        </span>
        <span className={`${TYPOGRAPHY.BODY_SMALL_LARGE} ${TYPOGRAPHY.FONT_MEDIUM} text-center`}>
          {fact.highlight ? (
            <>
              {fact.text.split(fact.highlight)[0]}
              <span className={`${COLORS.PINK_300} ${TYPOGRAPHY.FONT_BOLD}`}>{fact.highlight}</span>
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
    <div className={`${LAYOUT.W_FULL} ${LAYOUT.FLEX_CENTER_COL} pt-1 md:pt-3 px-4 ${LAYOUT.MAX_W_3XL} mx-auto`}>
      {/* Header Image */}
      <InfoIllustration title={question.info.title} />
      
      {/* Title & Subtitle */}
      <h1 className={COMPOUND_STYLES.SECONDARY_HEADING}>
        {infoData.title}
      </h1>
      
      <p className={COMPOUND_STYLES.SUBTITLE}>
        {infoData.subtitle}
      </p>
      
      {/* Facts Container */}
      <div className={`${LAYOUT.W_FULL} ${LAYOUT.SPACE_Y_4_6} ${LAYOUT.MAX_W_2XL}`}>
        {infoData.facts.map((fact, index) => (
          <StaticFact 
            key={index}
            fact={fact} 
          />
        ))}
      </div>
      
      {/* CTA Text */}
      <div className="mt-6 md:mt-12 text-center">
        <p className={COMPOUND_STYLES.CTA_TEXT}>
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
    <div className={`${COMPONENTS.BUTTON_CONTAINER} ${LAYOUT.MT_4_8}`}>
      <Link href={nextPageUrl} className={LAYOUT.W_FULL}>
        <Button fullWidth className={`${LAYOUT.MB_1_2} md:mb-4`}>
          Continue
        </Button>
      </Link>
      
      <div className={TYPOGRAPHY.TEXT_CENTER}>
        <a 
          href={previousPageUrl} 
          className={COMPOUND_STYLES.SECONDARY_LINK}
        >
          Back
        </a>
      </div>
    </div>
  );
}

export default function InfoPage() {
  const params = useParams();
  const questionId = params.questionId as string;
  const questionIdNum = parseInt(questionId, 10);
  const question = getQuestionById(questionIdNum);
  
  if (!question?.info) {
    return notFound();
  }

  return (
    <div className="flex-1">
      <main className="flex flex-col items-center min-h-screen p-4 md:p-8 text-center">
        <InfoTracker 
          questionId={questionIdNum} 
          infoTitle={question.info.title} 
        />
        
        <InfoContent question={question} />
        
        <InfoNavigation questionId={questionIdNum} />
      </main>
    </div>
  );
} 