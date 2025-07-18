'use client';
import { useEffect, useState } from 'react';

const ATLY_LOGO = "/atly-logo.png";

type QuizAnswers = {
  [key: number]: string | string[];
};

const analysisSteps = [
  'Analyzing your responses...',
  'Identifying key challenges...',
  'Reviewing community recommendations...',
  'Personalizing your experience...',
  'Building your gluten-free plan...',
  'Finalizing your results...'
];

export default function LoaderPage() {
  const [answers, setAnswers] = useState<QuizAnswers | null>(null);
  const [analysisStatus] = useState('analyzing');
  const [currentStep, setCurrentStep] = useState(0);
  const [percent, setPercent] = useState(0);

  // Custom progress curve (not linear)
  const progressCurve = [
    0, 8, 15, 22, 30, 38, 45, 52, 60, 68, 74, 80, 86, 91, 95, 98, 100
  ];

  // Map which percent each step should appear at
  const stepPercents = [0, 10, 35, 60, 72, 85];

  useEffect(() => {
    // 1. Load answers from localStorage once on mount
    try {
      const savedAnswers = JSON.parse(localStorage.getItem('quizAnswers') || '{}');
      setAnswers(savedAnswers);
    } catch (error) {
      console.error('Could not load answers from localStorage', error);
      setAnswers({});
    }

    // 2. Animate the analysis steps and percent
    const totalDuration = 10000; // 10 seconds
    const steps = progressCurve.length;
    const stepDuration = totalDuration / steps;
    let stepValue = 0;
    setPercent(progressCurve[0]);

    const percentTimer = setInterval(() => {
      stepValue++;
      if (stepValue < steps) {
        setPercent(progressCurve[stepValue]);
      } else {
        clearInterval(percentTimer);
      }
    }, stepDuration);

    // 3. Move from "analyzing" to "finished" after totalDuration
    const timeout = setTimeout(() => {
      // Skip loader results and go directly to pricing
      window.location.href = '/pricing';
    }, totalDuration + 300);

    return () => {
      clearInterval(percentTimer);
      clearTimeout(timeout);
    };
  }, []);

  // New effect: update currentStep based on percent
  useEffect(() => {
    let textStep = 0;
    for (let i = 0; i < stepPercents.length; i++) {
      if (percent >= stepPercents[i]) {
        textStep = i;
      }
    }
    setCurrentStep(textStep);
  }, [percent]);

  // --- Conditional Rendering based on analysisStatus ---
  if (analysisStatus === 'analyzing') {
    return (
      <main className="flex flex-col items-center justify-center min-h-screen text-center bg-gradient-to-br from-[#2b2e7a] via-[#5a2d91] to-[#a259c6] p-4">
        <header className="w-full flex items-center mb-4 justify-center">
          <a href="https://www.atly.com/" target="_blank" rel="noopener noreferrer">
            <img src={ATLY_LOGO} alt="Atly logo" className="h-20 w-auto drop-shadow-2xl rounded-2xl backdrop-blur-lg cursor-pointer hover:scale-105 transition-transform duration-200" style={{ background: 'none' }} />
          </a>
        </header>
        <div className="flex flex-col items-center justify-center w-full max-w-md animate-fade-in">
          {/* Circular Progress Loader - new style */}
          <div className="relative flex items-center justify-center mb-8" style={{ width: 220, height: 220 }}>
            <svg className="absolute top-0 left-0" width="220" height="220" style={{ transform: 'rotate(-90deg)' }}>
              <circle
                cx="110"
                cy="110"
                r="100"
                stroke="#f7e6f0"
                strokeWidth="10"
                fill="white"
              />
              <circle
                cx="110"
                cy="110"
                r="100"
                stroke="url(#pinkGradient)"
                strokeWidth="10"
                fill="none"
                strokeDasharray={2 * Math.PI * 100}
                strokeDashoffset={2 * Math.PI * 100 * (1 - percent / 100)}
                strokeLinecap="round"
                style={{ transition: 'stroke-dashoffset 0.7s cubic-bezier(.4,2,.6,1)' }}
              />
              <defs>
                <linearGradient id="pinkGradient" x1="0" y1="0" x2="220" y2="0" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#ff7eb3" />
                  <stop offset="1" stopColor="#ff758c" />
                </linearGradient>
              </defs>
            </svg>
            <span className="text-6xl font-extrabold text-[#23263b] z-10">{percent}%</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg mb-4">
            Analyzing Your Results
          </h1>
          <p className="text-lg text-white/80 mb-2">
            Calculating preferences...
          </p>
          <h2 className="text-xl text-white drop-shadow-lg mt-6 min-h-[2.5rem]">
            {analysisSteps[currentStep]}
          </h2>
        </div>
      </main>
    );
  }

  // Remove the loader results section entirely since we're redirecting to pricing
  return null; // This won't be reached since we redirect
} 