'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import Header from '@/components/layout/Header';
import Section from '@/components/layout/Section';
import Button from '@/components/ui/Button';
import GradientText from '@/components/ui/GradientText';
import analytics from '@/lib/analytics';

const emojiGrid = [
  '🍽️', '🍷', '🥗',
  '🥘', '🍜', '🌭',
  '🍓', '🍗', '🥑',
];

export default function QuizEndPage() {
  const router = useRouter();

  useEffect(() => {
    analytics.trackQuizCompleted();
    analytics.trackUserSegment();
    
    const btn = document.getElementById('continue-btn');
    if (btn) btn.focus();
  }, []);

  return (
    <PageLayout variant="default">
      <Header logoSize="lg" spacing="sm" />
      
      <Section maxWidth="2xl" className="flex flex-col items-center justify-center animate-fade-in">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 mt-2 drop-shadow-lg">
          Great choices!
        </h1>
        
        <h2 className="text-2xl md:text-4xl font-extrabold text-center mb-4">
          <span className="text-white">Atly has over </span>
          <GradientText>272k gluten-free places</GradientText>
          <span className="text-white"> for you to explore</span>
        </h2>
        
        <p className="text-lg md:text-xl text-white/90 mb-10 font-medium drop-shadow">
          New places are added daily
        </p>
        
        <div className="grid grid-cols-3 gap-6 mb-12 w-full max-w-lg mx-auto">
          {emojiGrid.map((emoji, idx) => (
            <div
              key={idx}
              className="flex items-center justify-center w-24 h-24 md:w-32 md:h-32 bg-white/90 rounded-2xl shadow-xl text-3xl md:text-5xl select-none animate-fade-in"
              style={{ animationDelay: `${idx * 60}ms` }}
            >
              {emoji}
            </div>
          ))}
        </div>
        
        <Button
          id="continue-btn"
          variant="rounded"
          size="lg"
          className="max-w-md mb-2"
          fullWidth
          onClick={() => router.push('/loader')}
        >
          Continue
        </Button>
      </Section>
    </PageLayout>
  );
} 