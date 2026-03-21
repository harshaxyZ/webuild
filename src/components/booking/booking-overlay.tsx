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
          className="fixed inset-0 z-[200] bg-[#fbfbfd] overflow-y-auto text-[#1d1d1f]"
          data-lenis-prevent
        >
          {/* Ambient Subtle Glow */}
          <div className="fixed inset-0 pointer-events-none overflow-hidden h-screen">
            <div className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] bg-zinc-200/20 blur-[150px] rounded-full mix-blend-multiply" />
          </div>

          {/* Close Button / Back to Story */}
          <button 
            onClick={onClose}
            className="fixed top-8 left-8 z-[210] flex items-center gap-3 text-zinc-400 hover:text-[#1d1d1f] transition-colors group"
          >
            <div className="w-10 h-10 rounded-full border border-zinc-200 bg-white/50 backdrop-blur-md flex items-center justify-center group-hover:border-zinc-400 group-hover:bg-white transition-all">
              <X size={20} />
            </div>
            <span className="text-xs font-bold tracking-widest uppercase group-hover:text-[#1d1d1f]">Back to the story</span>
          </button>

          <div className="relative w-full min-h-screen py-16 px-6 flex items-start justify-center">
            <div className="w-full max-w-xl relative z-10">
              <div className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-zinc-200 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)]">
                <div className="mb-10 text-center">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-rose-50 border border-rose-100 mb-6">
                    <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                    <span className="text-[10px] font-bold tracking-widest text-rose-600 uppercase">Book a demo</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#1d1d1f]">
                    Let's <span className="text-rose-500">build.</span>
                  </h2>
                  <p className="mt-4 text-zinc-500 font-medium">
                    We'll have your first demo ready in 48 hours.
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
