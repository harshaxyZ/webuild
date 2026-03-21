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
          exit={{ opacity: 0, scale: 0.98, pointerEvents: "none" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-[#fbfbfd]"
        >
          <div className="flex flex-col items-center justify-center -mt-20">
            {/* Logo Text Animation */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl md:text-5xl font-semibold tracking-tight text-[#1d1d1f] mb-2"
            >
              we build
            </motion.h1>

            {/* Progress Bar Container */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-6 w-48 h-[2px] bg-zinc-200 overflow-hidden relative"
            >
              {/* Animated Progress Line */}
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "0%" }}
                transition={{
                  duration: 1.5,
                  delay: 0.8,
                  ease: "circOut",
                }}
                className="absolute inset-0 h-full bg-zinc-900"
              />
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.2 }}
              className="mt-6 text-xs font-semibold tracking-widest uppercase text-zinc-400"
            >
              building your digital presence...
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
