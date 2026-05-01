"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const PREMIUM_EASE = [0.16, 1, 0.3, 1] as const;

export function HeroCinematic({ onBookClick }: { onBookClick: () => void }) {
  return (
    <section className="relative w-full min-h-screen bg-[#fbfbfd] overflow-hidden flex flex-col pt-32 pb-20">
      {/* ── BACKGROUND IMAGE ── */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <img
          src="/new-hero.png"
          alt="Hero Background"
          className="w-full h-full object-cover object-[center_top]"
          loading="eager"
          fetchPriority="high"
        />
        {/* Subtle overlay for better contrast if needed */}
        <div className="absolute inset-0 bg-white/10" />
      </div>

      {/* ── CONTENT ── */}
      <div className="relative z-30 container mx-auto px-6 md:px-12 flex-1 flex flex-col justify-center">
        <div className="max-w-[1000px]">
          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: PREMIUM_EASE }}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/80 backdrop-blur-md border border-white/40 shadow-sm mb-12"
          >
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[13px] font-semibold text-zinc-800 tracking-tight">Now accepting new projects</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.3, ease: PREMIUM_EASE }}
            className="text-[3.5rem] sm:text-6xl md:text-8xl lg:text-[7.5rem] tracking-tight text-zinc-950 mb-8 leading-[0.95] font-black"
          >
            We build websites<br />
            that get you <span className="text-[#e94e77]">clients.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: PREMIUM_EASE }}
            className="text-lg md:text-2xl text-zinc-600 max-w-2xl font-medium leading-relaxed mb-12"
          >
            Premium websites for any Indian business.<br className="hidden md:block" />
            Free working demo in 48 hours.
          </motion.p>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7, ease: PREMIUM_EASE }}
            className="flex flex-wrap gap-8 md:gap-12 mb-12"
          >
            <div className="flex items-center gap-3">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#18181b" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span className="text-lg font-bold text-zinc-900">Free demo in 48h</span>
            </div>
            <div className="flex items-center gap-3">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#18181b" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span className="text-lg font-bold text-zinc-900">No upfront payment required</span>
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
