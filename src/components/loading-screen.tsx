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
          exit={{ 
            opacity: 0,
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
          }}
          className="fixed inset-0 z-[500] flex flex-col items-center justify-center bg-white"
        >
          <div className="flex flex-col items-center">
            {/* Branding */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-2xl font-bold tracking-[0.3em] uppercase text-zinc-950"
            >
              we build
              <span className="text-rose-500 ml-1">.</span>
            </motion.div>

            {/* Loading Bar Container */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-6 w-48 h-[2px] bg-zinc-100 overflow-hidden relative"
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
                className="absolute inset-0 h-full bg-zinc-950"
              />
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.2 }}
              className="mt-6 text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-400"
            >
              Engineering the future
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
