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
      <div className="flex flex-col items-center text-center z-10 w-full max-w-4xl mt-12 mb-16 px-4">
        <motion.div
           initial={{ opacity: 0, y: 10 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
           className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-50 border border-zinc-200 mb-8 shadow-sm"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
          <span className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase">Available for new projects</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl md:text-[5.5rem] font-bold tracking-tight text-[#1d1d1f] leading-[1.05] mb-6"
        >
          Elite Web Apps & <br />
          <span className="text-zinc-400">Process Automation.</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-base md:text-xl text-zinc-500 max-w-2xl font-medium leading-relaxed mb-10 px-4"
        >
          Bespoke digital solutions with zero upfront risk. <br className="hidden md:block"/>
          We build production-ready systems for modern companies.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto px-6"
        >
          <Button 
            onClick={onBookClick}
            className="h-14 w-full sm:w-auto px-10 text-[15px] font-bold rounded-2xl bg-zinc-950 text-white hover:bg-zinc-800 transition-all shadow-xl shadow-zinc-200 active:scale-95"
          >
            Get a Demo
          </Button>
          <Button 
            variant="outline"
            onClick={() => window.scrollTo({ top: 1000, behavior: 'smooth' })}
            className="h-14 w-full sm:w-auto px-10 text-[15px] font-bold rounded-2xl border-zinc-200 text-zinc-600 hover:bg-zinc-50 transition-all font-sans"
          >
            View Work
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
