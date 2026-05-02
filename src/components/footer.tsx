"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Twitter, Github, Linkedin, Instagram, ArrowRight, ExternalLink } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-zinc-950 text-zinc-400 py-24 border-t border-white/5 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-20">
          <div className="max-w-sm">
            <div className="text-3xl font-black tracking-tight text-white mb-6">
              we build.
            </div>
            <p className="text-zinc-500 text-lg leading-relaxed font-medium">
              We build high-end websites and automation systems for businesses across India. Fast, professional, and zero risk.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-12 md:gap-24">
            <div>
              <h4 className="text-white font-bold text-xs uppercase tracking-[0.2em] mb-8">Navigation</h4>
              <ul className="space-y-4 text-sm font-bold">
                <li><Link href="#how-it-works" className="hover:text-rose-500 transition-colors">How it works</Link></li>
                <li><Link href="#pricing" className="hover:text-rose-500 transition-colors">Pricing</Link></li>
                <li><Link href="#book" className="hover:text-rose-500 transition-colors">Start For Free</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold text-xs uppercase tracking-[0.2em] mb-8">Contact</h4>
              <ul className="space-y-4 text-sm font-bold">
                <li><a href="mailto:harsha210108@gmail.com" className="hover:text-rose-500 transition-colors">Email Us</a></li>
                <li><a href="https://wa.me/91XXXXXXXXXX" className="hover:text-rose-500 transition-colors">WhatsApp</a></li>
              </ul>
            </div>
            <div className="hidden md:block">
              <h4 className="text-white font-bold text-xs uppercase tracking-[0.2em] mb-8">Portal</h4>
              <ul className="space-y-4 text-sm font-bold">
                <li><Link href="/admin" className="flex items-center gap-2 hover:text-rose-500 transition-colors">Admin <ExternalLink size={14} /></Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-[11px] font-bold tracking-[0.2em] uppercase text-zinc-600">
            &copy; {currentYear} we build. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            {[Twitter, Instagram, Linkedin].map((Icon, idx) => (
              <Link key={idx} href="#" className="text-zinc-600 hover:text-white transition-colors">
                <Icon size={18} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
