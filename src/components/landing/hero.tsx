"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function Hero({ onBookClick }: { onBookClick?: () => void }) {
  return (
    <section className="relative w-full min-h-[100dvh] flex flex-col items-center pt-32 pb-16 px-6 bg-transparent selection:bg-rose-100 selection:text-rose-900">
      
      {/* 
        TYPOGRAPHY HIERARCHY (Apple Aesthetic)
      */}
      <div className="flex flex-col items-center text-center z-10 w-full max-w-4xl mt-12 mb-16">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
           className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-zinc-200 shadow-sm mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
          <span className="text-[11px] font-semibold tracking-widest text-zinc-500 uppercase">Available for new projects</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl md:text-[5rem] font-bold tracking-tight text-[#1d1d1f] leading-[1.02] mb-6"
        >
          Engineering elite <br />
          <span className="text-rose-500">digital experiences.</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-lg md:text-xl text-zinc-500 max-w-2xl font-medium leading-relaxed mb-10"
        >
          We turn your most ambitious visions into production-ready reality. <br className="hidden md:block"/>
          World-class engineering, delivered with zero upfront risk.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <Button 
            onClick={onBookClick}
            className="h-14 px-10 text-[15px] font-bold rounded-full bg-zinc-950 text-white hover:bg-zinc-800 hover:scale-[1.02] transition-all duration-300 shadow-xl shadow-zinc-200 group relative overflow-hidden"
          >
            <span className="relative z-10 transition-colors group-hover:text-rose-100">Book a demo</span>
            <div className="absolute inset-0 bg-gradient-to-r from-rose-500 to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
          </Button>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full md:w-[65vw] max-w-5xl aspect-[16/9] rounded-[2rem] md:rounded-[3rem] p-2 md:p-3 bg-white border border-zinc-200 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] mt-8"
      >
        <div className="relative w-full h-full rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden bg-black isolation-auto">
          <img 
            src="/hero-original.png" 
            alt="Product Showcase" 
            className="w-full h-full object-cover scale-[1.01]"
            style={{ 
              imageRendering: "high-quality" as any,
            }}
          />
        </div>
      </motion.div>

    </section>
  );
}
