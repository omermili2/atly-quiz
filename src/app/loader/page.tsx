'use client';
import { useEffect, useState } from 'react';
import Logo from '@/components/ui/Logo';
import analytics from '@/lib/analytics';

const progressCurve = [0, 8, 15, 22, 30, 38, 45, 52, 60, 68, 74, 80, 86, 91, 95, 98, 100];
const stepPercents = [0, 10, 35, 60, 72, 85];

const steps = [
  'Analyzing your responses...',
  'Identifying key challenges...',
  'Reviewing community recommendations...',
  'Personalizing your experience...',
  'Building your gluten-free plan...',
  'Finalizing your profile...',
];

export default function LoaderPage() {
  const [analysisStatus] = useState('analyzing');
  const [currentStep, setCurrentStep] = useState(0);
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    analytics.trackAnalysisPageViewed();
    
    const totalDuration = 10000;
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

    const timeout = setTimeout(() => {
      window.location.href = '/pricing';
    }, totalDuration + 300);

    return () => {
      clearInterval(percentTimer);
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    let textStep = 0;
    for (let i = 0; i < stepPercents.length; i++) {
      if (percent >= stepPercents[i]) {
        textStep = i;
      }
    }
    setCurrentStep(textStep);
  }, [percent]);

  if (analysisStatus === 'analyzing') {
    return (
      <main className="flex flex-col items-center justify-start min-h-screen text-center bg-gradient-to-br from-[#2b2e7a] via-[#5a2d91] to-[#a259c6] p-4 pt-[18vh]">
        <header className="w-full flex items-center mb-4 justify-center">
          <Logo />
        </header>
        <div className="flex flex-col items-center justify-center w-full max-w-md animate-fade-in">
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
          <p className="text-lg md:text-xl text-white/90 mb-6 font-medium">
            {steps[currentStep]}
          </p>
        </div>
      </main>
    );
  }

  return null;
} 