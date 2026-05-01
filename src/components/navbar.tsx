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
      className="fixed top-0 w-full z-[100] bg-white/40 backdrop-blur-md border-b border-white/10"
    >
      <div className="max-w-[1440px] mx-auto flex items-center justify-between px-6 md:px-12 py-5">
        {/* Left: Brand */}
        <Link href="/" className="text-[1.75rem] font-black tracking-tight text-zinc-950 flex items-center gap-0">
          we build.
        </Link>
 
        {/* Right: Navigation & CTA */}
        <div className="flex items-center gap-10">
          <nav className="hidden md:flex items-center gap-10">
            <div className="group relative">
              <button className="text-[15px] font-medium text-zinc-800 flex items-center gap-1.5 hover:text-zinc-500 transition-colors">
                Services
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg" className="mt-0.5 opacity-60">
                  <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
            <Link href="#process" className="text-[15px] font-medium text-zinc-800 hover:text-zinc-500 transition-colors">Process</Link>
            <Link href="#pricing" className="text-[15px] font-medium text-zinc-800 hover:text-zinc-500 transition-colors">Pricing</Link>
          </nav>
          
          <div className="flex items-center gap-4">
            <Button 
              className="h-12 px-7 text-[15px] font-bold rounded-full bg-zinc-950 text-white hover:bg-zinc-800 transition-all duration-300 shadow-lg flex items-center gap-2 group"
              onClick={onBookClick}
            >
              Get Your Free Demo
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </Button>

            {/* Hamburger for mobile */}
            <button className="md:hidden p-2 text-zinc-950">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
