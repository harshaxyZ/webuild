"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle } from "lucide-react";

export default function BookingPanel({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate submission
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 800);
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => { setSuccess(false); }, 500);
  };

  const inputClass = "w-full mt-2 p-3.5 bg-[var(--surface)] border border-[var(--border)] rounded-xl outline-none focus:border-[var(--text)] transition-colors text-[var(--text)] text-sm";

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
            className="fixed top-0 right-0 h-full w-full max-w-md bg-[var(--bg)] border-l border-[var(--border)] z-[101] p-6 md:p-8 overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-semibold tracking-tighter">{success ? "Confirmed" : "Book a Call"}</h2>
              <button onClick={handleClose}><X size={24} /></button>
            </div>

            {success ? (
              <div className="flex flex-col items-center justify-center text-center h-[70%]">
                <div className="w-20 h-20 rounded-full flex items-center justify-center mb-8 bg-[var(--text)] text-[var(--bg)]">
                  <CheckCircle size={40} />
                </div>
                <h2 className="text-3xl font-semibold tracking-tighter mb-4">Booking Confirmed</h2>
                <p className="text-base font-light mb-8 text-[var(--muted)] max-w-xs">We&apos;ve received your request. Our team will reach out shortly.</p>
                <button onClick={handleClose} className="border border-[var(--border)] px-8 py-3 rounded-full text-sm hover:bg-[var(--text)] hover:text-[var(--bg)] transition-colors">Close</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-xs uppercase tracking-wider text-[var(--muted)]">Full Name</label>
                  <input required name="name" type="text" className={inputClass} placeholder="John Doe" />
                </div>

                <div>
                  <label className="text-xs uppercase tracking-wider text-[var(--muted)]">WhatsApp Number</label>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="p-3.5 bg-[var(--surface)] border border-[var(--border)] rounded-xl flex items-center justify-center w-14 text-[var(--muted)] text-sm">+91</span>
                    <input required name="phone" type="tel" pattern="[6-9]{1}[0-9]{9}" className="flex-1 p-3.5 bg-[var(--surface)] border border-[var(--border)] rounded-xl outline-none focus:border-[var(--text)] transition-colors text-[var(--text)] text-sm" placeholder="9876543210" />
                  </div>
                </div>

                <div>
                  <label className="text-xs uppercase tracking-wider text-[var(--muted)]">Email Address</label>
                  <input required name="email" type="email" className={inputClass} placeholder="john@example.com" />
                </div>

                <div>
                  <label className="text-xs uppercase tracking-wider text-[var(--muted)]">Project Type</label>
                  <select required name="projectType" className={inputClass} defaultValue="">
                    <option value="" disabled>Select a project type</option>
                    <option value="website">Website / Web App</option>
                    <option value="mobile">Mobile App</option>
                    <option value="saas">SaaS Platform</option>
                    <option value="ecommerce">E-Commerce</option>
                    <option value="dashboard">Dashboard / Admin Panel</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs uppercase tracking-wider text-[var(--muted)]">Preferred Time to Call</label>
                  <input required name="preferredTime" type="datetime-local" className={inputClass} />
                </div>

                <div>
                  <label className="text-xs uppercase tracking-wider text-[var(--muted)]">Project Description</label>
                  <textarea required name="description" rows={3} className={inputClass} placeholder="Tell us about your project goals..." />
                </div>

                <button type="submit" disabled={loading} className="w-full bg-[var(--text)] text-[var(--bg)] py-4 rounded-xl text-sm font-medium hover:opacity-80 transition-opacity disabled:opacity-50 mt-2">
                  {loading ? "Processing..." : "Submit Booking Request"}
                </button>
              </form>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
