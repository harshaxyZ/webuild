"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  
  // GPU Parallax
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const gridY = useTransform(scrollYProgress, [0, 1], [0, 250]);

  const openWhatsApp = () => {
    window.open("https://wa.me/917899214458?text=Hi,%20I'd%20like%20to%20discuss%20a%20project.", "_blank");
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      }
    }
  };

  const itemVariants = {
    hidden: { y: "110%" },
    visible: {
      y: 0,
      transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section ref={ref} className="relative min-h-screen flex flex-col justify-center items-center px-6 pt-32 pb-20 z-10 overflow-hidden text-center">
      {/* Ambient Cosmic Glow */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <motion.div 
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.15, 0.22, 0.15],
            x: ["-5%", "5%", "-5%"],
            y: ["-5%", "5%", "-5%"]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-amber-500/20 to-purple-600/10 blur-[140px]"
        />
        <motion.div 
          animate={{
            scale: [1.1, 0.95, 1.1],
            opacity: [0.12, 0.18, 0.12],
            x: ["5%", "-5%", "5%"],
            y: ["5%", "-5%", "5%"]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-blue-500/10 to-amber-600/15 blur-[120px]"
        />
      </div>

      {/* Parallax Grid */}
      <motion.div style={{ y: gridY }} className="grid-bg z-0" />
      
      <motion.div style={{ y, opacity }} className="max-w-4xl mx-auto w-full relative z-20 flex flex-col items-center">
        <motion.div 
          initial={{ opacity: 0, y: 15 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--border)] bg-[var(--surface)]"
        >
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-xs font-light tracking-wide text-[var(--muted)]">Accepting first founding partners Q3</span>
        </motion.div>
        
        <motion.h1 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-6xl md:text-8xl lg:text-[7rem] font-semibold tracking-tighter leading-[0.95] mb-8 flex flex-col items-center select-none"
        >
          <span className="block overflow-hidden py-1"><motion.span variants={itemVariants} className="block">We build</motion.span></span>
          <span className="block overflow-hidden py-1"><motion.span variants={itemVariants} className="block bg-gradient-to-r from-[var(--text)] to-[var(--muted)] bg-clip-text text-transparent">things that</motion.span></span>
          <span className="block overflow-hidden py-1"><motion.span variants={itemVariants} className="block">work.</motion.span></span>
        </motion.h1>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center gap-8 max-w-2xl"
        >
          <p className="text-lg md:text-xl font-light leading-relaxed text-[var(--muted)]">
            We aren't bogged down by legacy code. As a premium web development agency, we engineer custom Next.js websites, React web apps, and scalable digital products from scratch with modern precision.
          </p>
          <motion.button 
            onClick={openWhatsApp} 
            className="group flex items-center gap-3 bg-[var(--text)] text-[var(--bg)] px-9 py-4.5 rounded-full text-base font-medium transition-shadow relative overflow-hidden"
            whileHover={{ scale: 1.03, boxShadow: "0 0 30px rgba(255, 255, 255, 0.15)" }}
            whileTap={{ scale: 0.98 }}
          >
            Start Your Project 
            <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform duration-300" />
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
}
