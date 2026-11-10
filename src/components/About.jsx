import React, { useState, useEffect, useCallback } from 'react';
import { personalData } from '../data/content';
import {
  Sparkles,
  Terminal as TerminalIcon,
  BookOpen,
  Cpu,
  Coffee,
  Heart,
  CheckCircle2,
  Flame,
  Zap,
  Code2,
  MapPin,
  Smile,
  Send,
  RotateCcw
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/audio';

export default function About() {
  // Interactive Terminal State
  const [terminalHistory, setTerminalHistory] = useState([
    { type: 'input', text: 'whoami' },
    { type: 'output', text: 'Raiza Nargees — First-year B.Tech CSE (AI) student at Thejus Engineering College.' },
    { type: 'input', text: 'python -c "import ai_journey"' },
    { type: 'output', text: 'Status: Learning to build smart things that play back. Open to internships & collabs!' },
  ]);
  const [terminalInput, setTerminalInput] = useState('');
  const [lightboxOpen, setLightboxOpen] = useState(false);

  // Close lightbox on Escape key
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') setLightboxOpen(false);
  }, []);

  useEffect(() => {
    if (lightboxOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [lightboxOpen, handleKeyDown]);

  // Interactive Brain Sliders State
  const [coffeeLevel, setCoffeeLevel] = useState(90);
  const [curiosityLevel, setCuriosityLevel] = useState(100);
  const [playfulnessLevel, setPlayfulnessLevel] = useState(95);

  // Sticker pop reaction
  const handleStickerClick = (label) => {
    sound.playPop(620);
    confetti({
      particleCount: 20,
      spread: 45,
      origin: { y: 0.6 },
      colors: ['#D0003A', '#007A3D', '#F0E85A', '#141516']
    });
  };

  // Preset Terminal Commands
  const runCommand = (cmd) => {
    sound.playBlip();
    const cleanCmd = cmd.trim().toLowerCase();

    if (cleanCmd === 'clear') {
      setTerminalHistory([]);
      return;
    }

    let reply = '';
    switch (cleanCmd) {
      case 'college':
      case 'thejus':
        reply = '🏛️ Thejus Engineering College, Vellarakkad, Thrissur, Kerala. Studying B.Tech in CSE (Artificial Intelligence), Class of 2029.';
        break;
      case 'ai':
      case 'neural':
        reply = '🧠 Neural network basics, Perceptron math, OpenCV computer vision frames, and conversational prompt architectures.';
        break;
      case 'motto':
        reply = '✨ "Learning to build smart things that play back" — fusing machine intelligence with tactile UI delight.';
        break;
      case 'skills':
        reply = '⚡ Core: Python, C, JavaScript (ES6+), React, Tailwind CSS, NumPy, Pandas, Matter.js physics.';
        break;
      case 'coffee':
        reply = '☕ Kerala filter coffee level: MAX. Powered by caffeine and curiosity!';
        break;
      case 'roll':
        const num = Math.floor(Math.random() * 6) + 1;
        reply = `🎲 You rolled a ${num}! ${num >= 4 ? 'Great luck! Let\'s build something legendary together.' : 'Fortune favors the bold code commits!'}`;
        break;
      case 'help':
        reply = 'Available commands: about, college, ai, skills, motto, coffee, roll, clear';
        break;
      case 'about':
      default:
        reply = `Raiza Nargees — Undergrad engineer exploring modern computational intelligence & creative web tech at Thejus Engineering College.`;
        break;
    }

    setTerminalHistory((prev) => [
      ...prev,
      { type: 'input', text: cmd },
      { type: 'output', text: reply }
    ]);
  };

  const handleTerminalSubmit = (e) => {
    e.preventDefault();
    if (!terminalInput.trim()) return;
    runCommand(terminalInput);
    setTerminalInput('');
  };

  return (
    <section
      id="about"
      className="relative w-full py-20 sm:py-28 px-6 sm:px-10 lg:px-16 bg-[#FDF8E2] text-[#141516] border-b-2 border-[#141516] overflow-hidden"
    >
      {/* Decorative background retro stamp */}
      <div className="absolute top-10 right-6 opacity-5 pointer-events-none select-none">
        <span className="retro-display text-[14rem] sm:text-[18rem] leading-none text-[#141516]">
          AI
        </span>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-6 retro-mono text-xs font-bold text-[#007A3D] tracking-[0.25em]">
          <span className="px-2.5 py-1 rounded bg-[#007A3D] text-[#FDF8E2]">01</span>
          <span>// ABOUT RAIZA NARGEES</span>
        </div>

        {/* Big Chunky Punchline + Profile Photo side by side */}
        <div className="flex items-start gap-8 mb-12">
          <div className="flex-1">
            <h2 className="retro-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.02] tracking-tight text-[#141516]">
              FIRST-YEAR <span className="text-[#D0003A]">CSE (AI)</span> STUDENT AT <span className="text-[#007A3D]">THEJUS</span>, BUILDING SMART THINGS THAT <span className="underline decoration-[#F0E85A] decoration-wavy decoration-4">PLAY BACK</span>.
            </h2>
          </div>

          {/* ── MODERN PROFILE CARD WITH OVERLAYS ── */}
          <div className="hidden lg:block shrink-0 relative" style={{ width: '230px' }}>

            {/* Dot-grid decorative background */}
            <div
              className="absolute inset-0 rounded-3xl opacity-20 pointer-events-none"
              style={{
                backgroundImage: 'radial-gradient(circle, #141516 1.5px, transparent 1.5px)',
                backgroundSize: '12px 12px',
                transform: 'translate(10px, 10px)',
              }}
            />

            {/* Hard shadow block (neo-brutalist) */}
            <div className="absolute inset-0 rounded-2xl bg-[#141516] translate-x-2 translate-y-2" />

            {/* Main photo container */}
            <div
              onClick={() => setLightboxOpen(true)}
              className="relative rounded-2xl border-3 border-[#141516] overflow-hidden cursor-zoom-in group"
              style={{ border: '3px solid #141516', height: '280px' }}
            >
              <img
                src="/raiza-profile.jpg"
                alt="Raiza Nargees"
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
              />

              {/* Bottom gradient overlay with name */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#141516]/90 via-[#141516]/40 to-transparent pt-10 pb-3 px-3">
                <div className="retro-mono text-[11px] font-black text-[#F0E85A] tracking-widest">RAIZA NARGEES</div>
                <div className="retro-mono text-[9px] text-white/70 tracking-wider">B.TECH CSE (AI) · '29</div>
              </div>

              {/* Click-to-zoom hint */}
              <div className="absolute inset-0 bg-[#141516]/0 group-hover:bg-[#141516]/10 flex items-center justify-center transition-all duration-300">
                <span className="opacity-0 group-hover:opacity-100 transition-opacity retro-mono text-[11px] font-black text-white bg-[#141516]/80 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/20">
                  🔍 VIEW FULL
                </span>
              </div>
            </div>

            {/* ── FLOATING BADGES ── */}

            {/* LIVE badge — top left */}
            <div className="absolute -top-3 -left-3 flex items-center gap-1.5 bg-[#D0003A] text-white retro-mono text-[9px] font-black px-2.5 py-1 rounded-full border-2 border-[#141516] shadow-brutal z-10">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
              OPEN TO WORK
            </div>

            {/* Kerala badge — top right */}
            <div className="absolute -top-3 -right-3 bg-[#007A3D] text-white retro-mono text-[9px] font-black px-2.5 py-1 rounded-full border-2 border-[#141516] shadow-brutal z-10">
              🌴 KERALA
            </div>

            {/* Python chip — left side */}
            <div className="absolute top-1/3 -left-10 bg-[#F0E85A] text-[#141516] retro-mono text-[9px] font-black px-2 py-1 rounded-lg border-2 border-[#141516] shadow-brutal z-10 -rotate-6">
              🐍 PYTHON
            </div>

            {/* React chip — right side */}
            <div className="absolute top-1/2 -right-9 bg-white text-[#141516] retro-mono text-[9px] font-black px-2 py-1 rounded-lg border-2 border-[#141516] shadow-brutal z-10 rotate-6">
              ⚛️ REACT
            </div>

            {/* AI chip — bottom left */}
            <div className="absolute -bottom-3 -left-4 bg-[#141516] text-[#F0E85A] retro-mono text-[9px] font-black px-2.5 py-1 rounded-full border-2 border-[#F0E85A] shadow-brutal z-10 -rotate-2">
              🧠 AI · ML
            </div>

            {/* Class year chip — bottom right */}
            <div className="absolute -bottom-3 -right-4 bg-[#F0E85A] text-[#141516] retro-mono text-[9px] font-black px-2.5 py-1 rounded-full border-2 border-[#141516] shadow-brutal z-10 rotate-2">
              CLASS OF '29
            </div>
          </div>
        </div>

        {/* Fun Interactive Stickers / Badges Row */}
        <div className="flex flex-wrap items-center gap-3 mb-12 select-none">
          <button
            onClick={() => handleStickerClick('THEJUS')}
            className="retro-tag px-4 py-2 rounded-xl bg-[#F0E85A] border-2 border-[#141516] retro-mono text-xs font-black tracking-wider hover:rotate-2 hover:scale-105 transition-transform flex items-center gap-1.5"
          >
            <span>🏛️</span>
            <span>THEJUS ENGG. COLLEGE '29</span>
          </button>

          <button
            onClick={() => handleStickerClick('KERALA')}
            className="retro-tag px-4 py-2 rounded-xl bg-[#007A3D] text-white border-2 border-[#141516] retro-mono text-xs font-black tracking-wider hover:-rotate-2 hover:scale-105 transition-transform flex items-center gap-1.5"
          >
            <span>🌴</span>
            <span>THRISSUR, KERALA</span>
          </button>

          <button
            onClick={() => handleStickerClick('AI')}
            className="retro-tag px-4 py-2 rounded-xl bg-[#D0003A] text-white border-2 border-[#141516] retro-mono text-xs font-black tracking-wider hover:rotate-3 hover:scale-105 transition-transform flex items-center gap-1.5"
          >
            <span>🧠</span>
            <span>NEURAL NET OBSESSED</span>
          </button>

          <button
            onClick={() => handleStickerClick('PYTHON')}
            className="retro-tag px-4 py-2 rounded-xl bg-white border-2 border-[#141516] retro-mono text-xs font-black tracking-wider hover:-rotate-1 hover:scale-105 transition-transform flex items-center gap-1.5"
          >
            <span>🐍</span>
            <span>PYTHON & C CODER</span>
          </button>

          <button
            onClick={() => handleStickerClick('STATUS')}
            className="retro-tag px-4 py-2 rounded-xl bg-[#141516] text-[#F0E85A] border-2 border-[#141516] retro-mono text-xs font-black tracking-wider hover:rotate-2 hover:scale-105 transition-transform flex items-center gap-1.5"
          >
            <span className="w-2 h-2 rounded-full bg-[#D0003A] animate-ping"></span>
            <span>OPEN FOR INTERNSHIPS</span>
          </button>

          <span className="retro-mono text-[11px] text-[#141516]/60 pl-2">
            (click stickers for pop!)
          </span>
        </div>

        {/* Main Content Grid: Story + Live Terminal + Brain Sliders */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-14">
          
          {/* Story & Biography (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white rounded-3xl border-2 border-[#141516] p-6 sm:p-8 shadow-brutal hover:-translate-y-1 transition-transform duration-200">
              <div className="flex items-center justify-between pb-4 mb-4 border-b-2 border-[#141516]/10">
                <span className="retro-display text-xl font-black text-[#141516] flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-[#D0003A]" />
                  THE JOURNEY SO FAR
                </span>
                <span className="retro-mono text-xs font-bold text-[#007A3D] bg-[#007A3D]/10 px-3 py-1 rounded-full border border-[#007A3D]/20">
                  B.TECH CSE (AI)
                </span>
              </div>

              <div className="space-y-4 text-base sm:text-lg leading-relaxed text-[#141516]/90 font-medium">
                <p>
                  Hey! I'm <strong className="text-[#D0003A] font-black">Raiza Nargees</strong>, a first-year undergraduate studying 
                  <strong> Computer Science and Engineering with a specialization in Artificial Intelligence</strong> at 
                  <span className="text-[#007A3D] font-bold"> Thejus Engineering College</span> in Thrissur, Kerala.
                </p>
                <p>
                  I got hooked on computing because I don't just see code as static instructions—I see it as a live, tactile medium. 
                  My core mission is to master both sides of the coin: rigorous foundational machine learning (linear algebra, neural weight dynamics, Python algorithms, and memory management in C) alongside crafting responsive, animated interfaces that feel alive and responsive.
                </p>
                <p>
                  At Thejus, I'm diving headfirst into our campus tech clubs, participating in coding sprints, and building tools that make academic life and creative exploration more intuitive.
                </p>
              </div>

              {/* Highlight Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6 pt-6 border-t-2 border-[#141516]/10">
                <div className="p-3 bg-[#FDF8E2] rounded-xl border border-[#141516] flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#D0003A] text-white flex items-center justify-center font-display text-sm font-black shrink-0">
                    AI
                  </div>
                  <div>
                    <div className="retro-mono text-[10px] font-bold text-[#D0003A]">FOCUS AREA</div>
                    <div className="font-bold text-xs text-[#141516]">Machine Intelligence</div>
                  </div>
                </div>

                <div className="p-3 bg-[#FDF8E2] rounded-xl border border-[#141516] flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#007A3D] text-white flex items-center justify-center font-display text-sm font-black shrink-0">
                    29
                  </div>
                  <div>
                    <div className="retro-mono text-[10px] font-bold text-[#007A3D]">GRADUATION</div>
                    <div className="font-bold text-xs text-[#141516]">Thejus Class of 2029</div>
                  </div>
                </div>
              </div>
            </div>

            {/* What I'm Learning Today Banner */}
            <div className="p-6 rounded-3xl bg-[#007A3D] text-[#FDF8E2] border-2 border-[#141516] shadow-brutal flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-[#F0E85A]" />
                  <h4 className="retro-display text-lg text-[#F0E85A] font-black">
                    CURRENT EXPERIMENTAL LAB
                  </h4>
                </div>
                <p className="retro-mono text-xs text-white/90 tracking-wide max-w-md">
                  Training custom regression models in Python, writing pointer algorithms in C, and testing physics bodies with Matter.js!
                </p>
              </div>
              <span className="retro-mono text-xs font-black bg-[#F0E85A] text-[#141516] px-4 py-2 rounded-full border border-[#141516] shrink-0">
                SEMESTER 01 ACTIVE
              </span>
            </div>
          </div>

          {/* Interactive Right Column: Live Terminal + Brain Sliders (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* 1. REAL LIVE INTERACTIVE TERMINAL */}
            <div className="bg-[#141516] text-[#F0E85A] rounded-3xl border-2 border-[#141516] p-5 shadow-brutal font-mono text-xs">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#D0003A]"></span>
                  <span className="w-3 h-3 rounded-full bg-[#F0E85A]"></span>
                  <span className="w-3 h-3 rounded-full bg-[#007A3D]"></span>
                </div>
                <span className="retro-mono text-[10px] text-white/60">
                  raiza@thejus-ai:~$
                </span>
                <button
                  onClick={() => runCommand('clear')}
                  title="Clear terminal"
                  className="text-white/40 hover:text-white transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Terminal Logs */}
              <div className="space-y-2 max-h-52 overflow-y-auto pr-1 no-scrollbar text-xs">
                {terminalHistory.map((item, idx) => (
                  <div key={idx} className="leading-relaxed">
                    {item.type === 'input' ? (
                      <div className="flex items-center gap-1.5 text-[#007A3D] font-bold">
                        <span>$</span>
                        <span className="text-white">{item.text}</span>
                      </div>
                    ) : (
                      <div className="text-[#F0E85A] pl-3 border-l border-[#F0E85A]/30">
                        {item.text}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Quick Preset Command Pills */}
              <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap gap-1.5">
                {['college', 'ai', 'skills', 'motto', 'coffee', 'roll'].map((cmd) => (
                  <button
                    key={cmd}
                    onClick={() => runCommand(cmd)}
                    data-cursor="pointer"
                    className="px-2 py-0.5 rounded bg-white/10 text-white/80 hover:bg-[#F0E85A] hover:text-[#141516] transition-colors retro-mono text-[10px]"
                  >
                    +{cmd}
                  </button>
                ))}
              </div>

              {/* Interactive Input Form */}
              <form onSubmit={handleTerminalSubmit} className="mt-3 flex items-center gap-2">
                <span className="text-[#D0003A] font-bold">&gt;</span>
                <input
                  type="text"
                  placeholder="type 'help' or command..."
                  value={terminalInput}
                  onChange={(e) => setTerminalInput(e.target.value)}
                  className="w-full bg-white/5 text-[#FDF8E2] px-2 py-1.5 rounded border border-white/10 focus:outline-none focus:border-[#F0E85A] font-mono text-xs"
                />
                <button
                  type="submit"
                  aria-label="Send terminal command"
                  className="px-2.5 py-1.5 bg-[#D0003A] text-white rounded hover:bg-[#b50032] transition-colors"
                >
                  <Send className="w-3 h-3" />
                </button>
              </form>
            </div>

            {/* 2. RAIZA'S BRAIN PARAMETERS (SLIDERS WIDGET) */}
            <div className="bg-[#F0E85A] rounded-3xl border-2 border-[#141516] p-6 shadow-brutal text-[#141516]">
              <div className="flex items-center justify-between pb-3 mb-4 border-b-2 border-[#141516]">
                <span className="retro-display text-base font-black flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-[#007A3D]" />
                  NEURAL MODEL PARAMETERS
                </span>
                <span className="retro-mono text-[10px] bg-[#141516] text-[#F0E85A] px-2 py-0.5 rounded font-bold">
                  LIVE TUNER
                </span>
              </div>

              <div className="space-y-4">
                {/* Slider 1: Coffee */}
                <div>
                  <div className="flex justify-between items-center retro-mono text-xs font-bold mb-1">
                    <span className="flex items-center gap-1.5">
                      <Coffee className="w-3.5 h-3.5 text-[#D0003A]" />
                      KERALA CHAI & COFFEE
                    </span>
                    <span>{coffeeLevel}%</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="100"
                    value={coffeeLevel}
                    onChange={(e) => setCoffeeLevel(e.target.value)}
                    className="w-full accent-[#D0003A] cursor-pointer"
                  />
                </div>

                {/* Slider 2: Curiosity */}
                <div>
                  <div className="flex justify-between items-center retro-mono text-xs font-bold mb-1">
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#007A3D]" />
                      NEURAL NET CURIOSITY
                    </span>
                    <span>{curiosityLevel}%</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="100"
                    value={curiosityLevel}
                    onChange={(e) => setCuriosityLevel(e.target.value)}
                    className="w-full accent-[#007A3D] cursor-pointer"
                  />
                </div>

                {/* Slider 3: Playfulness */}
                <div>
                  <div className="flex justify-between items-center retro-mono text-xs font-bold mb-1">
                    <span className="flex items-center gap-1.5">
                      <Smile className="w-3.5 h-3.5 text-[#141516]" />
                      PLAYFUL INTERACTION
                    </span>
                    <span>{playfulnessLevel}%</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="100"
                    value={playfulnessLevel}
                    onChange={(e) => setPlayfulnessLevel(e.target.value)}
                    className="w-full accent-[#141516] cursor-pointer"
                  />
                </div>
              </div>

              {/* Live Output Banner based on sliders */}
              <div className="mt-4 pt-3 border-t-2 border-[#141516] flex items-center justify-between text-xs font-bold">
                <span className="retro-mono text-[10px] text-[#007A3D]">CURRENT STATE:</span>
                <span className="bg-white px-3 py-1 rounded-full border border-[#141516] text-[#D0003A] font-mono text-[11px]">
                  {coffeeLevel > 85 ? '⚡ HIGH POWERED & READY TO COLLAB' : '🚀 OPTIMIZED FOR INNOVATION'}
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* 3. FOUR FUN QUICK FACT CARDS (FULL WIDTH GRID) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl border-2 border-[#141516] p-5 shadow-brutal hover:-translate-y-1 transition-transform">
            <div className="retro-mono text-[10px] font-bold text-[#007A3D] uppercase">01 // COLLEGE</div>
            <div className="font-display text-lg font-black text-[#141516] mt-1">THEJUS ENGG.</div>
            <p className="retro-mono text-xs text-[#141516]/70 mt-1">
              Vellarakkad, Thrissur. Center of academic & technical growth.
            </p>
          </div>

          <div className="bg-white rounded-2xl border-2 border-[#141516] p-5 shadow-brutal hover:-translate-y-1 transition-transform">
            <div className="retro-mono text-[10px] font-bold text-[#D0003A] uppercase">02 // CODE PHILOSOPHY</div>
            <div className="font-display text-lg font-black text-[#141516] mt-1">PLAY BACK</div>
            <p className="retro-mono text-xs text-[#141516]/70 mt-1">
              Software shouldn't be boring; it should surprise and invite interaction.
            </p>
          </div>

          <div className="bg-white rounded-2xl border-2 border-[#141516] p-5 shadow-brutal hover:-translate-y-1 transition-transform">
            <div className="retro-mono text-[10px] font-bold text-[#007A3D] uppercase">03 // DAILY WEAPON</div>
            <div className="font-display text-lg font-black text-[#141516] mt-1">PYTHON & C</div>
            <p className="retro-mono text-xs text-[#141516]/70 mt-1">
              Bridging high-level data models with bare-metal memory concepts.
            </p>
          </div>

          <div className="bg-white rounded-2xl border-2 border-[#141516] p-5 shadow-brutal hover:-translate-y-1 transition-transform">
            <div className="retro-mono text-[10px] font-bold text-[#D0003A] uppercase">04 // ASPIRATION</div>
            <div className="font-display text-lg font-black text-[#141516] mt-1">CREATIVE AI</div>
            <p className="retro-mono text-xs text-[#141516]/70 mt-1">
              Building autonomous, intelligent tools that augment human creativity.
            </p>
          </div>
        </div>

      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setLightboxOpen(false)}
        >
          <div
            className="relative max-w-sm w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute -top-4 -right-4 w-10 h-10 rounded-full bg-[#D0003A] border-2 border-[#141516] text-white font-black text-lg flex items-center justify-center shadow-brutal hover:scale-110 transition-transform z-10"
            >
              ✕
            </button>
            <div className="rounded-2xl border-4 border-[#141516] overflow-hidden shadow-brutal">
              <img
                src="/raiza-profile.jpg"
                alt="Raiza Nargees"
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="mt-3 text-center retro-mono text-xs font-black text-white bg-[#141516] px-4 py-2 rounded-full border-2 border-[#F0E85A] inline-block mx-auto w-fit">
              RAIZA NARGEES — CSE (AI) '29 🎓
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
