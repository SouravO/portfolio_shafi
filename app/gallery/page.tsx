"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Maximize2, X } from "lucide-react";

const IMAGES = [
  "/Shafi1.jpg",
  "/shafi3.jpg",
  "/shafi4.JPG",
  "/shafi6.jpg",
  "/shafi7.jpg",
];

const ExpandingGalleryPage = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-[#D4AF37] selection:text-black font-sans">
      
      {/* 1. HEADER HUD */}
      <nav className="fixed top-0 left-0 w-full z-50 px-10 py-8 flex justify-between items-center mix-blend-difference">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-white text-black flex items-center justify-center font-black text-xl">G.</div>
          <span className="text-[10px] font-mono tracking-[0.5em] uppercase opacity-50">Archive_System_v4.0</span>
        </div>
        <div className="hidden md:block text-right">
          <span className="text-[8px] font-mono tracking-widest opacity-30 block">LAT: 12.9716° N</span>
          <span className="text-[8px] font-mono tracking-widest opacity-30 block">LNG: 77.5946° E</span>
        </div>
      </nav>

      {/* 2. MAIN CONTAINER */}
      <div className="max-w-[1400px] mx-auto pt-32 pb-20 px-6 lg:px-10">
        
        {/* Title Section */}
        <header className="mb-16 relative">
          <motion.h1 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-7xl md:text-9xl font-black uppercase italic tracking-tighter leading-none"
          >
            Gallery<span className="text-[#D4AF37]">.</span>
          </motion.h1>
          <div className="mt-6 flex items-center gap-6">
            <div className="h-px w-20 bg-[#D4AF37]" />
            <p className="text-[10px] font-mono tracking-[0.8em] text-zinc-500 uppercase">
              Architectural_Vision_Capture
            </p>
          </div>
        </header>

        {/* THE EXPANDING WRAPPER */}
        <div className="flex flex-col md:flex-row w-full h-[70vh] gap-2 md:gap-4 group">
          {IMAGES.map((src, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex-1 hover:flex-[7] h-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] relative overflow-hidden group/item border border-white/5 cursor-pointer"
            >
              {/* Image Background */}
              <div 
                className="absolute inset-0 bg-center bg-cover grayscale transition-all duration-1000 group-hover/item:grayscale-0 group-hover/item:scale-105"
                style={{ backgroundImage: `url('${src}')` }}
              />
              
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-40 group-hover/item:opacity-80 transition-opacity duration-500" />

              {/* Data Overlay */}
              <div className="absolute inset-0 p-8 flex flex-col justify-between opacity-0 group-hover/item:opacity-100 transition-opacity duration-500 delay-100">
                <div className="flex justify-between items-start">
                  <span className="bg-[#D4AF37] text-black text-[8px] font-black px-2 py-1 uppercase tracking-widest">
                    Secure_Node_0{i + 1}
                  </span>
                  
                  {/* FULL SCREEN BUTTON */}
                  <motion.button
                    whileHover={{ scale: 1.1, backgroundColor: "#D4AF37", color: "#000" }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedImage(src);
                    }}
                    className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/20 flex items-center justify-center text-white transition-colors"
                  >
                    <Maximize2 size={16} />
                  </motion.button>
                </div>
                
                <div className="pointer-events-none">
                  <p className="text-[10px] font-mono text-[#D4AF37] mb-2 uppercase tracking-[0.3em]">Module_Visual_Ref</p>
                  <h3 className="text-3xl md:text-5xl font-black text-white uppercase italic tracking-tighter leading-none">
                    Visual_System_{i + 1}
                  </h3>
                </div>
              </div>

              {/* Vertical ID (Visible when collapsed) */}
              <div className="absolute bottom-10 left-1/2 -translate-x-1/2 md:rotate-[-90deg] group-hover/item:opacity-0 transition-opacity duration-300 pointer-events-none">
                <span className="text-xs font-black text-white/20 whitespace-nowrap tracking-[0.5em]">REF_0{i + 1}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Technical Footer */}
        <footer className="mt-20 flex flex-col md:flex-row justify-between items-end gap-10">
          <div className="max-w-md">
            <p className="text-zinc-500 text-sm leading-relaxed">
              Unified visual framework capturing the intersection of structural logic and liquid aesthetics. Each node represents a distinct phase in the architectural evolution.
            </p>
          </div>
          <div className="flex gap-10 items-center">
            <div className="text-right">
              <span className="text-[#D4AF37] font-black text-4xl italic block leading-none tracking-tighter">BEYOND</span>
              <span className="text-white font-thin text-4xl block leading-none tracking-tighter uppercase">LOGIC.</span>
            </div>
            <button className="h-20 w-20 rounded-full border border-white/20 flex items-center justify-center group hover:bg-white transition-all duration-500">
              <span className="text-white group-hover:text-black transition-colors">→</span>
            </button>
          </div>
        </footer>
      </div>

      {/* 3. FULL SCREEN MODAL */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center p-4 md:p-20"
            onClick={() => setSelectedImage(null)}
          >
            {/* Close Button */}
            <button 
              className="absolute top-10 right-10 z-[210] text-white hover:text-[#D4AF37] transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <X size={40} strokeWidth={1} />
            </button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={selectedImage} 
                alt="Full Preview" 
                className="w-full h-full object-contain"
              />
              <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black to-transparent">
                <span className="text-[10px] font-mono text-[#D4AF37] tracking-[1em] uppercase">Visual_Node_Expanded</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background Grid */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.02] z-0" 
        style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
      />

    </main>
  );
};

export default ExpandingGalleryPage;