// src/app/page.tsx
"use client";
import Link from 'next/link';
import { ShieldCheck, Award, Map, Star } from 'lucide-react';
import { useEffect, useState } from 'react';
import analytics from '@/lib/analytics';


function ProofItem({ icon, text }: { icon: React.ReactNode, text: string }) {
  return (
    <div className="flex flex-col items-center gap-1 text-white/80 text-center">
      <span className="font-bold text-xs sm:text-sm tracking-wide uppercase font-extrabold leading-tight">{text}</span>
      <div className="text-white/90">{icon}</div>
    </div>
  );
}

const testimonials = [
  {
    quote: 'Atly made traveling so much easier. I found safe places everywhere I went!',
    name: 'Maria S.',
    avatar: 'https://i.pravatar.cc/40?img=47',
    stars: 5,
  },
  {
    quote: 'I love the community tips. I finally feel confident eating out again.',
    name: 'Alex P.',
    avatar: 'https://i.pravatar.cc/40?u=alex',
    stars: 5,
  },
];

export default function WelcomePage() {
  // Track which testimonials are visible for staggered animation
  const [visible, setVisible] = useState<number>(0);
  
  useEffect(() => {
    // Track landing page load
    analytics.trackLandingPageLoad();
    
    let timeout: NodeJS.Timeout;
    if (visible < testimonials.length) {
      timeout = setTimeout(() => setVisible(visible + 1), 250);
    }
    return () => clearTimeout(timeout);
  }, [visible]);

  const handleContinueClick = () => {
    analytics.trackLandingPageEngagement('continue_clicked');
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: "url(https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1888&auto=format&fit=crop)" }}
      ></div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#5a2d91]/80 via-[#2b2e7a]/50 to-transparent z-10"></div>
      
      {/* Content */}
      <main className="relative z-20 flex flex-col min-h-screen px-4 py-6 sm:p-6 text-center text-white">
        {/* Trust Badges - Mobile & Desktop */}
        <div className="w-full flex justify-center mb-8 sm:mb-6">
          {/* Mobile layout - stacked vertically for better readability */}
          <div className="grid grid-cols-1 gap-4 sm:hidden w-full max-w-xs">
            <ProofItem icon={<ShieldCheck size={20} />} text="Gluten-Free Guarantee" />
            <ProofItem icon={<Award size={20} />} text="#1 Dietitian's Choice" />
            <ProofItem icon={<Map size={20} />} text="Most Reliable Celiac Map" />
          </div>
          
          {/* Desktop layout */}
          <div className="hidden sm:flex sm:flex-row items-center gap-8 md:gap-20">
            <div className="flex flex-col items-center gap-2 text-center">
              <span className="text-base font-semibold">Gluten-Free Guarantee</span>
              <ShieldCheck size={18} />
            </div>
            <div className="flex flex-col items-center gap-2 text-center">
              <span className="text-base font-semibold">#1 Dietitian&apos;s Choice</span>
              <Award size={18} />
            </div>
            <div className="flex flex-col items-center gap-2 text-center">
              <span className="text-base font-semibold">Most Reliable Celiac Map</span>
              <Map size={18} />
            </div>
          </div>
        </div>  

        {/* Title - optimized for mobile */}
        <section className="flex-grow flex flex-col justify-center items-center px-2 sm:px-0">
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-extrabold mb-6 sm:mb-4 drop-shadow-lg leading-tight text-center max-w-4xl">
            Quickly find safe<br className="sm:inline"/>gluten-free places
          </h2>
        </section>

        {/* CSS Animated Testimonials - Mobile Optimized */}
        <div className="w-full flex justify-center mb-8 sm:mb-6">
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-3 w-full max-w-2xl sm:max-w-3xl justify-center px-2 sm:px-0">
            {testimonials.map((t, i) => (
              <div
                key={t.name}
                className={`bg-white/90 backdrop-blur-sm text-gray-800 rounded-xl p-4 sm:p-3 w-full sm:min-w-[280px] sm:max-w-[300px] text-left shadow-lg transition-all duration-700 ease-out
                  ${visible > i ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
                `}
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                <p className="font-semibold mb-2 text-sm sm:text-sm leading-relaxed">&quot;{t.quote}&quot;</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img src={t.avatar} alt={t.name} className="w-8 h-8 sm:w-6 sm:h-6 rounded-full border-2 border-white" />
                    <span className="text-sm font-bold">{t.name}</span>
                  </div>
                  <div className="flex">
                    {[...Array(t.stars)].map((_, idx) => (
                      <Star key={idx} size={14} className="text-yellow-500 fill-yellow-500" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Button - Mobile Optimized */}
        <footer className="w-full flex flex-col items-center gap-4 pb-6 sm:pb-0">
          <Link href="/quiz/1" className="w-full max-w-sm px-4 sm:px-0">
            <button 
              onClick={handleContinueClick}
              className="w-full bg-gradient-to-r from-[#ff7eb3] via-[#ff758c] to-[#ff7eb3] text-white font-bold py-4 sm:py-4 rounded-xl text-lg shadow-xl hover:scale-105 active:scale-95 transition-transform duration-200 min-h-[48px]"
            >
              CONTINUE
            </button>
          </Link>

          {/* People Joined Today Element - Mobile Optimized */}
          <div className="flex items-center gap-2 text-white/80">
            <div className="flex -space-x-2">
                <img src="https://i.pravatar.cc/40?u=a" alt="user 1" className="w-7 h-7 sm:w-6 sm:h-6 rounded-full border-2 border-white/50" />
                <img src="https://i.pravatar.cc/40?u=b" alt="user 2" className="w-7 h-7 sm:w-6 sm:h-6 rounded-full border-2 border-white/50" />
                <img src="https://i.pravatar.cc/40?u=c" alt="user 3" className="w-7 h-7 sm:w-6 sm:h-6 rounded-full border-2 border-white/50" />
            </div>
            <span className="text-sm font-semibold">341 joined today 🙌</span>
          </div>
        </footer>
      </main>
    </div>
  );
}