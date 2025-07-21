import React from 'react';

const ATLY_LOGO = "/atly-logo.png";
const ATLY_WEBSITE = "https://www.atly.com/";

export default function Logo() {
  return (
    <a href={ATLY_WEBSITE} target="_blank" rel="noopener noreferrer">
      <div 
        style={{ 
          width: '480px', 
          height: '144px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <img 
          src={ATLY_LOGO} 
          alt="Atly logo"
          width={480}
          height={144}
          className="cursor-pointer hover:scale-105 transition-transform duration-200"
          style={{ 
            width: '480px',
            height: '144px',
            objectFit: 'contain',
            background: 'none',
            display: 'block'
          }} 
        />
      </div>
    </a>
  );
} 