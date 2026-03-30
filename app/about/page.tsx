"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function AboutPage() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-black selection:text-white dark:bg-black dark:selection:bg-white dark:selection:text-black">
      <main className="mx-auto max-w-6xl px-6 py-24 md:py-40">
        
        {/* Header Section */}
        <motion.div {...fadeIn} className="mb-20">
          <h2 className="text-sm font-medium uppercase tracking-[0.3em] text-zinc-400 dark:text-zinc-500">
            01 / About Me
          </h2>
          <h1 className="mt-4 text-5xl font-bold tracking-tight text-black dark:text-white md:text-8xl">
            Shafi Shoukath.
          </h1>
        </motion.div>

        <div className="grid gap-16 md:grid-cols-2">
          
          {/* Left Column: The Persona */}
          <motion.div 
            {...fadeIn} 
            transition={{ delay: 0.2 }}
            className="flex flex-col gap-8"
          >
            <p className="text-2xl leading-relaxed text-zinc-800 dark:text-zinc-200 md:text-3xl">
              A multidisciplinary designer and developer crafting 
              <span className="font-semibold text-black dark:text-white"> digital experiences </span> 
              that feel as good as they look.
            </p>
            
            <div className="space-y-6 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
              <p>
                Based at the intersection of UI/UX and Full-stack development, I specialize in 
                turning complex problems into intuitive, high-performance interfaces. 
                Whether it's a startup ecosystem or a wellness brand, my goal is to build 
                products that resonate.
              </p>
              <p>
                My approach is rooted in <strong>"The Art of Constructive Conflict"</strong>—challenging 
                standard design norms to find unique solutions that push brands forward.
              </p>
            </div>

            {/* Stats/Quick Info */}
            <div className="mt-8 grid grid-cols-2 gap-8 border-t border-zinc-100 pt-8 dark:border-zinc-800">
              <div>
                <h4 className="text-xs uppercase tracking-widest text-zinc-400">Focus</h4>
                <p className="mt-2 font-medium">React, Next.js, UI/UX</p>
              </div>
              <div>
                <h4 className="text-xs uppercase tracking-widest text-zinc-400">Current Ventures</h4>
                <p className="mt-2 font-medium">iQue, MoonBliss</p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: The Visual/Skills */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-zinc-100 dark:bg-zinc-900"
          >
            {/* Replace with your actual photo */}
            <div className="absolute inset-0 flex items-center justify-center text-zinc-300 dark:text-zinc-700">
               <span className="text-9xl font-bold opacity-10">SS</span>
            </div>
            
            {/* Animated Skill Overlay */}
            <div className="absolute bottom-8 left-8 right-8">
              <div className="flex flex-wrap gap-2">
                {["TypeScript", "Framer Motion", "Tailwind", "Product Design"].map((skill) => (
                  <span 
                    key={skill}
                    className="rounded-full border border-black/10 bg-white/50 px-4 py-2 text-sm font-medium backdrop-blur-md dark:border-white/10 dark:bg-black/50"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

        </div>

        {/* Closing Tagline */}
        <motion.div 
          {...fadeIn}
          className="mt-32 text-center"
        >
          <p className="text-zinc-400">Ready to build something remarkable?</p>
          <a 
            href="mailto:hello@shafishoukath.com" 
            className="mt-4 inline-block text-2xl font-semibold underline decoration-zinc-300 underline-offset-8 hover:decoration-black dark:decoration-zinc-700 dark:hover:decoration-white"
          >
            Let's talk.
          </a>
        </motion.div>
      </main>
    </div>
  );
}