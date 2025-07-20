import React from 'react';

interface PageLayoutProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'landing' | 'centered';
}

const layoutVariants = {
  default: 'flex flex-col items-center min-h-screen p-8 text-center',
  landing: 'flex flex-col min-h-screen p-6 text-center text-white',
  centered: 'flex flex-col items-center justify-center min-h-screen px-4 py-8',
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