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

  // 1. Book Animation Transforms - Slightly adjusted for mobile feel
  const bookRotateY = useTransform(smoothScroll, [0, 0.3, 0.6], [90, 0, 0]);
  // Responsive Scaling: Smaller on mobile (0.5 -> 0.7), Larger on desktop (0.8 -> 1.1)
  const bookScale = useTransform(smoothScroll, [0, 0.3, 0.6], [0.6, 0.9, 0.85]);
  const coverRotation = useTransform(smoothScroll, [0.6, 1], [0, -120]);
  const pageRotation = useTransform(smoothScroll, [0.7, 1], [0, -10]);
  
  // 2. UI Visibility Transforms
  const uiOpacity = useTransform(smoothScroll, [0.75, 0.9], [0, 1]);
  const uiY = useTransform(smoothScroll, [0.75, 0.9], [40, 0]); // Changed X to Y for better mobile entry
  const quoteOpacity = useTransform(smoothScroll, [0.9, 1], [0, 0.8]);

  // 3. Header Title Transforms
  const titleOpacity = useTransform(smoothScroll, [0, 0.2, 0.4], [1, 0.8, 0]);
  const titleBlur = useTransform(smoothScroll, [0, 0.2], ["blur(0px)", "blur(10px)"]);
  const titleY = useTransform(smoothScroll, [0, 0.2], [0, -50]);

  const titleChars = "India".split("");

  return (
    <div ref={containerRef} className="relative h-[400vh] bg-[#080808] text-white selection:bg-orange-500">
      
      {/* FIXED VIEWPORT CONTAINER */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        
        {/* Cinematic Backdrop */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,_#1a1510_0%,_#050505_100%)]" />
        
        {/* Decorative Lighting - Hidden on mobile for performance/clarity */}
        <div className="hidden md:block absolute top-0 left-1/4 w-[1px] h-full bg-gradient-to-b from-transparent via-white/5 to-transparent" />

        {/* --- TOP TITLE SECTION --- */}
        <motion.div 
          style={{ opacity: titleOpacity, filter: titleBlur, y: titleY }}
          className="absolute top-10 md:top-16 flex flex-col items-center z-50 pointer-events-none"
        >
          <div className="flex gap-2 md:gap-4 mb-2">
            {titleChars.map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px) " }}
                transition={{ duration: 1, delay: i * 0.1, ease: "easeOut" }}
                className="text-5xl md:text-8xl font-serif tracking-tighter text-white/90"
              >
                {char}
              </motion.span>
            ))}
          </div>
          <motion.div 
             initial={{ width: 0, opacity: 0 }}
             animate={{ width: "100%", opacity: 1 }}
             transition={{ duration: 1.5, delay: 0.8 }}
             className="h-[1px] bg-gradient-to-r from-transparent via-orange-500/50 to-transparent w-48 md:w-64"
          />
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-4 text-[8px] md:text-[10px] tracking-[0.6em] md:tracking-[0.8em] uppercase text-blue-500/60 font-bold"
          >
            A Journey Through Time
          </motion.span>
        </motion.div>

        <div className="relative w-full max-w-[1400px] flex flex-col lg:flex-row items-center justify-center gap-10 md:gap-20 xl:gap-40 px-6 md:px-10">
          
          {/* THE 3D BOOK ENGINE */}
          <motion.div 
            style={{ rotateY: bookRotateY, scale: bookScale }}
            className="relative perspective-3000 preserve-3d w-[280px] h-[400px] md:w-[420px] md:h-[580px] flex-shrink-0 mt-20 lg:mt-0"
          >
            {/* THE PAGES STACK */}
            <motion.div 
              style={{ rotateY: pageRotation }}
              className="absolute inset-0 bg-[#fdfbf7] shadow-2xl rounded-r-sm origin-left preserve-3d"
            >
              <div className="absolute inset-0 p-8 md:p-14 flex flex-col justify-between">
                <div className="space-y-4 md:space-y-6">
                   <h4 className="font-serif text-zinc-900 text-xl md:text-3xl italic leading-tight">Predictive Governance</h4>
                   <div className="w-12 md:w-16 h-[1px] bg-orange-800" />
                   <p className="text-zinc-500 text-[10px] md:text-xs leading-relaxed font-serif line-clamp-[12] md:line-clamp-none">
                     "When do we stop calling India “developing” and start living as developed? India Is A Developing Developed Country is a bold, practical call from Shafi Shoukath to think bigger and act better together..."
                   </p>
                </div>
                <div className="h-32 md:h-56 w-full bg-zinc-100 border border-zinc-200 overflow-hidden">
                   <img 
                    src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=600" 
                    className="w-full h-full object-cover grayscale" 
                    alt="Intelligent Networks" 
                   />
                </div>
              </div>
            </motion.div>

            {/* THE FRONT COVER */}
            <motion.div 
              style={{ rotateY: coverRotation }}
              className="absolute inset-0 z-30 origin-left preserve-3d shadow-2xl"
            >
              <div className="absolute inset-0 bg-[#121212] rounded-r-sm border border-white/5 backface-hidden overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
                <div className="absolute inset-0 opacity-20">
                  <img 
                    src="/Screenshot 2026-04-01 at 03.41.55.png" 
                    alt="India Map" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="absolute inset-0 bg-[#eceae5] rotate-y-180 backface-hidden flex items-center justify-center p-8 md:p-12">
                 <div className="border border-zinc-300 w-full h-full flex flex-col items-center justify-center space-y-4">
                    <span className="text-[8px] tracking-[0.4em] text-zinc-400 uppercase">Author's Note</span>
                    <p className="italic text-zinc-500 text-[10px] md:text-xs font-serif text-center px-2 md:px-4">
