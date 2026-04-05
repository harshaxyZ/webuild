"use client";

import { LoadingScreen } from "@/components/loading-screen";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/landing/hero";
import { DepthSection } from "@/components/landing/depth-section";
import { Services } from "@/components/landing/services";
import { HowItWorks } from "@/components/landing/how-it-works";
import { Footer } from "@/components/footer";
import { ZenithSpinner } from "@/components/ui/zenith-spinner";
import { ReactiveBackground } from "@/components/ui/reactive-background";
import { BookingOverlay } from "@/components/booking/booking-overlay";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
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
        <Hero onBookClick={openBooking} />
        <div className="relative z-20 overflow-hidden">
          <DepthSection />
          <Services />
          <HowItWorks />
          <Footer />
        </div>
      </motion.main>

      <BookingOverlay 
        isOpen={isBookingOpen} 
        onClose={closeBooking} 
      />
      <WhatsAppButton />
    </div>
  );
}
