"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import { Cpu, Zap, Layers, Globe } from "lucide-react";

// --- COMPONENT: QUOTE CHARACTER (SYNCHRONIZED TIMING) ---
function QuoteCharacter({ char, index, total, progress }: { char: string; index: number; total: number; progress: any }) {
  // We spread the start across 70% of the scroll
  const start = (index / total) * 0.7; 
  // Each character takes 30% of the scroll to "land"
  // This ensures the last character (0.7 + 0.3) finishes at exactly 1.0 progress
  const end = start + 0.3; 
  
  const x = useTransform(progress, [start, end], ["15vw", "0vw"]);
  const opacity = useTransform(progress, [start, end], [0, 1]);
  const scale = useTransform(progress, [start, end], [0.9, 1]);
  const blur = useTransform(progress, [start, end], ["blur(12px)", "blur(0px)"]);

  return (
    <motion.span
      style={{ x, opacity, filter: blur, scale }}
      className="text-3xl md:text-6xl lg:text-7xl font-black text-white uppercase italic whitespace-pre inline-block"
    >
      {char}
    </motion.span>
  );
}

// --- COMPONENT: QUOTE REVEAL SECTION ---
function QuoteRevealSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 150,
    damping: 30,
    restDelta: 0.001,
  });

  const quote = "The future belongs to those who don’t just participate in systems — but build them.";
  const characters = quote.split("");

  return (
    /* Height reduced to 180vh to eliminate the "dead scroll" at the end */
    <section ref={sectionRef} className="relative h-[180vh] bg-black z-[35] -mt-1">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden px-10">
        <div className="max-w-6xl text-center flex flex-wrap justify-center gap-y-2 md:gap-y-4 px-4 md:px-0">
          {characters.map((char, i) => (
            <QuoteCharacter 
              key={i} 
              char={char} 
              index={i} 
              total={characters.length} 
              progress={smoothProgress} 
            />
          ))}
        </div>
        
        {/* Progress bar synced to character completion */}
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-40 h-[1px] bg-white/10">
          <motion.div 
            className="h-full bg-[#D4AF37]" 
            style={{ scaleX: smoothProgress, originX: 0 }}
          />
        </div>

        <div className="absolute inset-0 pointer-events-none opacity-[0.05]" 
          style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
        />
      </div>
    </section>
  );
}

