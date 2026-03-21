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
      className="fixed top-0 w-full z-[100] border-b border-zinc-200/50 bg-white/80 backdrop-blur-xl"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Left: Brand */}
        <Link href="/" className="text-xl font-bold font-outfit tracking-tighter text-[#1d1d1f] pointer-events-auto flex items-center gap-2">
          we build
        </Link>
 
        {/* Right: Navigation & CTA */}
        <div className="flex items-center gap-8 pointer-events-auto">
          <nav className="hidden md:flex items-center gap-8">
            <Link href="#services" className="text-sm font-medium text-zinc-500 hover:text-[#1d1d1f] transition-colors">Services</Link>
            <Link href="#process" className="text-sm font-medium text-zinc-500 hover:text-[#1d1d1f] transition-colors">Process</Link>
          </nav>
          
          <Button 
            className="h-9 px-4 text-xs font-semibold rounded-full bg-zinc-950 text-white hover:bg-zinc-800 transition-colors shadow-sm"
            onClick={onBookClick}
          >
            Book a demo
          </Button>
        </div>
      </div>
    </motion.header>
  );
}
