"use client";

import React, { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  AnimatePresence,
  useMotionValueEvent,
} from "framer-motion";
import Image from "next/image";

const WarpArchive = () => {
  const containerRef = useRef(null);
  const [index, setIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // High damping, low stiffness for that "heavy/expensive" liquid feel
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 25,
    restDelta: 0.001,
  });

  const xTranslate = useTransform(smoothProgress, [0, 1], ["0%", "-83.33%"]);

  const dossier = [
    {
      id: "01",
      tag: "VISION",
      title: "Structure / Talent",
      content:
        "Most economies struggle not from lack of talent, but from lack of structure. We architect the systems required for growth.",
      img: "/Shafi1.jpg",
      position: "object-[center_25%]", // Adjust the % to push it further down
    },
    {
      id: "02",
      tag: "ECOSYSTEM",
      title: "The Quad / Pillars",
      content:
        "Sustainable growth happens when Entrepreneurs, Startups, and Investors align within a single governance grid.",
      img: "/shafi2.heic",
      position: "object-[center_25%]", //
    },
    {
      id: "03",
      tag: "GLOBAL",
      title: "Beyond / Borders",
      content:
        "Talent and capital are no longer regional. We design ecosystems that connect innovation across nations.",
      img: "/shafi4.jpg",
      position: "object-center",


    },
    {
      id: "04",
      tag: "PRESENCE",
      title: "Global / Voice",
      content:
        "Engaging in dialogue and sharing ideas across forums to shape the future of systemic economic growth.",
      img: "/shafi3.jpg",
      position: "object-[center_15%]", 

    },
    {
      id: "05",
      tag: "INSIGHTS",
      title: "Future / Logic",
      content:
        "Clear thinking creates clarity in action. We define the long-term strategy for infrastructure thinking and execution.",
      img: "/shafi6.jpg",
      position: "object-[center_15%]", 

    },
    {
      id: "06",
      tag: "RESOURCES",
      title: "Builder / Assets",
      content:
        "A curated collection of playbooks designed for institutions and entrepreneurs building at scale.",
      img: "/shafi7.jpg",
      position: "object-center",
    },
  ];

  useMotionValueEvent(smoothProgress, "change", (latest) => {
    const newIndex = Math.min(
      Math.floor(latest * dossier.length),
      dossier.length - 1,
    );
    if (newIndex !== index) setIndex(newIndex);
  });

  return (
    <div
      ref={containerRef}
      className="relative h-[600vh] bg-[#050505] text-white font-sans selection:bg-[#D4AF37] selection:text-black overflow-clip"
    >
      {/* 1. PROGRESS HUD (TECHNICAL BARS) */}
      {/* <div className="fixed top-12 left-1/2 -translate-x-1/2 z-[100] flex items-end gap-3 h-8">
        {dossier.map((_, i) => (
          <motion.div
            key={i}
            animate={{
              height: index === i ? "100%" : "20%",
              backgroundColor:
                index === i ? "#D4AF37" : "rgba(255,255,255,0.1)",
            }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="w-[2px] rounded-full"
          />
        ))}
      </div> */}

      {/* 2. THE IMAGE PORTAL (THE "SMOOTH" ENGINE) */}
      <div className="fixed inset-0 flex flex-col items-center justify-center z-40 pointer-events-none">
        <div className="relative w-[85vw] md:w-[45vw] aspect-[16/10] overflow-hidden rounded-sm">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={index}
              initial={{
                opacity: 0,
                scale: 1.1,
                filter: "blur(20px) brightness(1.5)",
              }}
              animate={{
                opacity: 1,
                scale: 1,
                filter: "blur(0px) brightness(1)",
              }}
              exit={{
                opacity: 0,
                scale: 0.9,
                filter: "blur(20px) brightness(0.5)",
              }}
              transition={{
                duration: 1.2,
                ease: [0.22, 1, 0.36, 1], // Custom "Quintic" ease for silkiness
              }}
              className="absolute inset-0 border border-white/5 shadow-2xl"
            >
              <Image
                src={dossier[index].img}
                alt="Archive Focus"
                fill
                className={`object-cover grayscale contrast-[1.1] ${dossier[index].position || "object-center"}`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* 3. CONTENT BOX (STAGGERED TEXT) */}
        <div className="w-[85vw] md:w-[40vw] mt-12 text-center pointer-events-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial="initial"
              animate="animate"
              exit="exit"
              variants={{
                initial: { opacity: 0, y: 30 },
                animate: { opacity: 1, y: 0 },
                exit: { opacity: 0, y: -30 },
              }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-6"
            >
              <h2 className="text-5xl md:text-7xl font-serif italic tracking-tighter text-white">
                {dossier[index].title.split(" / ").join(" ")}
              </h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-xs md:text-sm font-light text-zinc-500 max-w-sm mx-auto uppercase tracking-[0.2em] leading-relaxed"
              >
                {dossier[index].content}
              </motion.p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* 4. BACKGROUND GHOST RAIL (SILKY HORIZONTAL) */}
      <div className="sticky top-0 h-screen w-full flex items-center z-10 opacity-[0.03]">
        <motion.div style={{ x: xTranslate }} className="flex h-full w-[600%]">
          {dossier.map((item) => (
            <div
              key={item.id}
              className="relative w-screen h-full flex items-center justify-center"
            >
              <span className="text-[40vw] font-black leading-none uppercase select-none outline-text italic">
                {item.tag}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      <style jsx>{`
        .outline-text {
          color: transparent;
          -webkit-text-stroke: 1px rgba(255, 255, 255, 0.5);
        }
      `}</style>
    </div>
  );
};

export default WarpArchive;
