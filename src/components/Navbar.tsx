"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun, Menu, X } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
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
          <Link href="/" className="flex items-center gap-3 text-lg font-medium tracking-tighter">
            <div className="w-8 h-8 rounded-md flex items-center justify-center font-bold bg-[var(--text)] text-[var(--bg)]">w</div>
            we build
          </Link>

          <div className="hidden md:flex items-center gap-10 text-sm font-light text-[var(--muted)]">
            <Link href="/#approach" className="hover:text-[var(--text)] transition-colors">Approach</Link>
            <Link href="/#services" className="hover:text-[var(--text)] transition-colors">Services</Link>
            <Link href="/#work" className="hover:text-[var(--text)] transition-colors">Work</Link>
          </div>

          <div className="flex items-center gap-4">
            <button onClick={toggleTheme} className="p-2 rounded-full border border-[var(--border)] hover:border-[var(--text)] transition-colors">
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
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
            className="fixed inset-0 bg-[var(--bg)] z-[99] flex flex-col items-center justify-center gap-6 md:hidden p-6"
          >
            <button onClick={() => setMenuOpen(false)} className="absolute top-8 right-6 text-[var(--text)] hover:opacity-75 transition-opacity"><X size={32} /></button>
            
            <Link href="/#approach" onClick={() => setMenuOpen(false)} className="text-3xl font-medium tracking-tighter text-[var(--text)] hover:opacity-85 transition-opacity">Approach</Link>
            <Link href="/#services" onClick={() => setMenuOpen(false)} className="text-3xl font-medium tracking-tighter text-[var(--text)] hover:opacity-85 transition-opacity">Services</Link>
            <Link href="/#work" onClick={() => setMenuOpen(false)} className="text-3xl font-medium tracking-tighter text-[var(--text)] hover:opacity-85 transition-opacity">Work</Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

