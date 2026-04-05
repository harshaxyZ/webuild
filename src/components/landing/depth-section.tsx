"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Shield, Zap, Globe, Cpu } from "lucide-react";
import { useRef } from "react";

export function DepthSection() {
  const sectionRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section ref={sectionRef} className="relative w-full min-h-screen bg-zinc-50 text-[#1d1d1f] overflow-hidden py-32 flex items-center">
      {/* Soft Parallax Layers */}
      <motion.div 
        style={{ y: y1 }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_#fbfbfd_0%,_#f9fafb_70%)] opacity-80" 
      />
      
      {/* Suble Volumetric Effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] left-1/4 w-[1px] h-[140%] bg-gradient-to-b from-transparent via-rose-200/40 to-transparent rotate-12 blur-sm" />
        <div className="absolute -top-[10%] left-1/2 w-[2px] h-[120%] bg-gradient-to-b from-transparent via-blue-100/50 to-transparent -rotate-6 blur-md" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-24">
          <motion.div
            style={{ opacity }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-5xl md:text-[5.5rem] font-bold tracking-tight mb-8 leading-[1.1] text-[#1d1d1f]">
              structural depth. <br />
              <span className="text-zinc-400">unmatched performance.</span>
            </h2>
            <p className="text-zinc-500 text-lg md:text-xl font-medium max-w-xl mx-auto">
              We engineer at the architectural core, building systems that don&apos;t just work—they scale.
            </p>
          </motion.div>
        </div>

        {/* Floating UI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <FeatureCard 
            icon={<Shield className="w-6 h-6" />}
            title="Zero Upfront Cost"
            description="We invest in your vision first. Payment only happens when you approve the production build."
            index={0}
          />
          <FeatureCard 
            icon={<Zap className="w-6 h-6" />}
            title="Sub-second Precision"
            description="Optimized core engines ensuring ultra-fast load times and seamless digital interactions."
            index={1}
          />
          <FeatureCard 
            icon={<Globe className="w-6 h-6" />}
            title="Global Infrastructure"
            description="Enterprise-grade edge deployment reaching your users anywhere with maximum uptime."
            index={2}
          />
          <FeatureCard 
            icon={<Cpu className="w-6 h-6" />}
            title="Direct Dev Access"
            description="Work hand-in-hand with our lead engineering team. No middlemen, just pure technical execution."
            index={3}
          />
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ icon, title, description, index }: any) {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.1, 
        ease: "easeOut" 
      }}
      className="p-10 rounded-[3rem] bg-white border border-zinc-100 backdrop-blur-xl hover:shadow-2xl hover:shadow-zinc-200/50 transition-all duration-700 group relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      
      <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center mb-10 border border-zinc-200 group-hover:scale-110 group-hover:bg-blue-500 group-hover:text-white group-hover:border-blue-500 transition-all duration-500 relative z-10 shadow-sm">
        {icon}
      </div>
      <h3 className="text-2xl font-bold mb-4 tracking-tight relative z-10 text-[#1d1d1f]">{title}</h3>
      <p className="text-zinc-500 leading-relaxed font-medium relative z-10 group-hover:text-zinc-600 transition-colors duration-500">
        {description}
      </p>
    </motion.div>
  );
}
