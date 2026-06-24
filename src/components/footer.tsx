"use client";

import Link from "next/link";
import { useBooking } from "./BookingProvider";

export function Footer() {
  const { setBookingOpen } = useBooking();

  return (
    <footer className="border-t border-[var(--border)] bg-[var(--bg)] mt-auto">
      <div className="max-w-7xl mx-auto px-[20px] md:px-[6%] py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-16">
          <div>
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight mb-4">
              Ready to build something?
            </h2>
            <p className="text-[var(--text-secondary)] text-lg">
              Apps, websites, and AI agents — built by a small team that actually gives a damn.
            </p>
          </div>
          <div className="md:text-right">
            <button 
              onClick={() => setBookingOpen(true)}
              className="btn-pill inline-flex items-center text-lg py-4 px-8"
            >
              Book a Call &rarr;
            </button>
          </div>
        </div>
        
        <div className="pt-8 border-t border-[var(--border)] flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="font-medium text-xl">we build</div>
          
          <div className="flex items-center gap-6 text-[var(--text-secondary)] text-sm">
            <Link href="/privacy-policy" className="hover:text-[var(--text-primary)] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="hover:text-[var(--text-primary)] transition-colors">
              Terms of Service
            </Link>
          </div>
          
          <div className="text-[var(--text-secondary)] text-sm">
            © {new Date().getFullYear()} we build. All rights reserved. <span className="ml-4">webuildnow.in</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
