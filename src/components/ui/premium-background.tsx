"use client";

import { motion } from "framer-motion";

export function PremiumBackground() {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0 bg-background">
      {/* Deep Mesh Gradient */}
      <div className="absolute inset-0 opacity-[0.15] dark:opacity-[0.25]" style={{
        backgroundImage: 'radial-gradient(circle at 15% 50%, rgba(255,255,255,0.08), transparent 25%), radial-gradient(circle at 85% 30%, rgba(255,255,255,0.04), transparent 25%)'
      }} />

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" style={{
        backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
        backgroundSize: '4rem 4rem'
      }} />

      {/* Animated Rings */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-white/5 dark:border-white/10"
        animate={{ rotate: 360, scale: [1, 1.05, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] rounded-full border border-white/5 dark:border-white/10 border-dashed"
        animate={{ rotate: -360, scale: [1, 1.02, 1] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />

      {/* Floating Geometric Orbs (Abstract) */}
      <motion.div
        className="absolute top-[20%] left-[20%] w-[400px] h-[400px] bg-zinc-400/10 dark:bg-zinc-800/20 rounded-full blur-[80px]"
        animate={{ 
          x: [0, 50, -20, 0],
          y: [0, -30, 40, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[20%] right-[20%] w-[500px] h-[500px] bg-zinc-300/10 dark:bg-zinc-700/20 rounded-full blur-[100px]"
        animate={{ 
          x: [0, -40, 30, 0],
          y: [0, 50, -20, 0],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 w-full h-[300px] bg-gradient-to-t from-background to-transparent" />
    </div>
  );
}
