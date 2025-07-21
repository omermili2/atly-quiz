import React from 'react';
import { COMPOUND_STYLES, LAYOUT } from '@/lib/design';

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
    <div className={`${LAYOUT.FLEX_CENTER_BETWEEN} mb-4 md:mb-8 ${LAYOUT.W_FULL} ${className}`}>
      <div className="flex-shrink-0 w-12 md:w-16">
        {backUrl ? (
          <a 
            href={backUrl} 
            className={`${COMPOUND_STYLES.SECONDARY_LINK} ${LAYOUT.FLEX_CENTER}`}
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
            className={COMPOUND_STYLES.SECONDARY_LINK}
          >
            Skip
          </a>
        )}
      </div>
    </div>
  );
} 