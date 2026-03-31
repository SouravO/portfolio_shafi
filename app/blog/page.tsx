"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from 'framer-motion';
import { ArrowUpRight, X, Clock, Zap, ChevronRight, Filter, Search } from 'lucide-react';

const CATEGORIES = ["ALL", "DESIGN", "TECH", "ECO", "CULTURE", "SPORTS"];

const BLOG_POSTS = [
  { id: 1, title: "The Death of Flat Design", excerpt: "Why the industry is returning to tactile, high-contrast aesthetics.", content: "Flat design dominated for a decade, but the pendulum is swinging back. We are seeing a rise in Neo-Brutalism—a style that embraces raw honesty, visible grids, and 'ugly' but functional UI...", category: "DESIGN", color: "#2C518A", readTime: "5 min" },
  { id: 2, title: "Scroll as a Storyteller", excerpt: "Moving beyond verticality: how to map scroll progress to 3D transformations.", content: "Scroll-jacking used to be a sin. Now, with libraries like Framer Motion and Three.js, it's an art form. By mapping the 'scrollY' value to rotation, scale, or shaders...", category: "TECH", color: "#FF5E00", readTime: "8 min" },
  { id: 3, title: "AI Styling & Circular Fashion", excerpt: "The intersection of algorithmic curation and sustainable recycling.", content: "The future of fashion isn't new clothes—it's the intelligent redistribution of old ones. AI-driven styling engines can now scan a user's measurements...", category: "ECO", color: "#00E5FF", readTime: "6 min" },
  { id: 4, title: "Bengaluru: The Global Hub", excerpt: "How the silicon valley of India is evolving into a deep-tech powerhouse.", content: "Bengaluru has outgrown its 'outsourcing' label. Today, it is a breeding ground for deep-tech startups specializing in everything from space-tech to sports-analytics...", category: "CULTURE", color: "#7000FF", readTime: "4 min" },
  { id: 5, title: "Grassroots Football Tech", excerpt: "Using data to scout the next generation of legends in underserved regions.", content: "Talent is everywhere, but opportunity is not. New platforms are allowing young athletes in remote areas to upload their performance data directly to databases...", category: "SPORTS", color: "#00FF41", readTime: "7 min" }
];

