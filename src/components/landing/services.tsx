"use client";

import { motion } from "framer-motion";
import { Layout, Zap, Shield, Check } from "lucide-react";

import { Variants } from "framer-motion";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants: Variants = {
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
      title: "Business Website",
      description: "A fast, beautiful website that makes your business look professional and brings you more customers.",
      features: ["Home, About and Contact pages", "Mobile friendly design", "Google ready", "Free hosting setup", "1 month support"],
      icon: <Layout className="w-8 h-8 text-rose-500" />,
    },
    {
      title: "Online Store",
      description: "Sell your products online with UPI payments, cart and order management — everything your store needs.",
      features: ["Full product catalog", "UPI and card payments", "Cart and checkout", "WhatsApp order button", "1 month support"],
      icon: <Zap className="w-8 h-8 text-rose-500" />,
    },
    {
      title: "Custom Automation",
      description: "Stop doing repetitive tasks manually. We build systems that run your business while you focus on growth.",
      features: ["WhatsApp automation", "Email pipelines", "CRM integration", "Custom admin panel", "1 month support"],
      icon: <Shield className="w-8 h-8 text-rose-500" />,
    },
  ];

  return (
    <section id="services" className="section-padding bg-zinc-950 relative">
      <div className="container mx-auto max-w-7xl relative z-10">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: "-100px" }}
           transition={{ duration: 1, ease: PREMIUM_EASE }}
           className="mb-20 text-center"
        >
           <span className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold tracking-[0.2em] text-rose-500 uppercase mb-6">WHAT WE BUILD</span>
           <h2 className="text-4xl md:text-7xl font-black tracking-tight text-white max-w-4xl mx-auto leading-[1.1]">
             Everything your business <br className="hidden md:block" />
             needs to <span className="text-rose-500 italic">win online.</span>
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
              className="card-hover-glow group relative p-8 md:p-10 rounded-[2.5rem] bg-white/5 border border-white/10 overflow-hidden"
            >
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-10 group-hover:scale-110 group-hover:bg-rose-500/10 transition-all duration-500">
                  {service.icon}
                </div>
                
                <div className="mb-8">
                   <h3 className="text-3xl font-bold tracking-tight text-white mb-4">{service.title}</h3>
                   <p className="text-zinc-400 font-medium leading-relaxed">
                     {service.description}
                   </p>
                </div>

                <div className="h-px bg-white/10 mb-8" />

                <ul className="space-y-4">
                   {service.features.map((feature, i) => (
                     <li key={i} className="flex items-center gap-3 text-[15px] font-semibold text-zinc-300">
                        <div className="w-5 h-5 rounded-full bg-rose-500/10 flex items-center justify-center flex-shrink-0">
                           <Check size={12} className="text-rose-500" />
                        </div>
                        {feature}
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

const PREMIUM_EASE = [0.16, 1, 0.3, 1] as const;
