import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HeroPhysics from './HeroPhysics';
import { personalData } from '../data/content';
import confetti from 'canvas-confetti';

gsap.registerPlugin(ScrollTrigger);

export default function Hero({ ready }) {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const row1Ref = useRef(null);
  const row2Ref = useRef(null);
  const bottomBarRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  // Letter split animation on load
  useEffect(() => {
    if (!ready) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const letters = heroRef.current.querySelectorAll('.hero-letter');

    // Initial state
    gsap.set(letters, {
      y: 120,
      opacity: 0,
      rotateZ: (i) => (i % 2 === 0 ? -6 : 6),
      scale: 0.9,
    });

    gsap.to(letters, {
      y: 0,
      opacity: 1,
      rotateZ: 0,
      scale: 1,
      duration: 1,
      stagger: 0.045,
      ease: 'back.out(1.4)',
      delay: 0.1,
    });

    // Animate bottom bar
    gsap.fromTo(
      bottomBarRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, delay: 0.7, ease: 'power2.out' }
    );

    // Scroll parallax & scale out
    const ctx = gsap.context(() => {
      gsap.to(titleRef.current, {
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
        yPercent: 25,
        scale: 0.95,
        opacity: 0.35,
      });
    }, heroRef);

    return () => ctx.revert();
  }, [ready]);

  // Subtle mouse parallax on hero text
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 16;
      const y = (e.clientY / innerHeight - 0.5) * 12;
      setMouseOffset({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handlePlayClick = () => {
    setIsPlaying((prev) => !prev);
    if (!isPlaying) {
      confetti({
        particleCount: 35,
        spread: 60,
        origin: { x: 0.9, y: 0.85 },
        colors: ['#D0003A', '#007A3D', '#F0E85A', '#141516'],
      });
    }
  };

  const line1 = personalData.firstName.split('');
  const line2 = personalData.lastName.split('');

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden bg-gradient-to-br from-[#F0E85A] via-[#F3DA4C] to-[#F5C242] select-none pt-12 sm:pt-16 pb-2"
    >
      {/* Interactive Matter.js Physics floating balls canvas */}
      <HeroPhysics isPlaying={isPlaying} onTogglePlay={handlePlayClick} />

      {/* Top subtle badge / announcement */}
      <div className="relative z-10 w-full px-6 sm:px-10 flex justify-between items-center text-xs retro-mono font-bold tracking-widest text-[#007A3D]">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#007A3D] animate-ping opacity-75"></span>
          <span className="text-[#141516]/80">{personalData.college.toUpperCase()}</span>
        </div>
        <div className="hidden sm:block text-[#141516]/70">
          THRISSUR // CLASS OF 2029
        </div>
      </div>

      {/* Giant Chunky Rounded Display Typography */}
      <div
        ref={titleRef}
        className="relative z-10 w-full px-3 sm:px-6 md:px-10 my-auto flex flex-col items-center justify-center transition-transform duration-300 ease-out"
        style={{
          transform: `translate3d(${mouseOffset.x}px, ${mouseOffset.y}px, 0) skewX(${mouseOffset.x * 0.15}deg)`,
        }}
      >
        {/* ROW 1: RAIZA */}
        <div
          ref={row1Ref}
          className="w-full flex flex-nowrap whitespace-nowrap justify-between items-center retro-display text-[19vw] sm:text-[18.5vw] md:text-[17.5vw] leading-[0.80] text-[#141516] tracking-[-0.035em] font-black filter drop-shadow-[0_4px_0_rgba(20,21,22,0.06)]"
        >
          {line1.map((char, index) => (
            <span
              key={`r1-${index}`}
              className="hero-letter inline-block transform-gpu will-change-transform hover:text-[#D0003A] transition-colors duration-200"
            >
              {char}
            </span>
          ))}
        </div>

        {/* ROW 2: NARGEES */}
        <div
          ref={row2Ref}
          className="w-full flex flex-nowrap whitespace-nowrap justify-between items-center retro-display text-[15.8vw] sm:text-[15.4vw] md:text-[14.8vw] leading-[0.80] text-[#141516] tracking-[-0.04em] font-black filter drop-shadow-[0_4px_0_rgba(20,21,22,0.06)] mt-[-1vw]"
        >
          {line2.map((char, index) => (
            <span
              key={`r2-${index}`}
              className="hero-letter inline-block transform-gpu will-change-transform hover:text-[#007A3D] transition-colors duration-200"
            >
              {char}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom bar matching the reference:
          Thin horizontal divider, monospaced dark green secondary text on left,
          pill badge with pulsing red dot in center,
          and round red PLAY button in the corner with stacked 3 dots!
      */}
      <div
        ref={bottomBarRef}
        className="relative z-20 w-full px-4 sm:px-8 pb-4"
      >
        {/* Thin divider line */}
        <div className="w-full h-[1.5px] bg-[#141516]/40 mb-3 sm:mb-4"></div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          {/* Left: Uppercase monospaced font in dark green, wide letter spacing */}
          <div className="retro-mono text-[11px] sm:text-xs md:text-[13px] text-[#007A3D] font-bold leading-relaxed tracking-[0.2em] max-w-xl">
            <p className="hover:text-[#141516] transition-colors duration-200">
              {personalData.heroSubtitleLine1}
            </p>
            <p className="text-[#007A3D]/90 font-medium tracking-[0.18em]">
              {personalData.heroSubtitleLine2}
            </p>
          </div>

          {/* Right cluster: Status badge & round PLAY button */}
          <div className="flex items-center justify-between md:justify-end gap-4 sm:gap-6">
            {/* Status badge: pill badge with pulsing red dot */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#141516] bg-[#F0E85A]/80 backdrop-blur-sm retro-mono text-[10px] sm:text-xs font-bold tracking-wider text-[#141516] shadow-sm hover:scale-105 transition-transform duration-200">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D0003A] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#D0003A]"></span>
              </span>
              <span>{personalData.statusBadge}</span>
            </div>

            {/* Corner PLAY button matching reference exactly:
                Round crimson circle with white/yellow 'PLAY',
                with 3 mini dots right above it!
            */}
            <div className="relative flex flex-col items-center">
              {/* 3 mini dots above PLAY button */}
              <div className="flex gap-1 mb-1 transform -translate-x-1">
                <span className="w-2 h-2 rounded-full bg-[#007A3D] animate-bounce" style={{ animationDelay: '0ms' }}></span>
                <span className="w-2 h-2 rounded-full bg-[#D0003A] animate-bounce" style={{ animationDelay: '150ms' }}></span>
                <span className="w-2 h-2 rounded-full bg-[#007A3D] animate-bounce" style={{ animationDelay: '300ms' }}></span>
              </div>

              {/* The PLAY circle button */}
              <button
                onClick={handlePlayClick}
                data-cursor="pointer"
                title={isPlaying ? "Reset gravity to floating drift" : "Drop balls and bounce with gravity!"}
                aria-label={isPlaying ? "Reset physics balls" : "Drop physics balls"}
                className={`relative w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 border-[#141516] flex items-center justify-center font-display text-xs sm:text-sm font-black tracking-wider transition-all duration-300 shadow-[2px_3px_0_#141516] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none ${
                  isPlaying
                    ? 'bg-[#007A3D] text-[#F0E85A] rotate-12 scale-105'
                    : 'bg-[#D0003A] text-white hover:bg-[#b50032] hover:scale-105'
                }`}
              >
                {isPlaying ? 'RESET' : 'PLAY'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
