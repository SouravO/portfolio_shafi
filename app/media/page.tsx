"use client";
import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

// --- SYSTEM-GRADE SVG SET ---
const Icons = {
  User: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  Mail: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>,
  ArrowUp: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="m5 12 7-7 7 7M12 19V5"/></svg>,
  Zap: () => <svg width="14" height="14" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="currentColor"><path d="M13 2 L3 14 L12 14 L11 22 L21 10 L12 10 L13 2 Z"/></svg>
};

interface SocialNode {
  id: number;
  label: string;
  sub: string;
  color: string;
}

const SOCIAL_NODES: SocialNode[] = [
  { id: 1, label: 'INSTAGRAM', sub: 'Visual Feed', color: '#00E5FF' },
  { id: 2, label: 'LINKEDIN', sub: 'Professional', color: '#2C518A' },
  { id: 3, label: 'GITHUB', sub: 'Source Code', color: '#FFFFFF' },
  { id: 4, label: 'TWITTER', sub: 'Dev Logs', color: '#FF5E00' },
];

const IPhoneCinematicContact = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smooth = useSpring(scrollYProgress, { stiffness: 50, damping: 25 });

  // MOBILE SCREEN ANIMATIONS
  const scale = useTransform(smooth, [0, 0.4, 0.6, 1], [0.9, 1.6, 1.6, 1.1]);
  const rotateY = useTransform(smooth, [0, 0.5, 1], [-10, 0, 10]);
  const opacity = useTransform(smooth, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);

  return (
    <div ref={containerRef} className="relative h-[650vh] bg-[#020202] text-white overflow-clip selection:bg-blue-500/50">
      
      {/* 1. LAYOUT SPLIT: LEFT (SCROLL) | RIGHT (FIXED) */}
      <div className="fixed inset-0 flex">
        
        {/* LEFT ZONE: SCROLLABLE PHONE AREA */}
        <div className="w-1/2 h-full relative flex items-center justify-center perspective-[2000px] border-r border-white/5 bg-[radial-gradient(circle_at_center,#0a0a0a_0%,transparent_100%)]">
          <motion.div
            style={{ scale, rotateY, opacity, transformStyle: "preserve-3d" }}
            className="relative w-[320px] h-[660px] md:w-[380px] md:h-[780px]"
          >
            {/* Chassis */}
            <div className="absolute inset-0 bg-[#111] rounded-[54px] p-[2px] shadow-2xl ring-1 ring-white/10">
              <div className="w-full h-full bg-black rounded-[52px] overflow-hidden relative">
                
                {/* Internal UI */}
                <div className="h-full w-full bg-[#050505] pt-16 px-8">
                  <header className="mb-10">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                      <span className="text-[9px] font-mono tracking-[0.4em] text-zinc-500 uppercase">Input_Sequence</span>
                    </div>
                    <h2 className="text-3xl font-black italic tracking-tighter uppercase leading-none">Initialize<br/>Link.</h2>
                  </header>

                  <div className="space-y-3">
                    <SystemField placeholder="Operator_ID" icon={<Icons.User />} />
                    <SystemField placeholder="Return_Channel" icon={<Icons.Mail />} />
                    <textarea 
                      placeholder="Enter transmission..."
                      className="w-full bg-white/[0.03] border border-white/5 rounded-[28px] p-6 text-xs text-white focus:bg-white/[0.06] focus:border-blue-500/30 outline-none min-h-[200px] resize-none transition-all placeholder:text-zinc-800 font-mono"
                    />
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      className="w-full bg-blue-600 text-white py-5 rounded-full font-black text-[10px] tracking-[0.3em] uppercase flex items-center justify-center gap-3 shadow-[0_15px_30px_-10px_rgba(37,99,235,0.5)] transition-all hover:bg-white hover:text-black"
                    >
                      SEND_PACKET <Icons.ArrowUp />
                    </motion.button>
                  </div>
                </div>

                {/* Dynamic Island */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-[110px] h-[32px] bg-black rounded-full z-50 border border-white/5" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* RIGHT ZONE: FIXED SOCIAL TERMINAL (NO SCROLL) */}
        <div className="w-1/2 h-full hidden lg:flex flex-col justify-center items-center gap-4 bg-[#030303] p-12">
           <div className="absolute top-12 right-12 text-right opacity-20">
             <p className="text-[10px] font-mono tracking-widest uppercase">System_Link_Static</p>
             <p className="text-[10px] font-mono text-blue-500 uppercase">Muhammed_Nawaf</p>
           </div>

           <div className="w-full max-w-sm space-y-3">
             {SOCIAL_NODES.map((node) => (
                <FixedLinkCard key={node.id} node={node} />
             ))}
           </div>

           <div className="absolute bottom-12 right-12 opacity-10 grayscale pointer-events-none">
              <div className="w-40 h-40 border border-white/20 rounded-full flex items-center justify-center animate-spin-slow">
                <div className="w-32 h-32 border-t border-white/40 rounded-full" />
              </div>
           </div>
        </div>

      </div>

      {/* BACKGROUND GRID (Only on left side) */}
      <div className="fixed top-0 left-0 w-1/2 h-full pointer-events-none opacity-20 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

    </div>
  );
};

// --- SUB-COMPONENTS ---

interface SystemFieldProps {
  placeholder: string;
  icon: React.ReactNode;
}

const SystemField = ({ placeholder, icon }: SystemFieldProps) => (
  <div className="relative group">
    <div className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-700 group-focus-within:text-blue-500 transition-colors">
      {icon}
    </div>
    <input 
      type="text" 
      placeholder={placeholder}
      className="w-full bg-white/[0.03] border border-white/5 rounded-full py-5 pl-14 pr-8 text-xs text-white focus:bg-white/[0.06] focus:border-blue-500/20 outline-none transition-all placeholder:text-zinc-800 font-medium"
    />
  </div>
);

interface FixedLinkCardProps {
  node: SocialNode;
}

const FixedLinkCard = ({ node }: FixedLinkCardProps) => (
  <motion.div 
    whileHover={{ x: 10, backgroundColor: "rgba(255,255,255,0.05)" }}
    className="group flex items-center justify-between p-6 bg-white/[0.02] border border-white/5 rounded-[32px] cursor-pointer transition-all relative overflow-hidden"
  >
    {/* Heartbeat Background Glow */}
    <motion.div 
      animate={{ opacity: [0.1, 0.3, 0.1] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent" 
    />
    
    <div className="flex items-center gap-5 relative z-10">
      <div 
        className="w-12 h-12 rounded-2xl bg-black border border-white/10 flex items-center justify-center text-zinc-600 group-hover:text-white transition-all shadow-inner"
        style={{ color: node.color }}
      >
        <Icons.Zap />
      </div>
      <div>
        <p className="text-[12px] font-black text-white tracking-widest uppercase mb-1 leading-none group-hover:text-blue-400 transition-colors">{node.label}</p>
        <p className="text-[10px] font-mono text-zinc-600 tracking-tighter uppercase">{node.sub}</p>
      </div>
    </div>

    <div className="flex items-center gap-3 relative z-10">
       <div 
         className="w-1.5 h-1.5 rounded-full shadow-lg" 
         style={{ backgroundColor: node.color, boxShadow: `0 0 10px ${node.color}` }}
       />
    </div>
  </motion.div>
);

export default IPhoneCinematicContact;