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
      className="fixed top-0 w-full z-[100] border-b border-zinc-200/50 bg-white/70 backdrop-blur-2xl"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Left: Brand */}
        <Link href="/" className="text-2xl font-bold font-heading tracking-tight text-[#1d1d1f] pointer-events-auto flex items-center gap-2">
          we build<span className="text-rose-500 text-3xl leading-none">.</span>
        </Link>
 
        {/* Right: Navigation & CTA */}
        <div className="flex items-center gap-8 pointer-events-auto">
          <nav className="hidden md:flex items-center gap-8">
            <Link href="#services" className="text-sm font-semibold text-zinc-500 hover:text-zinc-900 hover:scale-105 transition-all">Services</Link>
            <Link href="#process" className="text-sm font-semibold text-zinc-500 hover:text-zinc-900 hover:scale-105 transition-all">Process</Link>
          </nav>
          
          <Button 
            className="h-10 px-5 text-xs font-bold rounded-full bg-zinc-950 text-white hover:bg-rose-500 hover:shadow-[0_0_20px_rgba(244,63,94,0.4)] transition-all duration-300 shadow-sm"
            onClick={onBookClick}
          >
            Book a demo
          </Button>
        </div>
      </div>
    </motion.header>
  );
}
