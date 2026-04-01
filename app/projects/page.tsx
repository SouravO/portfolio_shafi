"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface Project {
  id: number;
  title: string;
  code: string;
  img: string;
  purpose: string;
  approach: string;
  impact: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Startup Park",
    code: "ARCH_SP_01",
    img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200",
    purpose:
      "A physical infrastructure ecosystem bringing together entrepreneurs, startups, and opportunities into one integrated environment.",
    approach:
      "Establishing a physical hub where architectural logic meets venture execution.",
    impact:
      "Serving as the primary engine for cross-border collaboration and synchronized growth.",
  },
  {
    id: 2,
    title: "Incubenation",
    code: "ARCH_IN_02",
    img: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200",
    purpose:
      "A structured platform designed to transform ideas into execution-ready startups through mentorship, systems, and strategic guidance.",
    approach:
      "Mentorship, strategic guidance, and system-driven development frameworks.",
    impact:
      "Accelerating the journey from conceptual raw data to institutional-grade execution.",
  },
  {
    id: 3,
    title: "Global Initiatives",
    code: "ARCH_GI_03",
    img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200",
    purpose:
      "Collaborations and strategic engagements focused on enabling innovation, infrastructure, and economic development across regions.",
    approach:
      "Applying modular logic to complex jurisdictional and technical challenges.",
    impact:
      "Creating defensive moats and growth pipelines for the next generation of founders.",
  },
];

const SlitSection = ({
  project,
  index,
}: {
  project: Project;
  index: number;
}) => {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "start start"],
  });

  const clipPath = useTransform(
    scrollYProgress,
    [0, 1],
    ["inset(0% 100% 0% 0%)", "inset(0% 0% 0% 0%)"],
  );

  const xOffset = useTransform(scrollYProgress, [0, 1], ["20%", "0%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.2, 1]);

  return (
    <section
      ref={container}
      className="h-screen w-full sticky top-0 overflow-hidden bg-black"
    >
      <motion.div
        style={{ clipPath }}
        className="absolute inset-0 z-10 overflow-hidden"
      >
        <motion.div
          style={{ x: xOffset, scale }}
          className="relative h-full w-full"
        >
          <img
            src={project.img}
            className="h-full w-full object-cover brightness-50"
            alt={project.title}
          />

          <div className="absolute inset-0 p-12 md:p-24 flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <p className="text-[#D4AF37] font-mono text-xs tracking-widest uppercase">
                  ID://{project.code}
                </p>
                <h2 className="text-white text-7xl md:text-[10rem] font-black leading-none tracking-tighter italic uppercase">
                  {project.title}
                </h2>
              </div>
              <span className="text-white/20 font-mono text-4xl">
                0{index + 1}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-end">
              <div className="space-y-4">
                <span className="text-[10px] font-black text-[#D4AF37] uppercase tracking-[0.3em]">
                  Purpose
                </span>
                <p className="text-white/60 text-sm leading-relaxed font-light">
                  {project.purpose}
                </p>
              </div>
              <div className="space-y-4">
                <span className="text-[10px] font-black text-[#D4AF37] uppercase tracking-[0.3em]">
                  Approach
                </span>
                <p className="text-white/60 text-sm leading-relaxed font-light">
                  {project.approach}
                </p>
              </div>
              <div className="space-y-4">
                <span className="text-[10px] font-black text-[#D4AF37] uppercase tracking-[0.3em]">
                  Impact
                </span>
                <p className="text-white/60 text-sm leading-relaxed font-light">
                  {project.impact}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <div className="absolute inset-0 bg-zinc-900 flex items-center justify-center opacity-20">
        <span className="text-white font-mono text-[20vw] font-black">
          LOADING
        </span>
      </div>
    </section>
  );
};

export default function SlitScanGallery() {
  return (
    <div className="bg-black">
      <div className="fixed inset-0 z-50 pointer-events-none opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />

      {/* Decorative header - not a nav, just visual */}
      <div className="fixed top-8 left-8 right-8 flex justify-between z-[60] mix-blend-difference pointer-events-none">
        <div className="font-black text-white text-xl tracking-tighter">
          PROJECT_LOG
        </div>
        <div className="hidden md:flex gap-12 text-white/50 font-mono text-[10px] uppercase tracking-[0.3em]">
          <span>Archive_2026</span>
          <span>Status: Secure</span>
        </div>
      </div>

      <main className="relative">
        {projects.map((p, i) => (
          <SlitSection key={p.id} project={p} index={i} />
        ))}
      </main>
    </div>
  );
}