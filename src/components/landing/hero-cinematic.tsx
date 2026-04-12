"use client";

import { motion, useScroll, useTransform, useSpring, useReducedMotion } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const EASE = [0.16, 1, 0.3, 1] as const;

/* ─── Floating stat cards ─── */
const floatingCards = [
  { label: "+42 leads", sub: "this month", dx: -55, dy: -20, mDx: -40, mDy: -15, delay: 0 },
  { label: "Automation", sub: "active", dx: 55, dy: -25, mDx: 40, mDy: -15, delay: 0.15 },
  { label: "Conversions ↑", sub: "18.4%", dx: -50, dy: 22, mDx: -38, mDy: 18, delay: 0.3 },
  { label: "Bookings ↑", sub: "12 new", dx: 53, dy: 20, mDx: 36, mDy: 16, delay: 0.45 },
];

export function HeroCinematic({ onBookClick }: { onBookClick: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const prefersReducedMotion = useReducedMotion();

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

  const smoothScrollY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  /* ── PHASE 1+2: Background parallax (much slower, premium feel) ── */
  const bgY = useTransform(smoothScrollY, [0, 1], ["0%", isMobile ? "15%" : "30%"]);
  const bgScale = useTransform(smoothScrollY, [0, 1], [1.02, isMobile ? 1.08 : 1.15]);

  /* ── PHASE 2: Text fade & lift ── */
  const textOpacity = useTransform(smoothScrollY, [0, 0.25], [1, 0]);
  const textY = useTransform(smoothScrollY, [0, 0.25], [0, -80]);
  const textScale = useTransform(smoothScrollY, [0, 0.25], [1, 0.95]);

  /* ── PHASE 3: Phone mockup rise ── */
  const phoneY = useTransform(smoothScrollY, [0.05, 0.4], [150, 0]);
  const phoneOpacity = useTransform(smoothScrollY, [0.05, 0.3], [0, 1]);
  const phoneScale = useTransform(smoothScrollY, [0.05, 0.4], [0.92, 1]);

  /* ── PHASE 4: Floating UI cards ── */
  const cardsOpacity = useTransform(smoothScrollY, [0.25, 0.45], [0, 1]);
  const cardsScale = useTransform(smoothScrollY, [0.25, 0.45], [0.85, 1]);
  const cardsY = useTransform(smoothScrollY, [0.25, 0.45], [40, 0]);

  /* ── PHASE 5: Phone continues to drift ── */
  const phoneImmerse = useTransform(smoothScrollY, [0.5, 0.8], [1, 0.92]);
  const phoneImmerseY = useTransform(smoothScrollY, [0.5, 0.8], [0, -40]);

  /* ── PHASE 6: Smooth exit ── */
  const exitOpacity = useTransform(smoothScrollY, [0.85, 1], [1, 0]);

  /* ── Multi-layer Parallax Elements ── */
  const midY = useTransform(smoothScrollY, [0, 1], ["0%", isMobile ? "-20%" : "-40%"]);
  const fgY = useTransform(smoothScrollY, [0, 1], ["0%", isMobile ? "-30%" : "-60%"]);
  const blurAmount = useTransform(smoothScrollY, [0, 0.5], ["0px", "10px"]);

  return (
    <section ref={containerRef} className="relative w-full h-[280vh] md:h-[320vh] bg-zinc-950">
      {/* ═══ STICKY VIEWPORT ═══ */}
      <motion.div style={{ opacity: exitOpacity }} className="sticky top-0 w-full h-screen overflow-hidden">

        {/* ─── L1: BACKGROUND — layered and blurred ─── */}
        <motion.div
          style={{ y: bgY, scale: bgScale, filter: `blur(${blurAmount.get()})` }}
          className="absolute inset-[-10%] will-change-transform"
        >
          <img
            src="/hero-cinematic.webp"
            alt="Hero Background"
            className="w-full h-full object-cover opacity-90"
            loading="eager"
            fetchPriority="high"
          />
          {/* Layered cinematic gradient for ultimate depth */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-zinc-950/20 to-zinc-950" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-rose-900/10 via-transparent to-transparent" />
        </motion.div>

        {/* ─── L2: Mid-layer Elements (moves up slowly) ─── */}
        <motion.div style={{ y: midY }} className="absolute inset-0 pointer-events-none will-change-transform flex justify-center items-center">
            {/* Soft backdrop glow behind main text */}
            <div className="absolute top-[20%] w-[600px] h-[600px] bg-rose-500/5 rounded-full blur-[100px] mix-blend-screen" />
        </motion.div>

        {/* ─── L3: Foreground particles (moves up faster) ─── */}
        <motion.div style={{ y: fgY }} className="absolute inset-0 pointer-events-none will-change-transform">
          <div className="absolute top-[15%] left-[20%] w-[3px] h-[3px] rounded-full bg-rose-300/40 animate-float-slow shadow-[0_0_10px_2px_rgba(251,113,133,0.3)]" />
          <div className="absolute top-[35%] right-[25%] w-[4px] h-[4px] rounded-full bg-rose-200/30 animate-float-medium shadow-[0_0_12px_2px_rgba(251,113,133,0.2)]" />
          <div className="absolute top-[50%] left-[60%] w-[2px] h-[2px] rounded-full bg-pink-300/40 animate-float-fast" />
          <div className="absolute top-[20%] right-[35%] w-[3px] h-[3px] rounded-full bg-rose-400/20 animate-float-slow hidden md:block" />
          <div className="absolute top-[65%] left-[28%] w-[5px] h-[5px] rounded-full bg-rose-300/25 animate-float-medium hidden md:block blur-[1px]" />
        </motion.div>

        {/* ─── L4: HEADLINE + CTA ─── */}
        <motion.div
          style={{ opacity: textOpacity, y: textY, scale: textScale }}
          className="absolute inset-0 z-30 flex flex-col items-center justify-center will-change-transform"
        >
          <div className="text-center px-6 max-w-[1000px] mx-auto">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: EASE, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-[2rem] bg-zinc-900/40 backdrop-blur-xl border border-white/10 mb-8 md:mb-10 shadow-[0_8px_30px_rgb(0,0,0,0.12)]"
            >
              <span className="w-2 h-2 rounded-full bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.6)] animate-pulse" />
              <span className="text-[10px] md:text-xs font-bold tracking-[0.25em] text-white/90 uppercase">
                Premium Digital Experiences
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.4, ease: EASE }}
              className="text-[3rem] sm:text-6xl md:text-8xl lg:text-[7rem] font-heading font-medium tracking-tight text-white mb-6 md:mb-8 leading-[1.05]"
              style={{ textShadow: "0 10px 40px rgba(0,0,0,0.5)" }}
            >
              Websites that
              <br />
              <span className="text-rose-400 font-heading italic pr-4">actually convert.</span>
            </motion.h1>

            {/* Sub */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6, ease: EASE }}
              className="text-base sm:text-lg md:text-xl text-zinc-400 max-w-md md:max-w-2xl mx-auto font-medium leading-relaxed mb-10 md:mb-14"
            >
              Precision-engineered platforms & automations
              <br className="hidden sm:block" />
              that turn visitors into measurable growth.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8, ease: EASE }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 px-4"
            >
              <Button
                onClick={onBookClick}
                className="h-14 sm:h-16 md:h-16 w-full sm:w-60 md:w-64 text-base md:text-lg font-bold rounded-[1.25rem] bg-white text-zinc-900 hover:bg-zinc-100 hover:scale-[1.02] shadow-[0_0_40px_rgba(255,255,255,0.15)] active:scale-[0.98] transition-all duration-300"
              >
                Book a Demo
                <motion.span
                  className="ml-2 inline-block"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                >→</motion.span>
              </Button>
              <Button
                variant="outline"
                onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}
                className="h-14 sm:h-16 md:h-16 w-full sm:w-60 md:w-64 text-base md:text-lg font-bold rounded-[1.25rem] border-2 border-white/10 text-white hover:bg-white/5 hover:border-white/20 transition-all duration-300 backdrop-blur-md"
              >
                View Work
              </Button>
            </motion.div>
          </div>
        </motion.div>

        {/* ─── L5: PHONE MOCKUP (Smoother entry and depth) ─── */}
        <motion.div
          style={{ y: phoneY, opacity: phoneOpacity, scale: phoneScale }}
          className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-40 w-[240px] sm:w-[300px] md:w-[360px] lg:w-[400px] will-change-transform"
        >
          <motion.div style={{ scale: phoneImmerse, y: phoneImmerseY }} className="will-change-transform">
            {/* Soft ambient glow behind phone */}
            <div className="absolute -inset-4 bg-rose-500/20 blur-[60px] rounded-full z-0 pointer-events-none" />
            
            {/* Phone Shell */}
            <div className="relative z-10 rounded-[2.5rem] sm:rounded-[3rem] md:rounded-[3.5rem] bg-zinc-900 p-2 sm:p-2.5 shadow-[0_40px_100px_-10px_rgba(0,0,0,0.8)] border border-white/10">
              {/* Dynamic Island */}
              <div className="absolute top-2 sm:top-2.5 left-1/2 -translate-x-1/2 w-24 sm:w-28 md:w-32 h-6 sm:h-7 bg-zinc-950 rounded-b-xl sm:rounded-b-2xl z-20 shadow-inner" />
              
              {/* Screen */}
              <div className="relative rounded-[2rem] sm:rounded-[2.5rem] md:rounded-[3rem] overflow-hidden bg-white aspect-[9/19.5] shadow-inner">
                <div className="p-4 sm:p-5 pt-8 sm:pt-10 bg-gradient-to-b from-zinc-50 to-white h-full flex flex-col">
                  {/* App Header */}
                  <div className="flex items-center justify-between mb-5 sm:mb-8">
                    <span className="text-[10px] sm:text-xs font-black tracking-tight text-zinc-900">we build</span>
                    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-rose-50" />
                  </div>
                  
                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-4 sm:mb-5">
                    <StatBox label="Visitors" value="2,847" change="+12.4%" />
                    <StatBox label="Converts" value="342" change="+8.1%" />
                  </div>
                  
                  {/* Chart */}
                  <div className="bg-zinc-50 rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-zinc-100 mb-4 sm:mb-5 shadow-sm">
                    <div className="flex justify-between items-center mb-3 sm:mb-4">
                      <div className="text-[8px] sm:text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Revenue</div>
                      <div className="w-4 h-4 rounded-full bg-rose-50" />
                    </div>
                    <div className="flex items-end gap-1 h-12 sm:h-16 md:h-20">
                      {[40, 55, 35, 65, 50, 80, 70, 90, 75, 95, 85, 100].map((h, i) => (
                        <motion.div 
                          key={i} 
                          initial={prefersReducedMotion ? false : { height: "0%" }}
                          whileInView={prefersReducedMotion ? false : { height: `${h}%` }}
                          viewport={{ once: true, margin: "-100px" }}
                          transition={{ duration: 0.8, delay: 0.2 + (i * 0.05), ease: "easeOut" }}
                          className="flex-1 bg-gradient-to-t from-rose-500 rounded-sm to-rose-400 shadow-[0_2px_10px_rgba(244,63,94,0.3)]" style={{ height: prefersReducedMotion ? `${h}%` : "0%" }} 
                        />
                      ))}
                    </div>
                  </div>
                  
                  {/* Live Items */}
                  <div className="space-y-2 max-h-[140px] overflow-hidden mt-auto">
                    <LiveItem icon="⚡" iconBg="bg-rose-100" iconColor="text-rose-500" title="Automation active" sub="CRM sync running" trailing={<div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)] animate-pulse" />} />
                    <LiveItem icon="✨" iconBg="bg-blue-100" iconColor="text-blue-500" title="Lead captured" sub="2 min ago" trailing={<span className="text-[9px] sm:text-[11px] font-bold text-rose-500 bg-rose-50 px-2 py-1 rounded-full">+1</span>} />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* ─── L6: FLOATING UI CARDS (Staggered parallax layers) ─── */}
        <motion.div
           style={{ opacity: cardsOpacity, scale: cardsScale, y: cardsY }}
           className="absolute inset-0 z-50 pointer-events-none will-change-transform"
        >
          {floatingCards.map((card, i) => {
            // Apply different parallax speeds for deep floating effect
            const individualParallaxY = useTransform(smoothScrollY, [0.25, 0.5], [i % 2 === 0 ? 50 : 80, 0]);
            return (
            <motion.div
              key={i}
              style={{ y: individualParallaxY }}
              className="absolute"
            >
              <motion.div
                animate={{ y: [0, -10, 0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 4 + i * 0.5, ease: "easeInOut" }}
                className="bg-white/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl px-4 sm:px-6 py-3 sm:py-4 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.15)] border border-white/50"
                style={{
                  position: 'fixed',
                  left: `calc(50% + ${isMobile ? card.mDx : card.dx}%)`,
                  top: `calc(50% + ${isMobile ? card.mDy : card.dy}%)`,
                }}
              >
                <div className="text-xs sm:text-base font-black text-zinc-900 tracking-tight whitespace-nowrap">{card.label}</div>
                <div className="text-[9px] sm:text-xs font-bold text-zinc-400 mt-0.5">{card.sub}</div>
              </motion.div>
            </motion.div>
          )})}
        </motion.div>

      </motion.div>
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
