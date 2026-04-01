"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";

// --- CUSTOM SVG ICONS (Lucide alternative for stability) ---
const ICONS = {
  Cpu: (props: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="4" y="4" width="16" height="16" rx="2" /><rect x="9" y="9" width="6" height="6" /><path d="M15 2v2M15 20v2M2 15h2M20 15h2M9 2v2M9 20v2M2 9h2M20 9h2" />
    </svg>
  ),
  Globe: (props: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),
  Layers: (props: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polygon points="12 2 2 7 12 12 22 7 12 2" /><polygon points="2 17 12 22 22 17" /><polygon points="2 12 12 17 22 12" />
    </svg>
  ),
  Zap: (props: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  )
};

// --- COMPONENT: QUOTE CHARACTER ---
function QuoteCharacter({ char, index, total, progress }: { char: string; index: number; total: number; progress: any }) {
  const start = (index / total) * 0.7;
  const end = start + 0.3;

  const x = useTransform(progress, [start, end], ["15vw", "0vw"]);
  const opacity = useTransform(progress, [start, end], [0, 1]);
  const scale = useTransform(progress, [start, end], [0.9, 1]);
  const blur = useTransform(progress, [start, end], ["blur(12px)", "blur(0px)"]);

  return (
    <motion.span
      style={{ x, opacity, filter: blur, scale }}
      className="text-xl sm:text-3xl md:text-5xl lg:text-7xl font-black text-white uppercase italic whitespace-pre inline-block"
    >
      {char}
    </motion.span>
  );
}

// --- SECTION: QUOTE REVEAL ---
function QuoteRevealSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 150, damping: 30 });
  const quote = "The future belongs to those who don't just participate in systems — but build them.";
  const characters = quote.split("");

  return (
    <section ref={sectionRef} className="relative h-[180vh] bg-black z-[35] -mt-1">
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden px-4 sm:px-6 md:px-10">
        <div className="max-w-6xl text-center flex flex-wrap justify-center gap-y-1 sm:gap-y-2 md:gap-y-4">
          {characters.map((char, i) => (
            <QuoteCharacter key={i} char={char} index={i} total={characters.length} progress={smoothProgress} />
          ))}
        </div>
        <div className="mt-12 sm:mt-16 md:mt-20 w-32 sm:w-40 h-[1px] bg-white/10 relative overflow-hidden">
          <motion.div className="absolute inset-0 bg-[#D4AF37]" style={{ scaleX: smoothProgress, originX: 0 }} />
        </div>
      </div>
    </section>
  );
}