export default function EliteBlogPage() {
  const [selectedPost, setSelectedPost] = useState(null);
  const [filter, setFilter] = useState("ALL");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const rotateValue = useTransform(scrollYProgress, [0, 1], [0, 360]);

  useEffect(() => {
    const handleMouseMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const filteredPosts = filter === "ALL" ? BLOG_POSTS : BLOG_POSTS.filter(p => p.category === filter);

  return (
    <div className="min-h-screen bg-white text-black selection:bg-black selection:text-white" style={{ fontFamily: "'Poppins', sans-serif" }}>
      
      {/* CUSTOM CURSOR - Follows user for that 'Premium' feel */}
      <motion.div 
        className="fixed top-0 left-0 w-8 h-8 border-2 border-black rounded-full pointer-events-none z-[999] hidden md:block"
        animate={{ x: mousePos.x - 16, y: mousePos.y - 16 }}
        transition={{ type: "spring", damping: 20, stiffness: 250, mass: 0.5 }}
      />

      {/* READING PROGRESS CIRCLE */}
      <div className="fixed bottom-10 right-10 z-50 hidden md:flex items-center justify-center">
        <svg className="w-20 h-20 rotate-[-90deg]">
          <circle cx="40" cy="40" r="35" stroke="currentColor" strokeWidth="2" fill="transparent" className="text-gray-100" />
          <motion.circle 
            cx="40" cy="40" r="35" stroke="currentColor" strokeWidth="2" fill="transparent"
            strokeDasharray="220"
            style={{ strokeDashoffset: useTransform(scrollYProgress, [0, 1], [220, 0]) }}
            className="text-black"
          />
        </svg>
        <motion.div style={{ rotate: rotateValue }} className="absolute">
          <Zap size={20} fill="black" />
        </motion.div>
      </div>

      {/* NAVIGATION */}
      <nav className="px-8 py-6 flex justify-between items-center sticky top-0 bg-white/80 backdrop-blur-xl z-[60] border-b border-black/5">
        <div className="flex items-center gap-4">
          <div className="bg-black text-white px-3 py-1 font-black text-xl tracking-tighter">B.</div>
          <span className="font-black text-xs tracking-[0.3em] uppercase">Archive_System</span>
        </div>
        <div className="flex items-center gap-8">
           <Search size={18} className="cursor-pointer hover:scale-110 transition-transform" />
           <div className="h-10 w-px bg-black/10 mx-2" />
           <button className="text-[10px] font-black tracking-widest border-2 border-black px-6 py-2 hover:bg-black hover:text-white transition-all">
             GET IN TOUCH
           </button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto pt-24 pb-40 px-6">
        {/* HERO SECTION */}
        <div className="mb-32">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h2 className="text-[12vw] md:text-[8vw] font-black leading-[0.8] tracking-tighter uppercase italic">
              Digital <br /> <span className="not-italic text-transparent" style={{ WebkitTextStroke: "1px black" }}>Logbook</span>
            </h2>
          </motion.div>
          
          {/* CATEGORY FILTERING */}
          <div className="mt-20 flex flex-wrap gap-4 items-center">
            <Filter size={14} className="mr-4" />
            {CATEGORIES.map(cat => (
              <button 
                key={cat}
                onClick={() => setFilter(cat)}
                className={`text-[10px] font-black tracking-widest px-6 py-2 transition-all ${filter === cat ? 'bg-black text-white' : 'bg-gray-50 hover:bg-gray-200'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* BLOG GRID - ASYMMETRICAL LAYOUT */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-24 md:gap-x-12">
          <AnimatePresence mode="popLayout">
            {filteredPosts.map((post, index) => (
              <motion.div
                key={post.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className={`${index % 3 === 0 ? 'md:col-span-8' : 'md:col-span-4'} group cursor-pointer`}
                onClick={() => setSelectedPost(post)}
              >
                <div className="relative overflow-hidden aspect-video md:aspect-auto md:h-[400px] bg-gray-50 border border-black/5 p-12 flex flex-col justify-end transition-all group-hover:shadow-[20px_20px_0px_rgba(0,0,0,0.03)]">
                  <div className="absolute top-8 left-8 text-[10px] font-black tracking-[0.3em] text-black/20">
                    ID: 0{post.id} // {post.readTime}
                  </div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: post.color }} />
                      <span className="text-[10px] font-bold tracking-widest uppercase opacity-40">{post.category}</span>
                    </div>
                    <h3 className="text-4xl md:text-5xl font-black tracking-tighter uppercase leading-none mb-6 transition-all group-hover:italic">
                      {post.title}
                    </h3>
                    <p className="text-sm font-medium text-black/50 max-w-md line-clamp-2">
                      {post.excerpt}
                    </p>
                  </div>

                  {/* Hover Arrow */}
                  <div className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity translate-x-4 group-hover:translate-x-0">
                    <ArrowUpRight size={32} />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </main>

      {/* FULL SCREEN MODAL WITH PARALLAX HEADER */}
      <AnimatePresence>
        {selectedPost && (
          <motion.div 
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 200 }}
            className="fixed inset-0 z-[100] bg-white overflow-y-auto px-6 py-20 md:px-20"
          >
            <button onClick={() => setSelectedPost(null)} className="fixed top-10 right-10 z-[110] p-4 bg-black text-white hover:rotate-90 transition-transform">
              <X size={24} />
            </button>

            <article className="max-w-4xl mx-auto">
              <div className="mb-20 text-center">
                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs font-black tracking-[0.5em] uppercase opacity-30">
                  {selectedPost.category} — {selectedPost.readTime} Read
                </motion.span>
                <h2 className="text-6xl md:text-[100px] font-black tracking-tighter uppercase leading-none mt-8 italic">
                  {selectedPost.title}
                </h2>
              </div>

              <div className="prose prose-xl prose-black mx-auto">
                <p className="text-2xl md:text-3xl font-bold leading-relaxed mb-12">
                  {selectedPost.content}
                </p>
                <div className="h-px w-full bg-black/10 my-12" />
                <p className="text-lg text-black/60 italic">
                  End of transmission. Captured in the Bengaluru tech cluster, March 2026.
                </p>
              </div>

              {/* NEXT POST SUGGESTION */}
              <div className="mt-40 border-t-2 border-black pt-12 flex justify-between items-end">
                <div>
                  <span className="text-[10px] font-black opacity-30 uppercase tracking-widest">Next Entry</span>
                  <h4 className="text-2xl font-black uppercase mt-2">The Future of Sports Analytics</h4>
                </div>
                <ChevronRight size={40} />
              </div>
            </article>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}