"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

const PREMIUM_EASE = [0.16, 1, 0.3, 1] as const;

const projects = [
  {
    name: "Rooh Crochets",
    description: "Crochet e-commerce store with WhatsApp checkout.",
    link: "#",
  },
  {
    name: "Cornerstone Musicals",
    description: "Music store website for a Bengaluru shop.",
    link: "#",
  },
  {
    name: "we build",
    description: "This website you are looking at right now.",
    link: "/",
  },
];

export function Portfolio() {
  return (
    <section id="our-work" className="py-16 md:py-32 px-5 md:px-6 bg-zinc-950 relative overflow-hidden">
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="mb-16 md:mb-20 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold tracking-[0.2em] text-blue-500 uppercase mb-6">OUR WORK</span>
          <h2 className="text-[clamp(1.75rem,5vw,4.5rem)] md:text-7xl font-black tracking-tight text-white mb-6 leading-[1.1]">
            Websites we have built for <br className="hidden md:block" /><span className="text-rose-500 italic">real businesses.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
          {projects.map((project, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, ease: PREMIUM_EASE }}
              className="relative rounded-[2rem] md:rounded-[2.5rem] bg-white/5 border border-white/10 overflow-hidden card-hover-glow group"
            >
              {/* Placeholder Image */}
              <div className="w-full aspect-[16/10] bg-zinc-900 flex items-center justify-center border-b border-white/5">
                <div className="text-zinc-700 text-sm font-bold uppercase tracking-widest">Preview</div>
              </div>

              {/* Card Content */}
              <div className="p-6 md:p-8">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{project.name}</h3>
                <p className="text-zinc-400 text-sm md:text-base font-medium mb-6">{project.description}</p>
                <Link
                  href={project.link}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-zinc-300 hover:bg-white/10 hover:text-white transition-all min-h-[44px]"
                >
                  View Site <ExternalLink size={12} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
