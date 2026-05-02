"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const PREMIUM_EASE = [0.16, 1, 0.3, 1] as const;

export function HeroCinematic({ onBookClick }: { onBookClick: () => void }) {
  return (
    <section className="relative w-full min-h-screen bg-zinc-950 overflow-hidden flex flex-col pt-32 pb-20">
      {/* ── PREMIUM BACKGROUND ── */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Animated Lines Background */}
        <div className="absolute inset-0 opacity-20">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ 
                pathLength: [0, 1, 1, 0],
                opacity: [0, 1, 1, 0],
                y: [0, -20, 20, 0]
              }}
              transition={{ 
                duration: 10 + i * 2, 
                repeat: Infinity, 
                ease: "linear",
                delay: i * 2 
              }}
              className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-rose-500 to-transparent"
              style={{ top: `${20 + i * 15}%` }}
            />
          ))}
        </div>
        {/* Radial Glows */}
        <div className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] bg-rose-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px]" />
      </div>

      {/* ── CONTENT ── */}
      <div className="relative z-30 container mx-auto px-6 md:px-12 flex-1 flex flex-col justify-center">
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
            className="text-[2.25rem] sm:text-6xl md:text-8xl lg:text-[7.5rem] tracking-tight text-white mb-8 leading-[1.1] md:leading-[0.95] font-black"
          >
            We build websites<br />
            that get you <span className="text-rose-500">clients.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: PREMIUM_EASE }}
            className="text-lg md:text-2xl text-zinc-400 max-w-2xl font-medium leading-relaxed mb-12"
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
              className="btn-pill h-16 px-10 text-lg font-bold bg-white text-zinc-950 hover:bg-zinc-200 flex items-center gap-2 group"
            >
              Get My Free Demo
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </Button>
            <Button
              variant="outline"
              className="btn-pill h-16 px-10 text-lg font-bold border-white/10 bg-white/5 text-white hover:bg-white/10"
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
    </section>
  );
}

/* ── Micro-components ── */
function StatBox({ label, value, change }: { label: string; value: string; change: string }) {
  return (
    <div className="bg-zinc-50 rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-zinc-100 shadow-sm transition-all hover:bg-white hover:shadow-md">
      <div className="text-[8px] sm:text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1">{label}</div>
      <div className="text-base sm:text-xl font-black text-zinc-900">{value}</div>
      <div className="text-[8px] sm:text-[10px] font-bold text-green-500 mt-1">{change}</div>
    </div>
  );
}

function LiveItem({ icon, iconBg, iconColor, title, sub, trailing }: {
  icon: string; iconBg: string; iconColor: string; title: string; sub: string; trailing: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-2 sm:gap-3 bg-white rounded-lg sm:rounded-xl p-2 sm:p-3 shadow-[0_4px_12px_rgba(0,0,0,0.04)] border border-zinc-100 transition-all hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)]">
      <div className={`w-6 h-6 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl ${iconBg} flex items-center justify-center ${iconColor} text-xs sm:text-sm shadow-sm`}>{icon}</div>
      <div className="flex-1 min-w-0">
        <div className="text-[10px] sm:text-xs font-bold text-zinc-800 truncate">{title}</div>
        <div className="text-[8px] sm:text-[10px] text-zinc-400 mt-0.5">{sub}</div>
      </div>
      {trailing}
    </div>
  );
}
