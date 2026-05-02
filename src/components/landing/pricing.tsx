"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Link from "next/link";

const PREMIUM_EASE = [0.16, 1, 0.3, 1] as const;

export function Pricing() {
  const plans = [
    {
      name: "Starter",
      price: "₹7,999",
      description: "Perfect for small businesses starting their journey.",
      features: ["Home page", "About page", "Contact page", "Mobile friendly design", "Free hosting setup", "1 month free support"],
      buttonText: "Get Started",
      highlight: false
    },
    {
      name: "Business",
      price: "₹12,999",
      description: "Our most popular plan for growing companies.",
      features: ["Everything in Starter", "Products or Services page", "WhatsApp enquiry button", "Basic SEO setup", "Social media links", "1 month free support"],
      buttonText: "Get Started",
      highlight: true,
      tag: "MOST POPULAR"
    },
    {
      name: "Pro",
      price: "₹16,999",
      description: "Advanced solutions for businesses needing more power.",
      features: ["Everything in Business", "UPI and card payments", "Full cart and checkout", "Admin order panel", "Priority support", "1 month free support"],
      buttonText: "Get Started",
      highlight: false
    }
  ];

  return (
    <section id="pricing" className="py-16 md:py-32 px-5 md:px-6 bg-zinc-950 relative overflow-hidden">
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="mb-16 md:mb-20 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold tracking-[0.2em] text-rose-500 uppercase mb-6">PRICING</span>
          <h2 className="text-[clamp(1.75rem,5vw,4.5rem)] md:text-7xl font-black tracking-tight text-white mb-6 leading-[1.1]">Simple pricing. <span className="text-rose-500 italic">No surprises.</span></h2>
          <p className="text-zinc-400 text-base md:text-2xl font-medium max-w-3xl mx-auto">One time payment. No monthly fees. No hidden charges. Pay only when you are happy.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
          {plans.map((plan, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, ease: PREMIUM_EASE }}
              className={`relative p-5 md:p-10 rounded-[2rem] md:rounded-[2.5rem] bg-white/5 border ${plan.highlight ? "border-rose-500/50 shadow-[0_0_40px_rgba(244,63,94,0.1)]" : "border-white/10"} flex flex-col h-full card-hover-glow`}
            >
              {plan.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-rose-500 text-[10px] font-black text-white tracking-widest uppercase">
                  {plan.tag}
                </div>
              )}
              
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-[36px] md:text-5xl font-black text-white">{plan.price}</span>
                  <span className="text-zinc-500 font-bold">one time</span>
                </div>
                <p className="text-zinc-400 font-medium">{plan.description}</p>
              </div>

              <div className="h-px bg-white/10 mb-8" />

              <ul className="space-y-4 mb-12 flex-1">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-[15px] font-semibold text-zinc-300">
                    <div className="w-5 h-5 rounded-full bg-rose-500/10 flex items-center justify-center flex-shrink-0">
                      <Check size={12} className="text-rose-500" />
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>

              <Link 
                href="#contact"
                className={`btn-pill min-h-[44px] h-14 w-full text-base md:text-lg font-bold flex items-center justify-center rounded-[100px] transition-all duration-300 active:scale-[0.98] ${plan.highlight ? "bg-rose-600 text-white hover:bg-rose-500" : "bg-white text-zinc-950 hover:bg-zinc-200"}`}
              >
                {plan.buttonText}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
