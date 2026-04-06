"use client";

import { motion } from "framer-motion";
import { Layout, Zap, Shield, Check } from "lucide-react";

export function Services() {
  const services = [
    {
      title: "Conversion Engine",
      description: "High-end websites designed specifically to capture leads and drive sales.",
      points: ["Performance Tuning", "Strategic UX/UI", "Mobile Optimization"],
      icon: <Layout className="w-6 h-6" />,
      tag: "Output Focus"
    },
    {
      title: "Built-in Automation",
      description: "Custom internal systems that automate your manual business workflows.",
      points: ["API Integrations", "CRM Syncing", "Email Pipelines"],
      icon: <Zap className="w-6 h-6" />,
      tag: "Efficiency"
    },
    {
      title: "Modern SaaS",
      description: "Complex software platforms built with scalable architecture.",
      points: ["Next.js/React", "Firebase/SQL", "Secure Auth"],
      icon: <Shield className="w-6 h-6" />,
      tag: "Scale"
    },
  ];

  return (
    <section id="services" className="py-24 md:py-32 bg-white px-6">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20 text-center md:text-left"
        >
          <span className="text-[10px] font-black tracking-[0.2em] text-rose-500 uppercase mb-4 block">Core Solutions</span>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-[#1d1d1f]">
            Engineering for <br className="hidden md:block" />
            <span className="text-zinc-400">measurable impact.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group p-8 md:p-10 rounded-[2.5rem] bg-zinc-50 border border-zinc-100 hover:bg-white hover:shadow-2xl hover:shadow-zinc-200/50 transition-all duration-500"
            >
              <div className="w-14 h-14 rounded-2xl bg-white border border-zinc-100 flex items-center justify-center mb-10 group-hover:bg-rose-500 group-hover:text-white group-hover:border-rose-500 transition-all duration-500 shadow-sm">
                {service.icon}
              </div>
              
              <div className="mb-8">
                 <span className="text-[10px] font-bold text-rose-500/50 uppercase tracking-widest mb-2 block">{service.tag}</span>
                 <h3 className="text-2xl font-bold tracking-tight text-[#1d1d1f] mb-4">{service.title}</h3>
                 <p className="text-zinc-500 font-medium leading-relaxed">
                   {service.description}
                 </p>
              </div>

              <ul className="space-y-3">
                 {service.points.map((point, i) => (
                   <li key={i} className="flex items-center gap-3 text-sm font-bold text-zinc-900">
                      <div className="w-5 h-5 rounded-full bg-rose-50 flex items-center justify-center">
                         <Check size={12} className="text-rose-500" />
                      </div>
                      {point}
                   </li>
                 ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
