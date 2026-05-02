"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import FloatingLines from "@/components/floating-lines";

const PREMIUM_EASE = [0.16, 1, 0.3, 1] as const;

export function HeroCinematic({ onBookClick }: { onBookClick: () => void }) {
  const [lineCount, setLineCount] = useState(8);

  useEffect(() => {
    const handleResize = () => setLineCount(window.innerWidth < 768 ? 4 : 8);
    handleResize(); // Set initial value
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section className="relative w-full min-h-screen bg-zinc-950 overflow-hidden flex flex-col pt-32 pb-[60px] md:pb-[100px]">
      {/* ── FLOATING LINES BACKGROUND ── */}
      <div style={{ width: '100%', height: '100%', position: 'absolute', inset: 0, zIndex: 0 }}>
        <FloatingLines
          enabledWaves={["top","middle","bottom"]}
          lineCount={[lineCount]}
          lineDistance={[8]}
          bendRadius={8}
          bendStrength={-2}
          interactive
          parallax={true}
          animationSpeed={1}
          linesGradient={["#e945f5", "#6f6f6f", "#6a6a6a"]}
        />
        
        {/* Radial Glows */}
        <div className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] bg-rose-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px]" />
      </div>

      {/* ── CONTENT ── */}
      <div className="relative" style={{ zIndex: 10 }}>
        <div className="container mx-auto px-[20px] md:px-[6%] flex-1 flex flex-col justify-center">
          <div className="max-w-[1000px]">
            {/* Status Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: PREMIUM_EASE }}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 shadow-sm mb-10"
            >
              <span className="text-[13px] font-semibold text-zinc-300 tracking-tight flex items-center gap-2">
                <span className="text-rose-500">✦</span> Trusted by businesses across India
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.3, ease: PREMIUM_EASE }}
              className="text-[clamp(2rem,6vw,7.5rem)] tracking-tight text-white mb-8 leading-[1.1] md:leading-[0.95] font-black"
            >
              We build websites<br />
              that get you <span className="text-rose-500 font-playfair italic font-medium">customers.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5, ease: PREMIUM_EASE }}
              className="text-base md:text-2xl text-zinc-400 max-w-2xl font-medium leading-relaxed mb-12"
            >
              Your competitors already have a website. Make sure yours wins.<br className="hidden md:block" />
              Free demo delivered in 48 hours — no risk, no upfront payment.
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7, ease: PREMIUM_EASE }}
              className="flex flex-col sm:flex-row gap-4 mb-12"
            >
              <Button
                onClick={onBookClick}
                className="btn-pill min-h-[44px] h-14 md:h-16 px-10 text-base md:text-lg font-bold bg-white text-zinc-950 hover:bg-zinc-200 flex items-center gap-2 group"
              >
                Get My Free Demo
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </Button>
              <Button
                variant="outline"
                className="btn-pill min-h-[44px] h-14 md:h-16 px-10 text-base md:text-lg font-bold border-white/10 bg-white/5 text-white hover:bg-white/10"
                onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
              >
                See How It Works
              </Button>
            </motion.div>

            {/* Trust Lines */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
              className="flex flex-wrap gap-8 md:gap-12"
            >
              <div className="flex items-center gap-2">
                <span className="text-rose-500 font-bold text-xl">✓</span>
                <span className="text-[15px] font-bold text-zinc-400">Free demo in 48 hours</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-rose-500 font-bold text-xl">✓</span>
                <span className="text-[15px] font-bold text-zinc-400">Pay only when you love it</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
