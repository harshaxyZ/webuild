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
        <Link href="/" className="text-xl md:text-2xl font-black tracking-tight text-white flex items-center gap-0">
          we build
        </Link>
 
        {/* Right: Navigation & CTA */}
        <div className="flex items-center gap-8">
          <nav className="hidden md:flex items-center gap-10">
            <Link href="#how-it-works" className="text-[14px] font-medium text-zinc-400 hover:text-white transition-colors">How it works</Link>
            <Link href="#pricing" className="text-[14px] font-medium text-zinc-400 hover:text-white transition-colors">Pricing</Link>
          </nav>
          
          <Button 
            className="btn-pill h-11 md:h-12 px-6 md:px-8 text-[14px] md:text-[15px] font-bold bg-white text-zinc-950 hover:bg-zinc-200 shadow-lg"
            onClick={onBookClick}
          >
            Get Free Demo
          </Button>
        </div>
      </div>
    </motion.header>
  );
}
