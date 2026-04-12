"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function Footer() {
  return (
    <motion.footer 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className="py-12 border-t border-zinc-100 bg-[#fafafa]"
    >
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-3xl font-heading font-semibold tracking-tight text-[#1d1d1f] px-2 flex items-baseline">
          we build<span className="text-rose-500 text-4xl leading-none ml-0.5">.</span>
        </div>
        
        <p className="text-sm text-zinc-500 font-medium tracking-wide">
          &copy; {new Date().getFullYear()} we build. All rights reserved.
        </p>
 
        <nav className="flex flex-wrap justify-center items-center gap-6 md:gap-8 text-[11px] font-bold tracking-[0.15em] uppercase text-zinc-400">
          <Link 
            href="#" 
            onClick={(e) => { e.preventDefault(); alert("Privacy Policy coming soon!"); }}
            className="hover:text-zinc-900 transition-colors duration-300"
          >
            Privacy
          </Link>
          <Link 
            href="#" 
            onClick={(e) => { e.preventDefault(); alert("Terms of Service coming soon!"); }}
            className="hover:text-zinc-900 transition-colors duration-300"
          >
            Terms
          </Link>
          <Link 
            href="/status" 
            className="hover:text-rose-500 transition-colors duration-300 relative group"
          >
            Track Status
            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-rose-500 transition-all duration-300 group-hover:w-full" />
          </Link>
          <Link 
            href="mailto:harsha210108@gmail.com" 
            className="hover:text-zinc-900 transition-colors duration-300 relative group"
          >
            Contact
            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-zinc-900 transition-all duration-300 group-hover:w-full" />
          </Link>
        </nav>
      </div>
    </motion.footer>
  );
}
