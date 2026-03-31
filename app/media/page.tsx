"use client";
import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Briefcase, Share2, Camera } from 'lucide-react';

const CONTACT_CARDS = [
  { id: 1, title: "SOCIALS", content: "LinkedIn / X / Instagram", color: "#f4f4f5", text: "#18181b" },
  { id: 2, title: "LOCATION", content: "Bengaluru, India (IST)", color: "#18181b", text: "#ffffff" },
  { id: 3, title: "STATUS", content: "Available for Q3 2026", color: "#dcfce7", text: "#166534" },
];

const StackedContact = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <div ref={containerRef} className="relative h-[400vh] bg-[#0a0a0a]">
      
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        
        {/* BACKGROUND TITLE */}
        <motion.h2 
          style={{ opacity: useTransform(scrollYProgress, [0, 0.2], [1, 0.2]) }}
          className="absolute top-20 text-[12vw] font-black text-white/5 tracking-tighter select-none"
        >
          CONTACT
        </motion.h2>

        <div className="relative w-full max-w-lg h-[500px] perspective-[1000px]">
          
          {/* THE DECK OF INFO CARDS */}
          {CONTACT_CARDS.map((card, i) => {
            // Cards fly away at different scroll points
            const start = i * 0.2;
            const end = start + 0.2;
            
            const x = useTransform(scrollYProgress, [start, end], [0, i % 2 === 0 ? -1000 : 1000]);
            const rotate = useTransform(scrollYProgress, [start, end], [i * 2 - 2, i % 2 === 0 ? -45 : 45]);
            const opacity = useTransform(scrollYProgress, [start, end], [1, 0]);

            return (
              <motion.div
                key={card.id}
                style={{ x, rotate, opacity, backgroundColor: card.color, zIndex: 50 - i }}
                className="absolute inset-0 rounded-[40px] p-12 shadow-2xl flex flex-col justify-between border border-white/10"
              >
                <span style={{ color: card.text }} className="font-mono text-sm font-bold tracking-[0.3em]">{card.title}</span>
                {card.id === 1 ? (
                  <div className="flex gap-4 justify-center items-center">
                    <a 
                      href="https://www.linkedin.com/in/shafi-shoukath/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-3 rounded-full border-2 hover:bg-black/10 transition-all hover:scale-110 active:scale-95"
                      style={{ borderColor: card.text }}
                      title="LinkedIn"
                    >
                      <Briefcase size={24} style={{ color: card.text }} />
                    </a>
                    <a 
                      href="https://twitter.com/shafishoukath" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-3 rounded-full border-2 hover:bg-black/10 transition-all hover:scale-110 active:scale-95"
                      style={{ borderColor: card.text }}
                      title="X / Twitter"
                    >
                      <Share2 size={24} style={{ color: card.text }} />
                    </a>
                    <a 
                      href="https://www.instagram.com/shafishoukath?igsh=MTJsNGpjdXF0YTFmMg==" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-3 rounded-full border-2 hover:bg-black/10 transition-all hover:scale-110 active:scale-95"
                      style={{ borderColor: card.text }}
                      title="Instagram"
                    >
                      <Camera size={24} style={{ color: card.text }} />
                    </a>
                  </div>
                ) : (
                  <p style={{ color: card.text }} className="text-4xl font-bold leading-tight tracking-tighter">{card.content}</p>
                )}
              </motion.div>
            );
          })}

          {/* THE FINAL FORM (Always at the bottom of the stack) */}
          <motion.div 
            style={{ 
              scale: useTransform(scrollYProgress, [0.4, 0.8], [0.9, 1]),
            }}
            className="absolute inset-0 bg-white rounded-[40px] p-10 shadow-inner flex flex-col"
          >
            <div className="mb-8">
                <h3 className="text-3xl font-black text-black tracking-tighter">Send a Message</h3>
                <div className="h-1 w-12 bg-black mt-2" />
            </div>

            <div className="space-y-5 flex-1">
                <div className="space-y-1">
                    <p className="text-[10px] font-bold text-black/40 uppercase">Identify</p>
                    <input className="w-full bg-transparent border-b border-black/10 py-1 outline-none focus:border-black transition-colors" placeholder="Your Name" />
                </div>
                <div className="space-y-1">
                    <p className="text-[10px] font-bold text-black/40 uppercase">Reach</p>
                    <input className="w-full bg-transparent border-b border-black/10 py-1 outline-none focus:border-black transition-colors" placeholder="Email Address" />
                </div>
                <div className="space-y-1">
                    <p className="text-[10px] font-bold text-black/40 uppercase">Brief</p>
                    <textarea className="w-full bg-transparent border-b border-black/10 py-1 outline-none focus:border-black transition-colors h-20 resize-none" placeholder="How can I help?" />
                </div>
            </div>

            <button className="mt-6 w-full py-5 bg-black text-white rounded-2xl font-bold hover:bg-[#222] transition-colors active:scale-[0.98]">
                Submit Inquiry
            </button>
          </motion.div>

        </div>

        {/* BOTTOM NAV HINT */}
        <motion.div 
          style={{ opacity: useTransform(scrollYProgress, [0, 0.1], [1, 0]) }}
          className="absolute bottom-10 flex flex-col items-center gap-2"
        >
          <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent" />
          <span className="text-white/30 text-[10px] font-bold tracking-[0.4em] uppercase">Clear the cards</span>
        </motion.div>
      </div>
    </div>
  );
};

export default StackedContact;