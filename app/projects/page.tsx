"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { HardDrive, Fingerprint, Activity, Radio, Cpu, Shield, LucideIcon } from "lucide-react";

interface DataNode {
  id: string;
  label: string;
  value: string;
  icon: LucideIcon;
  color: string;
}

const DATA_NODES: DataNode[] = [
  { id: "01", label: "Bios_Init", value: "STABLE", icon: Fingerprint, color: "#ef4444" },
  { id: "02", label: "Sync_Freq", value: "432Hz", icon: Radio, color: "#06b6d4" },
  { id: "03", label: "Core_Load", value: "89.2%", icon: Cpu, color: "#eab308" },
  { id: "04", label: "Security", value: "ENCRYPTED", icon: Shield, color: "#22c55e" },
  { id: "05", label: "Uptime", value: "∞", icon: Activity, color: "#a855f7" },
];

export default function KineticDataStream() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  // Smooth the scroll movement
  const xTransform = useTransform(scrollYProgress, [0, 1], ["0%", "-70%"]);
  const x = useSpring(xTransform, { stiffness: 50, damping: 20 });

  return (
    <div ref={containerRef} className="h-[400vh] bg-[#050505] text-zinc-400 font-mono overflow-x-hidden">
      {/* Background Grid */}
      <div className="fixed inset-0 opacity-20 pointer-events-none" 
           style={{ backgroundImage: `linear-gradient(#18181b 1px, transparent 1px), linear-gradient(90deg, #18181b 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />

      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        {/* Main Scrolling Track */}
        <motion.div style={{ x }} className="flex gap-32 pl-[10vw] pr-[20vw] items-center">
          
          {/* Intro Header */}
          <section className="flex-shrink-0 w-[400px]">
            <span className="text-orange-500 text-xs font-bold tracking-[0.5em] uppercase block mb-4">
              Project_Hyperion
            </span>
            <h1 className="text-7xl font-black text-white tracking-tighter uppercase italic leading-none">
              Data<br/>Kinetic
            </h1>
            <p className="mt-6 text-sm leading-relaxed border-l-2 border-orange-500 pl-4">
              Horizontal stream visualization of localized neural clusters. 
              Scroll to scrub through the archive.
            </p>
          </section>

          {/* Dynamic Nodes */}
          {DATA_NODES.map((node, i) => (
            <DataCard key={node.id} node={node} index={i} />
          ))}

          {/* End Sequence */}
          <section className="flex-shrink-0 w-[500px] border-l border-white/10 pl-20">
            <div className="space-y-2">
              <div className="h-1 w-12 bg-white" />
              <h2 className="text-4xl font-bold text-white uppercase">System_End</h2>
              <p className="text-xs uppercase tracking-widest text-zinc-600">Session_Token: 88-X91</p>
            </div>
            <button className="mt-10 px-8 py-4 border border-zinc-700 hover:border-white text-white text-[10px] uppercase tracking-widest transition-colors">
              Request_Full_Access
            </button>
          </section>
        </motion.div>
      </div>

      {/* Progress HUD */}
      <div className="fixed bottom-12 left-12 right-12 flex justify-between items-end mix-blend-difference">
        <div className="text-[10px] font-bold">
          <span className="text-zinc-600">LOC:</span> 34.009 / -118.26
        </div>
        <div className="flex flex-col items-end gap-2">
           <div className="text-[10px] uppercase tracking-tighter">Stream_Velocity</div>
           <div className="w-64 h-[2px] bg-zinc-900 overflow-hidden">
              <motion.div 
                className="h-full bg-white origin-left"
                style={{ scaleX: scrollYProgress }}
              />
           </div>
        </div>
      </div>
    </div>
  );
}

interface DataCardProps {
  node: DataNode;
  index: number;
}

function DataCard({ node, index }: DataCardProps) {
  return (
    <div className="flex-shrink-0 group">
      <div className="relative">
        {/* Floating ID */}
        <span className="absolute -top-10 -left-4 text-[10px] text-zinc-600 font-bold italic">
          NODE_{node.id}
        </span>

        {/* Card Body */}
        <div className="w-80 h-[450px] bg-zinc-950 border border-white/5 p-8 flex flex-col justify-between group-hover:border-white/20 transition-colors">
          <div>
            <node.icon size={32} style={{ color: node.color }} strokeWidth={1.5} />
            <h3 className="mt-12 text-xs uppercase tracking-[0.3em] font-black text-zinc-500">
              {node.label}
            </h3>
            <div className="text-4xl font-bold text-white mt-2 tabular-nums">
              {node.value}
            </div>
          </div>

          <div className="space-y-4">
            <div className="h-px bg-zinc-900" />
            <div className="flex justify-between text-[9px] uppercase tracking-widest">
              <span>Status</span>
              <span className="text-white">Active</span>
            </div>
            <div className="flex justify-between text-[9px] uppercase tracking-widest">
              <span>Integrity</span>
              <span className="text-white">99.9%</span>
            </div>
          </div>
        </div>

        {/* Parallax Background Number */}
        <div className="absolute -bottom-12 -right-8 text-9xl font-black text-white/[0.03] select-none pointer-events-none group-hover:text-white/[0.06] transition-colors">
          {node.id}
        </div>
      </div>
    </div>
  );
}