"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

const NAV_LINKS = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Projects", path: "/projects" },
  { name: "Store", path: "/store" },
  { name: "Blog", path: "/blog" },
  { name: "Media", path: "/media" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();
  const lastScrollY = useRef(0);

  // Logic to detect scroll direction
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = lastScrollY.current;
    if (latest > previous && latest > 150) {
      setHidden(true); // Scrolling Down
    } else {
      setHidden(false); // Scrolling Up
    }
    lastScrollY.current = latest;
  });

  return (
    <motion.nav
      variants={{
        visible: { y: 0, opacity: 1 },
        hidden: { y: -100, opacity: 0 },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 w-full z-[100] px-6 py-8 pointer-events-none"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">
        {/* --- BRAND LOGO --- */}
        <Link href="/" className="group flex items-center gap-3">
          <div className="h-10 w-10 bg-white flex items-center justify-center rounded-full overflow-hidden transition-transform group-hover:scale-110">
            <span className="text-black font-black text-xs italic">IQ</span>
          </div>
          <div className="flex flex-col">
            <span className="text-white text-[10px] font-black uppercase tracking-[0.3em] leading-none">
              Shafi Shoukath
            </span>
            <span className="text-emerald-500 text-[8px] font-bold uppercase tracking-widest mt-1">
              Creative_Architect
            </span>
          </div>
        </Link>

        {/* --- CENTRAL LINKS --- */}
        <div className="hidden md:flex items-center gap-2 bg-black/20 backdrop-blur-3xl border border-white/10 p-1.5 rounded-full">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className="relative px-6 py-2 group"
            >
              {pathname === link.path && (
                <motion.div
                  layoutId="nav-active"
                  className="absolute inset-0 bg-white rounded-full"
                  transition={{ type: "spring", duration: 0.6 }}
                />
              )}
              <span
                className={`relative z-10 text-[10px] font-bold uppercase tracking-widest transition-colors duration-300 ${pathname === link.path ? "text-black" : "text-zinc-400 group-hover:text-white"}`}
              >
                {link.name}
              </span>
            </Link>
          ))}
        </div>

        {/* --- CTA BUTTON --- */}
        <Link
          href="/contact"
          className="bg-emerald-500 hover:bg-white text-black px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all hover:scale-105 active:scale-95 shadow-lg shadow-emerald-500/20"
        >
          Connect
        </Link>
      </div>
    </motion.nav>
  );
}
