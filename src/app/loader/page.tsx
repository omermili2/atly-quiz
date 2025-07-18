'use client';
import { useEffect, useState } from 'react';
import analytics from '@/lib/analytics';

const ATLY_LOGO = "/atly-logo.png";

const analysisSteps = [
  'Analyzing your responses...',
  'Identifying key challenges...',
  'Reviewing community recommendations...',
  'Personalizing your experience...',
  'Building your gluten-free plan...',
  'Finalizing your results...'
];

// Custom progress curve (not linear)
const progressCurve = [
  0, 8, 15, 22, 30, 38, 45, 52, 60, 68, 74, 80, 86, 91, 95, 98, 100
];

// Map which percent each step should appear at
const stepPercents = [0, 10, 35, 60, 72, 85];

export default function LoaderPage() {
  const [analysisStatus] = useState('analyzing');
  const [currentStep, setCurrentStep] = useState(0);
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    // Track analysis start
    analytics.trackAnalysisStarted();
    
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
  }, []); // Empty dependency array is correct here

  // New effect: update currentStep based on percent and track progress
  useEffect(() => {
    let textStep = 0;
    for (let i = 0; i < stepPercents.length; i++) {
      if (percent >= stepPercents[i]) {
        textStep = i;
      }
    }
    setCurrentStep(textStep);
    
    // Track analysis progress at key milestones
    analytics.trackAnalysisProgress(percent, analysisSteps[textStep]);
  }, [percent]); // Only percent is needed as dependency

  // --- Conditional Rendering based on analysisStatus ---
  if (analysisStatus === 'analyzing') {
    const circleSize = 180; // Mobile optimized size
    const smCircleSize = 220; // Desktop size
    const radius = 80; // Mobile optimized radius
    const smRadius = 100; // Desktop radius

    return (
      <main className="flex flex-col items-center justify-start min-h-screen text-center bg-gradient-to-br from-[#2b2e7a] via-[#5a2d91] to-[#a259c6] px-4 py-6 sm:p-4 pt-12 sm:pt-[18vh]">
        <header className="w-full flex items-center mb-6 sm:mb-4 justify-center">
          <a href="https://www.atly.com/" target="_blank" rel="noopener noreferrer">
            <img 
              src={ATLY_LOGO} 
              alt="Atly logo" 
              className="h-16 sm:h-20 w-auto drop-shadow-2xl rounded-2xl backdrop-blur-lg cursor-pointer hover:scale-105 transition-transform duration-200" 
              style={{ background: 'none' }} 
            />
          </a>
        </header>
        
        <div className="flex flex-col items-center justify-center w-full max-w-md animate-fade-in">
          {/* Circular Progress Loader - Mobile Optimized */}
          <div className="relative flex items-center justify-center mb-6 sm:mb-8">
            {/* Mobile Circle */}
            <div className="block sm:hidden">
              <svg width={circleSize} height={circleSize} style={{ transform: 'rotate(-90deg)' }}>
                <circle
                  cx={circleSize/2}
                  cy={circleSize/2}
                  r={radius}
                  stroke="#f7e6f0"
                  strokeWidth="8"
                  fill="white"
                />
                <circle
                  cx={circleSize/2}
                  cy={circleSize/2}
                  r={radius}
                  stroke="url(#pinkGradientMobile)"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={2 * Math.PI * radius}
                  strokeDashoffset={2 * Math.PI * radius * (1 - percent / 100)}
                  strokeLinecap="round"
                  style={{ transition: 'stroke-dashoffset 0.7s cubic-bezier(.4,2,.6,1)' }}
                />
                <defs>
                  <linearGradient id="pinkGradientMobile" x1="0" y1="0" x2={circleSize} y2="0" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#ff7eb3" />
                    <stop offset="1" stopColor="#ff758c" />
                  </linearGradient>
                </defs>
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-4xl font-extrabold text-[#23263b] z-10">
                {percent}%
              </span>
            </div>

            {/* Desktop Circle */}
            <div className="hidden sm:block">
              <svg width={smCircleSize} height={smCircleSize} style={{ transform: 'rotate(-90deg)' }}>
                <circle
                  cx={smCircleSize/2}
                  cy={smCircleSize/2}
                  r={smRadius}
                  stroke="#f7e6f0"
                  strokeWidth="10"
                  fill="white"
                />
                <circle
                  cx={smCircleSize/2}
                  cy={smCircleSize/2}
                  r={smRadius}
                  stroke="url(#pinkGradientDesktop)"
                  strokeWidth="10"
                  fill="none"
                  strokeDasharray={2 * Math.PI * smRadius}
                  strokeDashoffset={2 * Math.PI * smRadius * (1 - percent / 100)}
                  strokeLinecap="round"
                  style={{ transition: 'stroke-dashoffset 0.7s cubic-bezier(.4,2,.6,1)' }}
                />
                <defs>
                  <linearGradient id="pinkGradientDesktop" x1="0" y1="0" x2={smCircleSize} y2="0" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#ff7eb3" />
                    <stop offset="1" stopColor="#ff758c" />
                  </linearGradient>
                </defs>
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-6xl font-extrabold text-[#23263b] z-10">
                {percent}%
              </span>
            </div>
          </div>
          
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white drop-shadow-lg mb-4 leading-tight">
            Analyzing Your Results
          </h1>
          
          <h2 className="text-base sm:text-xl text-white drop-shadow-lg mt-4 sm:mt-6 min-h-[2.5rem] leading-relaxed px-2">
            {analysisSteps[currentStep]}
          </h2>
        </div>
      </main>
    );
  }

  // Remove the loader results section entirely since we're redirecting to pricing
  return null; // This won't be reached since we redirect
} 