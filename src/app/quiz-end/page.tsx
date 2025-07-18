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
    <main className="flex flex-col items-center justify-center min-h-screen p-8 text-center bg-gradient-to-br from-[#2b2e7a] via-[#5a2d91] to-[#a259c6]">
      <header className="w-full flex items-center mb-4 justify-center">
        <a href="https://www.atly.com/" target="_blank" rel="noopener noreferrer">
          <img src={ATLY_LOGO} alt="Atly logo" className="h-20 w-auto drop-shadow-2xl rounded-2xl backdrop-blur-lg cursor-pointer hover:scale-105 transition-transform duration-200" style={{ background: 'none' }} />
        </a>
      </header>
      <div className="w-full max-w-3xl flex flex-col items-center justify-center animate-fade-in">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 mt-2 drop-shadow-lg">Great choices!</h1>
        <h2 className="text-2xl md:text-4xl font-extrabold text-center mb-4">
          <span className="text-white">Atly has over </span>
          <span className="bg-gradient-to-r from-[#ff7eb3] via-[#ff758c] to-[#ff7eb3] bg-clip-text text-transparent">272k gluten-free places</span>
          <span className="text-white"> for you to explore</span>
        </h2>
        <p className="text-lg md:text-xl text-white/90 mb-10 font-medium drop-shadow">New places are added daily</p>
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
        <button
          id="continue-btn"
          className="w-full max-w-md bg-gradient-to-r from-[#ff7eb3] via-[#ff758c] to-[#ff7eb3] text-white font-bold py-4 rounded-full text-xl shadow-xl hover:scale-105 transition-transform duration-200 mb-2"
          onClick={() => router.push('/loader')}
        >
          Continue
        </button>
      </div>
    </main>
  );
} 