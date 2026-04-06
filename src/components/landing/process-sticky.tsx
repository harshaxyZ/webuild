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
  },
  {
    id: 2,
    title: "Build Type",
    description: "Specify if you need a Landing Page, SaaS Platform, or Mobile App.",
    icon: Layout,
    color: "bg-blue-500",
  },
  {
    id: 3,
    title: "Design References",
    description: "Show us what you love—Competitors, Minimalist, or High-Motion sites.",
    icon: Palette,
    color: "bg-amber-500",
  },
  {
    id: 4,
    title: "Technical Depth",
    description: "Discuss integrations, automation, and backend architecture needs.",
    icon: FileText,
    color: "bg-emerald-500",
  },
  {
    id: 5,
    title: "Style Choice",
    description: "Confirm the aesthetic—Dark Mode, Glassmorphism, or Bento Grid.",
    icon: PenTool,
    color: "bg-purple-500",
  },
  {
    id: 6,
    title: "Contact Expert",
    description: "Quick drop of your email/whatsapp for the engineering handoff.",
    icon: MessageSquare,
    color: "bg-zinc-950",
  },
  {
    id: 7,
    title: "OTP Verification",
    description: "Secure lead verification to ensure project integrity and speed.",
    icon: ShieldCheck,
    color: "bg-white text-zinc-900 border border-zinc-200",
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
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          {/* Left Side: Context / Sticky Heading */}
          <div className="hidden md:block">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-3 rounded-full bg-rose-50 border border-rose-100 px-6 py-2 text-xs font-bold text-rose-500 shadow-sm">
                <Sparkles size={16} /> THE PIPELINE
              </div>
              <h2 className="text-6xl font-bold tracking-tight text-[#1d1d1f] leading-[0.95]">
                How we build your <br />
                <span className="text-zinc-400">demo in 48h.</span>
              </h2>
              <div className="flex gap-2">
                 {steps.map((_, i) => (
                   <div key={i} className={`h-1.5 rounded-full transition-all duration-500 ${i === activeStep ? 'w-12 bg-rose-500' : 'w-4 bg-zinc-100'}`} />
                 ))}
              </div>
              <p className="text-zinc-500 text-lg font-medium max-w-sm">
                A frictionless, zero-risk process designed for scaling companies. Scroll to explore the engineering flow.
              </p>
            </motion.div>
          </div>

          {/* Right Side: Animated Cards */}
          <div className="relative h-[60vh] md:h-[70vh] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 100, scale: 0.9, rotate: -2 }}
                animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, y: -100, scale: 0.9, rotate: 2 }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                className="w-full max-w-md p-10 md:p-12 bg-white rounded-[3rem] border border-zinc-100 shadow-[0_40px_80px_-15px_rgba(0,0,0,0.08)] flex flex-col items-center text-center group"
              >
                <div className={`w-20 h-20 rounded-3xl ${steps[activeStep].color} flex items-center justify-center mb-10 shadow-xl shadow-zinc-200 group-hover:scale-110 transition-transform duration-500`}>
                   {(() => {
                     const Icon = steps[activeStep].icon;
                     return <Icon size={32} className={activeStep === 6 ? 'text-zinc-900' : 'text-white'} />;
                   })()}
                </div>
                <div className="mb-6">
                   <span className="text-[10px] font-black tracking-widest text-zinc-300 uppercase mb-2 block">Step 0{steps[activeStep].id} / 07</span>
                   <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-[#1d1d1f]">{steps[activeStep].title}</h3>
                </div>
                <p className="text-zinc-500 text-lg md:text-xl font-medium leading-relaxed">
                  {steps[activeStep].description}
                </p>
              </motion.div>
            </AnimatePresence>
            
            {/* Mobile Title Backdrop */}
            <div className="md:hidden absolute -top-12 left-0 right-0 text-center">
               <h2 className="text-2xl font-bold text-zinc-900">Engineering Pipeline</h2>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
