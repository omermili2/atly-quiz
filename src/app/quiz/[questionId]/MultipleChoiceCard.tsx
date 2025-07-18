// src/app/quiz/[questionId]/MultipleChoiceCard.tsx
'use client';

import { useState } from 'react';
import { Check } from 'lucide-react';

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
        w-full p-4 rounded-2xl cursor-pointer transition-all duration-300
        ${isSelected 
          ? 'bg-gradient-to-r from-[#ff7eb3] to-[#ff758c] text-white shadow-lg' 
          : 'bg-white/95 hover:bg-white border border-white/50 hover:border-[#ff7eb3]/50 shadow-md hover:shadow-xl'
        }
      `}
      onClick={handleSelect}
      onKeyDown={handleKeyDown}
      role="checkbox"
      aria-checked={isSelected}
      aria-label={`${isSelected ? 'Deselect' : 'Select'} ${answer}`}
      tabIndex={0}
    >
      <div className="flex items-center justify-between">
        <p 
          className={`text-base md:text-lg font-semibold ${
            isSelected ? 'text-white' : 'text-[#2b2e7a]'
          }`}
        >
          {answer}
        </p>
        <div
          className={`
            rounded-full h-6 w-6 flex items-center justify-center transition-all duration-300
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