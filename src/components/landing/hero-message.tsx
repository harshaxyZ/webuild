"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function HeroMessage({ onBookClick }: { onBookClick?: () => void }) {
  return (
    <section className="relative py-40 flex flex-col items-center justify-center text-center px-6 overflow-hidden bg-zinc-950">
      {/* Premium Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-500/10 blur-[120px] rounded-full mix-blend-screen pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[300px] bg-indigo-500/10 blur-[120px] rounded-full mix-blend-screen pointer-events-none" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 max-w-5xl"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/50 border border-zinc-800 backdrop-blur-md mb-8">
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
          <span className="text-xs font-semibold tracking-widest text-zinc-300 uppercase">Next-Gen Architecture</span>
        </div>
        
        <h1 className="text-6xl md:text-8xl font-bold tracking-tight text-white mb-8 leading-[0.9]">
          Engineering elite <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">digital experiences.</span>
        </h1>
        
        <p className="max-w-2xl mx-auto text-xl md:text-2xl font-medium text-zinc-400 mb-12 leading-tight">
          We turn your most ambitious visions into production-ready reality. <br className="hidden md:block"/>
          World-class engineering, delivered with zero upfront risk.
        </p>

        <Button 
          className="h-16 px-12 text-xl rounded-2xl bg-white text-zinc-950 shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_-15px_rgba(255,255,255,0.5)] hover:scale-105 transition-all duration-500 font-bold" 
          onClick={onBookClick}
        >
          Initiate Project
        </Button>
      </motion.div>
    </section>
  );
}
