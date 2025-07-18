'use client';

type Props = {
  title: string;
};

export default function InfoIllustration({ title }: Props) {
  const getEmojiForTitle = (title: string): string => {
    if (title.toLowerCase().includes('personalized')) return '🎯';
    if (title.toLowerCase().includes('find') || title.toLowerCase().includes('map')) return '🗺️';
    if (title.toLowerCase().includes('recipes') || title.toLowerCase().includes('delicious')) return '🍽️';
    if (title.toLowerCase().includes('guidance') || title.toLowerCase().includes('step')) return '📚';
    return '✨'; // default
  };

  return (
    <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center mb-6 text-6xl backdrop-blur-sm">
      {getEmojiForTitle(title)}
    </div>
  );
} 