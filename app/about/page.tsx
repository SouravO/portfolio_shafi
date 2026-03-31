"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";

const WarpArchive = () => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Low stiffness + High damping = Premium "Heavy" feel
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 30,
    restDelta: 0.001,
  });

  const dossier = [
    {
      id: "01",
      tag: "THE ORIGIN",
      title: "Architectural / Intent",
      content:
        "Founded on the belief that economies fail due to lack of structure, not talent. We are the engineers of the systems required for sovereign growth.",
      img: "/Shafi1.jpg",
      position: "object-[center_25%]",
    },
    {
      id: "02",
      tag: "THE MISSION",
      title: "The Unified / Grid",
      content:
        "Our purpose is alignment. We synchronize Entrepreneurs, Startups, and Investors into a single, high-performance governance framework.",
      img: "/shafi2.heic",
      position: "object-[center_25%]",
    },
    {
      id: "03",
      tag: "THE REACH",
      title: "Global / Footprint",
      content:
        "Innovation has no borders. We design the transnational infrastructure that allows capital and ideas to bypass regional limitations.",
      img: "/shafi4.JPG",
      position: "object-center",
    },
    {
      id: "04",
      tag: "THE VOICE",
      title: "Strategic / Authority",
      content:
        "Shaping the global discourse. We participate in high-level forums to redefine how systemic value is engineered for the future.",
      img: "/shafi3.jpg",
      position: "object-[center_15%]",
    },
    {
      id: "05",
      tag: "THE PHILOSOPHY",
      title: "Predictive / Logic",
      content:
        "Precision in thought is our core identity. We apply first-principles logic to architect long-term resilience for the modern world.",
      img: "/shafi6.jpg",
      position: "object-[center_15%]",
    },
    {
      id: "06",
      tag: "THE ARCHIVE",
      title: "Operational / Assets",
      content:
        "The cumulative intelligence of our work. A proprietary collection of blueprints designed for building at global scale.",
      img: "/shafi7.jpg",
      position: "object-center",
    },
  ];

  // Background Rail Movement
  const xTranslate = useTransform(smoothProgress, [0, 1], ["0%", "-83.33%"]);

  return (
    <div
      ref={containerRef}
      className="relative h-[200vh] bg-[#050505] text-white selection:bg-[#D4AF37] selection:text-black overflow-clip"
    >
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        
        {/* 1. GHOST RAIL (Background Text) */}
        <div className="absolute inset-0 flex items-center z-10">
          <motion.div style={{ x: xTranslate }} className="flex w-[600%]">
            {dossier.map((item) => (
              <div key={item.id} className="w-screen flex justify-center">
                <span className="text-[35vw] font-black outline-text italic uppercase opacity-[0.03]">
                  {item.tag}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* 2. CENTRAL PORTAL (Images & Text) */}
        <div className="relative z-40 flex flex-col items-center justify-center w-full">
          
          {/* IMAGE STACK - Dynamic Positioning Fixed */}
          <div className="relative w-[85vw] md:w-[45vw] aspect-[16/10] overflow-hidden rounded-sm bg-zinc-900 shadow-2xl border border-white/5">
            {dossier.map((item, i) => {
              const start = i / dossier.length;
              const end = (i + 1) / dossier.length;

              // Smooth interpolation for Image
              const opacity = useTransform(
                smoothProgress,
                [start - 0.08, start, end - 0.08, end],
                [0, 1, 1, 0]
              );
              const scale = useTransform(
                smoothProgress,
                [start - 0.08, start, end - 0.08, end],
                [1.1, 1, 1, 0.95]
              );

              return (
                <motion.div
                  key={`img-${item.id}`}
                  style={{ opacity, scale }}
                  className="absolute inset-0"
                >
                  <Image
                    src={item.img}
                    alt={item.title}
                    fill
                    // Applying item.position to fix the image alignment
                    className={`object-cover grayscale contrast-[1.1] ${item.position || "object-center"}`}
                    priority={i === 0}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                </motion.div>
              );
            })}
          </div>

          {/* TEXT STACK - Liquid Fading */}
          <div className="relative w-[85vw] md:w-[40vw] h-40 mt-12">
            {dossier.map((item, i) => {
              const start = i / dossier.length;
              const end = (i + 1) / dossier.length;

              // Smooth interpolation for Text
              const opacity = useTransform(
                smoothProgress,
                [start - 0.04, start, end - 0.04, end],
                [0, 1, 1, 0]
              );
              const y = useTransform(
                smoothProgress,
                [start - 0.04, start, end - 0.04, end],
                [15, 0, 0, -15]
              );

              return (
                <motion.div
                  key={`text-${item.id}`}
                  style={{ opacity, y }}
                  className="absolute inset-0 flex flex-col items-center text-center pointer-events-none"
                >
                  <h2 className="text-4xl md:text-6xl font-serif italic tracking-tighter text-white mb-4">
                    {item.title.replace(" / ", " ")}
                  </h2>
                  <p className="text-xs md:text-sm font-light text-zinc-400 max-w-sm uppercase tracking-[0.2em] leading-relaxed">
                    {item.content}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      <style jsx>{`
        .outline-text {
          color: transparent;
          -webkit-text-stroke: 1px rgba(255, 255, 255, 1);
        }
      `}</style>
    </div>
  );
};

export default WarpArchive;