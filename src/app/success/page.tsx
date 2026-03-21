"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { CheckCircle2, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SkyBackground } from "@/components/ui/sky-background";
import { Navbar } from "@/components/navbar";
import { LoadingScreen } from "@/components/loading-screen";

export default function SuccessPage() {
  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden bg-white">
      <LoadingScreen />
      <SkyBackground />
      <Navbar />

      <main className="flex-1 flex flex-col items-center justify-center p-6 relative z-10">
        <div className="max-w-2xl w-full text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-12 inline-flex items-center justify-center w-24 h-24 rounded-full bg-slate-950 text-white"
          >
            <CheckCircle2 size={48} strokeWidth={1.5} />
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 text-slate-950">
              it's in motion.
            </h1>
            <p className="text-xl md:text-2xl text-slate-500 font-medium leading-relaxed mb-12">
              Your vision has been received. Our engineering team is already analyzing your requirements. Expect your first demo within 48 hours.
            </p>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col md:flex-row items-center justify-center gap-4"
          >
            <Button asChild variant="gradient" className="h-14 px-10 text-lg rounded-2xl group">
              <Link href="/">
                Back to home <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            
            <div className="flex items-center gap-2 text-slate-400 text-sm font-bold uppercase tracking-widest px-6 py-4 rounded-2xl border border-slate-100 bg-slate-50/50">
              <Sparkles size={16} className="text-blue-500" /> 48h turn-around guaranteed
            </div>
          </motion.div>
        </div>
      </main>

      <footer className="p-10 text-center relative z-10 mt-auto">
        <p className="text-slate-300 text-sm font-medium tracking-tight">
          © 2024 WE BUILD. ALL RIGHTS RESERVED.
        </p>
      </footer>
      
      {/* Decorative background elements */}
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-slate-50/50 to-transparent pointer-events-none" />
    </div>
  );
}
