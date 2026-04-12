"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Search, PenTool, Layout, FileText, Palette, Send, MessageSquare, ShieldCheck, Sparkles } from "lucide-react";

const steps = [
  {
    id: 1,
    title: "Project Concept",
    description: "Define your vision through shared links, screenshots, or raw ideas.",
    icon: Search,
    color: "bg-rose-500",
    glow: "shadow-[0_0_30px_rgba(244,63,94,0.4)]"
  },
  {
    id: 2,
    title: "Build Type",
    description: "Specify if you need a Landing Page, SaaS Platform, or Mobile App.",
    icon: Layout,
    color: "bg-blue-500",
    glow: "shadow-[0_0_30px_rgba(59,130,246,0.4)]"
  },
  {
    id: 3,
    title: "Design References",
    description: "Show us what you love—Competitors, Minimalist, or High-Motion sites.",
    icon: Palette,
    color: "bg-amber-500",
    glow: "shadow-[0_0_30px_rgba(245,158,11,0.4)]"
  },
  {
    id: 4,
    title: "Technical Depth",
    description: "Discuss integrations, automation, and backend architecture needs.",
    icon: FileText,
    color: "bg-emerald-500",
    glow: "shadow-[0_0_30px_rgba(16,185,129,0.4)]"
  },
  {
    id: 5,
    title: "Style Choice",
    description: "Confirm the aesthetic—Dark Mode, Glassmorphism, or Bento Grid.",
    icon: PenTool,
    color: "bg-purple-500",
    glow: "shadow-[0_0_30px_rgba(168,85,247,0.4)]"
  },
  {
    id: 6,
    title: "Contact Expert",
    description: "Quick drop of your email/whatsapp for the engineering handoff.",
    icon: MessageSquare,
    color: "bg-zinc-950",
    glow: "shadow-[0_0_30px_rgba(24,24,27,0.4)]"
  },
  {
    id: 7,
    title: "OTP Verification",
    description: "Secure lead verification to ensure project integrity and speed.",
    icon: ShieldCheck,
    color: "bg-white text-zinc-900 border border-zinc-200",
    glow: "shadow-[0_0_30px_rgba(228,228,231,0.8)]"
  },
];

export function ProcessSticky() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      const step = Math.min(
        Math.floor(latest * steps.length),
        steps.length - 1
      );
      setActiveStep(step);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <section id="process" ref={containerRef} className="relative h-[500vh] bg-white">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        {/* Soft background glow changing based on step */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-[#fcfcfc] to-[#fafafa] pointer-events-none" />
        <motion.div 
          animate={{ opacity: [0.1, 0.2, 0.1] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="absolute inset-x-0 bottom-0 h-1/2 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-rose-100/50 via-transparent to-transparent pointer-events-none" 
        />
        
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
          
          {/* Left Side: Context / Sticky Heading */}
          <div className="hidden md:block">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-8"
            >
              <div className="inline-flex items-center gap-3 rounded-full bg-white border border-rose-100/50 px-5 py-2 text-[10px] font-bold text-rose-500 shadow-[0_2px_10px_rgba(244,63,94,0.05)] uppercase tracking-[0.2em]">
                <Sparkles size={14} /> The Pipeline
              </div>
              <h2 className="text-6xl lg:text-7xl font-heading font-medium tracking-tight text-[#1d1d1f] leading-[1.05]">
                How we build your <br />
                <span className="text-zinc-400 italic">demo in 48h.</span>
              </h2>
              <div className="flex gap-3">
                 {steps.map((_, i) => (
                   <div key={i} className={`h-1 rounded-full transition-all duration-700 ease-out ${i === activeStep ? 'w-16 bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.5)]' : 'w-6 bg-zinc-200'}`} />
                 ))}
              </div>
              <p className="text-zinc-400 text-xl font-medium max-w-md leading-relaxed">
                A frictionless, zero-risk process designed for scaling companies. Scroll to explore the engineering flow.
              </p>
            </motion.div>
          </div>

          {/* Right Side: Animated Cards */}
          <div className="relative h-[65vh] md:h-[75vh] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 120, scale: 0.95, rotateX: -10 }}
                animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
                exit={{ opacity: 0, y: -120, scale: 0.95, rotateX: 10 }}
                transition={{ type: "spring", stiffness: 90, damping: 20, mass: 0.8 }}
                style={{ perspective: 1000 }}
                className="w-full max-w-md p-10 md:p-14 bg-white/80 backdrop-blur-3xl rounded-[3.5rem] border border-white/60 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.12),0_0_0_1px_rgba(0,0,0,0.05)] flex flex-col items-center text-center group"
              >
                <div className={`w-24 h-24 rounded-[1.75rem] ${steps[activeStep].color} ${steps[activeStep].glow} flex items-center justify-center mb-10 group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500`}>
                   {(() => {
                     const Icon = steps[activeStep].icon;
                     return <Icon size={36} className={activeStep === 6 ? 'text-zinc-900' : 'text-white'} strokeWidth={2.5} />;
                   })()}
                </div>
                <div className="mb-8">
                   <span className="text-[11px] font-black tracking-[0.25em] text-rose-500/50 uppercase mb-4 block">Step 0{steps[activeStep].id} / 07</span>
                   <h3 className="text-4xl font-heading font-semibold tracking-tight text-[#1d1d1f]">{steps[activeStep].title}</h3>
                </div>
                <p className="text-zinc-500 text-lg md:text-xl font-medium leading-relaxed px-4">
                  {steps[activeStep].description}
                </p>
              </motion.div>
            </AnimatePresence>
            
            {/* Mobile Title Backdrop */}
            <div className="md:hidden absolute -top-8 left-0 right-0 text-center">
               <span className="inline-flex items-center gap-2 rounded-full bg-white border border-rose-100/50 px-4 py-1.5 text-[9px] font-bold text-rose-500 shadow-sm uppercase tracking-[0.2em] mb-4">
                <Sparkles size={12} /> The Pipeline
              </span>
               <h2 className="text-3xl font-heading font-medium text-zinc-900">Engineering Flow</h2>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
