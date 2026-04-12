"use client";

import { motion } from "framer-motion";
import { Layout, Zap, Shield, Check } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  },
};

export function Services() {
  const services = [
    {
      title: "Conversion Engine",
      description: "High-end websites explicitly designed to capture leads, drive sales, and establish unshakeable authority.",
      points: ["Performance Tuning", "Strategic UX/UI", "Mobile Optimization"],
      icon: <Layout className="w-7 h-7 text-rose-500" />,
      tag: "Output Focus"
    },
    {
      title: "Built-in Automation",
      description: "Custom internal systems that intelligently automate your tedious manual business workflows.",
      points: ["API Integrations", "CRM Syncing", "Email Pipelines"],
      icon: <Zap className="w-7 h-7 text-rose-500" />,
      tag: "Efficiency"
    },
    {
      title: "Modern SaaS",
      description: "Complex software platforms built with scalable architecture to support millions of users effortlessly.",
      points: ["Next.js/React", "Firebase/SQL", "Secure Auth"],
      icon: <Shield className="w-7 h-7 text-rose-500" />,
      tag: "Scale"
    },
  ];

  return (
    <section id="services" className="py-24 md:py-32 bg-white px-6 relative">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent" />
      <div className="container mx-auto max-w-7xl relative z-10">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: "-100px" }}
           transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
           className="mb-20 text-center md:text-left flex flex-col items-center md:items-start"
        >
           <span className="inline-block px-4 py-1.5 rounded-full bg-zinc-100 border border-zinc-200 text-[10px] font-bold tracking-[0.2em] text-zinc-500 uppercase mb-6 shadow-sm">Core Solutions</span>
           <h2 className="text-4xl md:text-6xl lg:text-7xl font-heading font-medium tracking-tight text-[#1d1d1f] max-w-3xl leading-[1.1]">
             Engineering for <br className="hidden md:block" />
             <span className="text-zinc-400 italic">measurable impact.</span>
           </h2>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="group relative p-8 md:p-10 rounded-[2.5rem] bg-[#fbfbfd] border border-zinc-100 hover:bg-white hover:shadow-[0_20px_80px_rgba(0,0,0,0.06)] hover:border-zinc-200 transition-all duration-500 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-[1.25rem] bg-white border border-zinc-100 flex items-center justify-center mb-10 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 shadow-sm">
                  {service.icon}
                </div>
                
                <div className="mb-8">
                   <span className="text-[10px] font-bold text-rose-500/70 uppercase tracking-widest mb-3 block">{service.tag}</span>
                   <h3 className="text-3xl font-heading font-semibold tracking-tight text-[#1d1d1f] mb-4">{service.title}</h3>
                   <p className="text-zinc-500 font-medium leading-relaxed">
                     {service.description}
                   </p>
                </div>

                <div className="h-px bg-zinc-200 mb-6 group-hover:bg-rose-100 transition-colors duration-500" />

                <ul className="space-y-4">
                   {service.points.map((point, i) => (
                     <li key={i} className="flex items-center gap-3 text-sm font-semibold text-zinc-900 group-hover:translate-x-1 transition-transform duration-500" style={{ transitionDelay: `${i * 50}ms` }}>
                        <div className="w-5 h-5 rounded-full bg-rose-50 flex items-center justify-center">
                           <Check size={12} className="text-rose-500" />
                        </div>
                        {point}
                     </li>
                   ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
