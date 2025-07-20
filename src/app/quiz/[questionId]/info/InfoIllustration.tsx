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
    <img
      src={imageUrl}
      alt={`Illustration for ${title}`}
      className="w-32 h-32 object-cover rounded-full shadow-lg mb-4"
      style={{ background: 'none' }}
      onError={(e) => {
        const target = e.target as HTMLImageElement;
        if (target.src !== DEFAULT_ILLUSTRATION) {
          target.src = DEFAULT_ILLUSTRATION;
        }
      }}
    />
  );
} 