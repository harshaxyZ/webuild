"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Twitter, Github, Linkedin, Instagram, ArrowRight, ExternalLink } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-zinc-950 text-zinc-400 py-24 border-t border-white/5 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-rose-500/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 lg:gap-8 mb-20">
          
          {/* Brand Column */}
          <div className="lg:col-span-5">
            <div className="text-3xl font-heading font-semibold tracking-tight text-white mb-8 flex items-baseline">
              we build<span className="text-rose-500 text-4xl leading-none ml-0.5">.</span>
            </div>
            <p className="text-zinc-500 text-lg max-w-sm mb-10 leading-relaxed font-sans">
              Senior engineering agency building high-performance systems for brands who command authority. 
            </p>
            <div className="flex items-center gap-6">
              {[Twitter, Github, Linkedin, Instagram].map((Icon, idx) => (
                <Link key={idx} href="#" className="text-zinc-500 hover:text-white transition-colors duration-300">
                  <Icon size={20} />
                </Link>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-bold text-xs uppercase tracking-[0.2em] mb-8">Navigation</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link href="/" className="hover:text-rose-500 transition-colors">Home</Link></li>
              <li><Link href="#services" className="hover:text-rose-500 transition-colors">Services</Link></li>
              <li><Link href="#process" className="hover:text-rose-500 transition-colors">Our Flow</Link></li>
              <li><Link href="/status" className="hover:text-rose-500 transition-colors">Track Status</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-white font-bold text-xs uppercase tracking-[0.2em] mb-8">Solutions</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><span className="cursor-default">Conversion Engines</span></li>
              <li><span className="cursor-default">Internal Automation</span></li>
              <li><span className="cursor-default">Secure SaaS</span></li>
              <li><span className="cursor-default">Bespoke Design</span></li>
            </ul>
          </div>

          {/* Contact Column */}
          <div className="lg:col-span-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-[0.2em] mb-8">Contact</h4>
            <div className="space-y-6">
              <a href="mailto:harsha210108@gmail.com" className="group block">
                 <div className="text-sm text-zinc-500 mb-1 group-hover:text-rose-500 transition-colors">Engineering Inquiry</div>
                 <div className="text-white font-medium flex items-center gap-2">
                    harsha210108@gmail.com
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                 </div>
              </a>
              <div className="p-4 rounded-3xl bg-white/5 border border-white/10 text-[10px] leading-relaxed uppercase tracking-widest font-bold">
                 Global Operations <br />
                 Execution in 48H
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-600">
            &copy; {currentYear} we build. Built with precision.
          </div>
          
          <div className="flex gap-10 text-[10px] font-bold tracking-[0.25em] uppercase text-zinc-600">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-white transition-colors flex items-center gap-1.5 border-b border-rose-500/0 hover:border-rose-500 pb-0.5">
               Admin Access <ExternalLink size={10} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
