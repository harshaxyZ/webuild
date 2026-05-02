"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { motion } from "framer-motion";

export function Navbar({ onBookClick }: { onBookClick?: () => void }) {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 w-full z-[100] bg-zinc-950/80 backdrop-blur-md border-b border-white/5"
    >
      <div className="max-w-[1440px] mx-auto flex items-center justify-between px-5 md:px-12 py-5">
        {/* Left: Brand */}
        <Link href="/" className="group flex items-center gap-0">
          <span className="text-xl md:text-2xl font-black tracking-tighter text-white">we build</span>
        </Link>
 
        {/* Right: Navigation & CTA */}
        <div className="flex items-center gap-8">
          <nav className="hidden md:flex items-center gap-10">
            <Link href="#how-it-works" className="text-[14px] font-medium text-zinc-400 hover:text-white transition-colors">How it works</Link>
            <Link href="#pricing" className="text-[14px] font-medium text-zinc-400 hover:text-white transition-colors">Pricing</Link>
          </nav>
          
          <Button 
            className="btn-pill min-h-[44px] px-[14px] py-[8px] md:px-8 md:py-0 md:h-12 text-[12px] md:text-[15px] font-bold bg-white text-zinc-950 hover:bg-zinc-200 shadow-lg rounded-[100px] transition-all"
            onClick={onBookClick}
          >
            Get Free Demo
          </Button>
        </div>
      </div>
    </motion.header>
  );
}
