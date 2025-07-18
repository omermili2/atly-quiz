'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import analytics from '@/lib/analytics';

const ATLY_LOGO = "/atly-logo.png";

// Emoji data for the grid
const emojiGrid = [
  '🍽️', '🍷', '🥗',
  '🥘', '🍜', '🥪',
  '🍕', '🍗', '🌭',
];

export default function QuizEndPage() {
  const router = useRouter();

  // Track quiz completion and focus the continue button on mount
  useEffect(() => {
    analytics.trackQuizCompleted();
    analytics.trackUserSegment(); // Analyze user segment based on answers
    
    const btn = document.getElementById('continue-btn');
    if (btn) btn.focus();
  }, []);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4 py-6 sm:p-8 text-center bg-gradient-to-br from-[#2b2e7a] via-[#5a2d91] to-[#a259c6]">
      <header className="w-full flex items-center justify-center mb-4 sm:mb-6">
        <a href="https://www.atly.com/" target="_blank" rel="noopener noreferrer">
          <img 
            src={ATLY_LOGO} 
            alt="Atly logo" 
            className="h-16 sm:h-20 w-auto drop-shadow-2xl rounded-2xl backdrop-blur-lg cursor-pointer hover:scale-105 transition-transform duration-200" 
            style={{ background: 'none' }} 
          />
        </a>
      </header>
      
      <div className="w-full max-w-4xl flex flex-col items-center justify-center animate-fade-in px-2 sm:px-0">
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-white mb-4 sm:mb-6 drop-shadow-lg leading-tight">
          Great choices!
        </h1>
        
        <h2 className="text-lg sm:text-2xl md:text-4xl font-extrabold text-center mb-6 sm:mb-8 leading-tight">
          <span className="text-white">Atly has over </span>
          <span className="bg-gradient-to-r from-[#ff7eb3] via-[#ff758c] to-[#ff7eb3] bg-clip-text text-transparent">272k gluten-free places</span>
          <span className="text-white"> for you to explore</span>
        </h2>
        
        <p className="text-base sm:text-lg md:text-xl text-white/90 mb-8 sm:mb-10 font-medium drop-shadow">
          New places are added daily
        </p>
        
        <div className="grid grid-cols-3 gap-3 sm:gap-6 mb-8 sm:mb-12 w-full max-w-sm sm:max-w-lg mx-auto">
          {emojiGrid.map((emoji, idx) => (
            <div
              key={idx}
              className="flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-white/90 rounded-2xl shadow-xl text-2xl sm:text-3xl md:text-5xl select-none animate-fade-in"
              style={{ animationDelay: `${idx * 60}ms` }}
            >
              {emoji}
            </div>
          ))}
        </div>
        
        <button
          id="continue-btn"
          className="w-full max-w-sm bg-gradient-to-r from-[#ff7eb3] via-[#ff758c] to-[#ff7eb3] text-white font-bold py-4 sm:py-4 rounded-2xl text-lg sm:text-xl shadow-xl hover:scale-105 active:scale-95 transition-transform duration-200 mb-4 sm:mb-2 min-h-[48px]"
          onClick={() => router.push('/loader')}
        >
          Continue
        </button>
      </div>
    </main>
  );
} 