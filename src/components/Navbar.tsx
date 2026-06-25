"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useBooking } from "./BookingProvider";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { setBookingOpen } = useBooking();
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? "bg-[var(--bg)]/80 backdrop-blur-xl border-b border-[var(--border)]" : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-[20px] md:px-[6%] h-16 flex items-center justify-between animate-in fade-in slide-in-from-top-4 duration-500">
        <Link href="/" className="text-xl font-semibold tracking-tight text-[var(--text-primary)]">
          we build
        </Link>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")}
            className="p-2 rounded-full hover:bg-[var(--surface-2)] transition-colors text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            aria-label="Toggle theme"
          >
            {resolvedTheme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </button>
          <button onClick={() => setBookingOpen(true)} className="btn-pill text-sm py-2 px-5">
            Book a Call &rarr;
          </button>
        </div>
      </div>
    </nav>
  );
}
