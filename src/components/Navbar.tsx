"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useBooking } from "./BookingProvider";
import { useTheme } from "next-themes";
import { Moon, Sun, LayoutDashboard, User as UserIcon } from "lucide-react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, User } from "firebase/auth";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { setBookingOpen } = useBooking();
  const { resolvedTheme, setTheme } = useTheme();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (auth) {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
      });
      return () => unsubscribe();
    }
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? "glass-nav py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-[var(--text-primary)] rounded-lg flex items-center justify-center group-hover:scale-95 transition-transform">
            <span className="text-[var(--bg)] font-bold text-lg">w</span>
          </div>
          <span className="text-xl font-semibold tracking-tight text-[var(--text-primary)]">
            we build
          </span>
        </Link>
        
        <div className="flex items-center gap-3 sm:gap-6">
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-[var(--text-secondary)]">
            <button onClick={() => {
              if (window.location.pathname !== "/") window.location.href = "/#services";
              else document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
            }} className="hover:text-[var(--text-primary)] transition-colors">Services</button>
            <Link href="/terms-of-service" className="hover:text-[var(--text-primary)] transition-colors">Process</Link>
          </div>

          <div className="h-4 w-px bg-[var(--border)] hidden md:block mx-2" />

          <button
            onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")}
            className="p-2 rounded-full hover:bg-[var(--surface-2)] transition-colors text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            aria-label="Toggle theme"
          >
            {resolvedTheme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </button>
          
          {user ? (
            <Link 
              href="/dashboard" 
              className="flex items-center gap-2 text-sm font-medium text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </Link>
          ) : (
            <Link 
              href="/login" 
              className="flex items-center gap-2 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
            >
              <UserIcon className="w-4 h-4" />
              <span className="hidden sm:inline">Sign In</span>
            </Link>
          )}

          <button onClick={() => setBookingOpen(true)} className="btn-pill text-sm py-2 px-5 hidden sm:block">
            Book a Call
          </button>
        </div>
      </div>
    </nav>
  );
}
