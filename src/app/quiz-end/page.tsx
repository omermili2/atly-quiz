'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import Section from '@/components/layout/Section';
import Button from '@/components/ui/Button';
import analytics from '@/lib/analytics';

const emojiGrid = [
  '🍽️', '🍷', '🥗',
  '🥘', '🍜', '🌭',
  '🍓', '🍗', '🥑',
];

export default function QuizEndPage() {
  const router = useRouter();
  const [animatedCards, setAnimatedCards] = useState<boolean[]>(new Array(9).fill(false));

  useEffect(() => {
    analytics.trackQuizEndViewed();
    
    const btn = document.getElementById('continue-btn');
    if (btn) btn.focus();

    // Trigger animations with staggered delays
    emojiGrid.forEach((_, index) => {
      setTimeout(() => {
        setAnimatedCards(prev => {
          const newState = [...prev];
          newState[index] = true;
          return newState;
        });
      }, index * 100); // 100ms delay between each card
    });
  }, []);

  const handleContinueClick = () => {
    analytics.trackContinueClick();
    router.push('/loader');
  };

  return (
    <div className="flex-1">
      <PageLayout variant="default">
        <Section maxWidth="xl" spacing="sm" className="text-center">
          <div className="flex flex-col items-center px-4">
            <h1 className="text-3xl md:text-6xl font-bold mb-4 md:mb-6 text-white">
              Great choices!
            </h1>
            
            <p className="text-lg md:text-2xl text-white mb-2 text-center">
              Atly has over <span className="text-pink-400 font-bold">272k gluten-free places</span> for you to explore
            </p>
          </div>
          
          <p className="text-lg text-white/80 mb-8">
            New places are added daily
          </p>

          <div className="grid grid-cols-3 gap-6 mb-8 max-w-md mx-auto">
            {emojiGrid.map((emoji, index) => (
              <div 
                key={index} 
                className={`bg-white/90 rounded-2xl p-4 text-5xl flex items-center justify-center aspect-square transition-opacity duration-700 ease-out ${
                  animatedCards[index] 
                    ? 'opacity-100' 
                    : 'opacity-0'
                }`}
              >
                {emoji}
              </div>
            ))}
          </div>

          <Button 
            id="continue-btn"
            onClick={handleContinueClick} 
            fullWidth
            className="max-w-xs mx-auto"
          >
            Continue
          </Button>
        </Section>
      </PageLayout>
    </div>
  );
} 