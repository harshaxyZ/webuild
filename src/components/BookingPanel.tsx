"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Lock, CheckCircle } from "lucide-react";

export default function BookingPanel({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [success, setSuccess] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target as HTMLFormElement);
    const data = {
      name: formData.get("name"),
      whatsapp: formData.get("whatsapp"),
      description: formData.get("description"),
    };

    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setSuccess(true);
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to submit request.");
    } finally {
      setLoading(false);
    }
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

            {!isLoggedIn ? (
              <div className="flex flex-col items-center justify-center text-center h-[80%]">
                <div className="w-16 h-16 rounded-full border flex items-center justify-center mb-6 border-[var(--border)]">
                  <Lock size={24} className="text-[var(--muted)]" />
                </div>
                <h3 className="text-xl font-medium mb-2">Authentication Required</h3>
                <p className="text-sm font-light mb-8 text-[var(--muted)]">You must be logged in to book a consultation.</p>
                <button onClick={() => setIsLoggedIn(true)} className="bg-[var(--text)] text-[var(--bg)] px-8 py-3 rounded-full text-sm font-medium">Sign In / Sign Up</button>
              </div>
            ) : success ? (
              <div className="flex flex-col items-center justify-center text-center h-[80%]">
                <div className="w-20 h-20 rounded-full flex items-center justify-center mb-8 bg-[var(--text)] text-[var(--bg)]">
                  <CheckCircle size={40} />
                </div>
                <h2 className="text-3xl font-semibold tracking-tighter mb-4">Booking Confirmed</h2>
                <p className="text-base font-light mb-8 text-[var(--muted)] max-w-xs">We've received your request. Our team will reach out shortly.</p>
                <button onClick={handleClose} className="border border-[var(--border)] px-8 py-3 rounded-full text-sm hover:bg-[var(--text)] hover:text-[var(--bg)] transition-colors">Close</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="text-xs uppercase tracking-wider text-[var(--muted)]">Full Name</label>
                  <input required name="name" type="text" className="w-full mt-2 p-4 bg-[var(--surface)] border border-[var(--border)] rounded-xl outline-none focus:border-[var(--text)] transition-colors text-[var(--text)]" placeholder="John Doe" />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-wider text-[var(--muted)]">WhatsApp Number</label>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="p-4 bg-[var(--surface)] border border-[var(--border)] rounded-xl flex items-center justify-center w-16 h-[56px] text-[var(--muted)]">+91</span>
                    <input required name="whatsapp" type="tel" pattern="[6-9]{1}[0-9]{9}" className="w-full p-4 bg-[var(--surface)] border border-[var(--border)] rounded-xl outline-none focus:border-[var(--text)] transition-colors text-[var(--text)]" placeholder="9876543210" />
                  </div>
                </div>
                <div>
                  <label className="text-xs uppercase tracking-wider text-[var(--muted)]">Project Description</label>
                  <textarea required name="description" rows={4} className="w-full mt-2 p-4 bg-[var(--surface)] border border-[var(--border)] rounded-xl outline-none focus:border-[var(--text)] transition-colors text-[var(--text)]" placeholder="Tell us about your project goals..." />
                </div>
                <button type="submit" disabled={loading} className="w-full bg-[var(--text)] text-[var(--bg)] py-4 rounded-xl text-sm font-medium hover:opacity-80 transition-opacity disabled:opacity-50">
                  {loading ? "Submitting..." : "Submit Booking Request"}
                </button>
              </form>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
