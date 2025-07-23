import React from 'react';
import { COLORS, LAYOUT, TYPOGRAPHY } from '@/lib/design';

interface PageLayoutProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'landing' | 'centered';
}

const layoutVariants = {
  default: `${LAYOUT.FLEX_CENTER_COL} ${LAYOUT.MIN_H_SCREEN} p-2 md:p-8 ${TYPOGRAPHY.TEXT_CENTER}`,
  landing: `${LAYOUT.FLEX_CENTER_COL} ${LAYOUT.MIN_H_SCREEN} ${LAYOUT.P_4_8} ${TYPOGRAPHY.TEXT_CENTER} ${COLORS.WHITE}`,
  centered: `${LAYOUT.FLEX_CENTER_COL} justify-center ${LAYOUT.MIN_H_SCREEN} px-4 py-6 md:py-8`,
};

export default function PageLayout({ 
  children, 
  className = '', 
  variant = 'default' 
}: PageLayoutProps) {
  const variantClasses = layoutVariants[variant];
  const allClasses = `${variantClasses} ${className}`.trim();

  return (
    <main className={allClasses}>
      {children}
    </main>
  );
} 