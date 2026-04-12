"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05, pointerEvents: "none", filter: "blur(20px)" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-zinc-950 text-white"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent opacity-50" />
          <div className="flex flex-col items-center justify-center -mt-20 relative z-10">
            {/* Logo Text Animation */}
            <motion.h1
              initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl md:text-7xl font-bold font-heading tracking-tight text-white mb-2 flex items-baseline"
            >
              we build<span className="text-rose-500 text-6xl leading-none ml-1">.</span>
            </motion.h1>

            {/* Progress Bar Container */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
              className="mt-8 w-64 h-[1px] bg-white/20 overflow-hidden relative rounded-full"
            >
              {/* Animated Progress Line */}
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "0%" }}
                transition={{
                  duration: 1.5,
                  delay: 0.8,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="absolute inset-0 h-full bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.8)]"
              />
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="mt-6 text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase text-zinc-500"
            >
              Building digital authority
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
