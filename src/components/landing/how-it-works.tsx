"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Lightbulb, Code2, Eye, Layers, CreditCard, Sparkles, ShieldCheck, Wallet } from "lucide-react";

const steps = [
  {
    icon: Lightbulb,
    title: "1. Book your free demo",
    description: "Share your vision and requirements through a frictionless 2-minute booking process.",
  },
  {
    icon: Code2,
    title: "2. We build and present",
    description: "Our dedicated engineering team designs and develops a high-end, functional prototype.",
  },
  {
    icon: Eye,
    title: "3. Review & refine",
    description: "Experience the product first-hand. If you like the direction, share more detailed requirements.",
  },
  {
    icon: Layers,
    title: "4. Full production build",
    description: "We engineer your complete, highly scalable, and secure application architecture.",
  },
  {
    icon: CreditCard,
    title: "5. Payment & Launch",
    description: "Payment only happens when we build your complete, production-ready product.",
  },
];

export function HowItWorks() {
  return (
    <section id="process" className="py-32 bg-slate-50 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-[4.5rem] font-bold mb-8 tracking-tight text-[#1d1d1f] leading-tight"
          >
            The engineering <br />
            <span className="text-rose-500">commitment flow</span>
          </motion.h2>
          <p className="text-zinc-500 text-lg md:text-xl font-medium leading-tight max-w-xl mx-auto">
            A frictionless, zero-risk process designed for scaling companies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
              className={`group p-8 md:p-10 rounded-[2.5rem] bg-white border border-zinc-100 hover:shadow-xl hover:-translate-y-1 hover:border-zinc-200 transition-all duration-300 ${index === 4 ? 'lg:col-span-2' : ''}`}
            >
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-zinc-50 border border-zinc-100 text-zinc-900 flex items-center justify-center mb-8 md:mb-10 group-hover:bg-rose-500 group-hover:text-white transition-all duration-300">
                <step.icon size={26} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 tracking-tight text-[#1d1d1f]">{step.title}</h3>
              <p className="text-zinc-500 text-base md:text-lg leading-relaxed font-medium group-hover:text-zinc-600 transition-colors">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-24 flex flex-wrap justify-center gap-4">
          <div className="inline-flex items-center gap-3 rounded-full bg-white border border-rose-100 px-6 py-3 text-xs font-bold text-rose-500 shadow-sm">
            <Sparkles size={16} className="text-rose-500" /> NO UPFRONT COST
          </div>
          <div className="inline-flex items-center gap-3 rounded-full bg-white border border-zinc-100 px-6 py-3 text-xs font-bold text-zinc-900 shadow-sm">
            <ShieldCheck size={16} className="text-green-500" /> DEDICATED ENGINEERING
          </div>
          <div className="inline-flex items-center gap-3 rounded-full bg-white border border-zinc-100 px-6 py-3 text-xs font-bold text-zinc-900 shadow-sm">
            <Wallet size={16} className="text-purple-500" /> PAY AFTER COMMITMENT
          </div>
        </div>
      </div>
    </section>
  );
}
