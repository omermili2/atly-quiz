'use client';

import React, { useEffect } from 'react';
import analytics from '@/lib/analytics';

interface Props {
  questionId: number;
  questionText: string;
  questionType: 'single' | 'multiple';
  isFirstQuestion?: boolean;
}

export default function QuestionTracker({ questionId, questionText, questionType, isFirstQuestion }: Props): React.JSX.Element | null {
  useEffect(() => {
    analytics.trackQuestionViewed(questionId, questionText, questionType);
    
    if (isFirstQuestion) {
      analytics.trackQuizStarted();
    }
  }, [questionId, questionText, questionType, isFirstQuestion]);

  return null;
} 