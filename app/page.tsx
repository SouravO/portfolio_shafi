"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";

export default function GalleryCutHome() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, { 
    stiffness: 100, 
    damping: 30, 
    restDelta: 0.001 
  });

  // ANIMATIONS
  const leftPanelX = useTransform(smoothProgress, [0, 0.25], ["0%", "-100%"]);
  const rightPanelX = useTransform(smoothProgress, [0, 0.25], ["0%", "100%"]);
  const textOpacity = useTransform(smoothProgress, [0.05, 0.2], [1, 0]);
  const textScale = useTransform(smoothProgress, [0, 0.25], [1, 1.1]);
  const imageScale = useTransform(smoothProgress, [0.2, 0.6], [0.85, 1.15]);
  const imageBlur = useTransform(smoothProgress, [0.5, 0.8], ["blur(0px)", "blur(40px)"]);
  const scrollLineY = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  return (
    <main ref={containerRef} className="relative h-[500vh] bg-[#F9F9F9] overflow-x-hidden selection:bg-[#2C518A] selection:text-white">
      
      {/* --- INFRASTRUCTURE: THE GLOBAL GRID --- */}
      <div className="fixed inset-0 z-[1] pointer-events-none opacity-[0.04]" 
           style={{ backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />
      
      {/* --- INFRASTRUCTURE: SCANNER LINE --- */}
      <motion.div 
        style={{ top: scrollLineY }}
        className="fixed left-0 w-full h-[1px] bg-[#D4AF37] z-[50] pointer-events-none flex items-center justify-end px-4"
      >
        <span className="text-[8px] font-black text-[#D4AF37] uppercase tracking-[0.5em] -translate-y-2">Scanning_Core_v2.06</span>
      </motion.div>

      {/* --- LAYER 1: THE FIXED HERO --- */}
      <section className="fixed top-0 left-0 w-full h-screen z-0 bg-white overflow-hidden">
        <motion.div 
          style={{ scale: imageScale, filter: imageBlur }}
          className="relative h-full w-full flex items-center justify-center p-20"
        >
          <div className="relative h-full w-full max-w-4xl grayscale contrast-[1.1] transition-all duration-700">
            <Image
              src="/shafi.png" 
              alt="Shafi Shoukath"
              fill
              className="object-contain object-bottom"
              priority
            />
            {/* Liquid Light Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-white/40 to-transparent pointer-events-none" />
          </div>
        </motion.div>

        {/* Dynamic Physical Depth Orbs */}
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.3, 0.2] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-[15%] right-[10%] h-96 w-96 rounded-full bg-[#D4AF37] blur-[140px] pointer-events-none"
        />
      </section>

      {/* --- LAYER 2: SPLITTING PANELS & UI HUD --- */}
      <div className="fixed top-0 left-0 w-full h-screen z-20 flex pointer-events-none">
        <motion.div style={{ x: leftPanelX }} className="relative h-full w-1/2 bg-white border-r border-zinc-100 shadow-[20px_0_100px_rgba(0,0,0,0.02)]">
            {/* Top-Left HUD */}
            <div className="absolute top-10 left-10 flex flex-col gap-1 opacity-40">
                <span className="text-[8px] font-black text-black tracking-widest uppercase">LAT: 12.9716° N</span>
                <span className="text-[8px] font-black text-black tracking-widest uppercase">LNG: 77.5946° E</span>
                <div className="w-8 h-[2px] bg-[#D4AF37] mt-2" />
            </div>
        </motion.div>

        <motion.div style={{ x: rightPanelX }} className="relative h-full w-1/2 bg-white border-l border-zinc-100 shadow-[-20px_0_100px_rgba(0,0,0,0.02)]">
            {/* Bottom-Right HUD */}
            <div className="absolute bottom-10 right-10 flex flex-col items-end gap-2 opacity-40">
                <span className="text-[8px] font-black text-[#2C518A] tracking-[0.3em] uppercase italic">System_Auth: Admin_X</span>
                <div className="flex gap-1">
                    {[1,2,3,4,5].map(i => <div key={i} className="w-1 h-3 bg-zinc-200" />)}
                </div>
            </div>
        </motion.div>
        
        {/* CENTER TYPOGRAPHY */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div style={{ opacity: textOpacity, scale: textScale }} className="flex flex-col items-center">
            <h1 className="text-[12vw] font-thin uppercase text-black leading-[0.7] tracking-[-0.05em] mb-4">
              Shafi
            </h1>
            <div className="flex items-center gap-6 w-full px-12">
                <div className="h-[1px] flex-1 bg-zinc-200" />
                <span className="text-[10px] font-black tracking-[1.2em] text-[#D4AF37] uppercase">Architect</span>
                <div className="h-[1px] flex-1 bg-zinc-200" />
            </div>
            <h1 className="text-[12vw] font-black uppercase text-black leading-[0.7] tracking-tighter mt-4">
              Shoukath
            </h1>
          </motion.div>
        </div>
      </div>

      {/* --- LAYER 3: THE CONTENT SCROLL --- */}
      <div className="h-[200vh] pointer-events-none" />

      <section className="relative z-40 bg-white shadow-[0_-100px_100px_rgba(0,0,0,0.04)] px-6 lg:px-24 py-40">
        <div className="max-w-[1400px] mx-auto">
          
          {/* Header with Technical Data */}
          <div className="flex flex-col md:flex-row justify-between items-start border-b-[6px] border-black pb-16 mb-32">
            <div>
                <p className="text-[10px] font-black text-[#2C518A] tracking-[1.5em] uppercase mb-4">Core_Portfolio_01</p>
                <h2 className="text-8xl lg:text-[14rem] font-black uppercase tracking-tighter leading-[0.75]">
                    ARCHIVE<span className="text-[#D4AF37]">.</span>
                </h2>
            </div>
            <div className="mt-8 md:mt-0 text-right space-y-1">
               <p className="text-[10px] font-black uppercase">BENGALURU_IND</p>
               <p className="text-5xl font-thin tracking-tighter">2026©</p>
            </div>
          </div>

          {/* Grid with Elementified Components */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
            
            {/* Left Content (5 Columns) */}
            <div className="lg:col-span-5 space-y-24">
               <div className="group relative">
                  <div className="absolute -left-8 top-0 h-full w-[2px] bg-[#D4AF37] scale-y-0 group-hover:scale-y-100 transition-transform duration-700 origin-top" />
                  <h3 className="text-6xl font-light leading-none mb-8 italic uppercase">
                    The <span className="font-black not-italic block mt-2 text-[#2C518A]">Bespoke Logic</span> System
                  </h3>
                  <p className="text-zinc-500 text-xl leading-relaxed font-medium">
                    Designing at the intersection of violent aesthetics and surgical performance. 
                    I build digital environments that act as defensive moats for visionary founders.
                  </p>
               </div>

               <div className="grid grid-cols-2 gap-8 pt-12 border-t border-zinc-100">
                  <div>
                    <p className="text-[9px] font-black text-zinc-400 uppercase tracking-widest mb-2">Primary_Stack</p>
                    <p className="text-sm font-bold">NEXT.JS / THREE.JS / GLSL</p>
                  </div>
                  <div>
                    <p className="text-[9px] font-black text-zinc-400 uppercase tracking-widest mb-2">Focus_Area</p>
                    <p className="text-sm font-bold">FINTECH / ECOSYSTEMS</p>
                  </div>
               </div>
            </div>

            {/* Right Interactive Card (7 Columns) */}
            <div className="lg:col-span-7 relative">
                <div className="bg-zinc-50 p-12 lg:p-20 relative overflow-hidden group min-h-[600px] flex flex-col justify-end">
                    {/* Background Fragment */}
                    <div className="absolute top-0 right-0 w-full h-full opacity-[0.03] grayscale pointer-events-none">
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
                    </div>

                    <motion.div 
                        whileHover={{ x: 20 }}
                        className="relative z-10 space-y-6"
                    >
                        <span className="inline-block px-4 py-1 bg-black text-[#D4AF37] text-[10px] font-black uppercase tracking-widest">Featured_Module</span>
                        <h4 className="text-5xl lg:text-7xl font-black uppercase tracking-tighter leading-none">Ecosystem <br /> Architecture</h4>
                        <p className="text-zinc-500 max-w-sm italic border-l-4 border-[#2C518A] pl-6 py-2">
                           "Converting chaotic complexity into distinct, high-leverage competitive advantages."
                        </p>
                        
                        <div className="pt-8 flex items-center gap-6">
                            <button className="h-16 w-16 rounded-full border-2 border-black flex items-center justify-center group-hover:bg-black transition-colors duration-500">
                                <span className="text-xl group-hover:text-white transition-colors">→</span>
                            </button>
                            <span className="text-[10px] font-black uppercase tracking-[0.5em]">View Project Detail</span>
                        </div>
                    </motion.div>

                    {/* Technical Decals */}
                    <div className="absolute top-10 right-10 flex flex-col items-end">
                        <span className="text-[60px] font-black text-black/5 leading-none select-none">001</span>
                        <div className="w-20 h-[1px] bg-black/10 mt-2" />
                    </div>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- LAYER 5: THE HYPER-FOOTER --- */}
      <footer className="relative z-40 bg-black text-white h-screen flex flex-col items-center justify-center px-10 overflow-hidden">
         {/* Background Glow */}
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[#2C518A]/20 blur-[180px] pointer-events-none" />
         
         <div className="relative z-10 text-center flex flex-col items-center">
            <span className="text-[10px] font-black tracking-[2em] uppercase text-[#D4AF37] mb-12 block ml-[2em]">Establish Connection</span>
            <h3 className="text-[14vw] font-black uppercase tracking-tighter leading-none mb-16 mix-blend-difference">
               S.SHOUKATH
            </h3>
            
            <button className="group relative px-24 py-8 border border-white/20 hover:border-[#D4AF37] transition-all duration-700">
               <div className="absolute inset-0 bg-[#D4AF37] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
               <span className="relative z-10 text-xs font-black uppercase tracking-[0.5em] group-hover:text-black">Initialize Brief_</span>
            </button>
         </div>

         {/* Bottom Footer Meta */}
         <div className="absolute bottom-12 w-full px-12 flex justify-between items-end opacity-40">
            <div className="text-[8px] font-mono leading-relaxed uppercase">
                Design_System: Liquid Brutalism v4.0<br />
                Build: React_Next_Framer
            </div>
            <div className="text-[8px] font-mono text-right leading-relaxed uppercase">
                Current_Loc: 12.97°N, 77.59°E<br />
                ©2026 ALL_RIGHTS_RESERVED
            </div>
         </div>
      </footer>
    </main>
  );
}