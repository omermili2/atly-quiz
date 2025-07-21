import React from 'react';

const ATLY_LOGO = "/atly-logo.png";
const ATLY_WEBSITE = "https://www.atly.com/";

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const logoSizes = {
  sm: 'h-12',
  md: 'h-16', 
  lg: 'h-20',
  xl: 'h-28',
};

export default function Logo({ size = 'md', className = '' }: LogoProps) {
  const sizeClasses = logoSizes[size];
  const baseClasses = 'w-auto drop-shadow-2xl cursor-pointer hover:scale-105 transition-transform duration-200';
  const allClasses = `${baseClasses} ${sizeClasses} ${className}`.trim();

  return (
    <a href={ATLY_WEBSITE} target="_blank" rel="noopener noreferrer">
      <img 
        src={ATLY_LOGO} 
        alt="Atly logo" 
        className={allClasses}
        style={{ background: 'none' }} 
      />
    </a>
  );
} 