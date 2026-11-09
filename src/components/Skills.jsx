import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { personalData } from '../data/content';
import { Cpu, Terminal, Palette, Wrench, CheckCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Skills() {
  const sectionRef = useRef(null);
  const marquee1Ref = useRef(null);
  const marquee2Ref = useRef(null);
  const [activeCategory, setActiveCategory] = useState('ALL');

  useEffect(() => {
    // Scroll velocity acceleration on the marquee
    let tween1 = gsap.to(marquee1Ref.current, {
      xPercent: -50,
      repeat: -1,
      duration: 25,
      ease: 'none',
    });

    let tween2 = gsap.to(marquee2Ref.current, {
      xPercent: 50,
      repeat: -1,
      duration: 28,
      ease: 'none',
    });

    // Velocity listener to temporarily speed up ticker when user scrolls fast
    const scrollTrigger = ScrollTrigger.create({
      onUpdate: (self) => {
        const vel = Math.min(Math.abs(self.getVelocity() / 200), 5);
        gsap.to([tween1, tween2], {
          timeScale: 1 + vel,
          duration: 0.3,
          overwrite: 'auto',
          onComplete: () => {
            gsap.to([tween1, tween2], { timeScale: 1, duration: 0.8 });
          },
        });
      },
    });

    return () => {
      tween1.kill();
      tween2.kill();
      scrollTrigger.kill();
    };
  }, []);

  const categories = ['ALL', ...personalData.skillsCategorized.map((c) => c.category)];

  const filteredCategories =
    activeCategory === 'ALL'
      ? personalData.skillsCategorized
      : personalData.skillsCategorized.filter((c) => c.category === activeCategory);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative w-full py-24 sm:py-32 bg-[#007A3D] text-[#FDF8E2] border-b-2 border-[#141516] overflow-hidden"
    >
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 mb-12">
        <div className="flex items-center gap-3 mb-4 retro-mono text-xs font-bold text-[#F0E85A] tracking-[0.25em]">
          <span className="px-2 py-0.5 rounded bg-[#F0E85A] text-[#141516]">03</span>
          <span>// TOOLKIT & CAPABILITIES</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <h2 className="retro-display text-4xl sm:text-6xl md:text-7xl font-black text-white">
            SKILLS & <span className="text-[#F0E85A]">SUPERPOWERS</span>
          </h2>
          <p className="retro-mono text-xs text-white/80 tracking-wider max-w-sm">
            VELOCITY-RESPONSIVE TICKER + FULL FOUNDATIONAL BREAKDOWN
          </p>
        </div>
      </div>

      {/* Infinite Velocity Marquee 1 (Leftward) */}
      <div className="w-full overflow-hidden py-3 bg-[#141516] border-y-2 border-[#141516] mb-4 select-none">
        <div
          ref={marquee1Ref}
          className="flex whitespace-nowrap will-change-transform font-display text-2xl sm:text-4xl text-[#F0E85A]"
        >
          {[...personalData.marqueeSkills, ...personalData.marqueeSkills, ...personalData.marqueeSkills].map(
            (skill, idx) => (
              <span key={idx} className="flex items-center mx-4 gap-4">
                <span className="hover:text-[#D0003A] transition-colors">{skill}</span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#D0003A]"></span>
              </span>
            )
          )}
        </div>
      </div>

      {/* Infinite Velocity Marquee 2 (Rightward) */}
      <div className="w-full overflow-hidden py-2 bg-[#F0E85A] border-b-2 border-[#141516] mb-16 select-none">
        <div
          ref={marquee2Ref}
          className="flex whitespace-nowrap will-change-transform retro-mono text-sm sm:text-base font-black text-[#141516] tracking-widest"
          style={{ transform: 'translateX(-50%)' }}
        >
          {[
            'PYTHON', 'MACHINE LEARNING', 'C ALGORITHMS', 'REACT ARCHITECTURE',
            'MATTER.JS', 'TAILWIND CSS', 'NUMPY & PANDAS', 'OPENCV',
            'PYTHON', 'MACHINE LEARNING', 'C ALGORITHMS', 'REACT ARCHITECTURE',
          ].map((item, idx) => (
            <span key={idx} className="flex items-center mx-5 gap-4">
              <span>{item}</span>
              <span className="w-2 h-2 rounded-full bg-[#007A3D]"></span>
            </span>
          ))}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 mb-10">
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setActiveCategory(cat)}
              data-cursor="pointer"
              className={`px-4 py-2 rounded-full retro-mono text-xs font-bold transition-all duration-200 border border-[#141516] ${
                activeCategory === cat
                  ? 'bg-[#F0E85A] text-[#141516] shadow-brutal translate-x-0.5 translate-y-0.5'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Categorized Skills Grid */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {filteredCategories.map((group, gIdx) => (
            <div
              key={gIdx}
              className="bg-white rounded-3xl border-2 border-[#141516] p-6 sm:p-8 text-[#141516] shadow-brutal flex flex-col justify-between hover:-translate-y-1 transition-transform duration-200"
            >
              <div>
                {/* Category Header */}
                <div className="flex items-center justify-between pb-4 mb-6 border-b-2 border-[#141516]">
                  <h3 className="retro-display text-xl sm:text-2xl font-black text-[#141516]">
                    {group.category}
                  </h3>
                  <span className="retro-mono text-[10px] font-bold px-2.5 py-1 rounded-full bg-[#141516] text-[#F0E85A]">
                    {group.skills.length} ITEMS
                  </span>
                </div>

                {/* Skill Chips List */}
                <div className="space-y-3">
                  {group.skills.map((skill, sIdx) => (
                    <div
                      key={sIdx}
                      className="p-3.5 rounded-xl bg-[#FDF8E2] border border-[#141516] flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-[#F0E85A]/50 transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="w-2 h-2 rounded-full bg-[#007A3D]"></span>
                        <span className="font-bold text-sm sm:text-base text-[#141516]">
                          {skill.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="retro-mono text-[10px] font-bold text-[#007A3D] bg-white px-2 py-0.5 rounded border border-[#007A3D]/30">
                          {skill.level}
                        </span>
                        <span className="text-xs text-[#141516]/60 hidden sm:inline">
                          — {skill.note}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom footer tag */}
              <div className="mt-6 pt-4 border-t border-[#141516]/10 flex items-center justify-between text-[11px] retro-mono text-[#141516]/60">
                <span>PROFICIENCY & LAB MASTERY</span>
                <span className="text-[#007A3D] font-bold">THEJUS CSE (AI)</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

