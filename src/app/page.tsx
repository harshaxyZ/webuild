"use client";

import { LoadingScreen } from "@/components/loading-screen";
import { Navbar } from "@/components/navbar";
import { HeroCinematic } from "@/components/landing/hero-cinematic";
import { DepthSection } from "@/components/landing/depth-section";
import { Services } from "@/components/landing/services";
import { ProcessSticky } from "@/components/landing/process-sticky";
import { Footer } from "@/components/footer";
import { ZenithSpinner } from "@/components/ui/zenith-spinner";
import { ReactiveBackground } from "@/components/ui/reactive-background";
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
      <ReactiveBackground />
      <LoadingScreen />
      <Navbar onBookClick={openBooking} />
      
      <motion.main 
        animate={{ x: isBookingOpen ? "-10vw" : 0, filter: isBookingOpen ? "blur(20px)" : "blur(0px)" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="flex-1 flex flex-col relative"
      >
        <HeroCinematic onBookClick={openBooking} />
        <div className="relative z-20 overflow-hidden bg-white">
          <Services />
          <DepthSection />
          <ProcessSticky />
          <section className="py-24 bg-white px-6">
            <div className="container mx-auto max-w-5xl text-center p-12 md:p-20 rounded-[3rem] bg-zinc-950 text-white relative overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-tr from-rose-500/20 to-transparent opacity-50" />
               <motion.div
                 initial={{ opacity: 0, scale: 0.9 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 viewport={{ once: true }}
                 className="relative z-10"
               >
                 <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight">Ready to build?</h2>
                 <p className="text-zinc-400 text-lg md:text-xl max-w-xl mx-auto mb-10">
                   Get a high-fidelity demo of your vision in 48 hours. Zero risk. Full engineering execution.
                 </p>
                 <Button 
                   onClick={openBooking}
                   className="h-16 px-12 text-lg font-bold rounded-2xl bg-rose-500 text-white hover:bg-rose-600 transition-all shadow-xl active:scale-95"
                 >
                   Get Your Demo Now
                 </Button>
               </motion.div>
            </div>
          </section>
          <Footer />
        </div>
      </motion.main>

      <BookingOverlay 
        isOpen={isBookingOpen} 
        onClose={closeBooking} 
      />
      <ContactMenu />
    </div>
  );
}
