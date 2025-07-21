'use client';

import { useEffect } from 'react';
import analytics from '@/lib/analytics';

interface Props {
  questionId: number;
  questionText: string;
  questionType: 'single' | 'multiple';
  isFirstQuestion: boolean;
}

export default function QuestionTracker({ questionId, questionText, questionType, isFirstQuestion }: Props): React.JSX.Element | null {
  useEffect(() => {
    analytics.trackQuestionViewed(questionId);
  }, [questionId]);

  return null;
} 