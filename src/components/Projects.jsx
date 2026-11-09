import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { personalData } from '../data/content';
import { ArrowUpRight, ExternalLink, Sparkles, Layers, X, Code2, Cpu, Check } from 'lucide-react';
import { GithubIcon } from './Icons';
import { sound } from '../utils/audio';

gsap.registerPlugin(ScrollTrigger);

// Project Card with 3D Tilt and Hover Micro-interactions
function ProjectCard({ project, index, onSelect }) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;
    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => onSelect(project)}
      data-cursor="view"
      className="project-card relative w-full lg:w-[480px] xl:w-[540px] shrink-0 bg-[#18191B] text-[#FDF8E2] rounded-3xl border-2 border-[#141516] p-6 sm:p-8 flex flex-col justify-between shadow-brutal-lg transition-transform duration-200 ease-out select-none group cursor-pointer"
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
      }}
    >
      {/* Top row: Index, Category Badge, Arrow */}
      <div>
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <span className="retro-display text-2xl font-black text-[#F0E85A]">
              0{index + 1}
            </span>
            <span
              className="retro-mono text-[10px] sm:text-xs font-bold px-3 py-1 rounded-full border border-white/20"
              style={{ backgroundColor: `${project.accentColor}25`, color: project.accentColor }}
            >
              {project.badge}
            </span>
          </div>

          {/* Sliding arrow button */}
          <div
            className="w-12 h-12 rounded-full border-2 border-white/20 bg-white/5 flex items-center justify-center transition-all duration-300 group-hover:bg-[#F0E85A] group-hover:text-[#141516] group-hover:border-[#F0E85A] group-hover:rotate-45"
          >
            <ArrowUpRight className="w-5 h-5 transition-transform" />
          </div>
        </div>

        {/* Visual Graphic Banner (Retro Generative Pattern) */}
        <div className="relative w-full h-44 sm:h-52 rounded-2xl overflow-hidden mb-6 border border-white/10 bg-[#121314] flex items-center justify-center">
          {/* Animated gradient mesh */}
          <div
            className="absolute inset-0 opacity-40 transition-transform duration-500 group-hover:scale-110"
            style={{
              background: `radial-gradient(circle at 30% 30%, ${project.accentColor} 0%, transparent 70%), radial-gradient(circle at 70% 70%, #F0E85A 0%, transparent 60%)`,
            }}
          />

          {/* Geometric decorative elements */}
          <div className="relative z-10 flex flex-col items-center gap-2">
            <div
              className="w-16 h-16 rounded-2xl border-2 border-white/30 flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
              style={{ backgroundColor: project.accentColor }}
            >
              <Layers className="w-8 h-8 text-white" />
            </div>
            <span className="retro-mono text-[10px] text-white/70 tracking-widest uppercase">
              {project.metrics}
            </span>
          </div>

          {/* Subtle grid pattern */}
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
        </div>

        {/* Project Title & Description */}
        <h3 className="retro-display text-2xl sm:text-3xl font-black text-white group-hover:text-[#F0E85A] transition-colors duration-200 mb-3">
          {project.title}
        </h3>
        <p className="text-white/80 text-sm sm:text-base leading-relaxed mb-6 font-normal">
          {project.description}
        </p>
      </div>

      {/* Tech Tags and Links */}
      <div>
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.map((tag, tIdx) => (
            <span
              key={tIdx}
              className="retro-mono text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-white/10 text-white/90 border border-white/10"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Action bar */}
        <div className="pt-4 border-t border-white/10 flex items-center justify-between" onClick={(e) => e.stopPropagation()}>
          <a
            href={project.codeUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="pointer"
            className="flex items-center gap-2 retro-mono text-xs text-white/80 hover:text-[#F0E85A] transition-colors"
          >
            <GithubIcon className="w-4 h-4" />
            <span>SOURCE CODE</span>
          </a>
          <button
            onClick={() => onSelect(project)}
            data-cursor="pointer"
            className="flex items-center gap-2 retro-mono text-xs font-bold text-[#F0E85A] hover:underline"
          >
            <span>INSPECT DETAILS</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

// Interactive Project Details Modal
function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-[10000] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-[#141516] text-[#FDF8E2] rounded-3xl border-2 border-[#141516] p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto no-scrollbar"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 pb-4 mb-6 border-b border-white/10">
          <div>
            <span
              className="retro-mono text-xs font-bold px-3 py-1 rounded-full border border-white/20 inline-block mb-2"
              style={{ backgroundColor: `${project.accentColor}30`, color: project.accentColor }}
            >
              {project.badge}
            </span>
            <h3 className="retro-display text-2xl sm:text-4xl font-black text-white">
              {project.title}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-[#D0003A] hover:border-[#D0003A] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Long Description */}
        <div className="space-y-4 mb-6 text-sm sm:text-base leading-relaxed text-white/90 font-medium">
          <p>{project.longDescription}</p>
        </div>

        {/* Tech Stack Pills */}
        <div className="mb-6">
          <span className="retro-mono text-xs font-bold text-[#F0E85A] block mb-2">
            TECHNOLOGIES & FRAMEWORKS
          </span>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag, idx) => (
              <span
                key={idx}
                className="retro-mono text-xs font-bold px-3 py-1.5 rounded-xl bg-white/5 border border-white/15 text-white"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Highlights */}
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 mb-8 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-[#007A3D]">
            <Check className="w-4 h-4" />
            <span>Built by Raiza Nargees at Thejus Engineering College</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#F0E85A]">
            <Check className="w-4 h-4" />
            <span>Interactive real-time canvas rendering / AI inference</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-end gap-3 pt-4 border-t border-white/10">
          <a
            href={project.codeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white retro-mono text-xs font-bold flex items-center gap-2 border border-white/20 transition-colors"
          >
            <GithubIcon className="w-4 h-4" />
            <span>GITHUB REPOSITORY</span>
          </a>

          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2.5 rounded-full bg-[#F0E85A] text-[#141516] hover:bg-[#D0003A] hover:text-white retro-mono text-xs font-black flex items-center gap-2 border border-[#141516] transition-colors"
          >
            <span>OPEN DEMO</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const sectionRef = useRef(null);
  const triggerRef = useRef(null);
  const containerRef = useRef(null);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    // Only pin horizontal scroll on large screens
    const mm = gsap.matchMedia();

    mm.add('(min-width: 1024px)', () => {
      const cards = containerRef.current;
      if (!cards) return;

      const totalScroll = cards.scrollWidth - window.innerWidth + 200;

      gsap.to(cards, {
        x: -totalScroll,
        ease: 'none',
        scrollTrigger: {
          trigger: triggerRef.current,
          start: 'top top',
          end: () => `+=${totalScroll}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
    });

    return () => mm.revert();
  }, []);

  const handleSelect = (project) => {
    sound.playPop(550);
    setSelectedProject(project);
  };

  return (
    <section
      ref={triggerRef}
      id="projects"
      className="relative w-full bg-[#141516] text-[#FDF8E2] border-b-2 border-[#141516] overflow-hidden"
    >
      {/* Project Inspection Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}

      <div
        ref={sectionRef}
        className="w-full min-h-screen py-24 sm:py-32 flex flex-col justify-center px-6 sm:px-12 lg:px-16"
      >
        {/* Header */}
        <div className="max-w-7xl mx-auto w-full mb-12 sm:mb-16">
          <div className="flex items-center gap-3 mb-4 retro-mono text-xs font-bold text-[#D0003A] tracking-[0.25em]">
            <span className="px-2 py-0.5 rounded bg-[#D0003A] text-white">02</span>
            <span>// SELECTED EXPERIMENTS & LABS</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2 className="retro-display text-4xl sm:text-6xl md:text-7xl font-black text-white">
              FEATURED <span className="text-[#F0E85A]">PROJECTS</span>
            </h2>
            <div className="retro-mono text-xs text-white/60 tracking-wider max-w-sm">
              <span className="hidden lg:inline">SCROLL HORIZONTALLY • CLICK TO INSPECT DETAILS</span>
              <span className="lg:hidden">EXPLORE RECENT BUILDS & EXPERIMENTS</span>
            </div>
          </div>
        </div>

        {/* Projects Cards Container:
            On Desktop (>=1024px): horizontal row pinned and scrolled
            On Mobile/Tablet: responsive vertical wrap stack
        */}
        <div
          ref={containerRef}
          className="flex flex-col lg:flex-row items-stretch gap-8 lg:gap-10 pb-12 w-full lg:w-max no-scrollbar"
        >
          {personalData.projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onSelect={handleSelect}
            />
          ))}

          {/* End Card / Placeholder Callout */}
          <div className="w-full lg:w-[380px] shrink-0 rounded-3xl border-2 border-dashed border-white/20 p-8 flex flex-col items-center justify-center text-center bg-white/5">
            <div className="w-14 h-14 rounded-full bg-[#D0003A] text-white flex items-center justify-center mb-4">
              <Sparkles className="w-7 h-7" />
            </div>
            <h4 className="retro-display text-xl font-bold text-white mb-2">
              MORE BREWING
            </h4>
            <p className="retro-mono text-xs text-white/70 leading-relaxed mb-6">
              Currently engineering new AI experiments in PyTorch and real-time canvas games.
            </p>
            <a
              href="https://github.com/raizanargees"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="pointer"
              className="px-5 py-2.5 rounded-full bg-[#F0E85A] text-[#141516] retro-mono text-xs font-bold hover:bg-[#D0003A] hover:text-white transition-colors border border-[#141516]"
            >
              FOLLOW ON GITHUB
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