The question is not whether this transformation will happen—it is already underway                    </p>
                 </div>
              </div>
            </motion.div>

            {/* THE SPINE */}
            <div className="absolute inset-y-0 -left-[30px] md:-left-[50px] w-[30px] md:w-[50px] bg-[#0a0a0a] origin-right rotate-y-[-90deg] flex flex-col items-center justify-around py-6 md:py-10 shadow-[inset_-20px_0_40px_rgba(0,0,0,0.8)] border-r border-white/10">
                <span className="vertical-text text-[8px] md:text-[10px] tracking-[0.4em] font-bold text-orange-700/60 uppercase">Shafi Shoukath</span>
                <div className="w-2 h-2 md:w-4 md:h-4 bg-orange-600 rounded-full blur-sm md:blur-md animate-pulse" />
                <span className="vertical-text text-[8px] md:text-[10px] tracking-[0.4em] font-bold text-zinc-700 uppercase">2025 Edition</span>
            </div>
          </motion.div>

          {/* RIGHT SIDE: DESCRIPTION & UI */}
          <motion.div 
            style={{ opacity: uiOpacity, y: uiY }}
            className="w-full max-w-md lg:w-[450px] space-y-6 md:space-y-10 pb-20 lg:pb-0"
          >
            <div className="space-y-4 md:space-y-6 text-center lg:text-left">
              <div className="inline-block px-4 py-1.5 bg-blue-950/20 border border-blue-500/20 text-white-500 text-[9px] md:text-[10px] tracking-widest uppercase font-bold">
                The Core Thesis
              </div>
              <h3 className="text-2xl md:text-4xl font-serif leading-tight">Redefining the <br/><span className="italic text-orange-200/60 font-light">Intelligent Nation.</span></h3>
              <p className="text-zinc-400 text-xs md:text-sm font-light leading-relaxed px-4 md:px-0">
                 When do we stop calling India “developing” and start living as developed? 
                 India Is A Developing Developed Country is a bold, practical call from Shafi Shoukath to think bigger and act better together.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 md:gap-6 border-y border-white/5 py-6 md:py-8">
                <div className="space-y-1 md:space-y-2 text-center lg:text-left">
                    <p className="text-[9px] md:text-[10px] text-zinc-500 uppercase tracking-widest">Focus</p>
                    <p className="text-xs md:text-sm font-medium">Predictive Governance</p>
                </div>
                <div className="space-y-1 md:space-y-2 text-center lg:text-left">
                    <p className="text-[9px] md:text-[10px] text-zinc-500 uppercase tracking-widest">Infrastructure</p>
                    <p className="text-xs md:text-sm font-medium">Data Ecosystems</p>
                </div>
            </div>

            <div className="space-y-4 md:space-y-6 px-4 md:px-0">
              <button 
                onClick={() => window.open('https://wa.me/9744771277?text=Hi, I\'d like to order the book "India Is A Developed Country" by Shafi Shoukath', '_blank')}
                className="w-full group relative py-4 md:py-5 bg-white text-black font-black text-[10px] md:text-[11px] tracking-[0.4em] uppercase overflow-hidden transition-all hover:bg-orange-500 hover:text-white shadow-xl"
              >
                <span className="relative z-10">Get Now</span>
              </button>
            </div>
          </motion.div>

        </div>

        {/* AUTHOR'S MESSAGE - Adjusted for mobile position */}
        <motion.div 
            style={{ opacity: quoteOpacity }}
            className="absolute bottom-6 md:bottom-12 left-6 right-6 md:left-auto md:right-10 max-w-md hidden sm:block"
        >
            <div className="flex flex-col space-y-2 md:space-y-4 border-l-2 border-orange-500/30 pl-4 md:pl-8">
                <p className="text-[11px] md:text-sm font-serif italic text-zinc-300 leading-relaxed">
                    "The question is not whether this transformation will happen—it is already underway."
                </p>
                <div className="flex items-center gap-2 md:gap-4">
                    <div className="w-6 md:w-8 h-[1px] bg-zinc-700" />
                    <span className="text-[8px] md:text-[10px] tracking-[0.4em] text-orange-500 uppercase font-bold">Shafi Shoukath</span>
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
        @media (max-width: 768px) {
            .perspective-3000 { perspective: 1500px; }
        }
      `}</style>
    </div>
  );
}