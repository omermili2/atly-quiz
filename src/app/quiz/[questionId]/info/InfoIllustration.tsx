'use client';

import React from 'react';

// Image mapping configuration
const INFO_ILLUSTRATIONS: Record<string, string> = {
  "Personalized for You": "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=80",
  "Find Gluten-Free Places Fast": "https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&w=400&q=80",
  "Delicious Recipes & Tips": "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=400&q=80",
  "Guidance at Every Step": "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=400&q=80",
} as const;

const DEFAULT_ILLUSTRATION = "https://images.unsplash.com/photo-1547573854-74d2a71d0826?auto=format&fit=crop&w=400&q=80";

// Utility function
function getIllustrationUrl(title: string): string {
  return INFO_ILLUSTRATIONS[title] || DEFAULT_ILLUSTRATION;
}

type Props = {
  title: string;
};

export default function InfoIllustration({ title }: Props) {
  const imageUrl = getIllustrationUrl(title);
  
  return (
    <img
      src={imageUrl}
      alt={`Illustration for ${title}`}
      className="w-32 h-32 object-cover rounded-full shadow-lg mb-4 animate-fade-in"
      style={{ background: 'none' }}
      onError={(e) => {
        // Fallback to default image on error
        const target = e.target as HTMLImageElement;
        if (target.src !== DEFAULT_ILLUSTRATION) {
          target.src = DEFAULT_ILLUSTRATION;
        }
      }}
    />
  );
} 