"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    quote: "I was skeptical about the zero upfront cost, but they absolutely delivered. The demo proved they were the right technical partner for our startup.",
    author: "Sarah J.",
    role: "Founder, Bloom AI",
  },
  {
    quote: "Our custom mobile and web application scales flawlessly thanks to the WeBuild team. A truly premium engineering experience from start to finish.",
    author: "Marcus T.",
    role: "CTO, Thread & Co.",
  },
  {
    quote: "They understood our complex SaaS requirements perfectly. High-end design architecture that meets robust full-stack development.",
    author: "Elena R.",
    role: "VP of Product",
  },
];

export function Trust() {
  return (
    <section id="trust" className="py-24">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">Trusted by scale-ups</h2>
          <p className="text-muted-foreground text-lg font-light leading-relaxed">
            Join forward-thinking product teams who trusted us to engineer their digital infrastructure.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="p-10 rounded-[2rem] bg-gradient-to-b from-background to-muted/20 border shadow-sm flex flex-col hover:shadow-md transition-shadow"
            >
              <div className="flex gap-1.5 mb-8 text-zinc-900 dark:text-zinc-100">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" strokeWidth={0} />
                ))}
              </div>
              <p className="text-lg leading-relaxed mb-10 flex-grow font-light">
                "{t.quote}"
              </p>
              <div>
                <p className="font-semibold tracking-tight">{t.author}</p>
                <p className="text-sm text-muted-foreground font-light">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
