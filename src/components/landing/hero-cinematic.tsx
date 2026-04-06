"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const EASE = [0.22, 1, 0.36, 1] as const;

/* ─── Floating stat cards ─── */
const floatingCards = [
  { label: "+42 leads", sub: "this month", dx: -52, dy: -18, mDx: -38, mDy: -14, delay: 0 },
  { label: "Automation", sub: "active", dx: 52, dy: -22, mDx: 38, mDy: -12, delay: 0.15 },
  { label: "Conversions ↑", sub: "18.4%", dx: -48, dy: 20, mDx: -36, mDy: 16, delay: 0.3 },
  { label: "Bookings ↑", sub: "12 new", dx: 50, dy: 18, mDx: 34, mDy: 14, delay: 0.45 },
];

export function HeroCinematic({ onBookClick }: { onBookClick: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  /* ── PHASE 1+2: Background parallax ── */
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", isMobile ? "10%" : "20%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.05, isMobile ? 1.1 : 1.2]);

  /* ── PHASE 2: Text fade & lift ── */
  const textOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.25], [0, -60]);

  /* ── PHASE 3: Phone mockup rise ── */
  const phoneY = useTransform(scrollYProgress, [0.1, 0.4], [120, 0]);
  const phoneOpacity = useTransform(scrollYProgress, [0.1, 0.28], [0, 1]);
  const phoneScale = useTransform(scrollYProgress, [0.1, 0.4], [0.95, 1]);

  /* ── PHASE 4: Floating UI cards ── */
  const cardsOpacity = useTransform(scrollYProgress, [0.28, 0.45], [0, 1]);
  const cardsScale = useTransform(scrollYProgress, [0.28, 0.45], [0.85, 1]);

  /* ── PHASE 5: Phone continues to drift ── */
  const phoneImmerse = useTransform(scrollYProgress, [0.5, 0.8], [1, 0.92]);
  const phoneImmerseY = useTransform(scrollYProgress, [0.5, 0.8], [0, -30]);

  /* ── PHASE 6: Smooth exit ── */
  const exitOpacity = useTransform(scrollYProgress, [0.85, 1], [1, 0]);

  /* ── Mid layer ── */
  const midY = useTransform(scrollYProgress, [0, 1], ["0%", isMobile ? "20%" : "40%"]);
  const fgY = useTransform(scrollYProgress, [0, 1], ["0%", isMobile ? "30%" : "60%"]);

  return (
    <section ref={containerRef} className="relative w-full h-[280vh] md:h-[300vh]">
      {/* ═══ STICKY VIEWPORT ═══ */}
      <motion.div style={{ opacity: exitOpacity }} className="sticky top-0 w-full h-screen overflow-hidden">

        {/* ─── L1: BACKGROUND — "new image" ─── */}
        <motion.div
          style={{ y: bgY, scale: bgScale }}
          className="absolute inset-[-10%] will-change-transform"
        >
          <img
            src="/hero-cinematic.webp"
            alt=""
            className="w-full h-full object-cover"
            loading="eager"
            fetchPriority="high"
          />
          {/* Cinematic gradient: depth + readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-black/60" />
        </motion.div>

        {/* ─── L2: Mid-depth gradient ─── */}
        <motion.div style={{ y: midY }} className="absolute inset-0 pointer-events-none will-change-transform">
          <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-black/60 to-transparent" />
        </motion.div>

        {/* ─── L3: Foreground particles ─── */}
        <motion.div style={{ y: fgY }} className="absolute inset-0 pointer-events-none will-change-transform">
          <div className="absolute top-[12%] left-[18%] w-2 h-2 rounded-full bg-rose-300/30 animate-float-slow" />
          <div className="absolute top-[28%] right-[22%] w-3 h-3 rounded-full bg-rose-200/25 animate-float-medium" />
          <div className="absolute top-[45%] left-[55%] w-1.5 h-1.5 rounded-full bg-pink-300/30 animate-float-fast" />
          <div className="absolute top-[18%] right-[38%] w-2 h-2 rounded-full bg-rose-400/15 animate-float-slow hidden md:block" />
          <div className="absolute top-[60%] left-[25%] w-2.5 h-2.5 rounded-full bg-rose-300/20 animate-float-medium hidden md:block" />
        </motion.div>

        {/* ─── L4: HEADLINE + CTA ─── */}
        <motion.div
          style={{ opacity: textOpacity, y: textY }}
          className="absolute inset-0 z-30 flex flex-col items-center justify-center will-change-transform"
        >
          <div className="text-center px-6 max-w-4xl mx-auto">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.3 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 mb-6 md:mb-8"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse" />
              <span className="text-[9px] md:text-[10px] font-bold tracking-[0.2em] text-white/80 uppercase">
                Product Architects
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.5, ease: EASE }}
              className="text-[2.5rem] leading-[1] sm:text-5xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tight text-white mb-5 md:mb-6"
              style={{ textShadow: "0 4px 30px rgba(0,0,0,0.3)" }}
            >
              Websites that
              <br />
              <span className="text-rose-400">actually convert.</span>
            </motion.h1>

            {/* Sub */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.7, ease: EASE }}
              className="text-sm sm:text-base md:text-lg text-white/65 max-w-md md:max-w-xl mx-auto font-medium leading-relaxed mb-8 md:mb-10"
            >
              Precision-engineered platforms & automations
              <br className="hidden sm:block" />
              that turn visitors into measurable growth.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9, ease: EASE }}
              className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-4"
            >
              <Button
                onClick={onBookClick}
                className="h-13 sm:h-14 md:h-16 w-full sm:w-52 md:w-56 text-sm sm:text-base md:text-lg font-bold rounded-2xl bg-white text-zinc-900 hover:bg-white/90 shadow-2xl active:scale-[0.97] transition-all"
              >
                Book a Demo
                <motion.span
                  className="ml-2 inline-block"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >→</motion.span>
              </Button>
              <Button
                variant="outline"
                onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}
                className="h-13 sm:h-14 md:h-16 w-full sm:w-52 md:w-56 text-sm sm:text-base md:text-lg font-bold rounded-2xl border-2 border-white/25 text-white hover:bg-white/10 transition-all backdrop-blur-sm"
              >
                View Work
              </Button>
            </motion.div>
          </div>
        </motion.div>

        {/* ─── L5: PHONE MOCKUP ─── */}
        <motion.div
          style={{ y: phoneY, opacity: phoneOpacity, scale: phoneScale }}
          className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-40 w-[220px] sm:w-[280px] md:w-[340px] lg:w-[380px] will-change-transform"
        >
          <motion.div style={{ scale: phoneImmerse, y: phoneImmerseY }} className="will-change-transform">
            {/* Phone Shell */}
            <div className="relative rounded-[2rem] sm:rounded-[2.5rem] md:rounded-[3rem] bg-zinc-950 p-1.5 sm:p-2 shadow-[0_40px_100px_-10px_rgba(0,0,0,0.6)] border border-white/10">
              {/* Dynamic Island */}
              <div className="absolute top-1 sm:top-1.5 left-1/2 -translate-x-1/2 w-20 sm:w-24 md:w-28 h-5 sm:h-6 bg-zinc-950 rounded-b-xl sm:rounded-b-2xl z-10" />
              
              {/* Screen */}
              <div className="relative rounded-[1.5rem] sm:rounded-[2rem] md:rounded-[2.5rem] overflow-hidden bg-white aspect-[9/19.5]">
                <div className="p-3 sm:p-4 pt-7 sm:pt-8 bg-gradient-to-b from-zinc-50 to-white h-full flex flex-col">
                  {/* App Header */}
                  <div className="flex items-center justify-between mb-4 sm:mb-6">
                    <span className="text-[8px] sm:text-[10px] font-black tracking-tight text-zinc-900">we build</span>
                    <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-rose-500" />
                  </div>
                  
                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                    <StatBox label="Visitors" value="2,847" change="+12.4%" />
                    <StatBox label="Converts" value="342" change="+8.1%" />
                  </div>
                  
                  {/* Chart */}
                  <div className="bg-zinc-50 rounded-lg sm:rounded-xl p-2 sm:p-3 border border-zinc-100 mb-3 sm:mb-4">
                    <div className="text-[7px] sm:text-[8px] font-bold text-zinc-400 uppercase tracking-wider mb-2 sm:mb-3">Revenue</div>
                    <div className="flex items-end gap-[2px] sm:gap-1 h-10 sm:h-14 md:h-16">
                      {[40, 55, 35, 65, 50, 80, 70, 90, 75, 95, 85, 100].map((h, i) => (
                        <div key={i} className="flex-1 bg-rose-400 rounded-[1px] sm:rounded-sm opacity-80" style={{ height: `${h}%` }} />
                      ))}
                    </div>
                  </div>
                  
                  {/* Live Items */}
                  <div className="space-y-1.5 sm:space-y-2 mt-auto">
                    <LiveItem icon="A" iconBg="bg-rose-100" iconColor="text-rose-500" title="Automation active" sub="CRM sync running" trailing={<div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-400 animate-pulse" />} />
                    <LiveItem icon="L" iconBg="bg-blue-100" iconColor="text-blue-500" title="Lead captured" sub="2 min ago" trailing={<span className="text-[8px] sm:text-[9px] font-bold text-rose-500">+1</span>} />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* ─── L6: FLOATING UI CARDS ─── */}
        <motion.div
          style={{ opacity: cardsOpacity, scale: cardsScale }}
          className="absolute inset-0 z-50 pointer-events-none will-change-transform"
        >
          {floatingCards.map((card, i) => (
            <motion.div
              key={i}
              animate={{ y: [0, -6, 0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 3.5 + i * 0.4, ease: "easeInOut" }}
              className="absolute"
              style={{
                left: `calc(50% + ${isMobile ? card.mDx : card.dx}%)`,
                top: `calc(50% + ${isMobile ? card.mDy : card.dy}%)`,
              }}
            >
              <div className="bg-white/85 backdrop-blur-xl rounded-xl sm:rounded-2xl px-3 sm:px-5 py-2 sm:py-3 shadow-2xl border border-white/40">
                <div className="text-[10px] sm:text-sm font-black text-zinc-900 tracking-tight whitespace-nowrap">{card.label}</div>
                <div className="text-[8px] sm:text-[10px] font-bold text-zinc-400">{card.sub}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </motion.div>
    </section>
  );
}

/* ── Micro-components ── */
function StatBox({ label, value, change }: { label: string; value: string; change: string }) {
  return (
    <div className="bg-zinc-50 rounded-lg sm:rounded-xl p-2 sm:p-3 border border-zinc-100">
      <div className="text-[7px] sm:text-[8px] font-bold text-zinc-400 uppercase tracking-wider">{label}</div>
      <div className="text-sm sm:text-lg font-black text-zinc-900">{value}</div>
      <div className="text-[7px] sm:text-[8px] font-bold text-green-500">{change}</div>
    </div>
  );
}

function LiveItem({ icon, iconBg, iconColor, title, sub, trailing }: {
  icon: string; iconBg: string; iconColor: string; title: string; sub: string; trailing: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-1.5 sm:gap-2 bg-zinc-50 rounded-md sm:rounded-lg p-1.5 sm:p-2.5 border border-zinc-100">
      <div className={`w-5 h-5 sm:w-7 sm:h-7 rounded-md sm:rounded-lg ${iconBg} flex items-center justify-center ${iconColor} text-[8px] sm:text-[10px] font-black`}>{icon}</div>
      <div className="flex-1 min-w-0">
        <div className="text-[8px] sm:text-[9px] font-bold text-zinc-700 truncate">{title}</div>
        <div className="text-[7px] sm:text-[8px] text-zinc-400">{sub}</div>
      </div>
      {trailing}
    </div>
  );
}
