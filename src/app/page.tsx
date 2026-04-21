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
    <div className="flex flex-col min-h-screen relative bg-[#fbfbfd]">
      <LoadingScreen />
      <Navbar onBookClick={openBooking} />
      
      <main className="flex-1 flex flex-col relative">
        <HeroCinematic onBookClick={openBooking} />
        <div className="relative z-20 overflow-hidden bg-white">
          <Services />
          <DepthSection />
          <ProcessSticky />
          <section className="py-24 md:py-32 bg-[#fafafa] px-6 relative overflow-hidden">
            <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-rose-200/20 rounded-full blur-[120px] pointer-events-none" />
            <div className="container mx-auto max-w-6xl">
              <div className="text-center p-14 md:p-24 rounded-[3.5rem] bg-zinc-950 text-white relative overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.15)] border border-white/5">
                 {/* Internal glowing elements */}
                 <div className="absolute inset-0 bg-gradient-to-tr from-rose-600/10 via-transparent to-sky-500/10 opacity-70" />
                 <div className="absolute -top-[50%] -right-[20%] w-[500px] h-[500px] bg-rose-500/20 rounded-full blur-[100px]" />
                 <div className="absolute -bottom-[50%] -left-[20%] w-[400px] h-[400px] bg-white/5 rounded-full blur-[80px]" />
                 
                 <motion.div
                   initial={{ opacity: 0, scale: 0.95, y: 20 }}
                   whileInView={{ opacity: 1, scale: 1, y: 0 }}
                   viewport={{ once: true, margin: "-100px" }}
                   transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                   className="relative z-10 flex flex-col items-center"
                 >
                   <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-[10px] font-bold tracking-[0.2em] text-white/90 uppercase mb-8 shadow-sm">
                     Start Your Project
                   </span>
                   <h2 className="text-5xl md:text-7xl font-heading font-medium mb-8 tracking-tight leading-[1.1]">Ready to build?</h2>
                   <p className="text-zinc-400 text-lg md:text-2xl max-w-2xl mx-auto mb-12 leading-relaxed">
                     Get a high-fidelity demo of your vision in 48 hours. Zero risk. Full engineering execution.
                   </p>
                   <Button 
                     onClick={openBooking}
                     className="h-16 md:h-18 px-12 md:px-16 text-lg md:text-xl font-bold rounded-[1.25rem] bg-white text-zinc-950 hover:bg-zinc-100 hover:scale-[1.03] transition-all duration-300 shadow-[0_0_40px_rgba(255,255,255,0.15)] active:scale-[0.98]"
                   >
                     Get Your Demo Now
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
