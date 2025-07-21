import React from 'react';

const ATLY_LOGO = "/atly-logo.png";
const ATLY_WEBSITE = "https://www.atly.com/";

export default function Logo() {
  return (
    <a href={ATLY_WEBSITE} target="_blank" rel="noopener noreferrer">
      <img 
        src={ATLY_LOGO} 
        alt="Atly logo" 
        className="cursor-pointer hover:scale-105 transition-transform duration-200"
        style={{ 
          width: '480px',
          height: '144px',
          objectFit: 'contain',
          background: 'none'
        }} 
      />
    </a>
  );
} 