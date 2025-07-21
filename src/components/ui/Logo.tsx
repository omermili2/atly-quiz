import React from 'react';
import Image from 'next/image';

const ATLY_LOGO = "/atly-logo.png";
const ATLY_WEBSITE = "https://www.atly.com/";

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const logoSizes = {
  sm: { width: 48, height: 48 },
  md: { width: 64, height: 64 }, 
  lg: { width: 80, height: 80 },
  xl: { width: 112, height: 112 },
};

export default function Logo({ size = 'md', className = '' }: LogoProps) {
  const { width, height } = logoSizes[size];
  const baseClasses = 'w-auto drop-shadow-2xl cursor-pointer hover:scale-105 transition-transform duration-200';
  const allClasses = `${baseClasses} ${className}`.trim();

  return (
    <a href={ATLY_WEBSITE} target="_blank" rel="noopener noreferrer">
      <Image 
        src={ATLY_LOGO} 
        alt="Atly logo" 
        width={width}
        height={height}
        className={allClasses}
        priority={size === 'lg' || size === 'xl'} // Preload larger logos
        style={{ background: 'none' }} 
      />
    </a>
  );
} 