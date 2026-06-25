"use client";
import { motion } from "framer-motion";
import { Smartphone, Monitor, Cpu } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const services = [
  { icon: Smartphone, title: "Mobile Apps", desc: "Native iOS and Android experiences built with React Native. Optimized for 60fps performance and offline-first architecture.", num: "01" },
  { icon: Monitor, title: "Web Platforms", desc: "Next.js powered dashboards, e-commerce, and SaaS products. Server-side rendered, edge-deployed, and SEO optimized.", num: "02" },
  { icon: Cpu, title: "AI & Automation", desc: "Integrating OpenAI and custom ML models to automate workflows, enhance user experiences, and reduce operational overhead.", num: "03" }
];

export default function Services() {
  return (
    <section id="services" className="py-32 px-6 relative z-10 border-t border-[var(--border)]">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20 flex flex-col md:flex-row justify-between items-start gap-8">
          <h2 className="text-5xl md:text-7xl font-semibold tracking-tighter">
            <span className="block overflow-hidden"><motion.span initial={{ y: "100%" }} whileInView={{ y: 0 }} viewport={{ once: true }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} className="block">Our Expertise</motion.span></span>
          </h2>
          <ScrollReveal className="max-w-md text-lg font-light text-[var(--muted)]">
            We merge engineering rigor with design intuition to ship products that scale flawlessly.
          </ScrollReveal>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <motion.div 
                whileHover={{ y: -8, borderColor: "var(--text)" }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="bg-[var(--surface)] border border-[var(--border)] rounded-3xl p-8 h-full relative overflow-hidden group"
              >
                <span className="absolute right-[-20px] bottom-[-40px] text-[180px] font-bold opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-500 pointer-events-none select-none">{s.num}</span>
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center border border-[var(--border)] mb-12 group-hover:rotate-45 transition-transform duration-500">
                    <s.icon size={20} />
                  </div>
                  <h3 className="text-2xl font-medium mb-4">{s.title}</h3>
                  <p className="font-light text-sm text-[var(--muted)]">{s.desc}</p>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
