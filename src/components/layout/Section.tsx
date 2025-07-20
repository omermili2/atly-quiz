import React from 'react';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
  spacing?: 'none' | 'sm' | 'md' | 'lg';
}

const maxWidthClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md', 
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
  '3xl': 'max-w-3xl',
};

const spacingClasses = {
  none: '',
  sm: 'mt-4',
  md: 'mt-8',
  lg: 'mt-12',
};

export default function Section({ 
  children, 
  className = '', 
  maxWidth = '2xl',
  spacing = 'md'
}: SectionProps) {
  const maxWidthClass = maxWidthClasses[maxWidth];
  const spacingClass = spacingClasses[spacing];
  const allClasses = `w-full ${maxWidthClass} ${spacingClass} ${className}`.trim();

  return (
    <div className={allClasses}>
      {children}
    </div>
  );
} 