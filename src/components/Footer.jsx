import React, { useEffect, useState } from 'react';
import { ArrowUp, Heart } from 'lucide-react';
import { personalData } from '../data/content';

export default function Footer() {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      // Indian Standard Time (IST) for Thrissur, Kerala
      const now = new Date();
      const options = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
      setCurrentTime(new Intl.DateTimeFormat('en-US', options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative w-full bg-[#141516] text-[#FDF8E2] border-t border-white/10 px-6 sm:px-10 lg:px-16 py-12 select-none">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Left: Branding & Info */}
        <div className="space-y-1 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <span className="retro-display text-xl text-[#F0E85A] font-black">
              RAIZA NARGEES
            </span>
            <span className="w-2 h-2 rounded-full bg-[#D0003A]"></span>
          </div>
          <p className="retro-mono text-xs text-white/60 tracking-wider">
            FIRST-YEAR B.TECH CSE (AI) • THEJUS ENGG. COLLEGE
          </p>
        </div>

        {/* Center: Live Kerala Time */}
        <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2 rounded-full retro-mono text-xs">
          <span className="w-2 h-2 rounded-full bg-[#007A3D] animate-pulse"></span>
          <span className="text-white/60">THRISSUR, KERALA (IST):</span>
          <span className="font-bold text-[#F0E85A]">{currentTime || '12:00:00 PM'}</span>
        </div>

        {/* Right: Small "Back to top" ball button */}
        <div className="flex items-center gap-4">
          <span className="retro-mono text-xs text-white/50 hidden sm:inline tracking-wider">
            TOP OF PAGE
          </span>
          <button
            onClick={scrollToTop}
            data-cursor="pointer"
            aria-label="Back to top"
            className="w-12 h-12 rounded-full bg-[#D0003A] border-2 border-[#141516] flex items-center justify-center text-white shadow-brutal hover:bg-[#F0E85A] hover:text-[#141516] hover:scale-110 active:scale-95 transition-all duration-200"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Very bottom note */}
      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 retro-mono text-[10px] text-white/40">
        <div>
          © {new Date().getFullYear()} RAIZA NARGEES. CRAFTED WITH REACT, GSAP & MATTER.JS.
        </div>
        <div className="flex items-center gap-1">
          <span>DESIGNED TO PLAY BACK</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#D0003A]"></span>
        </div>
      </div>
    </footer>
  );
}

