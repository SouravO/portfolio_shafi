"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

// Raw SVG Paths for maximum reliability and performance
const ICONS = {
  Instagram: (props: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  ),
  Linkedin: (props: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" />
    </svg>
  ),
  Twitter: (props: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M22 4s-1 1-2 1a4.4 4.4 0 0 0-7 4v1C7.5 10 4 7 4 7s-1 4 2 6-3 1-3 1 1 3 4 4c-3 1-6 1-6 1a10 10 0 0 0 17-6V9.2s1-.8 2-1.2z" />
    </svg>
  ),
  Github: (props: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  ),
  ArrowUpRight: (props: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" />
    </svg>
  )
};

const SOCIAL_LINKS = [
  { name: "Instagram", icon: ICONS.Instagram, path: "https://instagram.com" },
  { name: "LinkedIn", icon: ICONS.Linkedin, path: "https://linkedin.com" },
  { name: "Twitter", icon: ICONS.Twitter, path: "https://twitter.com" },
  { name: "Github", icon: ICONS.Github, path: "https://github.com" },
];

const NAV_LINKS = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Projects", path: "/projects" },
  { name: "Gallery", path: "/gallery" },
  { name: "Store", path: "/store" },
  { name: "Blog", path: "/blog" },
  { name: "Contact", path: "/media" },
];

export default function Footer() {
  return (
    <footer className="relative bg-[#050505] text-white py-24 md:py-40 overflow-hidden border-t border-white/5 font-sans">
      {/* Background Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[#2C518A]/5 blur-[140px] pointer-events-none" />
      
      {/* Decorative Grid */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03]" 
        style={{ 
          backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', 
          backgroundSize: '60px 60px' 
        }} 
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-start">
          
          {/* 1. BRAND & VISION */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 space-y-12"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white text-black flex items-center justify-center font-black text-3xl shadow-[4px_4px_0px_#D4AF37]">
                S.
              </div>
              <div className="flex flex-col">
                <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-white/40 leading-none">Identity_Verified</span>
                <span className="font-mono text-xs tracking-[0.2em] uppercase mt-1 text-zinc-300">Shafi_Shoukath</span>
              </div>
            </div>

            <h3 className="text-4xl md:text-5xl font-light italic leading-[1.1] text-zinc-300">
              "The future belongs to those who don’t just <span className="font-black not-italic text-[#D4AF37]">participate</span> in systems — but <span className="font-black not-italic text-[#2C518A]">build</span> them."
            </h3>

            <div className="flex gap-4">
              {SOCIAL_LINKS.map((social) => (
                <a 
                  key={social.name} 
                  href={social.path} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-4 border border-white/10 rounded-none bg-white/5 hover:bg-white hover:text-black transition-all duration-500 group"
                >
                  <social.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* 2. NAVIGATION */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-3"
          >
            <span className="text-[10px] font-black text-[#D4AF37] uppercase tracking-[0.5em] block mb-12">
              Navigation
            </span>
            <ul className="space-y-5">
              {NAV_LINKS.map((link) => (
                <li key={link.path}>
                  <Link 
                    href={link.path} 
                    className="text-2xl font-black uppercase tracking-tighter text-zinc-600 hover:text-white transition-all flex items-center gap-3 group"
                  >
                    <span className="group-hover:text-[#D4AF37] transition-colors">{link.name}</span>
                    <ICONS.ArrowUpRight className="w-5 h-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* 3. CONTACT HUD */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-4 space-y-16"
          >
            <div>
              <span className="text-[10px] font-black text-[#D4AF37] uppercase tracking-[0.5em] block mb-10">
                Direct_Transmission
              </span>
              <a 
                href="mailto:hello@shafishoukath.com" 
                className="text-2xl md:text-3xl font-mono text-white hover:text-[#D4AF37] transition-colors break-all underline decoration-white/10 underline-offset-8 decoration-1"
              >
                hello@shafishoukath.com
              </a>
            </div>
            
            <div className="pt-12 border-t border-white/10">
              <span className="text-[10px] font-black text-[#2C518A] uppercase tracking-[0.5em] block mb-6">
                Establish_Connection
              </span>
              <button className="w-full group relative px-10 py-6 border border-white/20 hover:border-[#D4AF37] transition-all duration-700 overflow-hidden">
                <div className="absolute inset-0 bg-[#D4AF37] scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-bottom" />
                <div className="relative z-10 flex items-center justify-center gap-3">
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] group-hover:text-black">
                    Request_Full_Access_ [&#8984;]
                  </span>
                </div>
              </button>
            </div>
          </motion.div>
        </div>

        {/* 4. FOOTER STATUS */}
        
      </div>
    </footer>
  );
}