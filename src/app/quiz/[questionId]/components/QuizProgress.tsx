import React from 'react';

type Props = {
  progress: number;
  previousPageUrl: string | null;
  skipUrl: string;
};

export default function QuizProgress({ progress, previousPageUrl, skipUrl }: Props) {
  return (
    <div className="flex items-center justify-between mb-8 w-full">
      <div className="flex-shrink-0 w-16">
        {previousPageUrl ? (
          <a 
            href={previousPageUrl} 
            className="text-gray-300 text-base hover:text-gray-200 transition-colors duration-150 flex items-center"
          >
            Back
          </a>
        ) : (
          <div></div>
        )}
      </div>
      
      <div className="flex-1 mx-4">
        <div className="w-full bg-white/30 rounded-full h-2.5 shadow-inner">
          <div
            className="bg-blue-400 h-2.5 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      
      <div className="flex-shrink-0 w-16 text-right">
        <a 
          href={skipUrl} 
          className="text-gray-300 text-base hover:text-gray-200 transition-colors duration-150"
        >
          Skip
        </a>
      </div>
    </div>
  );
} 