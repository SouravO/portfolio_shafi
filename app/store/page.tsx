"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

export default function CinematicBookExperience() {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25
  });

  // 1. Book Animation Transforms
  const bookRotateY = useTransform(smoothScroll, [0, 0.3, 0.6], [90, 0, 0]);
  const bookScale = useTransform(smoothScroll, [0, 0.3, 0.6], [0.8, 1.1, 1]);
  const coverRotation = useTransform(smoothScroll, [0.6, 1], [0, -120]);
  const pageRotation = useTransform(smoothScroll, [0.7, 1], [0, -10]);
  
  // 2. UI Visibility Transforms
  const uiOpacity = useTransform(smoothScroll, [0.75, 0.9], [0, 1]);
  const uiX = useTransform(smoothScroll, [0.75, 0.9], [40, 0]);
  const quoteOpacity = useTransform(smoothScroll, [0.9, 1], [0, 0.8]);

  // 3. Header Title Transforms (The new addition)
  const titleOpacity = useTransform(smoothScroll, [0, 0.2, 0.4], [1, 0.8, 0]);
  const titleBlur = useTransform(smoothScroll, [0, 0.2], ["blur(0px)", "blur(10px)"]);
  const titleY = useTransform(smoothScroll, [0, 0.2], [0, -50]);

  const titleChars = "BHĀRAT".split("");

  return (
    <div ref={containerRef} className="relative h-[400vh] bg-[#080808] text-white selection:bg-orange-500">
      
      {/* FIXED VIEWPORT CONTAINER */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        
        {/* Cinematic Backdrop */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,_#1a1510_0%,_#050505_100%)]" />
        
        {/* Decorative Lighting */}
        <div className="absolute top-0 left-1/4 w-[1px] h-full bg-gradient-to-b from-transparent via-white/5 to-transparent" />

        {/* --- NEW TOP TITLE SECTION --- */}
        <motion.div 
          style={{ opacity: titleOpacity, filter: titleBlur, y: titleY }}
          className="absolute top-16 flex flex-col items-center z-50 pointer-events-none translate-y-[1cm]"
        >
          <div className="flex gap-4 mb-2">
            {titleChars.map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 1, delay: i * 0.1, ease: "easeOut" }}
                className="text-6xl md:text-8xl font-serif tracking-tighter text-white/90"
              >
                {char}
              </motion.span>
            ))}
          </div>
          <motion.div 
             initial={{ width: 0, opacity: 0 }}
             animate={{ width: "100%", opacity: 1 }}
             transition={{ duration: 1.5, delay: 0.8 }}
             className="h-[1px] bg-gradient-to-r from-transparent via-orange-500/50 to-transparent w-64"
          />
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-4 text-[10px] tracking-[0.8em] uppercase text-orange-500/60 font-bold"
          >
            A Visual Journey Through Time
          </motion.span>
        </motion.div>
        {/* --- END TOP TITLE SECTION --- */}

        <div className="relative w-full max-w-7xl flex flex-col lg:flex-row items-center justify-center gap-16 xl:gap-32 px-10">
          
          {/* THE 3D BOOK ENGINE */}
          <motion.div 
            style={{ rotateY: bookRotateY, scale: bookScale }}
            className="relative perspective-3000 preserve-3d w-[300px] h-[420px] md:w-[340px] md:h-[480px] flex-shrink-0"
          >
            {/* THE PAGES STACK (Inner Body) */}
            <motion.div 
              style={{ rotateY: pageRotation }}
              className="absolute inset-0 bg-[#fdfbf7] shadow-2xl rounded-r-sm origin-left preserve-3d"
            >
              <div className="absolute inset-0 p-10 md:p-12 flex flex-col justify-between">
                <div className="space-y-6">
                   <h4 className="font-serif text-zinc-900 text-2xl md:text-3xl italic">The Golden Temple</h4>
                   <div className="w-12 h-[1px] bg-orange-800" />
                   <p className="text-zinc-500 text-[11px] leading-relaxed font-serif">
                     "Architecture is the learned game, correct and magnificent, 
                     of forms assembled in the light." — A visual study of 
                     sacred geometry.
                   </p>
                </div>
                <div className="h-40 w-full bg-zinc-100 border border-zinc-200 overflow-hidden">
                   <img 
                    src="https://images.unsplash.com/photo-1514222134-b57cbb8ce073?auto=format&fit=crop&q=80&w=600" 
                    className="w-full h-full object-cover sepia-[0.2] grayscale hover:grayscale-0 transition-all duration-1000" 
                    alt="Interior page" 
                   />
                </div>
              </div>
            </motion.div>

            {/* THE FRONT COVER */}
            <motion.div 
              style={{ rotateY: coverRotation }}
              className="absolute inset-0 z-30 origin-left preserve-3d shadow-2xl"
            >
              {/* Outer Face */}
              <div className="absolute inset-0 bg-[#121212] rounded-r-sm border border-white/5 backface-hidden overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
                <div className="h-full w-full p-12 flex flex-col justify-between border-[0.5px] border-orange-900/30 m-auto">
                  <div className="space-y-1">
                    <div className="w-10 h-10 border border-orange-500/40 flex items-center justify-center mb-4">
                        <div className="w-4 h-4 bg-orange-600/30 rounded-full blur-sm" />
                    </div>
                    <span className="text-[10px] tracking-[0.6em] text-orange-500 font-bold uppercase text-shadow-glow">Volume I</span>
                  </div>
                  
                  <div>
                    <h2 className="text-5xl md:text-6xl font-serif tracking-tighter mb-2">India Is A Developed Country</h2>
                    <p className="text-[9px] tracking-[0.4em] uppercase text-zinc-500">The Visual Archive</p>
                  </div>
                </div>
              </div>

              {/* Inner Face of Cover */}
              <div className="absolute inset-0 bg-[#eceae5] rotate-y-180 backface-hidden flex items-center justify-center p-12">
                 <div className="border border-zinc-300 w-full h-full flex flex-col items-center justify-center space-y-4">
                    <span className="text-[8px] tracking-[0.4em] text-zinc-400 uppercase">Curator Note</span>
                    <p className="italic text-zinc-500 text-[10px] font-serif text-center px-4">
                        This archive is printed on 180gsm acid-free paper using high-fidelity pigment inks.
                    </p>
                 </div>
              </div>
            </motion.div>

            {/* THE SPINE */}
            <div className="absolute inset-y-0 -left-[40px] w-[40px] bg-[#0a0a0a] origin-right rotate-y-[-90deg] flex flex-col items-center justify-around py-10 shadow-[inset_-20px_0_40px_rgba(0,0,0,0.8)] border-r border-white/10">
                <span className="vertical-text text-[9px] tracking-[0.4em] font-bold text-orange-700/60 uppercase">2026 Limited Edition</span>
                <div className="w-3 h-3 bg-orange-600 rounded-full blur-md animate-pulse" />
                <span className="vertical-text text-[9px] tracking-[0.4em] font-bold text-zinc-700 uppercase">Archive No. 042</span>
            </div>
          </motion.div>

          {/* RIGHT SIDE: DESCRIPTION & UI */}
          <motion.div 
            style={{ opacity: uiOpacity, x: uiX }}
            className="w-full max-w-sm lg:w-96 space-y-8"
          >
            <div className="space-y-4">
              <div className="inline-block px-3 py-1 bg-orange-950/20 border border-orange-500/20 text-orange-500 text-[9px] tracking-widest uppercase font-bold">
                The Narrative
              </div>
              <h3 className="text-4xl font-serif">A Legacy in <span className="italic text-orange-200/60 font-light">Print.</span></h3>
              <p className="text-zinc-400 text-sm font-light leading-relaxed">
                Merging ancient wisdom with futuristic vision. BHĀRAT is a hand-curated collection of 150+ high-resolution plates exploring the vanishing geometry of the subcontinent.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 border-y border-white/5 py-6">
                <div className="space-y-1">
                    <p className="text-[9px] text-zinc-500 uppercase tracking-widest">Format</p>
                    <p className="text-xs font-medium">Large Clothbound</p>
                </div>
                <div className="space-y-1">
                    <p className="text-[9px] text-zinc-500 uppercase tracking-widest">Paper</p>
                    <p className="text-xs font-medium">180gsm Uncoated</p>
                </div>
                <div className="space-y-1">
                    <p className="text-[9px] text-zinc-500 uppercase tracking-widest">Weight</p>
                    <p className="text-xs font-medium">2.4 Kilograms</p>
                </div>
                <div className="space-y-1">
                    <p className="text-[9px] text-zinc-500 uppercase tracking-widest">Dimensions</p>
                    <p className="text-xs font-medium">240 x 320 mm</p>
                </div>
            </div>

            <div className="space-y-6">
              <div className="flex justify-between items-end">
                <div className="space-y-1">
                    <span className="text-zinc-500 text-[10px] uppercase tracking-widest block font-mono">Archive Serial</span>
                    <span className="text-sm font-bold tracking-widest text-orange-100">№ 042 / 500</span>
                </div>
                <span className="text-2xl font-serif tracking-tighter">₹4,999.00</span>
              </div>
              <button className="w-full group relative py-5 bg-white text-black font-black text-[10px] tracking-[0.3em] uppercase overflow-hidden transition-all hover:bg-orange-500 hover:text-white">
                <span className="relative z-10">Secure Your Edition</span>
              </button>
            </div>
          </motion.div>

        </div>

        {/* AUTHOR'S MESSAGE */}
        <motion.div 
            style={{ opacity: quoteOpacity }}
            className="absolute bottom-12 left-10 lg:left-auto lg:right-10 max-w-sm"
        >
            <div className="flex flex-col space-y-3 border-l border-orange-500/30 pl-6">
                <p className="text-sm font-serif italic text-zinc-300 leading-relaxed">
                    "We do not merely document the past; we curate the way it is remembered. This volume is a bridge across time."
                </p>
                <div className="flex items-center gap-3">
                    <div className="w-6 h-[1px] bg-zinc-700" />
                    <span className="text-[9px] tracking-[0.4em] text-orange-500 uppercase font-bold">Aryan Varma, Lead Archivist</span>
                </div>
            </div>
        </motion.div>

      </div>

      <style jsx global>{`
        .perspective-3000 { perspective: 3000px; }
        .preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
        .vertical-text { writing-mode: vertical-rl; transform: rotate(180deg); }
        .text-shadow-glow { text-shadow: 0 0 10px rgba(249, 115, 22, 0.4); }
      `}</style>
    </div>
  );
}