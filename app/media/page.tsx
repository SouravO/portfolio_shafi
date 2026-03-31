"use client";
import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

// Palette: Obsidian, Titanium Gold, Royal Blue, Bone White
const SOCIAL_LINKS = [
  { id: 1, title: "X / TWITTER", color: "#000000", grad: "linear-gradient(135deg, #111 0%, #000 100%)", url: "https://x.com" },
  { id: 2, title: "INSTAGRAM", color: "#D4AF37", grad: "linear-gradient(135deg, #C5A059 0%, #F5E6AD 100%)", url: "https://www.instagram.com/shafishoukath?igsh=MTJsNGpjdXF0YTFmMg==" },
  { id: 3, title: "LINKEDIN", color: "#0077B5", grad: "linear-gradient(135deg, #00446A 0%, #0077B5 100%)", url: "https://www.linkedin.com/in/shafi-shoukath/" },
  { id: 4, title: "FACEBOOK", color: "#1877F2", grad: "linear-gradient(135deg, #0A4DA0 0%, #1877F2 100%)", url: "https://facebook.com" },
];

const iPhone17ProMaxSocial = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 70, damping: 25 });

  // 17 Pro Max Motion
  const rotateX = useTransform(smoothProgress, [0, 0.5], [30, 0]);
  const rotateY = useTransform(smoothProgress, [0, 0.5], [-15, 0]);
  const scale = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0.75, 1, 1, 5]);
  const phoneX = useTransform(smoothProgress, [0.7, 1], [0, -1000]);

  return (
    <div ref={containerRef} className="relative h-[800vh] bg-[#0a0a0a] overflow-clip">
      {/* LUXURY GRID */}
      <div className="fixed inset-0 z-0 opacity-10" 
           style={{ 
             backgroundImage: `linear-gradient(#C5A059 1px, transparent 1px), linear-gradient(90deg, #C5A059 1px, transparent 1px)`, 
             backgroundSize: '100px 100px' 
           }} 
      />

      <div className="sticky top-0 h-screen w-full flex items-center justify-center perspective-[1500px]">
        
        {/* BG ACCENT TEXT */}
        <motion.div 
          style={{ x: useTransform(smoothProgress, [0, 1], [200, -1200]) }}
          className="absolute top-20 left-0 whitespace-nowrap text-[20vh] font-black text-white/[0.03] select-none uppercase"
        >
          CONNECT WITH ME — LET'S CREATE TOGETHER — REACH OUT ANYTIME —
        </motion.div>

        {/* THE DEVICE: iPhone 17 Pro Max Simulation */}
        <motion.div
          style={{ rotateX, rotateY, scale, x: phoneX }}
          className="relative z-20 w-[360px] h-[780px] bg-[#1a1a1a] rounded-[55px] p-[2px] shadow-[0px_50px_100px_rgba(0,0,0,0.8)] border border-white/10"
        >
          {/* Inner Bezel (Ultra Thin) */}
          <div className="relative w-full h-full bg-[#fafafa] rounded-[52px] overflow-hidden flex flex-col border-[4px] border-[#0a0a0a]">
            
            {/* DYNAMIC ISLAND */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-7 bg-black rounded-full z-50 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-blue-500/20 ml-auto mr-4" />
            </div>

            {/* SCREEN HEADER */}
            <div className="pt-16 pb-8 px-8 bg-white">
              <div className="flex justify-between items-center mb-10">
                <div className="text-[10px] font-bold tracking-tighter text-black/30">12:00 PM</div>
                <div className="text-[10px] font-bold tracking-tighter text-black/30 italic">5G ULTRA</div>
              </div>
              <h2 className="text-5xl font-black tracking-tighter text-black">
                STAY <span className="text-[#C5A059]">GOLD.</span>
              </h2>
            </div>

            {/* SOCIAL LINKS STACK */}
            <div className="flex-1 px-5 space-y-3">
              {SOCIAL_LINKS.map((link, i) => {
                const y = useTransform(smoothProgress, [0.1 + (i * 0.08), 0.35 + (i * 0.08)], [400, 0]);
                const opacity = useTransform(smoothProgress, [0.1 + (i * 0.08), 0.3 + (i * 0.08)], [0, 1]);
                
                return (
                  <motion.a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ y, opacity, background: link.grad }}
                    className="block h-[72px] rounded-[24px] p-[1px] shadow-lg group hover:scale-[1.03] transition-transform duration-300"
                  >
                    <div className="w-full h-full bg-black/5 group-hover:bg-transparent rounded-[23px] flex items-center justify-between px-6">
                      <span className="text-white font-black text-xs tracking-[0.2em]">{link.title}</span>
                      <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white text-lg">
                        ↗
                      </div>
                    </div>
                  </motion.a>
                );
              })}
            </div>

            {/* ACTION FOOTER */}
            <motion.div 
              style={{ y: useTransform(smoothProgress, [0.55, 0.7], [200, 0]) }}
              className="p-6 bg-[#00446A] border-t border-white/10"
            >
              <button className="w-full py-4 bg-white text-[#00446A] rounded-2xl font-black text-sm tracking-widest uppercase hover:bg-[#C5A059] hover:text-white transition-colors">
                Contact Protocol
              </button>
            </motion.div>
          </div>
        </motion.div>

        {/* OVERLAY FORM REVEAL */}
        <motion.div 
          style={{ 
            opacity: useTransform(smoothProgress, [0.8, 0.95], [0, 1]),
            x: useTransform(smoothProgress, [0.85, 1], [200, 0])
          }}
          className="absolute right-[10%] max-w-xl w-full p-12 bg-white rounded-[30px] shadow-[0px_50px_100px_rgba(0,0,0,0.2)] border-b-[12px] border-[#C5A059]"
        >
          <div className="text-[#00446A] font-black text-xs tracking-[0.4em] mb-4 uppercase">Direct Line</div>
          <h3 className="text-7xl font-black mb-10 tracking-tighter text-black uppercase">Let's <span className="text-[#C5A059] italic">Talk</span></h3>
          
          <div className="space-y-8">
            <div className="border-b-2 border-black/5 focus-within:border-[#C5A059] transition-colors pb-2">
              <input className="w-full bg-transparent text-2xl font-bold outline-none placeholder:text-black/10" placeholder="IDENTITY" />
            </div>
            <div className="border-b-2 border-black/5 focus-within:border-[#C5A059] transition-colors pb-2">
              <input className="w-full bg-transparent text-2xl font-bold outline-none placeholder:text-black/10" placeholder="EMAIL_ADDR" />
            </div>
            <div className="border-b-2 border-black/5 focus-within:border-[#C5A059] transition-colors pb-2">
              <textarea className="w-full bg-transparent text-2xl font-bold outline-none h-24 resize-none placeholder:text-black/10" placeholder="ENVELOPE_DATA" />
            </div>
            
            <button className="w-full py-6 bg-black text-white font-black text-xl hover:bg-[#00446A] transition-all rounded-2xl uppercase tracking-tighter">
              Transmit Information
            </button>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default iPhone17ProMaxSocial;