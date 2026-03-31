"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Projects", path: "/projects" },
  { name: "Gallery", path: "/gallery" },
  { name: "Store", path: "/store" },
  { name: "Blog", path: "/blog" },
  { name: "Contact", path: "/media" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [hidden, setHidden] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
    <>
      <motion.nav
        variants={{
          visible: { y: 0, opacity: 1 },
          hidden: { y: -100, opacity: 0 },
        }}
        animate={hidden && !mobileMenuOpen ? "hidden" : "visible"}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 w-full z-[100] px-6 py-8 pointer-events-none"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between md:justify-center pointer-events-auto">

          {/* --- MOBILE LOGO AREA (Hidden on MD+) --- */}
          <div className="md:hidden flex items-center gap-2 bg-black/20 backdrop-blur-3xl border border-white/10 p-2 px-4 rounded-full">
             <span className="font-black text-white text-xs tracking-tighter">S.S</span>
          </div>

          {/* --- CENTRAL LINKS (Desktop) --- */}
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

          {/* --- MOBILE TOGGLE --- */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-3 bg-black/20 backdrop-blur-3xl border border-white/10 rounded-full text-white"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </motion.nav>

      {/* --- MOBILE MENU OVERLAY --- */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            className="fixed inset-0 z-[90] bg-black/60 flex items-center justify-center md:hidden"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="flex flex-col items-center gap-6"
            >
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-4xl font-black uppercase italic tracking-tighter ${pathname === link.path ? "text-[#D4AF37]" : "text-white"}`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
