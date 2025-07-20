import React from 'react';

interface CardProps {
  children: React.ReactNode;
  isSelected?: boolean;
  onClick?: () => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLDivElement>) => void;
  className?: string;
  role?: 'button' | 'checkbox' | 'radio' | 'option';
  tabIndex?: number;
  ariaPressed?: boolean;
  ariaChecked?: boolean;
  ariaLabel?: string;
}

export default function Card({
  children,
  isSelected = false,
  onClick,
  onKeyDown,
  className = '',
  role = 'button',
  tabIndex = 0,
  ariaPressed,
  ariaChecked,
  ariaLabel,
}: CardProps) {
  const baseClasses = 'w-full p-3 md:p-4 rounded-xl md:rounded-2xl cursor-pointer transition-all duration-300';
  const stateClasses = isSelected 
    ? 'bg-gradient-to-r from-[#ff7eb3] to-[#ff758c] text-white shadow-lg' 
    : 'bg-white/95 hover:bg-white border border-white/50 hover:border-[#ff7eb3]/50 shadow-md hover:shadow-xl';
  
  const allClasses = `${baseClasses} ${stateClasses} ${className}`.trim();

  return (
    <div
      className={allClasses}
      onClick={onClick}
      onKeyDown={onKeyDown}
      role={role}
      tabIndex={tabIndex}
      aria-pressed={ariaPressed}
      aria-checked={ariaChecked}
      aria-label={ariaLabel}
    >
      {children}
    </div>
  );
} 