export default function GalleryCutHome() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pillarIcons = [Cpu, Globe, Layers, Zap];

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // ANIMATIONS
  const leftPanelX = useTransform(smoothProgress, [0, 0.15], ["0%", "-100%"]);
  const rightPanelX = useTransform(smoothProgress, [0, 0.15], ["0%", "100%"]);
  const textOpacity = useTransform(smoothProgress, [0.02, 0.1], [1, 0]);
  const textScale = useTransform(smoothProgress, [0, 0.15], [1, 1.1]);
  const imageScale = useTransform(smoothProgress, [0.1, 0.4], [0.85, 1.15]);
  const imageBlur = useTransform(smoothProgress, [0.4, 0.6], ["blur(0px)", "blur(40px)"]);

  return (
    <main ref={containerRef} className="relative bg-[#F9F9F9] overflow-x-clip selection:bg-[#2C518A] selection:text-white">
      
      {/* --- GRID OVERLAY --- */}
      <div className="fixed inset-0 z-[1] pointer-events-none opacity-[0.04]"
        style={{ backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`, backgroundSize: "40px 40px" }}
      />

      {/* --- HERO IMAGE LAYER --- */}
      <section className="fixed top-0 left-0 w-full h-screen z-0 bg-white overflow-hidden">
        <motion.div style={{ scale: imageScale, filter: imageBlur }} className="relative h-full w-full flex items-center justify-center p-4 sm:p-8 md:p-12 lg:p-20 pt-16 sm:pt-20 md:pt-24 lg:pt-32">
          <div className="relative h-full w-full max-w-xs sm:max-w-sm md:max-w-2xl lg:max-w-4xl grayscale contrast-[1.1]">
            <Image src="/shafi.png" alt="Shafi Shoukath" fill className="object-contain object-bottom" priority />
          </div>
        </motion.div>
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-[15%] right-[10%] h-96 w-96 rounded-full bg-[#D4AF37] blur-[140px] pointer-events-none"
        />
      </section>

      {/* --- SPLITTING PANELS --- */}
      <div className="fixed top-0 left-0 w-full h-screen z-20 flex pointer-events-none">
        <motion.div style={{ x: leftPanelX }} className="relative h-full w-1/2 bg-white border-r border-zinc-100">
           <div className="absolute top-28 left-10 flex flex-col gap-1 opacity-40 text-[8px] font-black uppercase">
            <span>LAT: 12.9716° N</span>
            <span>LNG: 77.5946° E</span>
          </div>
        </motion.div>
        <motion.div style={{ x: rightPanelX }} className="relative h-full w-1/2 bg-white border-l border-zinc-100">
          <div className="absolute bottom-10 right-10 opacity-40 text-[8px] font-black tracking-[0.3em] uppercase italic">
            System_Auth: Admin_X
          </div>
        </motion.div>

        <div className="absolute inset-0 flex items-center justify-center px-4 sm:px-8">
          <motion.div style={{ opacity: textOpacity, scale: textScale }} className="flex flex-col items-center">
            <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-[12vw] font-thin uppercase text-black leading-[0.7] tracking-[-0.05em] mb-2 sm:mb-4">Shafi</h1>
            <div className="flex items-center gap-3 sm:gap-6 w-full px-6 sm:px-12">
              <div className="h-[1px] flex-1 bg-zinc-200" />
              <span className="text-[8px] sm:text-[10px] font-black tracking-[1.2em] text-[#D4AF37] uppercase">Architect</span>
              <div className="h-[1px] flex-1 bg-zinc-200" />
            </div>
            <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-[12vw] font-black uppercase text-black leading-[0.7] tracking-tighter mt-2 sm:mt-4">Shoukath</h1>
          </motion.div>
        </div>
      </div>

      <div className="h-[120vh]" />

      {/* --- SECTION 2: KINETIC TYPOGRAPHY --- */}
      <section className="relative z-30 bg-black text-white py-16 sm:py-24 md:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
          <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} className="space-y-16 sm:space-y-24 md:space-y-32">
            <div className="flex flex-col md:flex-row items-start md:items-end gap-6 sm:gap-10">
              <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-9xl font-black uppercase leading-[0.8] tracking-tighter">
                Not Just <br /> Building <br /> <span className="text-[#D4AF37]">Businesses.</span>
              </h2>
              <p className="text-lg sm:text-xl md:text-2xl font-light text-zinc-400 max-w-xs sm:max-w-sm md:max-w-md pb-4 italic">— Building systems that enable thousands of businesses to thrive.</p>
            </div>
            <div className="flex flex-col md:flex-row-reverse items-start md:items-end gap-6 sm:gap-10">
              <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-9xl font-black uppercase leading-[0.8] tracking-tighter text-left md:text-right">
                Designing <br /> <span className="text-[#2C518A]">Ecosystems</span> <br /> Multiply.
              </h2>
              <p className="text-lg sm:text-xl md:text-2xl font-light text-zinc-400 max-w-xs sm:max-w-sm pb-4 italic text-left md:text-right">— Engineered to multiply opportunities.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- QUOTE REVEAL SECTION (FIXED TIMING) --- */}
      <QuoteRevealSection />

      {/* --- SECTION 3: CORE PILLARS (BENTO GRID) --- */}
      <section className="relative z-30 bg-[#050505] py-20 sm:py-32 md:py-40 overflow-hidden border-y border-zinc-900">
        <div className="absolute top-0 left-1/4 w-[300px] sm:w-[400px] md:w-[500px] h-[300px] sm:h-[400px] md:h-[500px] bg-[#2C518A]/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10">
          <div className="relative mb-12 sm:mb-16 md:mb-24 border-l-2 border-[#D4AF37] pl-4 sm:pl-6 md:pl-8">
            <span className="text-[8px] sm:text-[10px] font-mono font-bold text-[#D4AF37] uppercase tracking-[0.8em] block mb-2">System_Architecture // v4.0</span>
            <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-8xl font-black uppercase tracking-tighter text-white leading-none">
              Global Scale <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-200 to-zinc-500">Infrastructure</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 auto-rows-[280px] sm:auto-rows-[320px] gap-3 sm:gap-4">
            {["Entrepreneurs", "Startups", "Investors", "Governments"].map((title, i) => {
              const Icon = pillarIcons[i];
              const descriptions = [
                "The core engine of global disruption. High-octane fuel for those building the future.",
                "Accelerating Series A to Exit via unified jurisdictional frameworks.",
                "Direct access to verified global pipelines and cross-border liquidity.",
                "Modernizing policy infrastructure through digital-first governance."
              ];
              // Bento layout: Items 0 and 3 are larger
              const spanClass = i === 0 ? "col-span-1 sm:col-span-2 lg:col-span-7 row-span-2" : i === 3 ? "col-span-1 sm:col-span-2 lg:col-span-5" : "col-span-1 sm:col-span-2 lg:col-span-5";

              return (
                <motion.div key={title} whileHover="hover" initial="initial" className={`relative group overflow-hidden border border-zinc-800 bg-[#0A0A0A] p-6 sm:p-8 md:p-10 flex flex-col justify-between transition-all duration-500 hover:border-[#D4AF37]/50 ${spanClass}`}>
                  <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:20px_20px]" />
                  <motion.div variants={{ hover: { top: '100%', opacity: [0, 1, 0] }, initial: { top: '0%', opacity: 0 } }} transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }} className="absolute left-0 w-full h-[1px] bg-[#D4AF37] blur-[2px] z-20" />
                  
                  <div className="relative z-10">
                    <div className="flex justify-between items-start">
                      <div className="p-3 bg-zinc-900 border border-zinc-800 group-hover:border-[#D4AF37] transition-colors">
                        <Icon size={24} className="text-zinc-500 group-hover:text-white" />
                      </div>
                      <span className="font-mono text-[10px] text-zinc-600">REQ_AUTH_0{i + 1}</span>
                    </div>
                    <h4 className={`font-black uppercase mt-4 sm:mt-6 md:mt-8 text-white tracking-tighter ${i === 0 ? 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl' : 'text-xl sm:text-2xl md:text-3xl'}`}>{title}</h4>
                  </div>
                  <div className="relative z-10">
                    <p className="text-zinc-500 text-xs sm:text-sm max-w-xs leading-relaxed group-hover:text-zinc-300">{descriptions[i]}</p>
                    <div className="mt-4 sm:mt-6 h-[1px] w-8 sm:w-12 bg-zinc-800 group-hover:w-full group-hover:bg-[#D4AF37] transition-all duration-700" />
                  </div>
                  <span className="absolute -bottom-4 sm:-bottom-8 -right-2 sm:-right-4 text-4xl sm:text-6xl md:text-8xl lg:text-[12rem] font-black text-white/[0.02] group-hover:text-[#D4AF37]/[0.04] transition-all duration-700">0{i + 1}</span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* --- ARCHIVE SECTION --- */}
      <section className="relative z-40 bg-white px-4 sm:px-6 lg:px-12 xl:px-24 py-20 sm:py-32 md:py-40">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start border-b-[3px] sm:border-b-[6px] border-black pb-8 sm:pb-12 md:pb-16 mb-16 sm:mb-24 md:mb-32">
            <div>
              <p className="text-[8px] sm:text-[10px] font-black text-[#2C518A] tracking-[1.5em] uppercase mb-2 sm:mb-4">Core_Portfolio_01</p>
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl xl:text-[14rem] font-black uppercase tracking-tighter leading-[0.75]">ARCHIVE<span className="text-[#D4AF37]">.</span></h2>
            </div>
            <div className="mt-4 sm:mt-6 md:mt-8 text-left md:text-right space-y-1">
              <p className="text-[8px] sm:text-[10px] font-black uppercase">BENGALURU_IND</p>
              <p className="text-3xl sm:text-4xl md:text-5xl font-thin tracking-tighter">2026©</p>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 xl:gap-24">
            <div className="lg:col-span-5 space-y-12 sm:space-y-16 md:space-y-24">
              <div className="group relative">
                <div className="absolute -left-4 sm:-left-8 top-0 h-full w-[2px] bg-[#D4AF37] scale-y-0 group-hover:scale-y-100 transition-transform duration-700 origin-top" />
                <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light leading-none mb-4 sm:mb-6 md:mb-8 italic uppercase">The <span className="font-black not-italic block mt-1 sm:mt-2 text-[#2C518A]">Bespoke Logic</span> System</h3>
                <p className="text-zinc-500 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed font-medium">Designing at the intersection of violent aesthetics and surgical performance.</p>
              </div>
            </div>
            <div className="lg:col-span-7 relative">
              <div className="bg-zinc-50 p-6 sm:p-8 md:p-12 lg:p-16 xl:p-20 group min-h-[300px] sm:min-h-[400px] md:min-h-[500px] flex flex-col justify-end">
                <motion.div whileHover={{ x: 10 }} className="relative z-10 space-y-3 sm:space-y-4 md:space-y-6">
                  <span className="inline-block px-2 sm:px-3 md:px-4 py-1 bg-black text-[#D4AF37] text-[8px] sm:text-[10px] font-black uppercase">Featured_Module</span>
                  <h4 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black uppercase tracking-tighter leading-none">Ecosystem Architecture</h4>
                  <div className="pt-4 sm:pt-6 md:pt-8 flex items-center gap-3 sm:gap-4 md:gap-6">
                    <button className="h-12 sm:h-14 md:h-16 w-12 sm:w-14 md:w-16 rounded-full border-2 border-black flex items-center justify-center group-hover:bg-black transition-colors">
                      <span className="text-lg sm:text-xl group-hover:text-white">→</span>
                    </button>
                    <span className="text-[8px] sm:text-[10px] font-black uppercase tracking-[0.5em]">View Project Detail</span>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="relative z-40 bg-black text-white h-screen flex flex-col items-center justify-center px-4 sm:px-6 md:px-10 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[#2C518A]/20 blur-[120px] sm:blur-[180px] pointer-events-none" />
        <div className="relative z-10 text-center flex flex-col items-center max-w-4xl px-4">
          <span className="text-[8px] sm:text-[10px] font-black tracking-[1em] sm:tracking-[2em] uppercase text-[#D4AF37] mb-6 sm:mb-8 md:mb-12 block ml-[1em] sm:ml-[2em]">Final_Statement</span>
          <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-light italic mb-8 sm:mb-12 md:mb-16 leading-tight">
            "The future belongs to those who don't <span className="font-black not-italic text-[#D4AF37]">participate</span> in systems — but <span className="font-black not-italic text-[#2C518A]">build</span> them."
          </h3>
          <button className="group relative px-12 sm:px-16 md:px-24 py-4 sm:py-6 md:py-8 border border-white/20 hover:border-[#D4AF37] transition-all duration-700">
            <div className="absolute inset-0 bg-[#D4AF37] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            <span className="relative z-10 text-[10px] sm:text-xs font-black uppercase tracking-[0.3em] sm:tracking-[0.5em] group-hover:text-black">Establish_Connection_</span>
          </button>
        </div>
        <div className="absolute bottom-6 sm:bottom-8 md:bottom-12 w-full px-6 sm:px-8 md:px-12 flex justify-between items-end opacity-40 text-[6px] sm:text-[8px] font-mono uppercase">
          <div>System: Liquid Brutalism v4.0 <br /> Loc: 12.97°N, 77.59°E</div>
          <div className="text-right">©2026 SHAFI_SHOUKATH <br /> ALL_RIGHTS_RESERVED</div>
        </div>
      </footer>
    </main>
  );
}