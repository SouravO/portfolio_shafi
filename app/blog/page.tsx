"use client";

import React, { useRef, useState, useMemo } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { ArrowRight, ExternalLink, Globe } from 'lucide-react';

const BLOGS = [
  { 
    id: 1, 
    cat: 'TECH', 
    tag: '01', 
    title: 'The Silent Revolution: How AI Will Reshape Nations, Not Just Businesses', 
    sub: 'Understanding AI\'s macro-level impact on governance and national competitiveness.', 
    img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200',
    excerpt: 'Artificial intelligence is not just a business tool. It is gradually becoming a foundational layer that will redefine how nations operate, compete, and evolve...',
    content: 'Over the past few years, artificial intelligence has largely been discussed through the lens of business. Conversations tend to revolve around how companies can automate processes, reduce costs, or improve customer experience. There is a constant focus on startups leveraging AI, enterprises integrating it, and professionals adapting to it. While these discussions are important, they only capture a small part of what is actually unfolding.\n\nArtificial intelligence is not just a business tool. It is gradually becoming a foundational layer that will redefine how nations operate, compete, and evolve. What we are witnessing is not just a technological shift, but the early stages of a structural transformation that will influence governance, economic power, and societal organization.\n\nHistorically, nations have measured progress through indicators such as industrial output, economic growth, infrastructure development, and military strength. Artificial intelligence changes that dynamic. It enables a shift from reactive governance to predictive governance. Instead of responding to traffic congestion, systems can anticipate it. Instead of reacting to healthcare crises, patterns can be identified early enough to intervene.'
  },
  { 
    id: 2, 
    cat: 'TECH', 
    tag: '02', 
    title: 'Beyond Apps & Startups: Why Infrastructure Tech Will Define the Next Decade', 
    sub: 'Why the real power lies in foundational systems, not consumer applications.', 
    img: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=1200',
    excerpt: 'For the past decade, technology has largely been defined by what we see and use every day. Yet beneath this visible layer lies something far more fundamental—infrastructure technology...',
    content: 'For the past decade, technology has largely been defined by what we see and use every day. Mobile applications, consumer platforms, and startups have shaped how we communicate, shop, travel, and work. These visible layers of technology have attracted most of the attention, investment, and conversation.\n\nHowever, beneath this visible layer lies something far more fundamental—something that is often overlooked because it is less visible, slower to build, and more complex to understand. That layer is infrastructure technology.\n\nInfrastructure technology includes systems such as data networks, cloud architecture, artificial intelligence frameworks, semiconductor capabilities, digital public infrastructure, and energy systems that support computation. These are not products in the traditional sense. They do not always have direct user interfaces, and they are not always recognized by the end consumer. Yet, they form the foundation upon which all modern innovation is built.'
  },
  { 
    id: 3, 
    cat: 'ENTREPRENEURSHIP', 
    tag: '03', 
    title: 'Startups Don\'t Fail Because of Ideas — They Fail Because of Execution Blindness', 
    sub: 'Deep insights into founder psychology and real execution gaps.', 
    img: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?q=80&w=1200',
    excerpt: 'One of the most persistent myths in the startup world is that success begins with a great idea. But when you observe startups over time, a different pattern emerges...',
    content: 'One of the most persistent myths in the startup world is that success begins with a great idea. It is a belief that almost every first-time founder carries. The assumption is simple: if the idea is strong enough, everything else will fall into place.\n\nBut when you observe startups over time—across industries, stages, and geographies—a different pattern begins to emerge. Most startups do not fail because their ideas are weak. They fail because they cannot see clearly while executing. This is what I would call execution blindness.\n\nExecution blindness is not about a lack of effort. In fact, many founders work incredibly hard. They invest time, energy, and often personal capital into building their ventures. The problem is not effort—it is direction. When founders become deeply attached to their ideas, they begin to lose the ability to question them.'
  },
  { 
    id: 4, 
    cat: 'ENTREPRENEURSHIP', 
    tag: '04', 
    title: 'From Founder to Nation Builder: Why Entrepreneurship Must Go Beyond Profit', 
    sub: 'How founders can create impact beyond companies and contribute to larger systems.', 
    img: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200',
    excerpt: 'Entrepreneurship is often celebrated as a pathway to wealth creation. But limiting it to profit alone is a narrow way of understanding its potential...',
    content: 'Entrepreneurship is often celebrated as a pathway to wealth creation. Founders are encouraged to build fast, scale aggressively, and capture markets. Success is typically measured through revenue, valuation, and exits. In this framework, profit becomes the primary indicator of achievement, and growth becomes the ultimate goal.\n\nThere is nothing inherently wrong with this. Economic growth is essential. Profitable businesses create jobs, drive innovation, and contribute to the overall development of an economy. In many ways, entrepreneurship has been one of the most powerful forces behind modern progress.\n\nHowever, limiting entrepreneurship to profit alone is a narrow way of understanding its potential. At its core, entrepreneurship is not just about building companies. It is about shaping systems, influencing behavior, and creating long-term impact.'
  },
  { 
    id: 5, 
    cat: 'SOCIETY', 
    tag: '05', 
    title: 'The Illusion of Progress: Are We Growing Faster Than We Are Evolving?', 
    sub: 'Understanding the gap between growth and human evolution in the modern world.', 
    img: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200',
    excerpt: 'We speak about progress as if it is a single, unified concept. But are we evolving at the same pace as we are growing?', 
    content: 'We often speak about progress as if it is a single, unified concept. A country grows. An economy expands. Technology advances. Opportunities increase. These are all seen as clear indicators that we are moving forward.\n\nAnd in many ways, we are. Access to information has never been easier. Technology has made everyday life more convenient. Industries are evolving rapidly, and new possibilities are constantly emerging. By most measurable standards, the world appears to be progressing at an unprecedented pace.\n\nBut beneath this visible growth lies a quieter, more complex question. Are we evolving at the same pace as we are growing? Growth is relatively easy to measure. It can be quantified in numbers—GDP, revenue, user base, speed, scale. It reflects expansion, accumulation, and output. Evolution, on the other hand, is harder to define. It relates to how we think, how we behave, how we make decisions, and how we adapt to change.'
  },
  { 
    id: 6, 
    cat: 'SOCIETY', 
    tag: '06', 
    title: 'The Youth Paradox: More Opportunities, Yet More Confusion', 
    sub: 'Why greater access hasn\'t created clarity for young people today.', 
    img: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800',
    excerpt: 'There has never been a time when young people had access to as many opportunities as they do today. Yet many find themselves uncertain about what to pursue...',
    content: 'There has never been a time when young people had access to as many opportunities as they do today. A student in a small town can learn from global institutions. A creator can build an audience without a studio. A founder can launch a company without traditional barriers. Entire career paths have emerged within a decade.\n\nOn paper, this should have made life simpler. More opportunities should mean more freedom. More freedom should lead to better choices. And better choices should, ideally, create more fulfilling lives. Yet, the reality feels quite different. Despite having more access than any generation before them, many young people find themselves uncertain about what to pursue, where to focus, and how to move forward. This is the paradox of modern youth—greater opportunity accompanied by greater confusion.'
  },
  { 
    id: 7, 
    cat: 'POLICIES', 
    tag: '07', 
    title: 'Why Governments Need to Think Like Startups — And Startups Like Governments', 
    sub: 'How both can learn from each other to create better outcomes.', 
    img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200',
    excerpt: 'Governments and startups are often seen as operating at opposite ends of a spectrum. But as the world becomes more complex, there is growing value in each learning from the other...',
    content: 'Governments and startups are often seen as operating at opposite ends of a spectrum. Startups are associated with speed, experimentation, and risk-taking. They operate in uncertain environments, make quick decisions, and adapt constantly. Governments, on the other hand, are expected to provide stability. Their processes are structured, their decisions are deliberate, and their responsibility extends across entire populations.\n\nAt a glance, these two systems appear fundamentally different in both purpose and function. However, as the world becomes more complex and interconnected, this distinction is beginning to blur. The challenges faced by governments are evolving rapidly, and the influence of startups is expanding beyond traditional business boundaries. In this changing landscape, there is growing value in each learning from the other.'
  },
  { 
    id: 8, 
    cat: 'POLICIES', 
    tag: '08', 
    title: 'Building Startup Nations: What Policies Actually Work (and What Doesn\'t)', 
    sub: 'Real insights into what makes startup ecosystems thrive globally.', 
    img: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=1200',
    excerpt: 'Over the past decade, the idea of becoming a "startup nation" has gained significant attention. But while many countries are investing, only a few translate it into real outcomes...',
    content: 'Over the past decade, the idea of becoming a "startup nation" has gained significant attention. Governments across the world have launched initiatives to encourage entrepreneurship, attract investment, and build innovation ecosystems. Policies have been introduced, funds have been allocated, and institutions have been created—all with the intention of fostering startup growth.\n\nOn the surface, this momentum appears promising. However, a closer look reveals that while many countries are investing in startup ecosystems, only a few are able to translate that investment into meaningful, sustained outcomes.\n\nOne of the most common misconceptions is that startup ecosystems can be built primarily through funding. While access to capital is important, it is rarely the defining factor. Startups do not grow in isolation. They grow within ecosystems that include mentorship, talent, infrastructure, markets, and networks.'
  },
];

