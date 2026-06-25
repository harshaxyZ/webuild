"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function Hero({ onOpenPanel }: { onOpenPanel: () => void }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  
  // GPU Parallax
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const gridY = useTransform(scrollYProgress, [0, 1], [0, 250]);

  return (
    <section ref={ref} className="relative min-h-screen flex flex-col justify-center items-center px-6 pt-32 pb-20 z-10 overflow-hidden text-center">
      {/* Parallax Grid */}
      <motion.div style={{ y: gridY }} className="grid-bg" />
      
      <motion.div style={{ y, opacity }} className="max-w-4xl mx-auto w-full relative z-20 flex flex-col items-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--border)] bg-[var(--surface)]"
        >
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-xs font-light tracking-wide text-[var(--muted)]">Accepting first founding partners Q3</span>
        </motion.div>
        
        <h1 className="text-6xl md:text-8xl lg:text-[7rem] font-semibold tracking-tighter leading-[0.95] mb-8 flex flex-col items-center">
          <span className="block overflow-hidden"><motion.span initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} className="block">We build</motion.span></span>
          <span className="block overflow-hidden"><motion.span initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }} className="block bg-gradient-to-r from-[var(--text)] to-[var(--muted)] bg-clip-text text-transparent">things that</motion.span></span>
          <span className="block overflow-hidden"><motion.span initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }} className="block">work.</motion.span></span>
        </h1>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center gap-8 max-w-2xl"
        >
          <p className="text-lg md:text-xl font-light leading-relaxed text-[var(--muted)]">
            We aren't bogged down by legacy code. As a premium web development agency, we engineer custom Next.js websites, React web apps, and scalable digital products from scratch with modern precision.
          </p>
          <button onClick={onOpenPanel} className="group flex items-center gap-2 bg-[var(--text)] text-[var(--bg)] px-8 py-4 rounded-full text-base font-medium hover:opacity-80 transition-opacity">
            Start Your Project <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}
