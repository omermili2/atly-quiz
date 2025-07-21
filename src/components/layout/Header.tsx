import React from 'react';

const ATLY_LOGO = "/atly-logo.png";
const ATLY_WEBSITE = "https://www.atly.com/";

export default function Header() {
  return (
    <header className="w-full flex items-center justify-center py-2">
      <a href={ATLY_WEBSITE} target="_blank" rel="noopener noreferrer">
        <div className="w-[480px] h-[144px] flex items-center justify-center flex-shrink-0">
          <img 
            src={ATLY_LOGO} 
            alt="Atly logo"
            width={240}
            height={72}
            className="w-[240px] h-[72px] object-contain hover:scale-105 transition-transform duration-200"
            loading="eager"
          />
        </div>
      </a>
    </header>
  );
}