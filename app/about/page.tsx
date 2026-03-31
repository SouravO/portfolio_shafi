"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const WarpArchive = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Smoothing the scroll for a "Liquid" feel
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // Map Vertical Scroll to Horizontal Movement for the sections
  const xTranslate = useTransform(smoothProgress, [0, 1], ["0%", "-83.33%"]); // 1/6th for 6 sections

  const dossier = [
    { id: "01", tag: "VISION", title: "Structure / Talent", content: "Most economies struggle not from lack of talent, but from lack of structure. We architect the integrated systems required for growth.", accent: "rgb(34, 78, 114)" },
    { id: "02", tag: "ECOSYSTEM", title: "The Quad Pillars", content: "Sustainable growth happens when Entrepreneurs, Startups, Investors, and Governments align within a single grid.", accent: "#FF5E00" },
    { id: "03", tag: "GLOBAL", title: "Beyond Borders", content: "Talent and capital are no longer regional. We design ecosystems that operate and connect across nations.", accent: "rgb(34, 78, 114)" },
    { id: "04", tag: "PRESENCE", title: "Global Voice", content: "Engaging in dialogue and sharing ideas across forums to shape the future of economic growth.", accent: "#00E5FF" },
    { id: "05", tag: "INSIGHTS", title: "Future Logic", content: "Clear thinking creates clarity in action. We define the long-term strategy for infrastructure thinking.", accent: "rgb(34, 78, 114)" },
    { id: "06", tag: "RESOURCES", title: "Builder Assets", content: "A curated collection of playbooks and strategic reports designed for institutions building at scale.", accent: "#000000" }
  ];

  return (
    <div ref={containerRef} className="relative h-[600vh] bg-white text-black font-sans selection:bg-[rgb(34,78,114)] selection:text-white overflow-clip">
      
      {/* 1. KINETIC BACKGROUND (3D STARFIELD GRID) */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 opacity-[0.1]" 
             style={{ 
               backgroundImage: `radial-gradient(rgb(34, 78, 114) 2px, transparent 0)`, 
               backgroundSize: '60px 60px' 
             }} />
        <motion.div 
          style={{ scale: useTransform(smoothProgress, [0, 1], [1, 1.5]), rotate: useTransform(smoothProgress, [0, 1], [0, 10]) }}
          className="absolute inset-0 opacity-[0.05]"
          style={{ backgroundImage: `url('https://grainy-gradients.vercel.app/noise.svg')` }}
        />
      </div>

      {/* 2. SECTION COUNTER HUD */}
      <div className="fixed top-12 left-12 z-50 mix-blend-difference text-white">
        <p className="text-[10px] font-black tracking-[0.5em] uppercase">Phase_Archive_2026</p>
        <div className="flex gap-1 mt-2">
          {dossier.map((_, i) => (
            <motion.div 
              key={i}
              className="h-1 w-8 bg-white/20"
              style={{ backgroundColor: useTransform(smoothProgress, [i/6, (i+1)/6], ["rgba(255,255,255,0.2)", "rgb(34, 78, 114)"]) }}
            />
          ))}
        </div>
      </div>

      {/* 3. HORIZONTAL SECTION RAIL */}
      <div className="sticky top-0 h-screen w-full flex items-center">
        <motion.div 
          style={{ x: xTranslate }}
          className="flex h-full w-[600%]"
        >
          {dossier.map((item, idx) => (
            <div key={item.id} className="relative w-screen h-full flex flex-col justify-center px-6 md:px-24">
              
              {/* Background Ghost Text */}
              <motion.span 
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 0.05, x: 0 }}
                className="absolute top-1/2 left-0 -translate-y-1/2 text-[35vw] font-black leading-none uppercase pointer-events-none select-none"
              >
                {item.tag}
              </motion.span>

              {/* Main Content Layout */}
              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
                <div className="lg:col-span-8">
                  <span className="text-xs font-black text-[rgb(34,78,114)] tracking-[0.4em] mb-4 block">MODULE_{item.id}</span>
                  <h2 className="text-6xl md:text-[10rem] font-black leading-[0.8] tracking-tighter uppercase mb-12">
                    {item.title.split(' / ').map((line, i) => (
                      <span key={i} className="block">{line}</span>
                    ))}
                  </h2>
                </div>
                
                <div className="lg:col-span-4 pb-4">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="border-l-8 border-black pl-8 space-y-6"
                  >
                    <p className="text-xl md:text-2xl font-bold uppercase leading-tight tracking-tight">
                      {item.content}
                    </p>
                    <div className="w-12 h-1 bg-[rgb(34,78,114)]" />
                  </motion.div>
                </div>
              </div>

              {/* Technical Scanline */}
              <div className="absolute right-0 top-1/4 bottom-1/4 w-px bg-black/10" />
            </div>
          ))}
        </motion.div>
      </div>

      {/* 4. HEAVY TICKER FOOTER */}
      <div className="fixed bottom-0 left-0 right-0 bg-black text-white py-4 overflow-hidden flex whitespace-nowrap z-50">
        {[1, 2].map((i) => (
          <motion.div 
            key={i}
            animate={{ x: ["0%", "-100%"] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="flex items-center gap-16 px-16 text-[10px] font-black uppercase tracking-[0.4em]"
          >
            <span>Integrated Ecosystems</span>
            <span className="text-[rgb(34, 78, 114)] opacity-50">///</span>
            <span>Strategic Alignment 2026</span>
            <span className="text-[rgb(34, 78, 114)] opacity-50">///</span>
            <span>Infrastructure Integrity</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default WarpArchive;