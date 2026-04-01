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
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-[#D4AF37] selection:text-black font-sans">

      {/* 1. HEADER HUD */}
      <nav className="fixed top-0 left-0 w-full z-50 px-4 sm:px-6 md:px-10 py-6 sm:py-8 flex justify-between items-center mix-blend-difference">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white text-black flex items-center justify-center font-black text-lg sm:text-xl">G.</div>
        </div>
        <div className="hidden md:block text-right">
          <span className="text-[8px] font-mono tracking-widest opacity-30 block">LAT: 12.9716° N</span>
          <span className="text-[8px] font-mono tracking-widest opacity-30 block">LNG: 77.5946° E</span>
        </div>
      </nav>

      {/* 2. MAIN CONTAINER */}
      <div className="max-w-[1400px] mx-auto pt-24 sm:pt-28 md:pt-32 pb-20 px-4 sm:px-6 lg:px-10">

        {/* Title Section */}
        <header className="mb-10 sm:mb-14 md:mb-16 relative">
          <motion.h1
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-9xl font-black uppercase italic tracking-tighter leading-none"
          >
            Gallery<span className="text-[#D4AF37]">.</span>
          </motion.h1>
          <div className="mt-4 sm:mt-6 flex items-center gap-4 sm:gap-6">
            <div className="h-px w-16 sm:w-20 bg-[#D4AF37]" />
          </div>
        </header>

        {/* THE EXPANDING WRAPPER - Mobile: Vertical, Desktop: Horizontal */}
        <div className="flex flex-col md:flex-row w-full gap-1 sm:gap-2 md:gap-4 group" onClick={() => setExpandedIndex(null)}>
          {IMAGES.map((src, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={(e) => {
                e.stopPropagation();
                setExpandedIndex(expandedIndex === i ? null : i);
              }}
              className={`relative overflow-hidden border border-white/5 cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                expandedIndex === i ? 'flex-[7]' : 'flex-1'
              } ${
                expandedIndex !== null && expandedIndex !== i ? 'opacity-30 md:opacity-40' : ''
              } ${
                expandedIndex === i ? 'rounded-lg' : ''
              }`}
              style={{
                minHeight: expandedIndex === i ? '70vh' : '180px',
                maxHeight: expandedIndex === i ? '70vh' : '200px'
              }}
            >
              {/* Image Background */}
              <div
                className="absolute inset-0 bg-center bg-cover transition-all duration-700 group-hover/item:scale-105"
                style={{ backgroundImage: `url('${src}')` }}
              />

              {/* Lighter overlay for better photo visibility on mobile */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-50 group-hover/item:opacity-70 transition-opacity duration-500" />

              {/* Data Overlay */}
              <div className="absolute inset-0 p-4 sm:p-6 md:p-8 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <span className="bg-[#D4AF37] text-black text-[8px] font-black px-2 py-1 uppercase tracking-widest">
                    Secure_Node_0{i + 1}
                  </span>

                  {/* FULL SCREEN BUTTON - Larger on mobile */}
                  <motion.button
                    whileHover={{ scale: 1.1, backgroundColor: "#D4AF37", color: "#000" }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedImage(src);
                    }}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 backdrop-blur-md border border-white/30 flex items-center justify-center text-white transition-colors shadow-lg"
                  >
                    <Maximize2 size={18} className="sm:w-5 sm:h-5" />
                  </motion.button>
                </div>

                {/* Info shown only when expanded on mobile */}
                <div className={`transition-opacity duration-300 ${expandedIndex === i ? 'opacity-100' : 'opacity-0 md:opacity-0 group-hover/item:opacity-100'}`}>
                  <p className="text-[8px] sm:text-[10px] font-mono text-[#D4AF37] mb-1 sm:mb-2 uppercase tracking-[0.2em] sm:tracking-[0.3em]">Module_Visual_Ref</p>
                  <h3 className="text-lg sm:text-2xl md:text-3xl lg:text-5xl font-black text-white uppercase italic tracking-tighter leading-none">
                    Visual_System_{i + 1}
                  </h3>
                </div>
              </div>

              {/* Image label - shown when collapsed */}
              <div className={`absolute bottom-6 left-1/2 -translate-x-1/2 transition-opacity duration-300 pointer-events-none ${
                expandedIndex === i ? 'opacity-0' : 'opacity-100'
              }`}>
                <span className="text-xs sm:text-sm font-black text-white/90 whitespace-nowrap tracking-[0.2em] drop-shadow-lg">IMAGE 0{i + 1}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Technical Footer */}
        <footer className="mt-12 sm:mt-16 md:mt-20 flex flex-col md:flex-row justify-between items-end gap-8 sm:gap-10">
          <div className="max-w-md">
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