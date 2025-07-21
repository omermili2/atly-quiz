"use client";
import Link from 'next/link';
import { ShieldCheck, Award, Map } from 'lucide-react';
import { useEffect, useState } from 'react';
import Button from '@/components/ui/Button';
import TestimonialCard from '@/components/ui/TestimonialCard';
import type { Testimonial } from '@/lib/types';
import analytics from '@/lib/analytics';

const TESTIMONIAL_ANIMATION_DELAY = 50;
const TESTIMONIAL_STAGGER_DELAY = 100;

function ProofItem({ icon, text }: { icon: React.ReactNode, text: string }) {
  return (
    <div className="flex flex-col md:flex-row items-center gap-1 md:gap-2 text-white/80">
      <span className="font-bold text-xs tracking-wider uppercase !font-extrabold text-center md:text-left">{text}</span>
      {icon}
    </div>
  );
}

const testimonials: Testimonial[] = [
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
  const [visible, setVisible] = useState<number>(0);
  
  useEffect(() => {
    analytics.trackLandingPageLoad();
    
    let timeout: NodeJS.Timeout;
    if (visible < testimonials.length) {
      timeout = setTimeout(() => setVisible(visible + 1), TESTIMONIAL_ANIMATION_DELAY);
    }
    return () => clearTimeout(timeout);
  }, [visible]);

  const handleContinueClick = (): void => {
    analytics.trackContinueClick();
  };

  return (
    <div className="relative min-h-screen">
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: "url(https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1888&auto=format&fit=crop)" }}
      ></div>

      <div className="absolute inset-0 bg-gradient-to-t from-[#5a2d91]/80 via-[#2b2e7a]/50 to-transparent z-10"></div>
      
      <main className="relative z-20 flex flex-col min-h-screen p-6 text-center text-white">

        <div className="flex flex-col md:flex-row items-center gap-2 md:gap-8 mb-8 md:mb-[25px] md:flex-grow md:justify-center">
          {/* Mobile layout */}
          <div className="flex flex-row md:hidden items-center gap-2 mb-4 mt-4">
            <ProofItem icon={<ShieldCheck size={18} />} text="Gluten-Free Guarantee" />
            <ProofItem icon={<Award size={18} />} text="#1 Dietitian's Choice" />
            <ProofItem icon={<Map size={18} />} text="Most Reliable Celiac Map" />
          </div>
          
          {/* Desktop layout */}
          <div className="hidden md:flex md:flex-row items-center gap-20 mb- md:mt-18">
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

        <section className="flex-grow flex flex-col justify-center items-center">
          <h2 className="text-4xl md:text-6xl font-extrabold mb-4 drop-shadow-lg leading-tight -mt-16 md:-mt-50 font-display">
            Quickly find safe<br/>gluten-free places
          </h2>
        </section>

        <div className="w-full flex justify-center">
          <div className="flex flex-col md:flex-row gap-3 overflow-x-auto pb-1 px-1 md:overflow-visible md:pb-0 md:px-0 max-w-full md:max-w-3xl justify-center mx-auto">
            {testimonials.map((testimonial, i) => (
              <TestimonialCard
                key={testimonial.name}
                testimonial={testimonial}
                isVisible={visible > i}
                animationDelay={i * TESTIMONIAL_STAGGER_DELAY}
              />
            ))}
          </div>
        </div>

        <footer className="w-full flex flex-col items-center gap-4 mt-6">
          <Link href="/quiz/1" className="w-full max-w-sm">
            <Button 
              onClick={handleContinueClick}
              fullWidth
            >
              CONTINUE
            </Button>
          </Link>

          <div className="flex items-center gap-2 text-white/80 mt-2">
            <div className="flex -space-x-2">
                <img src="https://i.pravatar.cc/40?u=a" alt="user 1" width={24} height={24} className="w-6 h-6 rounded-full border-2 border-white/50" />
                <img src="https://i.pravatar.cc/40?u=b" alt="user 2" width={24} height={24} className="w-6 h-6 rounded-full border-2 border-white/50" />
                <img src="https://i.pravatar.cc/40?u=c" alt="user 3" width={24} height={24} className="w-6 h-6 rounded-full border-2 border-white/50" />
            </div>
            <span className="text-sm font-semibold">341 joined today 🙌</span>
          </div>
        </footer>
      </main>
    </div>
  );
}