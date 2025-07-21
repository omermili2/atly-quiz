import React from 'react';

const ATLY_LOGO = "/atly-logo.png";
const ATLY_WEBSITE = "https://www.atly.com/";

export default function Header() {
  return (
    <header className="w-full flex items-center justify-center py-2">
      <a href={ATLY_WEBSITE} target="_blank" rel="noopener noreferrer" className="block">
        <img 
          src={ATLY_LOGO} 
          alt="Atly logo"
          width={360}
          height={108}
          className="w-[360px] h-[108px] object-contain hover:scale-105 transition-transform duration-200 block"
          loading="eager"
          style={{ aspectRatio: '360/108' }}
        />
      </a>
    </header>
  );
}