"use client";

import { motion } from "framer-motion";
import { Layout, ShieldCheck, Check } from "lucide-react";

import { Variants } from "framer-motion";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  },
};

export function DepthSection() {
  return (
    <section className="py-24 md:py-32 bg-[#fafafa] relative overflow-hidden">
      {/* Decorative Blur Backgrounds for depth */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-rose-100/40 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-[-10%] w-[400px] h-[400px] bg-sky-100/30 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: "-100px" }}
           transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
           className="mb-20 text-center md:text-left"
        >
           <span className="inline-block px-4 py-1.5 rounded-full bg-rose-50 border border-rose-100 text-[10px] font-bold tracking-[0.2em] text-rose-500 uppercase mb-6 shadow-sm">Proven Results</span>
           <h2 className="text-4xl md:text-6xl lg:text-7xl font-heading font-medium tracking-tight text-[#1d1d1f] leading-tight">
             Engineering with <br className="hidden md:block" />
             <span className="text-zinc-400 italic">precision & depth.</span>
           </h2>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12"
        >
           <WorkCard 
             title="High-Velocity Conversion" 
             description="Strategic architecture designed to maximize user retention and lead generation through behavioral nudges." 
             icon={<Layout className="text-rose-500 w-8 h-8" />}
             points={["SSR Optimization against latency", "Fluid Micro-Interactions", "Sales Funnel Audit & Mapping"]}
             delay={0.1}
           />
           <WorkCard 
             title="Automated Workflows" 
             description="Eliminate manual drag with deep API integrations, reactive state management, and custom CRM systems." 
             icon={<ShieldCheck className="text-rose-500 w-8 h-8" />} 
             points={["Complex Zapier/API Pipelines", "Secure Database Architecture", "Custom Admin UI & Analytics"]}
             delay={0.3}
           />
        </motion.div>
      </div>
    </section>
  );
}

function WorkCard({ title, description, icon, points, delay }: { title: string; description: string; icon: React.ReactNode; points: string[]; delay: number }) {
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -8, scale: 1.01 }}
      className="relative p-8 md:p-12 rounded-[2.5rem] lg:rounded-[3rem] bg-white border border-zinc-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_60px_rgb(0,0,0,0.08)] transition-all duration-500 group overflow-hidden"
    >
      {/* Subtle hover gradient inside card */}
      <div className="absolute inset-0 bg-gradient-to-br from-rose-50/0 to-rose-50/0 group-hover:from-rose-50/50 group-hover:to-transparent transition-colors duration-500 ease-out" />
      
      <div className="relative z-10">
        <div className="w-16 h-16 rounded-[1.25rem] bg-rose-50 border border-rose-100 flex items-center justify-center mb-10 group-hover:bg-rose-500 group-hover:text-white transition-all duration-500 shadow-sm group-hover:shadow-[0_0_20px_rgba(244,63,94,0.3)]">
          {icon}
        </div>
        <h3 className="text-3xl font-heading font-semibold mb-4 tracking-tight text-[#1d1d1f]">{title}</h3>
        <p className="text-zinc-500 text-lg font-medium leading-relaxed mb-8 max-w-sm">
          {description}
        </p>
        
        <ul className="space-y-4">
          {points.map((p, i) => (
            <motion.li 
              key={i} 
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: delay + 0.4 + (i * 0.1) }}
              className="flex items-center gap-4 text-sm md:text-base font-semibold text-zinc-800"
            >
               <div className="w-6 h-6 rounded-full bg-zinc-50 border border-zinc-200 flex items-center justify-center group-hover:border-rose-200 transition-colors">
                  <Check size={14} className="text-rose-500" />
               </div>
               {p}
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
