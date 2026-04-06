"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";

export function HeroCinematic({ onBookClick }: { onBookClick: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  // Parallax Values
  const bgY = useTransform(scrollY, [0, 1000], [0, 200]);   // Slowest
  const midY = useTransform(scrollY, [0, 1000], [0, 400]);  // Medium
  const fgY = useTransform(scrollY, [0, 1000], [0, 600]);   // Fastest
  
  // Content Fade/Scale
  const textOpacity = useTransform(scrollY, [0, 300], [1, 0.4]);
  const textY = useTransform(scrollY, [0, 300], [0, -50]);
  
  // UI Mockup Rise
  const mockupY = useTransform(scrollY, [200, 800], [300, 0]);
  const mockupOpacity = useTransform(scrollY, [200, 400], [0, 1]);

  return (
    <section 
      ref={containerRef}
      className="relative w-full h-[150vh] overflow-hidden bg-[#fafafa]"
    >
      {/* Parallax Layers Container */}
      <div className="sticky top-0 w-full h-screen overflow-hidden">
        {/* Layer 1: Background (Sky/Stars) */}
        <motion.div 
          style={{ y: bgY }}
          className="absolute inset-0 w-full h-full"
        >
          <img 
            src="/hero-bg.png" 
            alt="Background" 
            className="w-full h-full object-cover scale-110"
          />
        </motion.div>

        {/* Layer 2: Midground (Mountains/Landscape) */}
        <motion.div 
          style={{ y: midY }}
          className="absolute inset-0 w-full h-full z-10"
        >
          <img 
            src="/hero-mid.png" 
            alt="Midground" 
            className="w-full h-full object-cover scale-110"
          />
        </motion.div>

        {/* Layer 3: Foreground (Flowers/Details) */}
        <motion.div 
          style={{ y: fgY }}
          className="absolute inset-0 w-full h-full z-20 pointer-events-none"
        >
          <img 
            src="/hero-fg.png" 
            alt="Foreground" 
            className="w-full h-full object-cover scale-125"
          />
        </motion.div>

        {/* Content Overlay */}
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center pointer-events-none">
          <motion.div 
            style={{ opacity: textOpacity, y: textY }}
            className="text-center px-6 pointer-events-auto"
          >
            <motion.div
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
               className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 backdrop-blur-sm border border-zinc-200 mb-8 shadow-sm"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
              <span className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase">Product Architects</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl md:text-[6rem] lg:text-[7rem] font-bold tracking-tight text-[#1d1d1f] leading-[0.95] mb-8"
            >
              Websites that <br />
              <span className="text-rose-500 underline decoration-rose-200 decoration-8 underline-offset-8">actually convert.</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg md:text-2xl text-zinc-600 max-w-2xl mx-auto font-medium leading-relaxed mb-12"
            >
              We build precision-engineered platforms and <br className="hidden md:block" />
              automation systems that turn visitors into growth.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 px-6"
            >
              <Button 
                onClick={onBookClick}
                className="h-16 w-full sm:w-64 px-10 text-lg font-bold rounded-2xl bg-zinc-950 text-white hover:bg-zinc-800 transition-all shadow-2xl active:scale-95 group"
              >
                Book a Demo
                <motion.span 
                  className="ml-2"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >→</motion.span>
              </Button>
              <Button 
                variant="outline"
                onClick={() => window.scrollTo({ top: 1200, behavior: 'smooth' })}
                className="h-16 w-full sm:w-64 px-10 text-lg font-bold rounded-2xl border-2 border-zinc-200 text-zinc-600 hover:bg-zinc-50 transition-all"
              >
                View Work
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Floating UI Mockup Section */}
        <motion.div 
          style={{ y: mockupY, opacity: mockupOpacity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-40 w-full max-w-5xl px-6"
        >
          <div className="relative aspect-[16/9] rounded-[2.5rem] bg-white border border-zinc-200 shadow-[0_40px_80px_-15px_rgba(0,0,0,0.1)] overflow-hidden p-2">
             <div className="w-full h-full rounded-[2rem] bg-zinc-50 overflow-hidden border border-zinc-100 relative group">
                <img 
                  src="/hero-original.png" 
                  alt="Dashboard Preview" 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent pointer-events-none" />
             </div>
             
             {/* Sub-UI Card 1: Growth */}
             <motion.div 
                animate={{ y: [0, -10, 0] }} 
                transition={{ repeat: Infinity, duration: 3, delay: 0.5 }}
                className="absolute -top-6 -right-6 w-48 p-4 bg-white rounded-2xl shadow-xl border border-zinc-100 hidden md:block"
             >
                <div className="flex items-center gap-2 mb-2">
                   <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center text-green-600">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor font-bold">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 15l7-7 7 7" />
                      </svg>
                   </div>
                   <span className="text-[10px] font-black tracking-tighter text-zinc-400 uppercase">Live Growth</span>
                </div>
                <div className="text-2xl font-black text-zinc-900">+142%</div>
                <div className="text-[8px] font-bold text-green-500 uppercase">Conversion Lift</div>
             </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
