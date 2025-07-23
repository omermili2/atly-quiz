'use client';
import { useEffect, useState } from 'react';
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

  return (
    <div className="flex-1 flex flex-col justify-center items-center min-h-[calc(100vh-140px)] p-6 text-center text-white">
      <div className="max-w-lg w-full">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">
          Analyzing Your Preferences
        </h1>
        
        <div className="mb-8">
          <div className="w-full bg-white/20 rounded-full h-3 mb-4">
            <div
              className="bg-gradient-to-r from-blue-400 to-purple-500 h-3 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${percent}%` }}
            ></div>
          </div>
          <p className="text-2xl font-semibold">{percent}%</p>
        </div>
        
        <p className="text-lg text-white/80 mb-4">
          {steps[currentStep]}
        </p>
        
        <div className="animate-pulse">
          <div className="flex justify-center space-x-1">
            <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
} 