"use client";

import Link from "next/link";
import DotGrid from "@/components/grid";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-zinc-950 text-zinc-400 py-16 md:py-24 border-t border-white/5 relative overflow-hidden">
      {/* ── DOT GRID BACKGROUND ── */}
      <div className="absolute inset-0 w-full h-full pointer-events-none opacity-40" style={{ zIndex: 0 }}>
        <DotGrid
          dotSize={5}
          gap={15}
          baseColor="#2F293A"
          activeColor="#f70ecb"
          proximity={120}
          speedTrigger={100}
          shockRadius={250}
          shockStrength={5}
        />
      </div>

      <div className="relative container mx-auto px-5 md:px-6" style={{ zIndex: 10 }}>
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-12 md:gap-12 mb-16 md:mb-20 text-center md:text-left">
          <div className="max-w-sm">
            <div className="text-3xl font-black tracking-tight text-white mb-6">
              we build
            </div>
            <p className="text-zinc-500 text-lg leading-relaxed font-medium">
              We build professional websites and automation systems for businesses across India. Fast, professional, and zero risk.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-12 md:gap-24">
            <div>
              <h4 className="text-white font-bold text-xs uppercase tracking-[0.2em] mb-8">Navigation</h4>
              <ul className="space-y-4 text-sm font-bold">
                <li><Link href="#how-it-works" className="hover:text-rose-500 transition-colors">How it works</Link></li>
                <li><Link href="#pricing" className="hover:text-rose-500 transition-colors">Pricing</Link></li>
                <li><Link href="#contact" className="hover:text-rose-500 transition-colors">Get Free Demo</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold text-xs uppercase tracking-[0.2em] mb-8">Contact</h4>
              <ul className="space-y-4 text-sm font-bold">
                <li><a href="mailto:harsha210108@gmail.com" className="hover:text-rose-500 transition-colors">Email Us</a></li>
                <li><a href="https://wa.me/917899214458" className="hover:text-rose-500 transition-colors">WhatsApp</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col items-center gap-4">
          <div className="text-[11px] font-bold tracking-[0.2em] uppercase text-zinc-600">
            &copy; {currentYear} we build &mdash; All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