const CATEGORIES = ['All', 'TECH', 'ENTREPRENEURSHIP', 'SOCIETY', 'POLICIES'];

export default function HorizontalWowBlog() {
  const [activeTab, setActiveTab] = useState('All');
  const [expandedPost, setExpandedPost] = useState<number | null>(null);
  const targetRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({ target: targetRef });

  // Filter Logic
  const filteredBlogs = useMemo(() =>
    activeTab === 'All' ? BLOGS : BLOGS.filter(b => b.cat === activeTab),
  [activeTab]);

  // Adjust horizontal width based on number of items filtered
  const xTranslate = activeTab === 'All' ? "-75%" : "-40%";

  const x = useTransform(scrollYProgress, [0, 1], ["0%", xTranslate]);
  const bgX = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);

  const smoothX = useSpring(x, { stiffness: 100, damping: 30 });
  const smoothBgX = useSpring(bgX, { stiffness: 100, damping: 30 });

  return (
    <section ref={targetRef} className="relative bg-[#050505]">
      {/* Mobile Layout - Vertical Scroll */}
      <div className="lg:hidden min-h-screen pb-20">
        {/* Category Nav - Mobile */}
        <div className="sticky top-10 z-50 flex justify-center px-4 py-4">
          <div className="flex gap-1 bg-[#0a0a0a]/80 backdrop-blur-xl p-1 rounded-full border border-[#D4AF37]/20 overflow-x-auto max-w-[90vw] scrollbar-hide">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-3 py-1.5 rounded-full text-[10px] font-bold tracking-widest transition-all whitespace-nowrap flex-shrink-0 ${
                  activeTab === cat ? 'bg-[#D4AF37] text-black' : 'text-gray-400 hover:text-white'
                }`}
              >
                {cat.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Header - Mobile */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="px-6 py-8 border-l-2 border-[#D4AF37] ml-6"
        >
          <h1 className="text-3xl font-black tracking-tighter text-white mb-2 leading-none">
            {activeTab === 'All' ? 'THE' : activeTab}<br/>
            <span className="text-[#D4AF37]">JOURNAL</span>
          </h1>
          <p className="text-gray-500 text-xs font-mono tracking-tighter mt-2">
            FILTERED BY: {activeTab.toUpperCase()}
          </p>
        </motion.div>

        {/* Blog Cards - Mobile Vertical */}
        <div className="px-6 space-y-6">
          <AnimatePresence mode="popLayout">
            {filteredBlogs.map((post) => (
              <motion.div
                key={post.id}
                layout
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.4, ease: "circOut" }}
                className="relative group w-full h-[400px] overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0a]"
              >
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  src={post.img}
                  className="w-full h-full object-cover opacity-40 group-hover:opacity-100 group-hover:grayscale-0 grayscale transition-all duration-700"
                  alt={post.title}
                />

                <div className="absolute inset-0 p-5 flex flex-col justify-between">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-mono text-[#D4AF37] bg-[#D4AF37]/10 px-2 py-1 rounded-full border border-[#D4AF37]/20">
                      {post.cat}
                    </span>
                    <button
                      onClick={() => setExpandedPost(post.id)}
                      className="p-2 rounded-full bg-black/50 backdrop-blur-md border border-white/10 hover:bg-[#D4AF37] hover:border-[#D4AF37] transition-all"
                    >
                      <ExternalLink className="text-white w-4 h-4" />
                    </button>
                  </div>

                  <div>
                    <h2 className="text-lg font-bold text-white tracking-tighter mb-2 group-hover:text-[#D4AF37] transition-colors line-clamp-2">
                      {post.title}
                    </h2>
                    <button className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-[0.2em] text-white/50 group-hover:text-white transition-all">
                      View Case Study <ArrowRight size={8} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Desktop Layout - Horizontal Scroll */}
      <div className="hidden lg:block relative h-[350vh] bg-[#050505]">
        <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">

          {/* --- CATEGORY NAV --- */}
          <div className="absolute top-8 sm:top-12 md:top-16 lg:top-20 xl:top-24 left-4 sm:left-6 md:left-8 lg:left-10 z-50 flex gap-2 sm:gap-4 bg-[#0a0a0a]/80 backdrop-blur-xl p-1 sm:p-2 rounded-full border border-[#D4AF37]/20 overflow-x-auto max-w-[90vw] scrollbar-hide">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-3 sm:px-4 md:px-6 py-1 sm:py-2 rounded-full text-[10px] sm:text-xs font-bold tracking-widest transition-all whitespace-nowrap ${
                  activeTab === cat ? 'bg-[#D4AF37] text-black' : 'text-gray-400 hover:text-white'
                }`}
              >
                {cat.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Parallax Background Text */}
          <motion.div
            style={{ x: smoothBgX }}
            className="absolute inset-0 flex items-center whitespace-nowrap z-0 select-none pointer-events-none"
          >

          </motion.div>

          {/* Horizontal Content Grid */}
          <motion.div style={{ x: smoothX }} className="flex gap-8 sm:gap-12 md:gap-16 lg:gap-20 px-4 sm:px-6 md:px-8 lg:px-[10vw] z-10 items-center">

            <div className="w-[80vw] sm:w-[60vw] md:w-[40vw] lg:w-[30vw] shrink-0">
              <motion.div
                 key={activeTab}
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 className="border-l-2 border-[#D4AF37] pl-4 sm:pl-6 md:pl-8"
              >
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter text-white mb-2 sm:mb-4 leading-none">
                  {activeTab === 'All' ? 'THE' : activeTab}<br/>
                  <span className="text-[#D4AF37] font-outline-2">JOURNAL</span>
                </h1>
                <p className="text-gray-500 text-xs sm:text-sm font-mono tracking-tighter">
                  FILTERED BY: {activeTab.toUpperCase()}
                </p>
              </motion.div>
            </div>

            <div className="flex gap-6 sm:gap-8 md:gap-12 lg:gap-16">
              <AnimatePresence mode="popLayout">
                {filteredBlogs.map((post) => (
                  <motion.div
                    key={post.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9, x: 50 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.8, x: -50 }}
                    transition={{ duration: 0.5, ease: "circOut" }}
                    className="relative group w-[85vw] sm:w-[70vw] md:w-[50vw] lg:w-[35vw] xl:w-[30vw] h-[50vh] sm:h-[55vh] shrink-0"
                  >
                    <div className="relative w-full h-full overflow-hidden rounded-[1rem] sm:rounded-[2rem] border border-white/10 bg-[#0a0a0a]">
                      <motion.img
                        whileHover={{ scale: 1.05 }}
                        src={post.img}
                        className="w-full h-full object-cover opacity-40 group-hover:opacity-100 group-hover:grayscale-0 grayscale transition-all duration-700"
                        alt={post.title}
                      />

                      <div className="absolute inset-0 p-4 sm:p-6 md:p-8 flex flex-col justify-between">
                        <div className="flex justify-between items-center">
                          <span className="text-xs sm:text-sm font-mono text-[#D4AF37] bg-[#D4AF37]/10 px-2 sm:px-3 py-1 rounded-full border border-[#D4AF37]/20">
                            {post.cat}
                          </span>
                          <button
                            onClick={() => setExpandedPost(post.id)}
                            className="p-1 sm:p-2 rounded-full bg-black/50 backdrop-blur-md border border-white/10 hover:bg-[#D4AF37] hover:border-[#D4AF37] transition-all"
                          >
                            <ExternalLink className="text-white w-3 h-3 sm:w-4 sm:h-4" />
                          </button>
                        </div>

                        <div>
                          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tighter mb-1 sm:mb-2 group-hover:text-[#D4AF37] transition-colors">
                            {post.title}
                          </h2>
                          <button className="flex items-center gap-1 sm:gap-2 text-[8px] sm:text-[10px] font-bold uppercase tracking-[0.2em] text-white/50 group-hover:text-white transition-all">
                            View Case Study <ArrowRight size={10} className="sm:w-3 sm:h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <div className="w-[20vw] shrink-0 flex items-center justify-center hidden lg:flex">
               <Globe className="w-8 sm:w-12 h-8 sm:h-12 text-white/10" />
            </div>
          </motion.div>
        </div>

        {/* Progress Bar - Desktop Only */}
        <motion.div
          className="fixed bottom-4 sm:bottom-6 md:bottom-8 left-4 sm:left-6 md:left-8 right-4 sm:right-6 md:right-8 h-[1px] bg-white/5 z-50 origin-left"
          style={{ scaleX: scrollYProgress }}
        >
          <div className="absolute right-0 top-[-2px] h-1 w-6 sm:w-8 md:w-10 bg-[#D4AF37] shadow-[0_0_20px_#D4AF37]" />
        </motion.div>
      </div>

      {/* Expanded Card Modal */}
      <AnimatePresence>
        {expandedPost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setExpandedPost(null)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4 sm:p-6"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full bg-[#0a0a0a] border border-[#D4AF37]/30 rounded-xl sm:rounded-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setExpandedPost(null)}
                className="absolute top-4 sm:top-6 right-4 sm:right-6 z-10 p-1 sm:p-2 bg-black/50 hover:bg-[#D4AF37] rounded-full transition-all"
              >
                <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5 text-white rotate-45" />
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 p-6 sm:p-8 md:p-12">
                <motion.img
                  src={BLOGS.find(b => b.id === expandedPost)?.img}
                  alt="Expanded"
                  className="w-full h-64 sm:h-80 lg:h-96 object-cover rounded-lg"
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                />

                <div className="flex flex-col justify-between">
                  <div>
                    <span className="text-[#D4AF37] text-xs sm:text-sm font-mono bg-[#D4AF37]/10 px-2 sm:px-3 py-1 rounded-full border border-[#D4AF37]/20">
                      {BLOGS.find(b => b.id === expandedPost)?.cat}
                    </span>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mt-4 sm:mt-6 mb-3 sm:mb-4 tracking-tighter">
                      {BLOGS.find(b => b.id === expandedPost)?.title}
                    </h2>
                    <p className="text-gray-400 text-sm sm:text-base lg:text-lg leading-relaxed mb-4 sm:mb-6">
                      {BLOGS.find(b => b.id === expandedPost)?.sub}
                    </p>
                    <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
                      This comprehensive exploration delves into {BLOGS.find(b => b.id === expandedPost)?.title.toLowerCase()}, examining its implications for the future. Our in-depth analysis covers emerging trends, technological advancements, and practical applications that are shaping the landscape of 2026 and beyond.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}