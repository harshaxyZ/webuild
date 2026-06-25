"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const testimonials = [
  {
    quote: "We Build took our outdated, clunky MVP and transformed it into a world-class platform in less time than our previous agency took to wireframe it. Unbelievable precision.",
    author: "Sarah Jenkins",
    role: "CEO, FinFlow",
  },
  {
    quote: "The 120fps animations and smooth scrolling they implemented blew our investors away. They don't just write code, they craft experiences.",
    author: "David Chen",
    role: "Founder, Zenith AI",
  },
  {
    quote: "Going live tonight wouldn't have been possible without their incredible ability to execute under pressure. Their standard for quality is unmatched.",
    author: "Michael Rossi",
    role: "CTO, NextGen Retail",
  },
];

export default function Testimonials() {
  return (
    <section className="py-32 px-6 bg-[var(--surface)] border-y border-[var(--border)] relative z-10">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="mb-20">
            <h2 className="text-4xl md:text-6xl font-semibold tracking-tight mb-6">Don't just take our word for it.</h2>
            <p className="text-xl text-[var(--muted)] max-w-2xl">
              We partner with visionary founders and leading brands to build digital products that set the standard.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, i) => (
            <ScrollReveal key={i}>
              <motion.div 
                whileHover={{ y: -5 }}
                className="p-8 rounded-3xl bg-[var(--bg)] border border-[var(--border)] h-full flex flex-col justify-between"
              >
                <div>
                  <div className="flex gap-1 mb-6">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} size={18} className="fill-[var(--text)] text-[var(--text)]" />
                    ))}
                  </div>
                  <p className="text-lg md:text-xl font-light leading-relaxed mb-8">
                    "{testimonial.quote}"
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-[var(--text)]">{testimonial.author}</h4>
                  <p className="text-sm text-[var(--muted)]">{testimonial.role}</p>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
