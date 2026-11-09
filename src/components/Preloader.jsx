import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';

export default function Preloader({ onComplete }) {
  const [percent, setPercent] = useState(0);
  const containerRef = useRef(null);
  const ballRef = useRef(null);

  useEffect(() => {
    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const duration = prefersReducedMotion ? 600 : 1600;
    const startTime = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(Math.floor((elapsed / duration) * 100), 100);
      setPercent(progress);

      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          if (containerRef.current) {
            gsap.to(containerRef.current, {
              yPercent: -100,
              duration: 0.8,
              ease: 'power4.inOut',
              onComplete: () => {
                if (onComplete) onComplete();
              }
            });
          } else {
            if (onComplete) onComplete();
          }
        }, 150);
      }
    }, 25);

    // Ball bounce animation
    if (ballRef.current && !prefersReducedMotion) {
      gsap.to(ballRef.current, {
        y: -40,
        repeat: -1,
        yoyo: true,
        duration: 0.45,
        ease: 'power2.out'
      });
    }

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] bg-[#141516] text-[#F0E85A] flex flex-col justify-between p-8 sm:p-12 select-none"
    >
      {/* Top row */}
      <div className="flex justify-between items-center retro-mono text-xs tracking-widest text-[#F0E85A]/80">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#D0003A] animate-pulse"></span>
          <span>RAIZA NARGEES // PORTFOLIO</span>
        </div>
        <div>THRISSUR, KERALA 🇮🇳</div>
      </div>

      {/* Middle: Bouncing ball & huge number */}
      <div className="flex flex-col items-center justify-center my-auto gap-6">
        <div className="relative w-20 h-20 flex items-center justify-center">
          <div
            ref={ballRef}
            className="w-12 h-12 rounded-full bg-[#D0003A] border-2 border-[#F0E85A] shadow-[0_10px_25px_rgba(208,0,58,0.5)] flex items-center justify-center"
          >
            <div className="w-3.5 h-3.5 rounded-full bg-[#007A3D]"></div>
          </div>
          {/* Shadow beneath ball */}
          <div className="absolute -bottom-2 w-14 h-2.5 bg-black/60 rounded-full blur-[2px]"></div>
        </div>

        <div className="text-center">
          <span className="retro-display text-7xl sm:text-9xl md:text-[11rem] font-black tracking-tight text-[#F0E85A]">
            {percent}
            <span className="text-4xl sm:text-6xl text-[#D0003A] font-mono">%</span>
          </span>
        </div>
      </div>

      {/* Bottom row */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 retro-mono text-xs tracking-wider text-[#F0E85A]/70 border-t border-[#F0E85A]/20 pt-4">
        <div>INITIALIZING INTELLIGENCE & PHYSICS ENGINE...</div>
        <div className="flex items-center gap-3">
          <div className="w-32 bg-white/10 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-[#D0003A] h-full transition-all duration-75"
              style={{ width: `${percent}%` }}
            ></div>
          </div>
          <span>{percent}%</span>
        </div>
      </div>
    </div>
  );
}

