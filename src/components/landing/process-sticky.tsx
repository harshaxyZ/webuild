"use client";

import { motion } from "framer-motion";
import { Search, PenTool, Layout, FileText, Palette, MessageSquare, Sparkles } from "lucide-react";

export function ProcessSticky() {
  const steps = [
    { 
      title: "Share your idea", 
      desc: "Tell us what your business does and what you need. A message is enough.",
      icon: <MessageSquare className="w-5 h-5" />
    },
    { 
      title: "We ask the right questions", 
      desc: "We get clarity on your goals, style and target customers.",
      icon: <Search className="w-5 h-5" />
    },
    { 
      title: "We design the look", 
      desc: "We create the perfect visual style that matches your brand.",
      icon: <Palette className="w-5 h-5" />
    },
    { 
      title: "We build your demo", 
      desc: "A fully working website demo built and delivered in 48 hours.",
      icon: <Layout className="w-5 h-5" />
    },
    { 
      title: "You review everything", 
      desc: "Go through every page and tell us exactly what to change.",
      icon: <FileText className="w-5 h-5" />
    },
    { 
      title: "We refine until perfect", 
      desc: "We make every single change until you are completely happy.",
      icon: <PenTool className="w-5 h-5" />
    },
    { 
      title: "We go live", 
      desc: "Your website goes live, fully hosted and ready to bring you customers.",
      icon: <Sparkles className="w-5 h-5" />
    },
  ];

  return (
    <section id="how-it-works" className="py-[60px] md:py-[100px] px-[20px] md:px-[6%] bg-zinc-950 relative overflow-hidden">
      <div className="container mx-auto max-w-5xl relative z-10">
        <div className="mb-16 md:mb-20 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold tracking-[0.2em] text-rose-500 uppercase mb-6">HOW IT WORKS</span>
          <h2 className="text-[clamp(24px,5vw,48px)] md:text-7xl font-black tracking-tight text-white mb-6 leading-[1.1]">How we build your <br className="hidden md:block" /> demo in <span className="text-rose-500 italic">48 hours.</span></h2>
          <p className="text-zinc-400 text-base md:text-2xl font-medium">Simple. Transparent. Zero risk for you.</p>
        </div>

        <div className="relative">
          {/* Vertical Line - Hidden on Mobile */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-rose-500/50 via-zinc-800 to-transparent -translate-x-1/2" />

          {/* Wrapper */}
          <div className="flex overflow-x-auto snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] md:block md:space-y-16 pb-8 md:pb-0 -mx-[20px] px-[20px] md:mx-0 md:px-0 gap-4 md:gap-0 pt-4 md:pt-0">
            {steps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className={`relative flex flex-col md:flex-row items-start md:items-center flex-none w-[85vw] md:w-auto snap-center ${
                  idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Step Circle - Desktop Absolute Center */}
                <div className="hidden md:flex absolute left-1/2 w-16 h-16 rounded-full bg-zinc-950 border-2 border-rose-500 z-20 -translate-x-1/2 items-center justify-center text-2xl font-black text-white shadow-[0_0_15px_rgba(244,63,94,0.4)]">
                  {idx + 1}
                </div>

                {/* Content Container */}
                <div className={`w-full md:w-1/2 ${idx % 2 === 0 ? "md:pr-16" : "md:pl-16"}`}>
                  <div className="relative p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] bg-white/5 border border-white/10 card-hover-glow group transition-all duration-500 hover:border-rose-500/30">
                    
                    {/* Step Circle - Mobile Top Left */}
                    <div className="md:hidden absolute -top-4 -left-2 w-[40px] h-[40px] rounded-full bg-zinc-950 border-2 border-rose-500 z-20 flex items-center justify-center text-[16px] font-black text-white shadow-[0_0_15px_rgba(244,63,94,0.4)]">
                      {idx + 1}
                    </div>

                    <div className="w-12 h-12 rounded-2xl bg-rose-500/10 flex items-center justify-center text-rose-500 mb-5 md:mb-6 group-hover:scale-110 transition-transform duration-500">
                      {step.icon}
                    </div>
                    <h3 className="text-[18px] md:text-2xl font-bold md:font-black text-white mb-3 md:mb-4 leading-tight">{step.title}</h3>
                    <p className="text-zinc-400 text-[14px] md:text-[16px] font-medium leading-relaxed">{step.desc}</p>
                  </div>
                </div>

                {/* Empty space for the other side */}
                <div className="hidden md:block md:w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
