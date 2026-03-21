"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function Footer() {
  return (
    <motion.footer 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      className="py-12 border-t border-zinc-100 mt-auto bg-white"
    >
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-xl font-bold tracking-tight text-[#1d1d1f] px-2">
          we build
        </div>
        
        <p className="text-sm text-zinc-500 font-medium">
          &copy; {new Date().getFullYear()} we build. All rights reserved.
        </p>
 
        <nav className="flex items-center gap-8 text-sm font-bold tracking-widest uppercase text-zinc-500">
          <Link 
            href="#" 
            onClick={(e) => { e.preventDefault(); alert("Privacy Policy coming soon!"); }}
            className="hover:text-[#1d1d1f] transition-colors"
          >
            Privacy
          </Link>
          <Link 
            href="#" 
            onClick={(e) => { e.preventDefault(); alert("Terms of Service coming soon!"); }}
            className="hover:text-[#1d1d1f] transition-colors"
          >
            Terms
          </Link>
          <Link href="mailto:harsha210108@gmail.com" className="hover:text-[#1d1d1f] transition-colors underline underline-offset-8 decoration-zinc-200">Contact</Link>
        </nav>
      </div>
    </motion.footer>
  );
}
