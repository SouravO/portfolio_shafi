"use client";
import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const CreativeStack = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // Fixed y offsets for consistent SSR hydration
  const yOffsets = [-400, 200, -100, 300, -200];

  // Section 1: Socials (Stays fixed then fades)
  const socialOpacity = useTransform(smoothProgress, [0, 0.4], [1, 0.3]);
  const socialScale = useTransform(smoothProgress, [0, 0.4], [1, 0.8]);
  const socialZ = useTransform(smoothProgress, [0, 0.29, 0.3, 0.4], [10, 10, 0, 0]);

  // Section 2: The Form (Slides up from bottom)
  const formY = useTransform(smoothProgress, [0.3, 0.6], ["100vh", "0vh"]);
  const formRotation = useTransform(smoothProgress, [0.3, 0.6], [10, 0]);
  const formZ = useTransform(smoothProgress, [0, 0.29, 0.3, 0.4], [0, 0, 10, 10]);

  // Section 3: The Quote (The "Gathering")
  const quoteOpacity = useTransform(smoothProgress, [0.8, 0.9], [0, 1]);

  return (
    <div ref={containerRef} className="relative h-[500vh] bg-[#000] text-white font-sans">
      
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        
        {/* PHASE 1: SOCIAL LINKS (The Background Layer) */}
        <motion.div 
          style={{ opacity: socialOpacity, scale: socialScale }}
          className="absolute inset-0 flex flex-col items-center justify-center space-y-4 px-6"
        >
          <p className="text-[10px] tracking-[0.5em] uppercase opacity-40 mb-8 z-100">Direct Connections</p>
          {[
            { name: 'LinkedIn', url: 'https://www.linkedin.com/in/shafi-shoukath/', color: 'text-blue-400 hover:text-blue-500' },
            { name: 'Instagram', url: 'https://www.instagram.com/shafishoukath/', color: 'text-pink-400 hover:text-pink-500' },
            { name: 'Facebook', url: 'https://www.facebook.com/', color: 'text-gray-100 hover:text-gray-200' },
            // { name: 'Behance', url: 'https://www.behance.net/shafi', color: 'text-cyan-400' },
          ].map((item, i) => (
            <motion.a
              key={item.name}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ x: -100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              className={`text-6xl md:text-8xl font-black italic hover:text-blue-500 transition-colors tracking-tighter ${item.color} z-100`}
            >
              {item.name.toUpperCase()}
            </motion.a>
          ))}
        </motion.div>

        {/* PHASE 2: CONTACT FORM (The Sliding Sheet) */}
        <motion.div 
          style={{ y: formY, rotate: formRotation }}
          className="absolute inset-0 bg-white text-black p-12 flex flex-col justify-center items-center shadow-[0_-50px_100px_rgba(0,0,0,0.5)]"
        >
          <div className="w-full max-w-2xl space-y-10">
            <h2 className="text-5xl font-black tracking-tighter uppercase">Drop a line.</h2>
            <div className="space-y-6">
                <input className="w-full border-b-2 border-black/10 py-4 text-2xl outline-none focus:border-black transition-colors placeholder:text-black/10" placeholder="YOUR NAME" />
                <input className="w-full border-b-2 border-black/10 py-4 text-2xl outline-none focus:border-black transition-colors placeholder:text-black/10" placeholder="YOUR EMAIL" />
                <textarea className="w-full border-b-2 border-black/10 py-4 text-2xl outline-none focus:border-black transition-colors h-32 resize-none placeholder:text-black/10" placeholder="THE PROJECT" />
                <button className="bg-black text-white px-12 py-6 text-xl font-bold uppercase tracking-widest hover:bg-blue-600 transition-colors">
                  Send Message
                </button>
            </div>
          </div>
        </motion.div>

        {/* PHASE 3: THE FINAL QUOTE (The Gathering) */}
        <motion.div 
          style={{ opacity: quoteOpacity }}
          className="absolute inset-0 z-50 bg-black flex items-center justify-center p-10"
        >
          <div className="flex flex-wrap justify-center gap-4 max-w-4xl">
            {"CREATIVITY IS INTELLIGENCE HAVING FUN".split(" ").map((word, i) => (
              <motion.span
                key={i}
                style={{
                  x: useTransform(smoothProgress, [0.85, 1], [i % 2 === 0 ? -1000 : 1000, 0]),
                  y: useTransform(smoothProgress, [0.85, 1], [yOffsets[i], 0]),
                }}
                className="text-4xl md:text-7xl font-black uppercase italic tracking-tighter text-white"
              >
                {word}
              </motion.span>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default CreativeStack;