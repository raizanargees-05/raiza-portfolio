import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Preloader from './components/Preloader';
import CustomCursor from './components/CustomCursor';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FloatingNav from './components/FloatingNav';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const tickerCb = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCb);
    gsap.ticker.lagSmoothing(0);

    // Dynamic background transition per section
    const sections = [
      { id: '#hero', color: '#F0E85A' },
      { id: '#about', color: '#FDF8E2' },
      { id: '#skills', color: '#007A3D' },
      { id: '#education', color: '#FDF8E2' },
      { id: '#contact', color: '#141516' },
    ];

    sections.forEach(({ id, color }) => {
      const el = document.querySelector(id);
      if (el) {
        ScrollTrigger.create({
          trigger: el,
          start: 'top 55%',
          end: 'bottom 55%',
          onEnter: () => {
            document.documentElement.style.setProperty('--bg-current', color);
            document.body.style.backgroundColor = color;
          },
          onEnterBack: () => {
            document.documentElement.style.setProperty('--bg-current', color);
            document.body.style.backgroundColor = color;
          },
        });
      }
    });

    // Refresh ScrollTrigger to calculate exact DOM layout
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 300);

    return () => {
      gsap.ticker.remove(tickerCb);
      lenis.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [isLoaded]);

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden selection:bg-[#D0003A] selection:text-white">
      {/* Film grain noise overlay */}
      <div className="noise-overlay" aria-hidden="true" />

      {/* Custom interactive cursor */}
      <CustomCursor />

      {/* Preloader */}
      {!isLoaded && <Preloader onComplete={() => setIsLoaded(true)} />}

      {/* Floating Bottom Pill Navigation */}
      <FloatingNav />

      {/* Main content sections */}
      <main>
        <Hero ready={isLoaded} />
        <About />
        <Skills />
        <Education />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

