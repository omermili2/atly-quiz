import React from 'react';

interface PageLayoutProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'landing' | 'centered';
}

const layoutVariants = {
  default: 'flex flex-col items-center h-screen md:min-h-screen p-3 md:p-8 text-center overflow-hidden md:overflow-visible',
  landing: 'flex flex-col min-h-screen p-4 md:p-6 text-center text-white',
  centered: 'flex flex-col items-center justify-center min-h-screen px-4 py-6 md:py-8',
};

export default function PageLayout({ 
  children, 
  className = '', 
  variant = 'default' 
}: PageLayoutProps) {
  const variantClasses = layoutVariants[variant];
  const baseClasses = 'bg-gradient-to-br from-[#2b2e7a] via-[#5a2d91] to-[#a259c6]';
  const allClasses = `${baseClasses} ${variantClasses} ${className}`.trim();

  return (
    <main className={allClasses}>
      {children}
    </main>
  );
} 