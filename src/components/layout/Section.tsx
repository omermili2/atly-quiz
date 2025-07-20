import React from 'react';

interface SectionProps {
  children: React.ReactNode;
  maxWidth?: 'xl' | '2xl' | '4xl' | '6xl' | 'full';
  spacing?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export default function Section({ 
  children, 
  maxWidth = '4xl', 
  spacing = 'md',
  className = '' 
}: SectionProps) {
  const maxWidthClasses = {
    'xl': 'max-w-xl',
    '2xl': 'max-w-2xl', 
    '4xl': 'max-w-4xl',
    '6xl': 'max-w-6xl',
    'full': 'max-w-full'
  };

  const spacingClasses = {
    'sm': 'px-4 md:px-6',
    'md': 'px-4 md:px-8', 
    'lg': 'px-6 md:px-12',
    'xl': 'px-6 md:px-16'
  };

  return (
    <div className={`w-full ${maxWidthClasses[maxWidth]} mx-auto ${spacingClasses[spacing]} ${className}`}>
      {children}
    </div>
  );
} 