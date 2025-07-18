'use client';

import { useEffect } from 'react';
import analytics from '@/lib/analytics';

interface Props {
  questionId: number;
  questionText: string;
  questionType: 'single' | 'multiple';
  isFirstQuestion?: boolean;
}

export default function QuestionTracker({ questionId, questionText, questionType, isFirstQuestion }: Props) {
  useEffect(() => {
    // Track question view
    analytics.trackQuestionViewed(questionId, questionText, questionType);
    
    // Track quiz start if this is the first question
    if (isFirstQuestion) {
      analytics.trackQuizStarted();
    }
  }, [questionId, questionText, questionType, isFirstQuestion]);

  return null; // This component doesn't render anything
} 