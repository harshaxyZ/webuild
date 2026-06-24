"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("wb_cookie_consent");
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleConsent = (choice: "accepted" | "declined") => {
    localStorage.setItem("wb_cookie_consent", choice);
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 p-4 z-50 flex justify-center"
        >
          <div className="bg-[var(--surface)] border border-[var(--border)] rounded-lg shadow-2xl p-4 md:p-6 max-w-4xl w-full flex flex-col md:flex-row items-center justify-between gap-4 backdrop-blur-xl bg-opacity-90">
            <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
              We use cookies to keep your session secure and remember your preferences. No tracking without your consent.{" "}
              <Link href="/privacy-policy" className="text-[var(--text-primary)] underline underline-offset-2">
                Privacy Policy
              </Link>
            </p>
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => handleConsent("declined")}
                className="px-4 py-2 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
              >
                Decline
              </button>
              <button
                onClick={() => handleConsent("accepted")}
                className="px-6 py-2 text-sm bg-[var(--text-primary)] text-[var(--bg)] rounded-md font-medium hover:opacity-90 transition-opacity"
              >
                Accept All
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
