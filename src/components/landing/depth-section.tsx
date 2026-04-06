"use client";

import { motion } from "framer-motion";
import { Layout, ShieldCheck, Check } from "lucide-react";

export function DepthSection() {
  return (
    <section className="py-24 md:py-32 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 1 }}
           className="mb-20 text-center md:text-left"
        >
           <span className="text-[10px] font-black tracking-[0.2em] text-rose-500 uppercase mb-4 block">Proven Results</span>
           <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-[#1d1d1f]">
             Engineering with <br className="hidden md:block" />
             <span className="text-zinc-400">precision & depth.</span>
           </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <WorkCard 
             title="High-Velocity Conversion" 
             description="Strategic architecture designed to maximize user retention and lead generation." 
             icon={<Layout className="text-zinc-900" />}
             points={["SSR Optimization", "Micro-Interactions", "Sales Funnel Audit"]}
           />
           <WorkCard 
             title="Automated Workflows" 
             description="Eliminate manual drag with integrated API pipelines and custom CRM systems." 
             icon={<ShieldCheck className="text-zinc-900" />} 
             points={["Zapier/API Integration", "Secure Database", "Custom Admin UI"]}
           />
        </div>
      </div>
    </section>
  );
}

function WorkCard({ title, description, icon, points }: { title: string; description: string; icon: React.ReactNode; points: string[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="p-8 md:p-12 rounded-[3rem] bg-zinc-50 border border-zinc-100 hover:shadow-xl transition-all duration-500 group"
    >
      <div className="w-14 h-14 rounded-2xl bg-white border border-zinc-100 flex items-center justify-center mb-10 group-hover:bg-rose-500 group-hover:text-white transition-all duration-500 shadow-sm">
        {icon}
      </div>
      <h3 className="text-2xl md:text-3xl font-bold mb-4 tracking-tight text-[#1d1d1f]">{title}</h3>
      <p className="text-zinc-500 text-lg font-medium leading-relaxed mb-8">
        {description}
      </p>
      
      <ul className="space-y-4">
        {points.map((p, i) => (
          <li key={i} className="flex items-center gap-3 text-sm font-bold text-zinc-900">
             <div className="w-5 h-5 rounded-full bg-rose-50 flex items-center justify-center">
                <Check size={12} className="text-rose-500" />
             </div>
             {p}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
