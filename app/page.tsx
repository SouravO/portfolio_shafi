"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
} from "framer-motion";
import { Cpu, Zap, Layers, Globe, ArrowUpRight } from "lucide-react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
// lightweight drei imports not required for the small torus

function RotatingTorus() {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.x = clock.getElapsedTime() * 0.2;
      ref.current.rotation.y = clock.getElapsedTime() * 0.4;
    }
  });

  return (
    <mesh ref={ref} position={[0, 0, 0]}>
      <torusKnotGeometry args={[0.6, 0.25, 128, 16]} />
      <meshStandardMaterial color="#2C518A" metalness={0.6} roughness={0.2} />
    </mesh>
  );
}

export default function GalleryCutHome() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const pillarIcons = [Cpu, Globe, Layers, Zap];

  // EXISTING ANIMATIONS
  const leftPanelX = useTransform(smoothProgress, [0, 0.15], ["0%", "-100%"]);
  const rightPanelX = useTransform(smoothProgress, [0, 0.15], ["0%", "100%"]);
  const textOpacity = useTransform(smoothProgress, [0.02, 0.1], [1, 0]);
  const textScale = useTransform(smoothProgress, [0, 0.15], [1, 1.1]);
  const imageScale = useTransform(smoothProgress, [0.1, 0.4], [0.85, 1.15]);
  const imageBlur = useTransform(
    smoothProgress,
    [0.4, 0.6],
    ["blur(0px)", "blur(40px)"],
  );
  const scrollLineY = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  return (
    <main
      ref={containerRef}
      className="relative bg-[#F9F9F9] overflow-x-hidden selection:bg-[#2C518A] selection:text-white"
    >
      {/* --- INFRASTRUCTURE: THE GLOBAL GRID --- */}
      <div
        className="fixed inset-0 z-[1] pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* --- INFRASTRUCTURE: SCANNER LINE --- */}
    

      {/* --- LAYER 1: THE FIXED HERO --- */}
      <section className="fixed top-0 left-0 w-full h-screen z-0 bg-white overflow-hidden">
        <motion.div
          style={{ scale: imageScale, filter: imageBlur }}
          className="relative h-full w-full flex items-center justify-center p-20 pt-32"
        >
          <div className="relative h-full w-full max-w-4xl grayscale contrast-[1.1]">
            <Image
              src="/shafi.png"
              alt="Shafi Shoukath"
              fill
              className="object-contain object-bottom"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white/40 to-transparent pointer-events-none" />
          </div>
        </motion.div>
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-[15%] right-[10%] h-96 w-96 rounded-full bg-[#D4AF37] blur-[140px] pointer-events-none"
        />

        {/* Small 3D element (rotating torus) for depth */}

      </section>

      {/* --- LAYER 2: SPLITTING PANELS & UI HUD --- */}
      <div className="fixed top-0 left-0 w-full h-screen z-20 flex pointer-events-none">
        <motion.div
          style={{ x: leftPanelX }}
          className="relative h-full w-1/2 bg-white border-r border-zinc-100"
        >
          <div className="absolute top-28 left-10 flex flex-col gap-1 opacity-40">
            <span className="text-[8px] font-black text-black uppercase">
              LAT: 12.9716° N
            </span>
            <span className="text-[8px] font-black text-black uppercase">
              LNG: 77.5946° E
            </span>
          </div>
        </motion.div>

        <motion.div
          style={{ x: rightPanelX }}
          className="relative h-full w-1/2 bg-white border-l border-zinc-100"
        >
          <div className="absolute bottom-10 right-10 flex flex-col items-end gap-2 opacity-40">
            <span className="text-[8px] font-black text-[#2C518A] tracking-[0.3em] uppercase italic">
              System_Auth: Admin_X
            </span>
          </div>
        </motion.div>

        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            style={{ opacity: textOpacity, scale: textScale }}
            className="flex flex-col items-center"
          >
            <h1 className="text-[12vw] font-thin uppercase text-black leading-[0.7] tracking-[-0.05em] mb-4">
              Shafi
            </h1>
            <div className="flex items-center gap-6 w-full px-12">
              <div className="h-[1px] flex-1 bg-zinc-200" />
              <span className="text-[10px] font-black tracking-[1.2em] text-[#D4AF37] uppercase">
                Architect
              </span>
              <div className="h-[1px] flex-1 bg-zinc-200" />
            </div>
            <h1 className="text-[12vw] font-black uppercase text-black leading-[0.7] tracking-tighter mt-4">
              Shoukath
            </h1>
          </motion.div>
        </div>
      </div>

      {/* --- SPACER FOR SPLIT EFFECT --- */}
      <div className="h-[120vh]" />

      {/* --- SECTION 2: POSITIONING (KINETIC TYPOGRAPHY) --- */}
      <section className="relative z-30 bg-black text-white py-40 overflow-hidden">
        <div className="max-w-7xl mx-auto px-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="space-y-32"
          >
            <div className="flex flex-col md:flex-row items-end gap-10">
              <h2 className="text-7xl md:text-9xl font-black uppercase leading-[0.8] tracking-tighter">
                Not Just <br /> Building <br />{" "}
                <span className="text-[#D4AF37]">Businesses.</span>
              </h2>
              <p className="text-xl md:text-2xl font-light text-zinc-400 max-w-md pb-4 italic">
                — Building systems that enable thousands of businesses to
                thrive.
              </p>
            </div>

            <div className="flex flex-col md:flex-row-reverse items-end gap-10">
              <h2 className="text-7xl md:text-9xl font-black uppercase leading-[0.8] tracking-tighter text-right">
                Designing <br />{" "}
                <span className="text-[#2C518A]">Ecosystems</span> <br />{" "}
                Multiply.
              </h2>
              <p className="text-xl md:text-2xl font-light text-zinc-400 max-w-sm pb-4 italic text-right">
                — Where opportunities aren't created, they are engineered to
                multiply.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- SECTION 3: CORE PILLARS (INTERACTIVE GRID) --- */}
      <section className="relative z-30 bg-white py-40 border-y border-zinc-100">
        <div className="max-w-7xl mx-auto px-10">
          <div className="mb-20">
            <span className="text-[10px] font-black text-[#D4AF37] uppercase tracking-[1em]">
              The_Framework
            </span>
            <h3 className="text-6xl font-black uppercase mt-4">
              Global Scale Infrastructure
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-zinc-200">
            {["Entrepreneurs", "Startups", "Investors", "Governments"].map(
              (title, i) => {
                const Icon = pillarIcons[i];
                return (
                  <motion.div
                    key={title}
                    whileHover={{ scale: 1.03 }}
                    transition={{ type: "spring", stiffness: 120 }}
                    className="bg-white/40 backdrop-blur-sm p-12 group transition-all cursor-pointer hover:shadow-lg"
                  >
                    <div className="flex items-center gap-4">
                      <Icon size={28} className="text-[#2C518A]" />
                      <span className="text-xs font-mono text-[#2C518A]">
                        0{i + 1} //
                      </span>
                    </div>
                    <h4 className="text-3xl font-black uppercase mt-6 mb-4">
                      {title}
                    </h4>
                    <div className="w-0 group-hover:w-full h-[2px] bg-[#D4AF37] transition-all duration-500 mb-6" />
                    <p className="text-sm text-zinc-500 leading-relaxed">
                      Unified framework designed to accelerate growth and bridge
                      jurisdictional gaps.
                    </p>
                  </motion.div>
                );
              },
            )}
          </div>
        </div>
      </section>

      {/* --- SECTION 4: FEATURED PROJECTS (HORIZONTAL PARALLAX HINT) --- */}
      <section className="relative z-30 bg-zinc-50 py-40">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 border-b border-zinc-200 pb-10">
            <h2 className="text-8xl font-black uppercase tracking-tighter text-[#2C518A]">
              PROJECTS_
            </h2>
            <p className="text-xs font-black uppercase tracking-widest text-zinc-400 mb-4">
              Strategic_Deployments_v4.0
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {["Startup Park", "Incubenation", "Global Initiatives"].map(
              (project, idx) => (
                <motion.div
                  key={project}
                  initial={{ opacity: 0, scale: 0.97 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="relative aspect-[3/4] bg-white/30 backdrop-blur-sm border border-zinc-200 overflow-hidden group p-10 flex flex-col justify-between"
                >
                  <img
                    src={`https://images.unsplash.com/photo-1${idx}?auto=format&fit=crop&w=1200&q=60`}
                    alt={project}
                    className="absolute inset-0 w-full h-48 object-cover opacity-90"
                  />
                  <div className="absolute top-0 left-0 w-full h-1 bg-[#D4AF37] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                  <span className="text-[10px] font-black text-zinc-300">
                    MOD_{idx + 10}
                  </span>
                  <div className="relative z-10">
                    <h4 className="text-4xl font-black uppercase tracking-tighter mb-4">
                      {project}
                    </h4>
                    <button className="text-[10px] font-black uppercase border-b-2 border-black pb-1 hover:text-[#2C518A] hover:border-[#2C518A] transition-colors flex items-center gap-2">
                      Details_
                      <ArrowUpRight size={14} />
                    </button>
                  </div>
                  <div className="absolute bottom-[-20%] right-[-10%] text-[120px] font-black text-zinc-100 pointer-events-none group-hover:text-[#D4AF37]/10 transition-colors">
                    0{idx + 1}
                  </div>
                </motion.div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* --- ORIGINAL LAYER 3: THE ARCHIVE (MODIFIED PADDING) --- */}
      <section className="relative z-40 bg-white shadow-[0_-100px_100px_rgba(0,0,0,0.04)] px-6 lg:px-24 py-40">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start border-b-[6px] border-black pb-16 mb-32">
            <div>
              <p className="text-[10px] font-black text-[#2C518A] tracking-[1.5em] uppercase mb-4">
                Core_Portfolio_01
              </p>
              <h2 className="text-8xl lg:text-[14rem] font-black uppercase tracking-tighter leading-[0.75]">
                ARCHIVE<span className="text-[#D4AF37]">.</span>
              </h2>
            </div>
            <div className="mt-8 md:mt-0 text-right space-y-1">
              <p className="text-[10px] font-black uppercase">BENGALURU_IND</p>
              <p className="text-5xl font-thin tracking-tighter">2026©</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
            <div className="lg:col-span-5 space-y-24">
              <div className="group relative">
                <div className="absolute -left-8 top-0 h-full w-[2px] bg-[#D4AF37] scale-y-0 group-hover:scale-y-100 transition-transform duration-700 origin-top" />
                <h3 className="text-6xl font-light leading-none mb-8 italic uppercase">
                  The{" "}
                  <span className="font-black not-italic block mt-2 text-[#2C518A]">
                    Bespoke Logic
                  </span>{" "}
                  System
                </h3>
                <p className="text-zinc-500 text-xl leading-relaxed font-medium">
                  Designing at the intersection of violent aesthetics and
                  surgical performance. I build digital environments that act as
                  defensive moats for visionary founders.
                </p>
              </div>
            </div>

            <div className="lg:col-span-7 relative">
              <div className="bg-zinc-50 p-12 lg:p-20 relative overflow-hidden group min-h-[500px] flex flex-col justify-end">
                <motion.div
                  whileHover={{ x: 20 }}
                  className="relative z-10 space-y-6"
                >
                  <span className="inline-block px-4 py-1 bg-black text-[#D4AF37] text-[10px] font-black uppercase">
                    Featured_Module
                  </span>
                  <h4 className="text-5xl lg:text-7xl font-black uppercase tracking-tighter leading-none">
                    Ecosystem <br /> Architecture
                  </h4>
                  <div className="pt-8 flex items-center gap-6">
                    <button className="h-16 w-16 rounded-full border-2 border-black flex items-center justify-center group-hover:bg-black transition-colors">
                      <span className="text-xl group-hover:text-white">→</span>
                    </button>
                    <span className="text-[10px] font-black uppercase tracking-[0.5em]">
                      View Project Detail
                    </span>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER: FINAL STATEMENT --- */}
      <footer className="relative z-40 bg-black text-white h-screen flex flex-col items-center justify-center px-10 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[#2C518A]/20 blur-[180px] pointer-events-none" />

        <div className="relative z-10 text-center flex flex-col items-center max-w-4xl">
          <span className="text-[10px] font-black tracking-[2em] uppercase text-[#D4AF37] mb-12 block ml-[2em]">
            Final_Statement
          </span>
          <h3 className="text-4xl md:text-6xl font-light italic mb-16 leading-tight">
            "The future belongs to those who don’t just{" "}
            <span className="font-black not-italic text-[#D4AF37]">
              participate
            </span>{" "}
            in systems — but{" "}
            <span className="font-black not-italic text-[#2C518A]">build</span>{" "}
            them."
          </h3>

          <button className="group relative px-24 py-8 border border-white/20 hover:border-[#D4AF37] transition-all duration-700">
            <div className="absolute inset-0 bg-[#D4AF37] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            <span className="relative z-10 text-xs font-black uppercase tracking-[0.5em] group-hover:text-black">
              Establish_Connection_
            </span>
          </button>
        </div>

        <div className="absolute bottom-12 w-full px-12 flex justify-between items-end opacity-40">
          <div className="text-[8px] font-mono leading-relaxed uppercase">
            System: Liquid Brutalism v4.0
            <br />
            Loc: 12.97°N, 77.59°E
          </div>
          <div className="text-[8px] font-mono text-right leading-relaxed uppercase">
            ©2026 SHAFI_SHOUKATH
            <br />
            ALL_RIGHTS_RESERVED
          </div>
        </div>
      </footer>
    </main>
  );
}
