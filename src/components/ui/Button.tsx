import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'rounded';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  children: React.ReactNode;
}

const buttonVariants = {
  primary: 'bg-gradient-to-r from-[#ff7eb3] via-[#ff758c] to-[#ff7eb3] rounded-xl',
  rounded: 'bg-gradient-to-r from-[#ff7eb3] via-[#ff758c] to-[#ff7eb3] rounded-full',
};

const buttonSizes = {
  sm: 'py-2 px-4 text-sm',
  md: 'py-4 px-6 text-lg',
  lg: 'py-4 px-8 text-xl',
};

export default function Button({ 
  variant = 'primary', 
  size = 'md', 
  fullWidth = false,
  className = '',
  children,
  ...props 
}: ButtonProps) {
  const baseClasses = 'text-white font-bold shadow-xl hover:scale-105 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-[#ff7eb3]';
  const variantClasses = buttonVariants[variant];
  const sizeClasses = buttonSizes[size];
  const widthClasses = fullWidth ? 'w-full' : '';
  
  const allClasses = `${baseClasses} ${variantClasses} ${sizeClasses} ${widthClasses} ${className}`.trim();

  return (
    <button className={allClasses} {...props}>
      {children}
    </button>
  );
} 