"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";

const dossier = [
  { id: "01", tag: "INTRODUCTION", title: "VENTURE\nBUILDER", content: "I build ventures that solve real problems faced by entrepreneurs, startups, investors, and governments. My mission is to create an environment where thousands of startups rise, contribute to the economy, help investors achieve success, enable governments to fast-track development, and improve everyday life for citizens.", img: "/Shafi1.jpg" },
  { id: "02", tag: "CORE_PILLARS", title: "PROBLEM-FIRST\nAPPROACH", content: "Diagnose deeply, design precisely, execute effectively.", img: "/shafi2.heic" },
  { id: "03", tag: "CORE_PILLARS", title: "PRIVATE ECOSYSTEM\nBUILDING", content: "Independent, impact-driven, and stakeholder-focused.", img: "/shafi4.JPG" },
  { id: "04", tag: "CORE_PILLARS", title: "CROSS-STAKEHOLDER\nIMPACT", content: "From founders to policymakers.", img: "/shafi3.jpg" },
  { id: "05", tag: "PERSONAL_BACKGROUND", title: "RURAL ROOTS\nTO GLOBAL IMPACT", content: "Raised in a rural village in Kerala, I started my first venture with no access to practical startup guidance, funding pathways, or the right networks. Speaking with other entrepreneurs, I realised this was not my story alone — it was a systemic gap.", img: "/shafi6.jpg" },
  { id: "06", tag: "MISSION", title: "SUSTAINABLE\nECOSYSTEM", content: "To build a privately held startup ecosystem where real problems are met with real solutions, and where execution leads to measurable outcomes.", img: "/shafi7.jpg" },
];

const ApertureArchive = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 40, damping: 25 });

  return (
    <div ref={containerRef} className="relative h-[600vh] bg-[#080808] text-white font-sans selection:bg-white selection:text-black">
      <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden px-6 md:px-20">
        
        {/* LEFT: THE APERTURE (Masked Image) */}
        <div className="relative w-full md:w-1/2 aspect-square md:aspect-[4/5] overflow-hidden group">
          {dossier.map((item, i) => {
            const start = i / dossier.length;
            const end = (i + 1) / dossier.length;
            
            // Image reveal clip-path animation
            const clipPath = useTransform(
              smoothProgress,
              [start - 0.05, start, end - 0.05, end],
              ["inset(100% 0 0 0)", "inset(0% 0 0 0)", "inset(0% 0 0 0)", "inset(0 0 100% 0)"]
            );

            return (
              <motion.div
                key={`img-${item.id}`}
                style={{ clipPath, zIndex: dossier.length - i }}
                className="absolute inset-0"
              >
                <Image
                  src={item.img}
                  alt={item.title}
                  fill
                  className="object-cover grayscale brightness-75 contrast-125"
                />
                {/* HUD Overlay for image */}
                <div className="absolute inset-0 border-[0.5px] border-white/20 m-4 flex flex-col justify-between p-4 pointer-events-none">
                  <span className="text-[10px] font-mono opacity-40">IMG_REF_{item.id}</span>
                  <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* RIGHT: THE DATAFEED (Text) */}
        <div className="absolute md:relative right-6 md:right-0 md:w-1/2 h-full flex flex-col justify-center pl-0 md:pl-20 z-50">
          {dossier.map((item, i) => {
            const start = i / dossier.length;
            const end = (i + 1) / dossier.length;

            const opacity = useTransform(smoothProgress, [start, start + 0.05, end - 0.05, end], [0, 1, 1, 0]);
            const x = useTransform(smoothProgress, [start, start + 0.05], [50, 0]);

            return (
              <motion.div
                key={`text-${item.id}`}
                style={{ opacity, x, pointerEvents: "none" }}
                className="absolute flex flex-col items-start gap-4"
              >
                <div className="flex items-center gap-3">
                  <div className="h-[1px] w-8 bg-white" />
                  <span className="font-mono text-[11px] tracking-[0.4em] uppercase text-zinc-500">
                    {item.tag}
                  </span>
                </div>
                
                <h2 className="text-5xl md:text-8xl font-black tracking-[calc(-0.05em)] leading-[0.85] whitespace-pre-line uppercase">
                  {item.title}
                </h2>
                
                <div className="max-w-xs space-y-4 pt-6">
                  <p className="text-sm font-medium text-zinc-400 leading-relaxed uppercase tracking-wider">
                    {item.content}
                  </p>
                  <div className="flex gap-2 text-[10px] font-mono text-zinc-600">
                    <span>STATUS: ACTIVE</span>
                    <span>/</span>
                    <span>LOC: GLOBAL_GRID</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* PERIPHERAL UI (The "Glass" Frame) */}
        <div className="fixed inset-0 border-[1rem] border-[#080808] z-[100] pointer-events-none" />
        <div className="fixed bottom-10 left-10 text-[10px] font-mono tracking-widest text-zinc-700 z-[101]">
          ARCHIVE_SYSTEM_V.02 // {new Date().getFullYear()}
        </div>
      </div>
    </div>
  );
};

export default ApertureArchive;