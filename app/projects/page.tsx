"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const projects = [
  { id: 1, title: "GENESIS", code: "001_A", img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200" },
  { id: 2, title: "EXODUS", code: "002_B", img: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=1200" },
  { id: 3, title: "REVELATION", code: "003_C", img: "https://images.unsplash.com/photo-1633167606207-d840b5070fc2?q=80&w=1200" },
];

const SlitSection = ({ project, index }) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "start start"]
  });

  // Sharp, non-linear clip-path transition
  const clipPath = useTransform(
    scrollYProgress,
    [0, 1],
    ["inset(0% 100% 0% 0%)", "inset(0% 0% 0% 0%)"]
  );

  const xOffset = useTransform(scrollYProgress, [0, 1], ["20%", "0%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.2, 1]);

  return (
    <section ref={container} className="h-screen w-full sticky top-0 overflow-hidden bg-black">
      <motion.div 
        style={{ clipPath }}
        className="absolute inset-0 z-10 overflow-hidden"
      >
        <motion.div style={{ x: xOffset, scale }} className="relative h-full w-full">
          <img 
            src={project.img} 
            className="h-full w-full object-cover brightness-75"
            alt={project.title}
          />
          
          {/* Information Overlay */}
          <div className="absolute inset-0 p-12 md:p-24 flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <p className="text-cyan-500 font-mono text-xs tracking-widest">ID://{project.code}</p>
                <h2 className="text-white text-7xl md:text-[10rem] font-black leading-none tracking-tighter italic">
                  {project.title}
                </h2>
              </div>
              <span className="text-white/20 font-mono text-4xl">0{index + 1}</span>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-end gap-8">
              <div className="max-w-sm">
                <p className="text-white/60 font-light leading-relaxed">
                  Experimental data visualization and haptic feedback system designed for deep-space telemetry.
                </p>
              </div>
              <button className="group relative px-8 py-3 overflow-hidden border border-white/20">
                <span className="relative z-10 text-white font-mono text-xs uppercase tracking-widest group-hover:text-black transition-colors duration-300">Enter_System</span>
                <motion.div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Background Placeholders (prevents "flashing" between sections) */}
      <div className="absolute inset-0 bg-zinc-900 flex items-center justify-center opacity-20">
        <span className="text-white font-mono text-[20vw] font-black">LOADING</span>
      </div>
    </section>
  );
};

function DataCard({ node, index }) {
  return (
    <div className="bg-black">
      {/* Global Grain Overlay */}
      <div className="fixed inset-0 z-50 pointer-events-none opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />

      {/* Scoped navigation */}
      <nav className="fixed top-8 left-8 right-8 flex justify-between z-[100] mix-blend-difference">
        <div className="font-black text-white text-xl tracking-tighter">DATA_STREAM</div>
        <div className="hidden md:flex gap-12 text-white/50 font-mono text-[10px] uppercase tracking-[0.3em]">
          <span>Archive_2026</span>
          <span>Status: Secure</span>
        </div>
      </nav>

      <main className="relative">
        {projects.map((p, i) => (
          <SlitSection key={p.id} project={p} index={i} />
        ))}
      </main>

      <footer className="h-screen flex items-center justify-center bg-zinc-950">
        <div className="text-center">
          <motion.div 
            animate={{ opacity: [0.2, 1, 0.2] }} 
            transition={{ duration: 2, repeat: Infinity }}
            className="h-1 w-40 bg-cyan-500 mx-auto mb-8"
          />
          <p className="text-white/20 font-mono text-xs uppercase tracking-[1.5em]">System_Offline</p>
        </div>
      </footer>
    </div>
  );
};

export default SlitScanGallery;