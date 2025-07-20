import React from 'react';

interface ProgressBarProps {
  progress: number;
  backUrl?: string | null;
  skipUrl?: string;
  className?: string;
}

export default function ProgressBar({ 
  progress, 
  backUrl, 
  skipUrl, 
  className = '' 
}: ProgressBarProps) {
  return (
    <div className={`flex items-center justify-between mb-4 md:mb-8 w-full ${className}`}>
      <div className="flex-shrink-0 w-12 md:w-16">
        {backUrl ? (
          <a 
            href={backUrl} 
            className="text-gray-300 text-sm md:text-base hover:text-gray-200 transition-colors duration-150 flex items-center"
          >
            Back
          </a>
        ) : (
          <div></div>
        )}
      </div>
      
      <div className="flex-1 mx-2 md:mx-4">
        <div className="w-full bg-white/30 rounded-full h-2 md:h-2.5 shadow-inner">
          <div
            className="bg-blue-400 h-2 md:h-2.5 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      
      <div className="flex-shrink-0 w-12 md:w-16 text-right">
        {skipUrl && (
          <a 
            href={skipUrl} 
            className="text-gray-300 text-sm md:text-base hover:text-gray-200 transition-colors duration-150"
          >
            Skip
          </a>
        )}
      </div>
    </div>
  );
} 