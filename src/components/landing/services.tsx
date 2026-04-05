"use client";

import { motion } from "framer-motion";
import { Smartphone, LayoutTemplate, Database } from "lucide-react";

const services = [
  {
    icon: LayoutTemplate,
    title: "Web Applications",
    description: "High-performance, scalable SPAs and SSR apps built natively with Next.js and React."
  },
  {
    icon: Smartphone,
    title: "Mobile Applications",
    description: "Premium cross-platform experiences for iOS and Android with strict UI/UX standards."
  },
  {
    icon: Database,
    title: "Automation Systems",
    description: "Robust backend architectures, APIs, and microservices to automate your ecosystem."
  }
];

export function Services() {
  return (
    <section id="services" className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="mb-20"
          >
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-[#1d1d1f]">
              Bespoke Digital <br /> 
              <span className="text-zinc-400">Engineering.</span>
            </h2>
            <p className="max-w-xl text-lg md:text-xl text-zinc-500 font-medium leading-snug">
              We build startup-ready technical solutions with the same engineering rigor as major tech platforms.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: idx * 0.1 }}
                className="group p-10 rounded-[2.5rem] bg-slate-50 border border-zinc-100 hover:bg-white hover:shadow-2xl hover:shadow-zinc-200/50 transition-all duration-500 cursor-default"
              >
                <div className="w-16 h-16 rounded-2xl bg-white border border-zinc-100 flex items-center justify-center mb-10 group-hover:scale-110 group-hover:bg-[#1d1d1f] group-hover:text-white transition-all duration-500 text-zinc-900">
                  <service.icon size={28} strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl font-bold mb-4 tracking-tight text-[#1d1d1f]">{service.title}</h3>
                <p className="text-zinc-500 text-lg leading-relaxed font-medium group-hover:text-zinc-600 transition-colors">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
