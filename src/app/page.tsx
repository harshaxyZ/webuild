"use client";

import { LoadingScreen } from "@/components/loading-screen";
import { Navbar } from "@/components/navbar";
import { HeroCinematic } from "@/components/landing/hero-cinematic";
import { DepthSection } from "@/components/landing/depth-section";
import { Services } from "@/components/landing/services";
import { ProcessSticky } from "@/components/landing/process-sticky";
import { Footer } from "@/components/footer";
import { ZenithSpinner } from "@/components/ui/zenith-spinner";
import { BookingOverlay } from "@/components/booking/booking-overlay";
import { ContactMenu } from "@/components/ui/contact-menu";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

import { Pricing } from "@/components/landing/pricing";

export default function Home() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  useEffect(() => {
    const handleHashChange = () => {
      setIsBookingOpen(window.location.hash === "#book");
    };
    
    // Check initial hash
    handleHashChange();
    
    // Listen for changes
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const openBooking = () => {
    setIsBookingOpen(true);
    window.location.hash = "book";
  };

  const closeBooking = () => {
    setIsBookingOpen(false);
    if (window.location.hash === "#book") {
      window.history.back();
    }
  };

  return (
    <div className="flex flex-col min-h-screen relative bg-zinc-950 text-zinc-50">
      <LoadingScreen />
      <Navbar onBookClick={openBooking} />
      
      <main className="flex-1 flex flex-col relative">
        <HeroCinematic onBookClick={openBooking} />
        <div className="relative z-20">
          <Services />
          <ProcessSticky />
          <Pricing />
          
          <section className="section-padding bg-zinc-950 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-rose-500/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="container mx-auto max-w-6xl">
              <div className="text-center p-14 md:p-24 rounded-[3.5rem] bg-white/5 border border-white/10 relative overflow-hidden shadow-2xl">
                 <div className="absolute inset-0 bg-gradient-to-tr from-rose-500/10 via-transparent to-blue-500/10 opacity-70" />
                 
                 <motion.div
                   initial={{ opacity: 0, scale: 0.95, y: 20 }}
                   whileInView={{ opacity: 1, scale: 1, y: 0 }}
                   viewport={{ once: true, margin: "-100px" }}
                   transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                   className="relative z-10 flex flex-col items-center"
                 >
                    <h2 className="text-4xl md:text-7xl font-black mb-8 tracking-tight leading-[1.1]">Your business deserves a <br /> better website.</h2>
                    <p className="text-zinc-400 text-lg md:text-2xl max-w-2xl mx-auto mb-12 leading-relaxed font-medium">
                      Get a free working demo in 48 hours. <br className="hidden md:block" />
                      If you don't love it — you pay absolutely nothing.
                    </p>
                    <Button 
                      onClick={openBooking}
                      className="btn-pill h-16 md:h-18 px-12 md:px-16 text-lg md:text-xl font-bold bg-white text-zinc-950 hover:bg-zinc-200 shadow-[0_0_40px_rgba(255,255,255,0.1)] flex items-center gap-2 group"
                    >
                      Get My Free Demo
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </Button>
                 </motion.div>
              </div>
            </div>
          </section>
          <Footer />
        </div>
      </main>

      <BookingOverlay 
        isOpen={isBookingOpen} 
        onClose={closeBooking} 
      />
      <ContactMenu />
    </div>
  );
}
