'use client';

import { useEffect } from 'react';
import analytics from '@/lib/analytics';

interface Props {
  questionId: number;
  questionText: string;
  questionType: 'single' | 'multiple';
  isFirstQuestion: boolean;
}

export default function QuestionTracker(props: Props): React.JSX.Element | null {
  useEffect(() => {
    analytics.trackQuestionViewed(props.questionId, props.questionText);
  }, [props.questionId, props.questionText]);

  return null;
} 