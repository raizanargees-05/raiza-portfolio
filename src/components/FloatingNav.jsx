import React, { useEffect, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { sound } from '../utils/audio';

export default function FloatingNav() {
  const [activeSection, setActiveSection] = useState('hero');
  const [scrolled, setScrolled] = useState(false);
  const [isMuted, setIsMuted] = useState(sound.isMuted());

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 100);

      const sections = ['hero', 'about', 'skills', 'education', 'contact'];
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.45) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e, id) => {
    e.preventDefault();
    sound.playBlip();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleToggleSound = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
    if (!muted) sound.playPop(580);
  };

  return (
    <nav
      aria-label="Floating Portfolio Navigation"
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 max-w-[96vw] sm:max-w-max transition-all duration-300"
    >
      <div className="pill-glass flex items-center gap-1 sm:gap-2 p-1.5 sm:p-2 rounded-full shadow-[0_15px_35px_rgba(0,0,0,0.4)] border border-white/20 select-none">
        {/* Logo mark 'r.' */}
        <a
          href="#hero"
          onClick={(e) => scrollToSection(e, 'hero')}
          data-cursor="pointer"
          className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#1E2023] border border-white/20 flex items-center justify-center font-display text-sm sm:text-base font-black text-white hover:bg-[#D0003A] transition-colors"
          title="Back to Top"
        >
          <span>r</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#D0003A] -mb-1 ml-0.5"></span>
        </a>

        {/* Links */}
        <div className="flex items-center gap-0.5 sm:gap-1 px-1">
          <a
            href="#about"
            onClick={(e) => scrollToSection(e, 'about')}
            data-cursor="pointer"
            className={`px-3 py-1.5 rounded-full retro-mono text-[11px] sm:text-xs font-bold transition-all duration-200 ${
              activeSection === 'about'
                ? 'bg-white/20 text-[#F0E85A]'
                : 'text-white/70 hover:text-white hover:bg-white/10'
            }`}
          >
            Info
          </a>

          <a
            href="#skills"
            onClick={(e) => scrollToSection(e, 'skills')}
            data-cursor="pointer"
            className={`px-3 py-1.5 rounded-full retro-mono text-[11px] sm:text-xs font-bold transition-all duration-200 ${
              activeSection === 'skills'
                ? 'bg-white/20 text-[#F0E85A]'
                : 'text-white/70 hover:text-white hover:bg-white/10'
            }`}
          >
            Skills
          </a>

          <a
            href="#education"
            onClick={(e) => scrollToSection(e, 'education')}
            data-cursor="pointer"
            className={`hidden sm:inline-block px-3 py-1.5 rounded-full retro-mono text-[11px] sm:text-xs font-bold transition-all duration-200 ${
              activeSection === 'education'
                ? 'bg-white/20 text-[#F0E85A]'
                : 'text-white/70 hover:text-white hover:bg-white/10'
            }`}
          >
            Edu
          </a>
        </div>

        {/* Sound FX Toggle Button */}
        <button
          onClick={handleToggleSound}
          data-cursor="pointer"
          title={isMuted ? "Sound is Muted (Click to Unmute)" : "Sound is Active (Click to Mute)"}
          aria-label={isMuted ? "Unmute audio effects" : "Mute audio effects"}
          className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-white transition-colors"
        >
          {isMuted ? (
            <VolumeX className="w-3.5 h-3.5 text-white/40" />
          ) : (
            <Volume2 className="w-3.5 h-3.5 text-[#F0E85A]" />
          )}
        </button>

        {/* Highlighted 'Contact' button matching 'Visit Site' pill */}
        <a
          href="#contact"
          onClick={(e) => scrollToSection(e, 'contact')}
          data-cursor="pointer"
          className={`px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full font-mono text-[11px] sm:text-xs font-black transition-all duration-200 shadow-md ${
            activeSection === 'contact'
              ? 'bg-[#D0003A] text-white scale-105'
              : 'bg-[#F0E85A] text-[#141516] hover:bg-white'
          }`}
        >
          Contact
        </a>
      </div>
    </nav>
  );
}
