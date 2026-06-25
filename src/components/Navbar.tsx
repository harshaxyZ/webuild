"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun, Menu, X, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Navbar({ onOpenPanel }: { onOpenPanel?: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    const newTheme = isDark ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", newTheme);
    setIsDark(!isDark);
  };

  return (
    <>
      <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? "bg-[var(--glass)] backdrop-blur-2xl border-b border-[var(--border)]" : "bg-transparent border-b border-transparent"}`}>
        <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-5">
          <Link href="#" className="flex items-center gap-3 text-lg font-medium tracking-tighter">
            <div className="w-8 h-8 rounded-md flex items-center justify-center font-bold bg-[var(--text)] text-[var(--bg)]">w</div>
            we build
          </Link>

          <div className="hidden md:flex items-center gap-10 text-sm font-light text-[var(--muted)]">
            <Link href="#approach" className="hover:text-[var(--text)] transition-colors">Approach</Link>
            <Link href="#services" className="hover:text-[var(--text)] transition-colors">Services</Link>
            <Link href="#work" className="hover:text-[var(--text)] transition-colors">Work</Link>
          </div>

          <div className="flex items-center gap-4">
            <button onClick={toggleTheme} className="p-2 rounded-full border border-[var(--border)] hover:border-[var(--text)] transition-colors">
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button onClick={onOpenPanel} className="hidden md:flex items-center gap-2 bg-[var(--text)] text-[var(--bg)] px-5 py-2.5 rounded-full text-sm font-medium hover:opacity-80 transition-opacity group">
              Book a Call <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button onClick={() => setMenuOpen(true)} className="md:hidden p-2"><Menu size={24} /></button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div 
            initial={{ y: "-100%" }} 
            animate={{ y: 0 }} 
            exit={{ y: "-100%" }} 
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 bg-[var(--bg)] z-[99] flex flex-col items-center justify-center gap-8 md:hidden"
          >
            <button onClick={() => setMenuOpen(false)} className="absolute top-8 right-6"><X size={32} /></button>
            <Link href="#approach" onClick={() => setMenuOpen(false)} className="text-4xl font-medium tracking-tighter">Approach</Link>
            <Link href="#services" onClick={() => setMenuOpen(false)} className="text-4xl font-medium tracking-tighter">Services</Link>
            <Link href="#work" onClick={() => setMenuOpen(false)} className="text-4xl font-medium tracking-tighter">Work</Link>
            <button onClick={() => { setMenuOpen(false); if(onOpenPanel) onOpenPanel(); }} className="mt-8 bg-[var(--text)] text-[var(--bg)] px-8 py-4 rounded-full text-base font-medium">Book a Call</button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
