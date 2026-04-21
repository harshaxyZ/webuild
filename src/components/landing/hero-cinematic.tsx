"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const PREMIUM_EASE = [0.16, 1, 0.3, 1] as const;

export function HeroCinematic({ onBookClick }: { onBookClick: () => void }) {
  return (
    <section className="relative w-full h-[90vh] min-h-[600px] bg-[#fbfbfd] overflow-hidden flex items-center justify-center">
      {/* ── BACKGROUND IMAGE ── */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src="/hero-cinematic.webp"
          alt="Hero Background"
          className="w-full h-full object-cover object-center"
          loading="eager"
          fetchPriority="high"
        />
        {/* Subtle overlay for readability, keeping image bright */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/5 to-black/30" />
      </div>

      {/* ── HEADLINE & TEXT ── */}
      <div className="relative z-30 flex flex-col items-center justify-center">
        <div className="text-center px-6 max-w-[1000px] mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: PREMIUM_EASE }}
            className="text-[3.5rem] sm:text-6xl md:text-8xl lg:text-[7.5rem] tracking-tight text-white mb-6 leading-[1.05] font-heading"
            style={{
              textShadow: "0 10px 40px rgba(0,0,0,0.4), 0 2px 10px rgba(0,0,0,0.2)",
              fontWeight: 500,
              fontStyle: "italic"
            }}
          >
            The Lost Art of<br />
            Digital Dough.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: PREMIUM_EASE }}
            className="text-base sm:text-lg md:text-xl text-white/90 max-w-md md:max-w-xl mx-auto font-sans font-medium leading-relaxed mb-10 shadow-sm"
            style={{ textShadow: "0 2px 10px rgba(0,0,0,0.6)" }}
          >
            High-end web experiences crafted for brands who command authority. Elevate your presence deeply.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: PREMIUM_EASE }}
          >
            <Button
              onClick={onBookClick}
              className="h-14 sm:h-16 px-10 md:px-14 text-base md:text-lg font-sans font-semibold rounded-full bg-zinc-950 text-white hover:bg-zinc-800 hover:scale-[1.03] shadow-[0_10px_30px_rgba(0,0,0,0.3)] active:scale-[0.98] transition-all duration-300"
            >
              Apply for a Tour
            </Button>
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
