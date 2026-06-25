"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Lock, CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BookingPanel({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [success, setSuccess] = useState(false);

  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call for booking submission
    setTimeout(() => {
      setLoading(false);
      onClose();
      router.push("/login");
    }, 800);
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => { setSuccess(false); }, 500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={handleClose} className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100]" />
          <motion.div 
            initial={{ x: "100%" }} 
            animate={{ x: 0 }} 
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-[var(--bg)] border-l border-[var(--border)] z-[101] p-8 overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-2xl font-semibold tracking-tighter">{success ? "Confirmed" : isLoggedIn ? "Start Project" : "Book a Call"}</h2>
              <button onClick={handleClose}><X size={24} /></button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="text-xs uppercase tracking-wider text-[var(--muted)]">Full Name</label>
                <input required name="name" type="text" className="w-full mt-2 p-4 bg-[var(--surface)] border border-[var(--border)] rounded-xl outline-none focus:border-[var(--text)] transition-colors text-[var(--text)]" placeholder="John Doe" />
              </div>
              <div>
                <label className="text-xs uppercase tracking-wider text-[var(--muted)]">Email Address</label>
                <input required name="email" type="email" className="w-full mt-2 p-4 bg-[var(--surface)] border border-[var(--border)] rounded-xl outline-none focus:border-[var(--text)] transition-colors text-[var(--text)]" placeholder="john@example.com" />
              </div>
              <div>
                <label className="text-xs uppercase tracking-wider text-[var(--muted)]">Project Description</label>
                <textarea required name="description" rows={4} className="w-full mt-2 p-4 bg-[var(--surface)] border border-[var(--border)] rounded-xl outline-none focus:border-[var(--text)] transition-colors text-[var(--text)]" placeholder="Tell us about your project goals..." />
              </div>
              <button type="submit" disabled={loading} className="w-full bg-[var(--text)] text-[var(--bg)] py-4 rounded-xl text-sm font-medium hover:opacity-80 transition-opacity disabled:opacity-50">
                {loading ? "Processing..." : "Submit Booking Request"}
              </button>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
