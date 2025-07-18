'use client';

import { useState } from 'react';
import { Check } from 'lucide-react';
import analytics from '@/lib/analytics';

type Props = {
  questionId: number;
  answer: string;
  onSelectionChange: (answer: string, isSelected: boolean) => void;
};

export default function MultipleChoiceCard({ questionId, answer, onSelectionChange }: Props) {
  const [isSelected, setIsSelected] = useState(false);

  const handleSelect = () => {
    const newSelectedState = !isSelected;
    setIsSelected(newSelectedState);
    
    // Track answer selection/deselection
    if (newSelectedState) {
      analytics.trackAnswerSelected(questionId, answer, 'multiple');
    }
    
    // Safely call the callback with error handling
    try {
      onSelectionChange(answer, newSelectedState);
    } catch (error) {
      console.error('Error in selection change callback:', error);
      // Revert state if callback fails
      setIsSelected(!newSelectedState);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleSelect();
    }
  };

  return (
    <div
      className={`
        w-full p-4 sm:p-4 md:p-6 rounded-2xl cursor-pointer transition-all duration-300 min-h-[56px] flex items-center
        ${isSelected 
          ? 'bg-gradient-to-r from-[#ff7eb3] to-[#ff758c] text-white shadow-lg' 
          : 'bg-white/95 hover:bg-white border border-white/50 hover:border-[#ff7eb3]/50 shadow-md hover:shadow-xl active:scale-[0.98]'
        }
      `}
      onClick={handleSelect}
      onKeyDown={handleKeyDown}
      role="checkbox"
      aria-checked={isSelected}
      aria-label={`${isSelected ? 'Deselect' : 'Select'} ${answer}`}
      tabIndex={0}
    >
      <div className="flex items-center justify-between w-full">
        <p 
          className={`text-sm sm:text-base md:text-lg font-semibold leading-relaxed pr-3 ${
            isSelected ? 'text-white' : 'text-[#2b2e7a]'
          }`}
        >
          {answer}
        </p>
        <div
          className={`
            rounded-full h-7 w-7 sm:h-6 sm:w-6 flex items-center justify-center transition-all duration-300 flex-shrink-0
            ${isSelected 
              ? 'bg-white/25' 
              : 'border-2 border-gray-300'
            }
          `}
          aria-hidden="true"
        >
          {isSelected && <Check size={16} className="text-white" />}
        </div>
      </div>
    </div>
  );
} 