import React from 'react';

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
  as?: 'span' | 'p' | 'h1' | 'h2' | 'h3';
}

export default function GradientText({ 
  children, 
  className = '',
  as = 'span'
}: GradientTextProps) {
  const baseClasses = 'bg-gradient-to-r from-[#ff7eb3] via-[#ff758c] to-[#ff7eb3] bg-clip-text text-transparent';
  const allClasses = `${baseClasses} ${className}`.trim();
  
  const Component = as;

  return (
    <Component className={allClasses}>
      {children}
    </Component>
  );
} 