// --- SECTION: VISION MISSION ---
function VisionMissionSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2], [50, 0]);

  return (
    <section ref={sectionRef} className="relative bg-white py-20 sm:py-30 md:py-40 overflow-hidden border-b border-zinc-100 z-30">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-10">
        <motion.div style={{ opacity, y }} className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-5 space-y-8 lg:space-y-12">
            <span className="text-[8px] sm:text-[10px] font-black text-[#D4AF37] uppercase tracking-[0.5em] sm:tracking-[1em] block">Diagnostic_Report</span>
            <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black uppercase tracking-tighter leading-[0.9]">Most economies <br/> <span className="italic text-zinc-300">do not struggle</span> <br/> from lack of talent.</h3>
            <p className="text-lg sm:text-xl md:text-2xl font-light text-zinc-500 leading-relaxed border-l-2 border-black pl-4 sm:pl-6 md:pl-8">They struggle because of <span className="text-black font-bold">lack of structure.</span></p>
          </div>
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="relative p-6 sm:p-8 md:p-12 bg-zinc-50 border border-zinc-100">
              <div className="absolute -top-3 sm:-top-4 -left-3 sm:-left-4 w-8 sm:w-12 h-8 sm:h-12 border-t-4 border-l-4 border-[#2C518A]" />
              <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium leading-snug text-zinc-800 mb-8 sm:mb-12">"Without a system that connects them efficiently, growth remains <span className="italic">fragmented</span>."</p>
              <h4 className="text-xs sm:text-sm font-black uppercase tracking-[0.3em] sm:tracking-[0.5em] text-[#2C518A] mb-4 sm:mb-6">Mission_Statement</h4>
              <p className="text-base sm:text-lg md:text-xl text-zinc-600 leading-relaxed max-w-xl">To design and build integrated ecosystems where entrepreneurs, startups, investors, and governments operate in <span className="text-black font-bold">alignment</span>.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// --- SECTION: CORE BELIEFS (THE UPDATED COMPONENT) ---
function CoreBeliefsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end end"] });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const beliefs = [
    { title: "Design Over Accident", content: "Growth is not accidental. It is designed." },
    { title: "Infrastructure First", content: "Innovation requires infrastructure, not just ideas." },
    { title: "Ecosystem Synergy", content: "Entrepreneurs thrive in ecosystems, not in isolation." },
    { title: "Systematic Impact", content: "Long-term impact is built through systems, not short-term execution." }
  ];

  return (
    <section ref={containerRef} className="relative h-[500vh] sm:h-[600vh] md:h-[700vh] lg:h-[500vh] bg-[#050505] z-40">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Background Grid */}
        <motion.div
          style={{
            rotate: useTransform(smoothProgress, [0, 1], [0, 45]),
            opacity: useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0, 0.08, 0.08, 0])
          }}
          className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: 'linear-gradient(#D4AF37 1px, transparent 1px), linear-gradient(90deg, #D4AF37 1px, transparent 1px)', backgroundSize: '100px 100px' }}
        />

        <div className="relative z-10 w-full max-w-7xl px-6 sm:px-8 md:px-10">
          <div className="mb-12 sm:mb-16 md:mb-24">
            <span className="text-[8px] sm:text-[10px] font-black text-[#D4AF37] uppercase tracking-[0.5em] sm:tracking-[1em] block mb-4 sm:mb-6">Foundation_Principles</span>
            <h3 className="text-4xl sm:text-5xl md:text-7xl lg:text-[9rem] font-black uppercase text-white tracking-tighter italic leading-none">Core Beliefs</h3>
          </div>

          <div className="relative h-[400px] sm:h-[450px] md:h-[500px]">
            {beliefs.map((belief, i) => {
              const start = 0.1 + (i * 0.17);
              const end = start + 0.17;
              const opacity = useTransform(smoothProgress, [start, start + 0.05, end - 0.05, end], [0, 1, 1, 0]);
              const scale = useTransform(smoothProgress, [start, start + 0.05, end], [0.85, 1, 1.15]);
              const rotateX = useTransform(smoothProgress, [start, end], [30, -30]);
              const y = useTransform(smoothProgress, [start, end], [80, -80]);

              return (
                <motion.div key={i} style={{ opacity, scale, rotateX, y, perspective: "1500px" }} className="absolute inset-0 flex flex-col justify-center">
                  <div className="border-l-[4px] sm:border-l-[6px] md:border-l-[8px] border-[#D4AF37] pl-6 sm:pl-12 md:pl-24 py-6 sm:py-8 md:py-10">
                    <span className="text-[#D4AF37] font-mono text-[8px] sm:text-xs tracking-[0.3em] sm:tracking-[0.5em] block mb-6 sm:mb-8 md:mb-10">NODE_SEQUENCE_0{i + 1}</span>
                    <h4 className="text-2xl sm:text-4xl md:text-6xl lg:text-[8rem] font-black uppercase text-white tracking-tighter leading-[0.8] mb-6 sm:mb-8 md:mb-12">{belief.title}</h4>
                    <p className="text-base sm:text-lg md:text-2xl lg:text-4xl font-light text-zinc-500 italic max-w-3xl">{belief.content}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Final Resolution Reveal */}
        <motion.div
          style={{
            opacity: useTransform(smoothProgress, [0.82, 0.92], [0, 1]),
            scale: useTransform(smoothProgress, [0.82, 0.92], [0.9, 1])
          }}
          className="absolute inset-0 flex flex-col items-center justify-center bg-[#050505] px-6 sm:px-10 text-center z-20"
        >
          <div className="max-w-6xl space-y-12 sm:space-y-16 md:space-y-20">
            <div className="h-[1px] w-24 sm:w-32 md:w-40 bg-[#D4AF37] mx-auto opacity-40 shadow-[0_0_20px_#D4AF37]" />
            <h3 className="text-xl sm:text-3xl md:text-5xl lg:text-8xl font-light italic leading-[1.05] text-zinc-300">
              "The goal is to create environments where <span className="text-white font-black not-italic underline decoration-[#D4AF37] decoration-4 sm:decoration-8 underline-offset-[10px] sm:underline-offset-[20px]">success becomes repeatable.</span>"
            </h3>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// --- MAIN PAGE ---
export default function GalleryCutHome() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const leftPanelX = useTransform(smoothProgress, [0, 0.15], ["0%", "-100%"]);
  const rightPanelX = useTransform(smoothProgress, [0, 0.15], ["0%", "100%"]);
  const textOpacity = useTransform(smoothProgress, [0.02, 0.1], [1, 0]);
  const imageScale = useTransform(smoothProgress, [0.1, 0.4], [0.85, 1.15]);
  const imageBlur = useTransform(smoothProgress, [0.4, 0.6], ["blur(0px)", "blur(40px)"]);

  return (
    <main ref={containerRef} className="relative bg-[#F9F9F9] overflow-x-clip selection:bg-[#2C518A] selection:text-white">
      {/* Grid Overlay */}
      <div className="fixed inset-0 z-[1] pointer-events-none opacity-[0.04]"
        style={{ backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`, backgroundSize: "40px 40px" }}
      />

      {/* Hero Image Layer */}
      <section className="fixed top-0 left-0 w-full h-screen z-0 bg-white overflow-hidden">
        <motion.div style={{ scale: imageScale, filter: imageBlur }} className="relative h-full w-full flex items-center justify-center pt-16 sm:pt-24 lg:pt-32">
          <div className="relative h-full w-full max-w-sm sm:max-w-2xl md:max-w-3xl lg:max-w-4xl grayscale contrast-[1.1]">
            <Image src="/shafi.png" alt="Shafi Shoukath" fill className="object-contain object-bottom" priority />
          </div>
        </motion.div>
        <div className="absolute top-[15%] right-[10%] h-48 sm:h-64 md:h-96 w-48 sm:w-64 md:w-96 rounded-full bg-[#D4AF37] blur-[100px] sm:blur-[140px] opacity-10 pointer-events-none" />
      </section>

      {/* Opening Split Panels */}
      <div className="fixed top-0 left-0 w-full h-screen z-20 flex pointer-events-none">
        <motion.div style={{ x: leftPanelX }} className="h-full w-1/2 bg-white border-r border-zinc-100" />
        <motion.div style={{ x: rightPanelX }} className="h-full w-1/2 bg-white border-l border-zinc-100" />
        <div className="absolute inset-0 flex items-center justify-center px-4 sm:px-6">
          <motion.div style={{ opacity: textOpacity }} className="flex flex-col items-center">
            <h1 className="text-[15vw] sm:text-[12vw] font-thin uppercase text-black leading-[0.7] tracking-tighter">Shafi</h1>
            <div className="flex items-center gap-3 sm:gap-6 w-full px-6 sm:px-12">
              <div className="h-[1px] flex-1 bg-zinc-200" />
              <span className="text-[7px] sm:text-[10px] font-black tracking-[1em] sm:tracking-[1.2em] text-[#D4AF37] uppercase">The Next Leaders</span>
              <div className="h-[1px] flex-1 bg-zinc-200" />
            </div>
            <h1 className="text-[15vw] sm:text-[12vw] font-black uppercase text-black leading-[0.7] tracking-tighter">Shoukath</h1>
          </motion.div>
        </div>
      </div>

      <div className="h-[120vh]" />

      {/* Kinetic Section */}
      <section className="relative z-30 bg-black text-white py-20 sm:py-24 md:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-10">
          <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} className="space-y-16 sm:space-y-24 md:space-y-32">
            <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-9xl font-black uppercase leading-[0.8] tracking-tighter">Not Just <br/> Building <br/> <span className="text-[#D4AF37]">Businesses.</span></h2>
            <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-9xl font-black uppercase leading-[0.8] tracking-tighter text-right">Designing <br/> <span className="text-[#2C518A]">Ecosystems</span> <br/> Multiply.</h2>
          </motion.div>
        </div>
      </section>

      <VisionMissionSection />
      <QuoteRevealSection />

      {/* Bento Pillars Section */}
      <section className="relative z-30 bg-[#050505] py-20 sm:py-30 md:py-40 border-y border-zinc-900">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 md:px-10">
          <h3 className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-black uppercase tracking-tighter text-white mb-12 sm:mb-16 md:mb-24 border-l-2 border-[#D4AF37] pl-4 sm:pl-6 md:pl-8">Global Scale <br/> Infrastructure</h3>
          <div className="grid grid-cols-1 md:grid-cols-12 auto-rows-[280px] sm:auto-rows-[300px] md:auto-rows-[320px] gap-3 sm:gap-4">
            {[
              { t: "Entrepreneurs", i: ICONS.Cpu, s: "md:col-span-7 row-span-2", d: "The core engine of global disruption." },
              { t: "Investors", i: ICONS.Globe, s: "md:col-span-5", d: "Direct access to verified global pipelines." },
              { t: "Governments", i: ICONS.Zap, s: "md:col-span-5", d: "Modernizing policy infrastructure." },
              { t: "Startups", i: ICONS.Layers, s: "md:col-span-5", d: "Accelerating Series A to Exit." }
            ].map((p, i) => (
              <motion.div key={i} className={`relative group border border-zinc-800 bg-[#0A0A0A] p-6 sm:p-8 md:p-10 flex flex-col justify-between overflow-hidden transition-all hover:border-[#D4AF37]/50 ${p.s}`}>
                <div className="relative z-10">
                  <p.i className="w-6 h-6 sm:w-8 sm:h-8 text-[#D4AF37] mb-4 sm:mb-6" />
                  <h4 className="text-xl sm:text-2xl md:text-3xl font-black uppercase text-white">{p.t}</h4>
                  <p className="text-zinc-500 text-xs sm:text-sm mt-3 sm:mt-4">{p.d}</p>
                </div>
                <span className="absolute -bottom-4 sm:-bottom-6 -right-2 sm:-right-4 text-6xl sm:text-8xl md:text-9xl font-black text-white/[0.02] group-hover:text-[#D4AF37]/[0.04] transition-all">0{i+1}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}