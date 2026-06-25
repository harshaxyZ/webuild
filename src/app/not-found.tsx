"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#030303] text-white flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Background Grids */}
      <div className="global-grid" />

      {/* Floating orbs */}
      <div className="absolute top-[20%] left-[20%] w-[40%] h-[40%] bg-[radial-gradient(circle,rgba(196,156,113,0.06)_0%,transparent_60%)] pointer-events-none blur-[80px]" />
      
      <div className="relative z-10 flex flex-col items-center text-center max-w-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-[var(--muted)] mb-8"
        >
          <Compass className="w-8 h-8 animate-pulse text-neutral-400" />
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-8xl font-bold tracking-tighter mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-400"
        >
          404
        </motion.h1>

        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-xl font-medium tracking-tight mb-3 text-neutral-200"
        >
          Lost in Orbit
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="text-neutral-500 text-sm leading-relaxed mb-10 max-w-xs"
        >
          The page or digital product you are searching for has drifted away. Let's get you back on track.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <Link 
            href="/" 
            className="flex items-center gap-2 bg-white text-black px-6 py-3.5 rounded-full text-sm font-semibold hover:bg-neutral-200 transition-colors shadow-[0_4px_20px_rgba(255,255,255,0.1)] group active:scale-95"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" /> Return Home
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
