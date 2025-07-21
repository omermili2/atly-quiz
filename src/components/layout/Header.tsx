import React from 'react';

const ATLY_LOGO = "/atly-logo.png";
const ATLY_WEBSITE = "https://www.atly.com/";

export default function Header() {
  return (
    <header className="w-full flex items-center justify-center py-2">
      <a href={ATLY_WEBSITE} target="_blank" rel="noopener noreferrer">
        <div className="w-[480px] h-[144px] flex items-center justify-center">
          <img 
            src={ATLY_LOGO} 
            alt="Atly logo"
            width={480}
            height={144}
            className="max-w-full max-h-full object-contain hover:scale-105 transition-transform duration-200"
          />
        </div>
      </a>
    </header>
  );
}