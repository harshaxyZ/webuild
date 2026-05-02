"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MultiStepForm } from "@/components/booking/multi-step-form";
import { X } from "lucide-react";

export function BookingOverlay({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[200] bg-zinc-950 overflow-y-auto text-white"
          data-lenis-prevent
        >
          {/* Ambient Subtle Glow */}
          <div className="fixed inset-0 pointer-events-none overflow-hidden h-screen">
            <div className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] bg-rose-500/10 blur-[150px] rounded-full" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-500/10 blur-[150px] rounded-full" />
          </div>

          {/* Close Button */}
          <button 
            onClick={onClose}
            className="fixed top-8 left-8 z-[210] flex items-center gap-3 text-zinc-500 hover:text-white transition-colors group"
          >
            <div className="w-12 h-12 rounded-full border border-white/10 bg-white/5 backdrop-blur-md flex items-center justify-center group-hover:border-white/20 group-hover:bg-white/10 transition-all">
              <X size={24} />
            </div>
            <span className="text-xs font-bold tracking-widest uppercase">Go Back</span>
          </button>

          <div className="relative w-full min-h-screen py-24 px-6 flex items-start justify-center">
            <div className="w-full max-w-2xl relative z-10">
              <div className="bg-white/5 backdrop-blur-3xl rounded-[3.5rem] p-8 md:p-14 border border-white/10 shadow-2xl">
                <div className="mb-12 text-center">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
                    <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                    <span className="text-[10px] font-bold tracking-[0.2em] text-zinc-400 uppercase">REQUEST A DEMO</span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-4">
                    Let's <span className="text-rose-500 italic">build.</span>
                  </h2>
                  <p className="text-zinc-400 text-lg font-medium">
                    Free working demo delivered in 48 hours.
                  </p>
                </div>
                <MultiStepForm />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
