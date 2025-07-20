import React from 'react';
import { Star } from 'lucide-react';
import type { Testimonial } from '@/lib/types';

interface TestimonialCardProps {
  testimonial: Testimonial;
  isVisible?: boolean;
  animationDelay?: number;
  className?: string;
}

export default function TestimonialCard({ 
  testimonial, 
  isVisible = true,
  animationDelay = 0,
  className = ''
}: TestimonialCardProps) {
  const visibilityClasses = isVisible 
    ? 'opacity-100 translate-y-0' 
    : 'opacity-0 translate-y-8';
    
  const allClasses = `bg-white/90 backdrop-blur-sm text-gray-800 rounded-xl p-2 w-7/8 mt-1 mx-auto md:w-full md:min-w-[206px] md:max-w-[300px] text-left shadow-lg flex-shrink-0 transition-all duration-700 ease-out ${visibilityClasses} ${className}`.trim();

  return (
    <div
      className={allClasses}
      style={{ transitionDelay: `${animationDelay}ms` }}
    >
      <p className="font-semibold mb-1 text-xs md:text-sm">
        &quot;{testimonial.quote}&quot;
      </p>
      <div className="flex items-center justify-between mt-1">
        <div className="flex items-center gap-1.5">
          <img 
            src={testimonial.avatar} 
            alt={testimonial.name} 
            className="w-6 h-6 rounded-full border-2 border-white" 
          />
          <span className="text-sm font-bold">{testimonial.name}</span>
        </div>
        <div className="flex">
          {[...Array(testimonial.stars)].map((_, idx) => (
            <Star key={idx} size={12} className="text-yellow-500 fill-yellow-500" />
          ))}
        </div>
      </div>
    </div>
  );
} 