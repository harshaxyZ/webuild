"use client";

import { motion, useScroll, useTransform, useSpring, useReducedMotion } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const EASE_OUT = [0.25, 1, 0.5, 1] as const; // Smooth easeOut
const PREMIUM_EASE = [0.16, 1, 0.3, 1] as const;

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
    stiffness: 70,
    damping: 25,
    restDelta: 0.001
  });

  /* ── 1. Parallax Effect (Smooth, Subtle) ── */
  const bgY = useTransform(smoothScrollY, [0, 1], ["0%", "15%"]);
  const bgScale = useTransform(smoothScrollY, [0, 1], [1, 1.05]); 

  /* ── 2. Text Fade & Lift ── */
  const textOpacity = useTransform(smoothScrollY, [0, 0.2], [1, 0]);
  const textY = useTransform(smoothScrollY, [0, 0.2], [0, -40]);

  /* ── 3. Device / Phone Reveal Effect ── */
  const phoneY = useTransform(smoothScrollY, [0.1, 0.35], [80, 0]);
  const phoneOpacity = useTransform(smoothScrollY, [0.1, 0.3], [0, 1]);
  const phoneScale = useTransform(smoothScrollY, [0.1, 0.35], [0.95, 1]);
  
  // Subtle drift for the phone after it's revealed
  const phoneDriftY = useTransform(smoothScrollY, [0.4, 1], [0, -50]);

  /* ── 4. Staggered Cards Reveal ── */
  const cardsOpacity = useTransform(smoothScrollY, [0.3, 0.5], [0, 1]);
  const cardsScale = useTransform(smoothScrollY, [0.3, 0.5], [0.9, 1]);
  const cardsY = useTransform(smoothScrollY, [0.3, 0.5], [40, 0]);

  return (
    <section ref={containerRef} className="relative w-full h-[250vh] md:h-[300vh] bg-[#fbfbfd]">
      <motion.div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center">

        {/* ── BACKGROUND IMAGE ── */}
        <motion.div
          style={{ y: bgY, scale: bgScale }}
          className="absolute inset-0 w-full h-full will-change-transform"
        >
          <img
            src="/hero-cinematic.webp"
            alt="Hero Background"
            className="w-full h-full object-cover object-center"
            loading="eager"
            fetchPriority="high"
          />
          {/* Subtle overlay for readability, keeping image bright */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/5 to-black/30" />
        </motion.div>

        {/* ── HEADLINE & TEXT ── */}
        <motion.div
          style={{ opacity: textOpacity, y: textY }}
          className="absolute inset-0 z-30 flex flex-col items-center justify-center will-change-transform"
        >
          <div className="text-center px-6 max-w-[1000px] mx-auto mt-[-10vh]">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.2, ease: PREMIUM_EASE }}
              className="text-[3.5rem] sm:text-6xl md:text-8xl lg:text-[7.5rem] tracking-tight text-white mb-6 leading-[1.05]"
              style={{
                fontFamily: "'Kepler Std Semicondensed', 'Playfair Display', serif",
                fontStyle: "italic",
                textShadow: "0 10px 40px rgba(0,0,0,0.4), 0 2px 10px rgba(0,0,0,0.2)",
                fontWeight: 500
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
        </motion.div>

        {/* ── PHONE / DEVICE REVEAL ── */}
        <motion.div
          style={{ 
            y: useTransform(smoothScrollY, v => phoneY.get() + phoneDriftY.get()), 
            opacity: phoneOpacity, 
            scale: phoneScale 
          }}
          className="absolute bottom-[-5vh] md:bottom-2 left-1/2 -translate-x-1/2 z-40 w-[260px] sm:w-[320px] md:w-[380px] lg:w-[420px] will-change-transform"
        >
          <div className="relative z-10 rounded-[2.5rem] sm:rounded-[3rem] md:rounded-[3.5rem] bg-[#1d1d1f] p-2 sm:p-2.5 shadow-[0_40px_100px_-10px_rgba(0,0,0,0.7)] border border-white/10 mx-auto">
            <div className="absolute top-2 sm:top-2.5 left-1/2 -translate-x-1/2 w-24 sm:w-28 md:w-32 h-6 sm:h-7 bg-[#1d1d1f] rounded-b-xl sm:rounded-b-2xl z-20 shadow-inner" />
            
            <div className="relative rounded-[2rem] sm:rounded-[2.5rem] md:rounded-[3rem] overflow-hidden bg-[#fafafa] aspect-[9/19.5] shadow-inner">
              <div className="flex flex-col h-full bg-[#f4f4f2] text-zinc-900 border border-black/5">
                {/* Header */}
                <div className="px-5 pt-12 pb-4 flex items-center justify-between">
                  <div className="text-[10px] font-semibold text-zinc-500 uppercase tracking-widest flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-rose-800 rounded-full inline-block" /> MaestroClass
                  </div>
                  <div className="flex gap-1">
                    <span className="w-1 h-1 bg-zinc-400 rounded-full" />
                    <span className="w-1 h-1 bg-zinc-400 rounded-full" />
                  </div>
                </div>

                <div className="flex-1 flex flex-col items-center px-6 pt-6 text-center">
                  <h2 
                    className="text-4xl text-zinc-900 mb-6 leading-tight pb-2"
                    style={{ fontFamily: "'Kepler Std Semicondensed', 'Playfair Display', serif", fontStyle: "italic" }}
                  >
                    The Lost Art <br/>of Dough
                  </h2>
                  <p className="text-[11px] text-zinc-600 font-medium leading-relaxed max-w-[200px] mx-auto mb-8 font-sans">
                    A premium immersive masterclass in authentic sourdough tradition. Hosted in the hills of Tuscany.
                  </p>
                  <Button className="h-10 text-[10px] uppercase tracking-widest font-bold rounded-full bg-zinc-900 text-white hover:bg-zinc-800 px-8">
                    Apply Now
                  </Button>
                </div>
                
                {/* Fake image block at bottom of phone */}
                <div className="h-1/3 w-full bg-zinc-200 mt-auto relative overflow-hidden">
                  <img src="/hero-cinematic.webp" className="absolute inset-0 w-full h-full object-cover opacity-80" alt="" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── STAGGERED UI CARDS ── */}
        <motion.div
           style={{ opacity: cardsOpacity, scale: cardsScale, y: cardsY }}
           className="absolute inset-0 z-50 pointer-events-none will-change-transform"
        >
          {floatingCards.map((card, i) => {
            const individualParallaxY = useTransform(smoothScrollY, [0.3, 0.6], [i % 2 === 0 ? 30 : 60, 0]);
            return (
              <motion.div
                key={i}
                style={{ y: individualParallaxY }}
                className="absolute"
              >
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * i, ease: EASE_OUT }}
                  className="bg-[#fafafa]/90 backdrop-blur-xl rounded-2xl sm:rounded-3xl px-5 sm:px-6 py-4 sm:py-5 shadow-[0_20px_40px_-5px_rgba(0,0,0,0.1),0_0_0_1px_rgba(255,255,255,1)_inset] border border-zinc-200/50"
                  style={{
                    position: 'fixed',
                    left: `calc(50% + ${isMobile ? card.mDx : card.dx}%)`,
                    top: `calc(50% + ${isMobile ? card.mDy : card.dy}%)`,
                  }}
                >
                  <div 
                    className="text-lg sm:text-xl font-medium tracking-tight whitespace-nowrap text-zinc-900 mb-1"
                    style={{ fontFamily: "'Kepler Std Semicondensed', 'Playfair Display', serif", fontStyle: "italic" }}
                  >
                    {card.label}
                  </div>
                  <div className="text-[10px] sm:text-xs font-semibold text-zinc-500 font-sans uppercase tracking-widest">{card.sub}</div>
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
