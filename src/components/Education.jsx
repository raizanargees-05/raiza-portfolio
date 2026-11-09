import React, { useState } from 'react';
import { personalData } from '../data/content';
import {
  GraduationCap,
  MapPin,
  Calendar,
  CheckCircle2,
  BookOpen,
  Award,
  Sparkles,
  Layers,
  Code
} from 'lucide-react';
import { sound } from '../utils/audio';

export default function Education() {
  const [activeTab, setActiveTab] = useState('timeline');
  const [expandedIndex, setExpandedIndex] = useState(0);

  const handleCardClick = (index) => {
    sound.playPop(520);
    setExpandedIndex(index === expandedIndex ? -1 : index);
  };

  const courseworkThejus = [
    { title: "Python for Problem Solving & AI", code: "EST 102", tag: "CORE" },
    { title: "Linear Algebra & Calculus", code: "MAT 101", tag: "MATH" },
    { title: "C Programming & Memory Logic", code: "CST 101", tag: "CORE" },
    { title: "Engineering Physics & Lab", code: "PHT 100", tag: "FOUNDATION" },
    { title: "Basics of Electrical & Electronics", code: "EST 130", tag: "CIRCUITS" },
    { title: "Discrete Mathematical Structures", code: "MAT 203", tag: "MATH" },
  ];

  return (
    <section
      id="education"
      className="relative w-full py-20 sm:py-28 px-6 sm:px-10 lg:px-16 bg-[#FDF8E2] text-[#141516] border-b-2 border-[#141516] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-6 retro-mono text-xs font-bold text-[#D0003A] tracking-[0.25em]">
          <span className="px-2.5 py-1 rounded bg-[#D0003A] text-white">04</span>
          <span>// ACADEMIC TIMELINE & MILESTONES</span>
        </div>

        {/* Title + Subtitle */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h2 className="retro-display text-4xl sm:text-6xl md:text-7xl font-black text-[#141516] leading-none">
              EDUCATION & <span className="text-[#007A3D]">MILESTONES</span>
            </h2>
            <p className="retro-mono text-xs sm:text-sm text-[#141516]/75 tracking-wider mt-3 max-w-xl">
              FIRST-YEAR B.TECH CSE (AI) AT THEJUS ENGINEERING COLLEGE • THRISSUR, KERALA
            </p>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-2 bg-white/80 p-1.5 rounded-full border-2 border-[#141516] shadow-brutal select-none">
            <button
              onClick={() => {
                sound.playBlip();
                setActiveTab('timeline');
              }}
              className={`px-4 py-1.5 rounded-full retro-mono text-xs font-black transition-all ${
                activeTab === 'timeline'
                  ? 'bg-[#D0003A] text-white shadow-sm'
                  : 'text-[#141516]/70 hover:text-[#141516]'
              }`}
            >
              TIMELINE VIEW
            </button>
            <button
              onClick={() => {
                sound.playBlip();
                setActiveTab('coursework');
              }}
              className={`px-4 py-1.5 rounded-full retro-mono text-xs font-black transition-all ${
                activeTab === 'coursework'
                  ? 'bg-[#007A3D] text-white shadow-sm'
                  : 'text-[#141516]/70 hover:text-[#141516]'
              }`}
            >
              COURSEWORK & LABS
            </button>
          </div>
        </div>

        {/* TIMELINE VIEW */}
        {activeTab === 'timeline' && (
          <div className="relative pl-6 sm:pl-10 border-l-4 border-[#141516] space-y-10">
            {personalData.education.map((item, index) => {
              const isFirstYear = index === 0;
              return (
                <div
                  key={index}
                  onClick={() => handleCardClick(index)}
                  className={`edu-card relative bg-white rounded-3xl border-2 border-[#141516] p-6 sm:p-8 shadow-brutal transition-all duration-200 cursor-pointer ${
                    expandedIndex === index ? 'ring-4 ring-[#007A3D]/20 -translate-y-1' : 'hover:-translate-y-0.5'
                  }`}
                >
                  {/* Timeline node */}
                  <div
                    className={`absolute -left-[35px] sm:-left-[51px] top-8 w-6 sm:w-8 h-6 sm:h-8 rounded-full border-2 border-[#141516] flex items-center justify-center ${
                      isFirstYear ? 'bg-[#D0003A] animate-pulse' : 'bg-[#007A3D]'
                    }`}
                  >
                    <div className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-white"></div>
                  </div>

                  {/* Header Row: Badges and Period */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b-2 border-[#141516]/10">
                    <div className="flex items-center gap-2">
                      <span
                        className={`retro-mono text-xs font-black px-3.5 py-1 rounded-full border border-[#141516] ${
                          isFirstYear
                            ? 'bg-[#D0003A] text-white'
                            : 'bg-[#F0E85A] text-[#141516]'
                        }`}
                      >
                        {item.badge}
                      </span>
                      <span className="retro-mono text-xs text-[#007A3D] font-bold">
                        {item.status}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 retro-mono text-xs font-bold text-[#141516]/80 bg-[#FDF8E2] px-3 py-1 rounded-lg border border-[#141516]/20">
                      <Calendar className="w-4 h-4 text-[#D0003A]" />
                      <span>{item.period}</span>
                    </div>
                  </div>

                  {/* Institution & Degree */}
                  <div className="mb-4">
                    <h3 className="retro-display text-2xl sm:text-3xl font-black text-[#141516] mb-1">
                      {item.institution}
                    </h3>
                    <div className="text-base sm:text-lg font-bold text-[#007A3D]">
                      {item.degree}
                    </div>
                    <div className="flex items-center gap-1.5 retro-mono text-xs text-[#141516]/65 mt-1 font-bold">
                      <MapPin className="w-3.5 h-3.5 text-[#D0003A]" />
                      <span>{item.location}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm sm:text-base leading-relaxed text-[#141516]/85 mb-6 font-medium">
                    {item.description}
                  </p>

                  {/* Highlights Box */}
                  <div className="bg-[#FDF8E2] rounded-2xl p-5 border border-[#141516]/20">
                    <div className="retro-mono text-[11px] text-[#007A3D] font-black tracking-widest uppercase mb-3 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#D0003A]" />
                      <span>KEY LEARNINGS & MILESTONES</span>
                    </div>
                    <ul className="space-y-2">
                      {item.highlights.map((hl, hIdx) => (
                        <li
                          key={hIdx}
                          className="flex items-start gap-2.5 text-xs sm:text-sm text-[#141516] font-medium"
                        >
                          <CheckCircle2 className="w-4 h-4 text-[#007A3D] shrink-0 mt-0.5" />
                          <span>{hl}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Click indicator */}
                  <div className="mt-4 pt-3 border-t border-[#141516]/10 flex items-center justify-between text-[11px] retro-mono text-[#141516]/50">
                    <span>{isFirstYear ? '⚡ FIRST-YEAR ENROLLMENT ACTIVE' : '✓ COMPLETED CREDENTIAL'}</span>
                    <span className="text-[#007A3D] font-bold">CLICK CARD TO TOGGLE</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* COURSEWORK & LABS VIEW */}
        {activeTab === 'coursework' && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl border-2 border-[#141516] p-6 sm:p-8 shadow-brutal">
              <div className="flex items-center justify-between pb-4 mb-6 border-b-2 border-[#141516]/10">
                <div>
                  <h3 className="retro-display text-xl sm:text-2xl font-black text-[#141516]">
                    THEJUS CSE (AI) CURRICULUM HIGHLIGHTS
                  </h3>
                  <p className="retro-mono text-xs text-[#007A3D] font-bold mt-1">
                    APJ ABDUL KALAM TECHNOLOGICAL UNIVERSITY (KTU) SYLLABUS
                  </p>
                </div>
                <span className="retro-mono text-xs font-bold px-3 py-1 rounded-full bg-[#F0E85A] text-[#141516] border border-[#141516]">
                  2025-2029
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {courseworkThejus.map((course, cIdx) => (
                  <div
                    key={cIdx}
                    className="p-4 rounded-2xl bg-[#FDF8E2] border border-[#141516] hover:bg-[#F0E85A]/40 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="retro-mono text-[10px] font-black px-2 py-0.5 rounded bg-[#141516] text-[#FDF8E2]">
                        {course.code}
                      </span>
                      <span className="retro-mono text-[10px] font-bold text-[#D0003A]">
                        {course.tag}
                      </span>
                    </div>
                    <div className="font-bold text-sm text-[#141516]">
                      {course.title}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Practical Labs Banner */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-3xl bg-[#007A3D] text-[#FDF8E2] border-2 border-[#141516] shadow-brutal">
                <div className="flex items-center gap-2 mb-2">
                  <Code className="w-5 h-5 text-[#F0E85A]" />
                  <h4 className="retro-display text-lg text-[#F0E85A] font-black">
                    SOFTWARE & AI WORKSHOPS
                  </h4>
                </div>
                <p className="retro-mono text-xs text-white/90 leading-relaxed">
                  Hands-on Linux terminal sessions, algorithm analysis in C, and interactive Jupyter notebook pipelines exploring NumPy matrices and data models.
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-[#141516] text-[#F0E85A] border-2 border-[#141516] shadow-brutal">
                <div className="flex items-center gap-2 mb-2">
                  <Layers className="w-5 h-5 text-[#D0003A]" />
                  <h4 className="retro-display text-lg text-white font-black">
                    CAMPUS INNOVATION & CLUBS
                  </h4>
                </div>
                <p className="retro-mono text-xs text-white/80 leading-relaxed">
                  Participating in internal hackathons, open-source documentation sprints, and technical symposiums at Thejus Engineering College.
                </p>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
