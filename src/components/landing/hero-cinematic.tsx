"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";

const EASE = [0.22, 1, 0.36, 1] as const;

const floatingCards = [
  { label: "+32 leads", sub: "this month", x: -280, y: -60, delay: 0.8 },
  { label: "Automation", sub: "active", x: 260, y: -90, delay: 1.0 },
  { label: "Conversion ↑", sub: "18.4%", x: -300, y: 100, delay: 1.2 },
  { label: "Booked calls", sub: "12 new", x: 280, y: 80, delay: 1.4 },
];

export function HeroCinematic({ onBookClick }: { onBookClick: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // --- Parallax layers ---
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  // --- Text fade / lift ---
  const textOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.35], [0, -80]);

  // --- Phone mockup ---
  const phoneY = useTransform(scrollYProgress, [0.08, 0.4], [120, 0]);
  const phoneOpacity = useTransform(scrollYProgress, [0.08, 0.3], [0, 1]);
  const phoneScale = useTransform(scrollYProgress, [0.08, 0.4], [0.92, 1]);

  // --- Floating cards ---
  const cardsOpacity = useTransform(scrollYProgress, [0.25, 0.45], [0, 1]);
  const cardsScale = useTransform(scrollYProgress, [0.25, 0.45], [0.8, 1]);

  // --- Phone continues deeper scroll ---
  const phoneDeepScale = useTransform(scrollYProgress, [0.5, 0.85], [1, 0.88]);
  const phoneDeepY = useTransform(scrollYProgress, [0.5, 0.85], [0, -40]);

  // --- Smooth exit ---
  const sectionOpacity = useTransform(scrollYProgress, [0.85, 1], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[300vh]"
    >
      {/* ───────── STICKY VIEWPORT ───────── */}
      <div className="sticky top-0 w-full h-screen overflow-hidden">

        {/* ─── LAYER 1: Background Image ─── */}
        <motion.div
          style={{ y: bgY, scale: bgScale }}
          className="absolute inset-0 w-full h-full will-change-transform"
        >
          <img
            src="/hero-cinematic.webp"
            alt="Cinematic Background"
            className="w-full h-full object-cover"
            loading="eager"
          />
          {/* Depth Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50" />
        </motion.div>

        {/* ─── LAYER 2: Mid-depth shimmer (simulated via gradient) ─── */}
        <motion.div
          style={{
            y: useTransform(scrollYProgress, [0, 1], ["0%", "40%"]),
          }}
          className="absolute inset-0 pointer-events-none will-change-transform"
        >
          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[#0a0a0a]/70 to-transparent" />
        </motion.div>

        {/* ─── LAYER 3: Foreground particles / petals (CSS) ─── */}
        <motion.div
          style={{
            y: useTransform(scrollYProgress, [0, 1], ["0%", "60%"]),
          }}
          className="absolute inset-0 pointer-events-none will-change-transform"
        >
          <div className="absolute top-[10%] left-[15%] w-2 h-2 rounded-full bg-rose-300/40 animate-float-slow" />
          <div className="absolute top-[30%] right-[20%] w-3 h-3 rounded-full bg-rose-200/30 animate-float-medium" />
          <div className="absolute top-[50%] left-[60%] w-1.5 h-1.5 rounded-full bg-pink-300/40 animate-float-fast" />
          <div className="absolute top-[20%] right-[40%] w-2.5 h-2.5 rounded-full bg-rose-400/20 animate-float-slow" />
        </motion.div>

        {/* ─── LAYER 4: HEADLINE + CTA ─── */}
        <motion.div
          style={{ opacity: textOpacity, y: textY }}
          className="absolute inset-0 z-30 flex flex-col items-center justify-center pointer-events-none will-change-transform"
        >
          <div className="text-center px-6 pointer-events-auto max-w-4xl mx-auto">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse" />
              <span className="text-[10px] font-bold tracking-[0.25em] text-white/80 uppercase">
                Product Architects
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.4, ease: EASE }}
              className="text-5xl sm:text-6xl md:text-[5.5rem] lg:text-[7rem] font-bold tracking-tight text-white leading-[0.95] mb-6 drop-shadow-2xl"
            >
              Websites that
              <br />
              <span className="text-rose-400">actually convert.</span>
            </motion.h1>

            {/* Sub */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6, ease: EASE }}
              className="text-base sm:text-lg md:text-xl text-white/70 max-w-xl mx-auto font-medium leading-relaxed mb-10"
            >
              We engineer platforms & automation systems
              <br className="hidden sm:block" />
              that turn visitors into measurable growth.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.8, ease: EASE }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 px-4"
            >
              <Button
                onClick={onBookClick}
                className="h-14 sm:h-16 w-full sm:w-56 text-base sm:text-lg font-bold rounded-2xl bg-white text-zinc-900 hover:bg-white/90 shadow-2xl active:scale-95 transition-all"
              >
                Book a Demo
                <motion.span
                  className="ml-2 inline-block"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  →
                </motion.span>
              </Button>
              <Button
                variant="outline"
                onClick={() =>
                  document
                    .getElementById("services")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="h-14 sm:h-16 w-full sm:w-56 text-base sm:text-lg font-bold rounded-2xl border-2 border-white/30 text-white hover:bg-white/10 transition-all backdrop-blur-sm"
              >
                View Work
              </Button>
            </motion.div>
          </div>
        </motion.div>

        {/* ─── LAYER 5: PHONE MOCKUP ─── */}
        <motion.div
          style={{
            y: phoneY,
            opacity: phoneOpacity,
            scale: phoneScale,
          }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40 w-[280px] sm:w-[320px] md:w-[360px] will-change-transform"
        >
          <motion.div
            style={{ scale: phoneDeepScale, y: phoneDeepY }}
            className="will-change-transform"
          >
            {/* Phone Frame */}
            <div className="relative rounded-[2.5rem] bg-zinc-900 p-2 shadow-[0_60px_120px_-20px_rgba(0,0,0,0.7)] border border-white/10">
              {/* Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-zinc-900 rounded-b-2xl z-10" />
              {/* Screen */}
              <div className="relative rounded-[2rem] overflow-hidden bg-white aspect-[9/19.5]">
                {/* Fake Dashboard UI */}
                <div className="p-4 pt-8 bg-gradient-to-b from-zinc-50 to-white h-full">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="text-[10px] font-black tracking-tight text-zinc-900">
                      we build
                    </div>
                    <div className="w-6 h-6 rounded-full bg-rose-500" />
                  </div>
                  {/* Stat Row */}
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    <div className="bg-zinc-50 rounded-xl p-3 border border-zinc-100">
                      <div className="text-[8px] font-bold text-zinc-400 uppercase tracking-wider">
                        Visitors
                      </div>
                      <div className="text-lg font-black text-zinc-900">2,847</div>
                      <div className="text-[8px] font-bold text-green-500">+12.4%</div>
                    </div>
                    <div className="bg-zinc-50 rounded-xl p-3 border border-zinc-100">
                      <div className="text-[8px] font-bold text-zinc-400 uppercase tracking-wider">
                        Conversions
                      </div>
                      <div className="text-lg font-black text-zinc-900">342</div>
                      <div className="text-[8px] font-bold text-green-500">+8.1%</div>
                    </div>
                  </div>
                  {/* Chart Skeleton */}
                  <div className="bg-zinc-50 rounded-xl p-3 border border-zinc-100 mb-4">
                    <div className="text-[8px] font-bold text-zinc-400 uppercase tracking-wider mb-3">
                      Revenue
                    </div>
                    <div className="flex items-end gap-1 h-16">
                      {[40, 55, 35, 65, 50, 80, 70, 90, 75, 95, 85, 100].map(
                        (h, i) => (
                          <div
                            key={i}
                            className="flex-1 bg-rose-400 rounded-sm opacity-80"
                            style={{ height: `${h}%` }}
                          />
                        )
                      )}
                    </div>
                  </div>
                  {/* Bottom Items */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 bg-zinc-50 rounded-lg p-2.5 border border-zinc-100">
                      <div className="w-7 h-7 rounded-lg bg-rose-100 flex items-center justify-center text-rose-500 text-[10px] font-black">A</div>
                      <div className="flex-1">
                        <div className="text-[9px] font-bold text-zinc-700">Automation active</div>
                        <div className="text-[8px] text-zinc-400">CRM sync running</div>
                      </div>
                      <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    </div>
                    <div className="flex items-center gap-2 bg-zinc-50 rounded-lg p-2.5 border border-zinc-100">
                      <div className="w-7 h-7 rounded-lg bg-blue-100 flex items-center justify-center text-blue-500 text-[10px] font-black">L</div>
                      <div className="flex-1">
                        <div className="text-[9px] font-bold text-zinc-700">Lead captured</div>
                        <div className="text-[8px] text-zinc-400">2 min ago</div>
                      </div>
                      <div className="text-[9px] font-bold text-rose-500">+1</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* ─── LAYER 6: FLOATING UI CARDS ─── */}
        <motion.div
          style={{ opacity: cardsOpacity, scale: cardsScale }}
          className="absolute inset-0 z-50 pointer-events-none will-change-transform hidden md:block"
        >
          {floatingCards.map((card, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -8, 0, 6, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 4 + i * 0.5,
                ease: "easeInOut",
              }}
              className="absolute"
              style={{
                left: `calc(50% + ${card.x}px)`,
                top: `calc(50% + ${card.y}px)`,
              }}
            >
              <div className="bg-white/90 backdrop-blur-xl rounded-2xl px-5 py-3 shadow-2xl border border-white/50">
                <div className="text-sm font-black text-zinc-900 tracking-tight">
                  {card.label}
                </div>
                <div className="text-[10px] font-bold text-zinc-400">
                  {card.sub}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* ─── Vignette + Gradient for smooth exit ─── */}
        <motion.div
          style={{ opacity: sectionOpacity }}
          className="absolute inset-0 z-[1] pointer-events-none"
        />
      </div>
    </section>
  );
}
