import Image from "next/image";

export default function Home() {
  return (
    <main className="relative h-[100dvh] w-full overflow-hidden bg-[#080808] text-white antialiased selection:bg-white selection:text-black">
      {/* 1. CINEMATIC BACKGROUND */}
      <div className="absolute inset-0 z-0">
        {/* Subtle Grain Texture */}
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none"></div>
        
        {/* Deep "Aura" Glows */}
        <div className="absolute top-[-20%] left-[-10%] h-[70%] w-[70%] rounded-full bg-blue-500/5 blur-[120px]"></div>
        <div className="absolute bottom-[-20%] right-[-10%] h-[70%] w-[70%] rounded-full bg-indigo-500/5 blur-[120px]"></div>
        
        {/* Vertical Data Stream (Scrolling Hex) */}
        <div className="absolute left-6 top-0 bottom-0 w-[1px] opacity-10 overflow-hidden pointer-events-none hidden lg:block">
          <div className="animate-scrolling-data flex flex-col gap-4 text-[8px] font-mono text-blue-500 py-4">
            {Array.from({ length: 20 }).map((_, i) => (
              <span key={i} className="[writing-mode:vertical-rl] rotate-180">0x{Math.random().toString(16).slice(2, 8).toUpperCase()}</span>
            ))}
          </div>
        </div>
        <div className="absolute right-6 top-0 bottom-0 w-[1px] opacity-10 overflow-hidden pointer-events-none hidden lg:block">
          <div className="animate-scrolling-data flex flex-col gap-4 text-[8px] font-mono text-indigo-500 py-4">
            {Array.from({ length: 20 }).map((_, i) => (
              <span key={i} className="[writing-mode:vertical-rl] rotate-180">0x{Math.random().toString(16).slice(2, 8).toUpperCase()}</span>
            ))}
          </div>
        </div>

        {/* Technical Grid (Ultra-faint) */}
        <div className="absolute inset-0 opacity-[0.02] bg-[size:40px_40px] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)]"></div>
      </div>

      {/* 2. MINIMALIST TOP NAV */}
      <header className="relative z-50 flex items-center justify-between px-8 py-8 lg:px-16">
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse group-hover:scale-150 transition-transform"></div>
          <h1 className="text-xl font-black tracking-tighter uppercase group-hover:tracking-widest transition-all duration-700">iQUE</h1>
        </div>
        
        <nav className="hidden md:flex items-center gap-12 text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500">
          <a href="#" className="hover:text-white transition-colors relative group">
            Philosophy
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-blue-500 transition-all group-hover:w-full"></span>
          </a>
          <a href="#" className="hover:text-white transition-colors relative group">
            Intelligence
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-blue-500 transition-all group-hover:w-full"></span>
          </a>
          <a href="#" className="hover:text-white transition-colors relative group">
            Ecosystem
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-blue-500 transition-all group-hover:w-full"></span>
          </a>
          <button className="px-6 py-2 rounded-full border border-white/10 hover:border-blue-500 hover:shadow-[0_0_20px_rgba(59,130,246,0.2)] transition-all duration-500">
            Contact
          </button>
        </nav>
      </header>

      {/* 3. HERO CONTENT (Staggered Typography & Depth) */}
      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center -mt-16">
        
        {/* Background Text (Behind Portrait) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none w-full text-center">
          <h2 className="text-[25vw] font-black leading-none tracking-tighter text-white/[0.01] uppercase italic">
            LIMITLESS
          </h2>
        </div>

        {/* The Portrait Layer */}
        <div className="relative z-20 h-[82vh] w-auto aspect-[3/4] group">
          {/* Viewfinder Brackets */}
          <div className="absolute -inset-12 pointer-events-none opacity-0 group-hover:opacity-20 transition-all duration-1000 border-white/40 rounded-[2rem] scale-110 group-hover:scale-100">
             <div className="absolute top-0 left-0 h-16 w-16 border-t-2 border-l-2 border-white/60 rounded-tl-3xl"></div>
             <div className="absolute top-0 right-0 h-16 w-16 border-t-2 border-r-2 border-white/60 rounded-tr-3xl"></div>
             <div className="absolute bottom-0 left-0 h-16 w-16 border-b-2 border-l-2 border-white/60 rounded-bl-3xl"></div>
             <div className="absolute bottom-0 right-0 h-16 w-16 border-b-2 border-r-2 border-white/60 rounded-br-3xl"></div>
          </div>

          <Image
            src="/shafi.png"
            alt="Shafi Shoukath"
            fill
            priority
            className="object-contain object-bottom saturate-0 group-hover:saturate-100 transition-all duration-1000 ease-in-out brightness-75 group-hover:brightness-110"
          />
          
          {/* Subtle Reflection/Glass effect */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent opacity-80"></div>
          
          {/* Floating Data Tags */}
          <div className="absolute top-1/4 -left-16 p-4 backdrop-blur-2xl bg-white/5 border border-white/10 rounded-2xl shadow-2xl opacity-0 group-hover:opacity-100 translate-x-10 group-hover:translate-x-0 transition-all duration-700 delay-100">
            <p className="text-[8px] font-black uppercase tracking-widest text-blue-400 mb-1">Targeting</p>
            <p className="text-xs font-bold uppercase tracking-tighter">Visionary.exe</p>
          </div>
          <div className="absolute bottom-1/3 -right-20 p-4 backdrop-blur-2xl bg-white/5 border border-white/10 rounded-2xl shadow-2xl opacity-0 group-hover:opacity-100 -translate-x-10 group-hover:translate-x-0 transition-all duration-700 delay-200">
            <p className="text-[8px] font-black uppercase tracking-widest text-indigo-400 mb-1">Access</p>
            <p className="text-xs font-bold uppercase tracking-tighter">Founder_Root</p>
          </div>
        </div>

        {/* Foreground Text (In Front of Portrait) */}
        <div className="absolute bottom-[10%] z-30 w-full text-center pointer-events-none px-6">
          <div className="overflow-hidden">
            <h3 className="text-7xl md:text-[12vw] font-black tracking-tighter leading-[0.8] mix-blend-difference">
              SHAFI <span className="text-transparent stroke-white stroke-2 block md:inline" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.4)' }}>SHOUKATH</span>
            </h3>
          </div>
          <p className="mt-8 text-[10px] md:text-xs font-black tracking-[1em] text-blue-500/60 uppercase">
            LIMITLESS <span className="text-white/20 mx-4">•</span> INTELLIGENCE <span className="text-white/20 mx-4">•</span> ARCHITECTURE
          </p>
        </div>
      </div>

      {/* 4. SIDEBAR SOCIALS & INFO */}
      <div className="absolute left-12 bottom-12 z-50 flex flex-col gap-8">
        <div className="h-32 w-[1px] bg-gradient-to-t from-blue-500 via-blue-500/20 to-transparent"></div>
        <div className="flex flex-col gap-6 text-[9px] font-bold uppercase tracking-[0.4em] text-zinc-600">
          <a href="#" className="hover:text-blue-500 transition-colors -rotate-90 origin-left">LinkedIn</a>
          <a href="#" className="hover:text-indigo-500 transition-colors -rotate-90 origin-left mt-16">Instagram</a>
        </div>
      </div>

      {/* 5. BOTTOM STATUS BAR */}
      <footer className="absolute bottom-0 w-full z-50 px-8 py-8 lg:px-16 flex justify-between items-end border-t border-white/5 bg-gradient-to-t from-black/80 to-transparent backdrop-blur-sm">
        <div className="max-w-[350px] space-y-4">
          <div className="flex items-center gap-4">
             <span className="text-[10px] font-black text-blue-500 tracking-widest">SYSTEM.LOG</span>
             <div className="h-[1px] flex-1 bg-white/10"></div>
          </div>
          <p className="text-[11px] leading-relaxed text-zinc-500 font-medium">
            Bridging the chasm between raw data and human intuition. iQue develops next-generation cognitive structures for the digital elite.
          </p>
        </div>
        
        <div className="text-right flex flex-col items-end gap-3">
          <div className="flex items-center gap-2">
            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-zinc-600">Syncing Intelligence</span>
            <div className="h-1 w-1 rounded-full bg-blue-500 animate-ping"></div>
          </div>
          <div className="flex gap-1.5">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-1.5 w-8 bg-white/5 rounded-full overflow-hidden border border-white/5">
                <div 
                  className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 animate-loading-status" 
                  style={{ animationDelay: `${i * 0.15}s` }}
                ></div>
              </div>
            ))}
          </div>
        </div>
      </footer>
    </main>
  );
}
