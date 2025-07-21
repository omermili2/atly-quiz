'use client';

import { useEffect } from 'react';
import analytics from '@/lib/analytics';

interface Props {
  questionId: number;
  infoTitle: string;
}

export default function InfoTracker({ questionId, infoTitle }: Props) {
  useEffect(() => {
    analytics.trackInfoPageViewed(questionId, infoTitle);
  }, [questionId, infoTitle]);

  return null;
} 