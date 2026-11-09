import React, { useState, useRef } from 'react';
import { personalData } from '../data/content';
import { Copy, Check, Send, Mail, ArrowUpRight, Sparkles } from 'lucide-react';
import { GithubIcon, LinkedinIcon, TwitterIcon } from './Icons';
import confetti from 'canvas-confetti';

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalData.contact.email);
    setCopied(true);
    confetti({
      particleCount: 25,
      spread: 50,
      origin: { y: 0.8 },
      colors: ['#D0003A', '#F0E85A', '#007A3D']
    });
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    
    // Construct mailto link
    const subject = encodeURIComponent(`Portfolio Inquiry from ${formData.name}`);
    const body = encodeURIComponent(`Hi Raiza,\n\n${formData.message}\n\nFrom: ${formData.name} (${formData.email})`);
    window.open(`mailto:${personalData.contact.email}?subject=${subject}&body=${body}`, '_blank');

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 4000);
  };

  return (
    <section
      id="contact"
      className="relative w-full py-24 sm:py-32 px-6 sm:px-10 lg:px-16 bg-[#141516] text-[#FDF8E2] border-b-2 border-[#141516] overflow-hidden"
    >
      {/* Toast Notification for Clipboard Copy */}
      <div
        className={`fixed bottom-24 right-8 z-[1000] transition-all duration-300 transform ${
          copied ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-4 opacity-0 pointer-events-none scale-95'
        }`}
      >
        <div className="bg-[#D0003A] text-white px-5 py-3 rounded-2xl border-2 border-[#141516] shadow-brutal flex items-center gap-2.5 retro-mono text-xs font-bold">
          <Check className="w-4 h-4 text-[#F0E85A]" />
          <span>EMAIL COPIED TO CLIPBOARD!</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Header Tag */}
        <div className="flex items-center gap-3 mb-6 retro-mono text-xs font-bold text-[#F0E85A] tracking-[0.25em]">
          <span className="px-2 py-0.5 rounded bg-[#F0E85A] text-[#141516]">05</span>
          <span>// GET IN TOUCH</span>
        </div>

        {/* Huge LET'S TALK Headline */}
        <div className="mb-16 select-none">
          <h2 className="retro-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-white hover:text-[#D0003A] transition-colors duration-300 tracking-tight leading-[0.88]">
            LET'S <span className="text-[#F0E85A]">TALK</span>
          </h2>
          <p className="retro-mono text-xs sm:text-sm text-white/70 tracking-widest mt-4 max-w-2xl">
            {personalData.contact.subtitle}
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Direct Email Button & Info (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            {/* Primary Email Card */}
            <div className="bg-[#1E2023] rounded-3xl border-2 border-white/20 p-6 sm:p-8 shadow-brutal-lg">
              <span className="retro-mono text-xs font-bold text-[#F0E85A] tracking-wider block mb-2">
                DIRECT INBOX
              </span>
              <div className="font-mono text-lg sm:text-2xl text-white font-bold break-all mb-6">
                {personalData.contact.email}
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={handleCopyEmail}
                  data-cursor="pointer"
                  className="px-5 py-3 rounded-full bg-[#D0003A] text-white hover:bg-[#b50032] retro-mono text-xs font-bold flex items-center gap-2 border border-[#141516] transition-all duration-200 active:scale-95 shadow-brutal"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? 'COPIED!' : 'COPY EMAIL'}</span>
                </button>

                <a
                  href={`mailto:${personalData.contact.email}`}
                  data-cursor="pointer"
                  className="px-5 py-3 rounded-full bg-[#F0E85A] text-[#141516] hover:bg-white retro-mono text-xs font-bold flex items-center gap-2 border border-[#141516] transition-all duration-200 shadow-brutal"
                >
                  <Mail className="w-4 h-4" />
                  <span>OPEN EMAIL CLIENT</span>
                </a>
              </div>
            </div>

            {/* Social Links Row */}
            <div className="bg-[#1E2023] rounded-3xl border-2 border-white/20 p-6 sm:p-8 shadow-brutal-lg">
              <span className="retro-mono text-xs font-bold text-[#007A3D] tracking-wider block mb-4">
                FIND RAIZA ACROSS THE WEB
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <a
                  href={personalData.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="pointer"
                  className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-[#F0E85A] hover:text-[#141516] transition-all duration-200 flex items-center justify-between group"
                >
                  <div className="flex items-center gap-2">
                    <GithubIcon className="w-4 h-4" />
                    <span className="retro-mono text-xs font-bold">GITHUB</span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:rotate-45 transition-transform" />
                </a>

                <a
                  href={personalData.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="pointer"
                  className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-[#D0003A] hover:text-white transition-all duration-200 flex items-center justify-between group"
                >
                  <div className="flex items-center gap-2">
                    <LinkedinIcon className="w-4 h-4" />
                    <span className="retro-mono text-xs font-bold">LINKEDIN</span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:rotate-45 transition-transform" />
                </a>

                <a
                  href={personalData.socials.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="pointer"
                  className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-[#007A3D] hover:text-white transition-all duration-200 flex items-center justify-between group"
                >
                  <div className="flex items-center gap-2">
                    <TwitterIcon className="w-4 h-4" />
                    <span className="retro-mono text-xs font-bold">TWITTER</span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:rotate-45 transition-transform" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Note / Dispatch Form (6 cols) */}
          <div className="lg:col-span-6 bg-[#FDF8E2] text-[#141516] rounded-3xl border-2 border-[#141516] p-6 sm:p-8 shadow-brutal-lg">
            <div className="flex items-center justify-between pb-4 mb-6 border-b-2 border-[#141516]">
              <h3 className="retro-display text-xl sm:text-2xl font-black text-[#141516] flex items-center gap-2">
                <Send className="w-5 h-5 text-[#D0003A]" />
                SEND A DIRECT DISPATCH
              </h3>
              <span className="retro-mono text-[10px] font-bold px-2.5 py-1 rounded bg-[#007A3D] text-white">
                QUICK MSG
              </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block retro-mono text-[11px] font-bold text-[#141516]/80 mb-1">
                  YOUR NAME
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Mercer"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-[#141516] bg-white font-medium text-sm focus:outline-none focus:ring-2 focus:ring-[#D0003A]"
                />
              </div>

              <div>
                <label className="block retro-mono text-[11px] font-bold text-[#141516]/80 mb-1">
                  YOUR EMAIL
                </label>
                <input
                  type="email"
                  required
                  placeholder="alex@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-[#141516] bg-white font-medium text-sm focus:outline-none focus:ring-2 focus:ring-[#D0003A]"
                />
              </div>

              <div>
                <label className="block retro-mono text-[11px] font-bold text-[#141516]/80 mb-1">
                  MESSAGE / PROJECT IDEA
                </label>
                <textarea
                  rows="4"
                  required
                  placeholder="Tell me about your idea, hackathon, or internship opportunity..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-[#141516] bg-white font-medium text-sm focus:outline-none focus:ring-2 focus:ring-[#D0003A] resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                data-cursor="pointer"
                className="w-full py-3.5 rounded-xl bg-[#D0003A] text-white font-display text-sm font-black tracking-wider hover:bg-[#b50032] border-2 border-[#141516] shadow-brutal active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center justify-center gap-2"
              >
                {submitted ? (
                  <>
                    <Check className="w-5 h-5 text-[#F0E85A]" />
                    <span>LAUNCHING EMAIL CLIENT...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>TRANSMIT DISPATCH</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
