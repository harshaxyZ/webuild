"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Search, PenTool, Layout, FileText, Palette, Send, MessageSquare, ShieldCheck, Sparkles } from "lucide-react";

export function ProcessSticky() {
  const steps = [
    { title: "Share your idea", desc: "Tell us what your business does and what you need. A message is enough." },
    { title: "We ask the right questions", desc: "We get clarity on your goals, style and target customers." },
    { title: "We design the look", desc: "We create the perfect visual style that matches your brand." },
    { title: "We build your demo", desc: "A fully working website demo built and delivered in 48 hours." },
    { title: "You review everything", desc: "Go through every page and tell us exactly what to change." },
    { title: "We refine until perfect", desc: "We make every single change until you are completely happy." },
    { title: "We go live", desc: "Your website goes live, fully hosted and ready to bring you customers." },
  ];

  return (
    <section id="how-it-works" className="section-padding bg-zinc-950 relative overflow-hidden">
      <div className="container mx-auto max-w-4xl relative z-10">
        <div className="mb-20 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold tracking-[0.2em] text-rose-500 uppercase mb-6">HOW IT WORKS</span>
          <h2 className="text-4xl md:text-7xl font-black tracking-tight text-white mb-6">How we build your <br className="hidden md:block" /> demo in <span className="text-rose-500 italic">48 hours.</span></h2>
          <p className="text-zinc-400 text-lg md:text-2xl font-medium">Simple. Transparent. Zero risk for you.</p>
        </div>

        <div className="relative space-y-12">
          {/* Vertical Line */}
          <div className="absolute left-[15px] md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-rose-500/50 via-zinc-800 to-transparent md:-translate-x-1/2" />

          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`relative flex flex-col ${idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} items-start md:items-center gap-8`}
            >
              {/* Step Circle */}
              <div className="absolute left-[15px] md:left-1/2 w-8 h-8 rounded-full bg-zinc-950 border-2 border-rose-500 z-10 md:-translate-x-1/2 flex items-center justify-center text-[12px] font-bold text-white shadow-[0_0_15px_rgba(244,63,94,0.3)]">
                {idx + 1}
              </div>

              {/* Content */}
              <div className="pl-12 md:pl-0 md:w-1/2 flex flex-col items-start md:px-12">
                <div className={`p-8 rounded-[2rem] bg-white/5 border border-white/10 w-full card-hover-glow`}>
                  <h3 className="text-2xl font-bold text-white mb-3">{step.title}</h3>
                  <p className="text-zinc-400 font-medium leading-relaxed">{step.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
