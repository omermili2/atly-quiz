'use client';

import React from 'react';

const INFO_ILLUSTRATIONS: Record<string, string> = {
  "Personalized for You": "/images/info/personalized.jpg",
  "Find Gluten-Free Places Fast": "/images/info/places.jpg", 
  "Delicious Recipes & Tips": "/images/info/recipes.jpg",
  "Guidance at Every Step": "/images/info/guidance.jpg",
} as const;

const DEFAULT_ILLUSTRATION = "/images/info/default.jpg";

function getIllustrationUrl(title: string): string {
  return INFO_ILLUSTRATIONS[title] || DEFAULT_ILLUSTRATION;
}

export default function InfoIllustration({ title }: { title: string }) {
  const imageUrl = getIllustrationUrl(title);
  
  return (
    <div className="flex justify-center mb-4 md:mb-6">
      <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden shadow-lg flex-shrink-0">
        <img
          src={imageUrl}
          alt={`Illustration for ${title}`}
          width={96}
          height={96}
          className="w-full h-full object-cover object-center"
          loading="eager"
          style={{ minWidth: '100%', minHeight: '100%' }}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            if (target.src !== DEFAULT_ILLUSTRATION) {
              target.src = DEFAULT_ILLUSTRATION;
            }
          }}
        />
      </div>
    </div>
  );
}