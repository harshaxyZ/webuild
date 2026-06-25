// Trigger build: Google Search Console verification
"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Approach from "@/components/Approach";
import Services from "@/components/Services";
import ModernEngineering from "@/components/ModernEngineering";
import BookingPanel from "@/components/BookingPanel";
import ScrollReveal from "@/components/ScrollReveal";

export default function Home() {
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  return (
    <main className="relative">
      <Navbar onOpenPanel={() => setIsPanelOpen(true)} />
      
      {/* Structured Schema.org Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebDesignAgency",
            "name": "We Build",
            "url": "https://webuildnow.in",
            "logo": "https://webuildnow.in/og-image.png",
            "image": "https://webuildnow.in/og-image.png",
            "description": "We are a premium digital product and web engineering agency building fast, reliable Next.js apps.",
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+917899214458",
              "contactType": "sales",
              "availableLanguage": "en"
            },
            "sameAs": [
              "https://github.com/harshaxyZ/webuild"
            ]
          })
        }}
      />
      
      <Hero onOpenPanel={() => setIsPanelOpen(true)} />
      <Marquee />
      <Approach />
      <Services />
      <ModernEngineering />

      {/* Final CTA */}
      <section className="py-40 md:py-60 px-6 relative z-10 border-t border-[var(--border)] text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-6xl md:text-9xl font-semibold tracking-tighter mb-12">
            <span className="block overflow-hidden">
              <motion.span initial={{ y: "100%" }} whileInView={{ y: 0 }} viewport={{ once: true }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} className="block">Ready to build?</motion.span>
            </span>
          </h2>
          <ScrollReveal>
            <button onClick={() => setIsPanelOpen(true)} className="group flex items-center gap-2 bg-[var(--text)] text-[var(--bg)] px-10 py-5 rounded-full text-lg font-medium hover:opacity-80 transition-opacity mx-auto">
              Start Your Project Now <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </ScrollReveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 border-t border-[var(--border)] relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs font-light text-[var(--muted)]">© {new Date().getFullYear()} We Build. All rights reserved.</p>
          <div className="flex gap-6 text-[var(--muted)]">
            <a href="/privacy-policy" className="hover:text-[var(--text)] transition-colors text-sm">Privacy</a>
            <a href="/terms-of-service" className="hover:text-[var(--text)] transition-colors text-sm">Terms</a>
          </div>
        </div>
      </footer>

      <BookingPanel isOpen={isPanelOpen} onClose={() => setIsPanelOpen(false)} />
    </main>
  );
}
