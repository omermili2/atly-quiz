import React from 'react';
import Logo from '@/components/ui/Logo';

export default function QuizHeader() {
  return (
    <div className="w-full flex justify-center items-start pt-0 -mt-6 md:-mt-4 mb-0 md:mb-1">
      <Logo size="md" className="md:!h-20" />
    </div>
  );
} 