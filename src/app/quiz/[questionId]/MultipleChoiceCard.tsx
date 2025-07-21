'use client';

import { useState } from 'react';
import { Check } from 'lucide-react';
import { COMPOUND_STYLES, COLORS, COMPONENTS, LAYOUT } from '@/lib/design';
import Card from '@/components/ui/Card';
import analytics from '@/lib/analytics';

type Props = {
  questionId: number;
  questionText: string;
  answer: string;
  onSelectionChange: (answer: string, isSelected: boolean) => void;
};

export default function MultipleChoiceCard({ questionId, questionText, answer, onSelectionChange }: Props) {
  const [isSelected, setIsSelected] = useState(false);

  const handleSelect = () => {
    const newSelectedState = !isSelected;
    setIsSelected(newSelectedState);
    
    if (newSelectedState) {
      analytics.trackAnswer(questionId, answer, 'multiple', questionText);
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
      <div className={LAYOUT.FLEX_CENTER_BETWEEN}>
        <p className={`${COMPOUND_STYLES.ANSWER_TEXT} ${
          isSelected ? COLORS.WHITE : 'text-[#2b2e7a]'
        }`}>
          {answer}
        </p>
        <div
          className={`
            rounded-full ${COMPONENTS.ICON_SMALL} ${LAYOUT.FLEX_CENTER} transition-all duration-300 ml-3 flex-shrink-0
            ${isSelected 
              ? COLORS.WHITE_25_BG
              : 'border-2 border-gray-300'
            }
          `}
          aria-hidden="true"
        >
          {isSelected && <Check size={14} className={`${COLORS.WHITE} md:w-4 md:h-4`} />}
        </div>
      </div>
    </Card>
  );
} 