"use client";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface BookCallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BookCallModal({ isOpen, onClose }: BookCallModalProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate a brief submission delay for better UX before routing
    setTimeout(() => {
      onClose();
      router.push("/login");
      setLoading(false);
    }, 600);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-[var(--bg)] border border-[var(--border)] rounded-2xl p-8 z-[101] shadow-2xl overflow-hidden"
          >
            <button
              onClick={onClose}
              className="absolute top-6 right-6 text-[var(--muted)] hover:text-[var(--text)] transition-colors"
            >
              <X size={24} />
            </button>

            <h2 className="text-3xl font-semibold tracking-tighter mb-2">Book a Call</h2>
            <p className="text-[var(--muted)] text-sm mb-8">
              Fill in your details below and we will get back to you shortly.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Name</label>
                <input
                  required
                  type="text"
                  placeholder="John Doe"
                  className="w-full bg-transparent border border-[var(--border)] rounded-xl px-4 py-3 outline-none focus:border-[var(--text)] transition-colors"
                />
              </div>
              
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Email</label>
                <input
                  required
                  type="email"
                  placeholder="john@example.com"
                  className="w-full bg-transparent border border-[var(--border)] rounded-xl px-4 py-3 outline-none focus:border-[var(--text)] transition-colors"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Project Details</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Tell us a little bit about what you're building..."
                  className="w-full bg-transparent border border-[var(--border)] rounded-xl px-4 py-3 outline-none focus:border-[var(--text)] transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mt-4 w-full bg-[var(--text)] text-[var(--bg)] py-3.5 rounded-xl font-medium hover:opacity-90 transition-opacity flex items-center justify-center"
              >
                {loading ? (
                  <span className="w-5 h-5 border-2 border-[var(--bg)] border-t-transparent rounded-full animate-spin" />
                ) : (
                  "Submit Request"
                )}
              </button>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
