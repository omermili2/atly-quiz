import React from 'react';
import Logo from '@/components/ui/Logo';

interface HeaderProps {
  logoSize?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  spacing?: 'sm' | 'md' | 'lg';
}

const spacingClasses = {
  sm: 'mb-0.5 md:mb-1',
  md: 'mb-1 md:mb-2', 
  lg: 'mb-1.5 md:mb-3',
};

export default function Header({ 
  logoSize = 'md',
  className = '',
  spacing = 'md'
}: HeaderProps) {
  const spacingClass = spacingClasses[spacing];
  const allClasses = `w-full flex items-center justify-center ${spacingClass} ${className}`.trim();

  return (
    <header className={allClasses}>
      <Logo size={logoSize} />
    </header>
  );
} 