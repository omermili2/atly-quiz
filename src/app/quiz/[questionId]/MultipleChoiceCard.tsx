'use client';

import { useState } from 'react';
import { Check } from 'lucide-react';
import Card from '@/components/ui/Card';
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
    
    if (newSelectedState) {
      analytics.trackAnswerSelected(questionId, answer, 'multiple');
    }
    
    try {
      onSelectionChange(answer, newSelectedState);
    } catch (error) {
      console.error('Error in selection change callback:', error);
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
    <Card
      isSelected={isSelected}
      onClick={handleSelect}
      onKeyDown={handleKeyDown}
      role="checkbox"
      ariaChecked={isSelected}
      ariaLabel={`${isSelected ? 'Deselect' : 'Select'} ${answer}`}
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
    </Card>
  );
} 