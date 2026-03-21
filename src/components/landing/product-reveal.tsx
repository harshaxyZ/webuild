"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ProductReveal() {
  return (
    <section id="product-ui" className="min-h-screen bg-white flex flex-col items-center justify-center relative overflow-hidden py-40">
      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-6xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-50 border border-slate-100 px-6 py-2 mb-12">
            <Sparkles className="w-5 h-5 text-blue-500" />
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-slate-950">Elite Product Engineering</span>
          </div>

          <h1 className="text-6xl md:text-[11rem] font-bold tracking-[ -0.04em] mb-12 leading-[0.8] text-slate-950">
            we build your <br />
            <span className="text-slate-300">product now.</span>
          </h1>

          <p className="text-2xl md:text-3xl text-slate-500 font-medium leading-tight max-w-3xl mx-auto mb-16 px-4">
            You dream it. We build it. You pay only if you love it. No contracts. No risk. Just world-class engineering.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <Button variant="gradient" className="h-20 px-14 text-2xl rounded-3xl group shadow-2xl">
              Get Your Free Demo
              <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </Button>
            
            <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.4em] px-8">
              Pay on Satisfaction
            </p>
          </div>
        </motion.div>
      </div>

      {/* Atmospheric backgrounds (minimal) */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-50/50 rounded-full blur-[100px]" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-purple-50/50 rounded-full blur-[100px]" />
    </section>
  );
}
