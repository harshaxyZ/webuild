import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import toast from "react-hot-toast";

export default function BookingPanel({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (isOpen) {
      setIsSuccess(false); // Reset success state when opened
      
      // Check auth state
      const localSession = localStorage.getItem("webuild_session");
      if (localSession) {
        try {
          const parsed = JSON.parse(localSession);
          setIsLoggedIn(true);
          setUserEmail(parsed.email || "");
        } catch (e) {}
      } else if (auth?.currentUser) {
        setIsLoggedIn(true);
        setUserEmail(auth.currentUser.email || "");
      } else {
        setIsLoggedIn(false);
        setUserEmail("");
      }
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name");
    const phone = formData.get("phone");
    const email = formData.get("email");
    const projectType = formData.get("projectType");
    const description = formData.get("description");

    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          whatsapp: `+91${phone}`,
          email,
          projectType,
          preferredTime: "Not specified",
          description,
        }),
      });

      if (res.ok) {
        toast.success("Request submitted successfully!");
        setIsSuccess(true);
      } else {
        const data = await res.json();
        toast.error(data.error || "Failed to submit request.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full mt-2 p-3.5 bg-[var(--surface)] border border-[var(--border)] rounded-xl outline-none focus:border-[var(--text)] transition-colors text-[var(--text)] text-sm";

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100]" />
          <motion.div 
            initial={{ x: "100%" }} 
            animate={{ x: 0 }} 
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-[var(--bg)] border-l border-[var(--border)] z-[101] p-6 md:p-8 overflow-y-auto flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-semibold tracking-tighter">
                  {isSuccess ? "Request Sent" : "Book a Call"}
                </h2>
                <button onClick={onClose} className="text-[var(--text)] hover:opacity-70 transition-opacity"><X size={24} /></button>
              </div>

              {isSuccess ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8 space-y-6 flex flex-col items-center justify-center"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(16,185,129,0.2)_0%,transparent_70%)] animate-pulse" />
                    <Check size={32} className="relative z-10" />
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-medium tracking-tight mb-2">Request Received!</h3>
                    <p className="text-neutral-500 text-sm leading-relaxed max-w-xs mx-auto">
                      Your booking request was successfully dispatched. A verification update has been queued, and we will contact you on WhatsApp shortly.
                    </p>
                  </div>

                  {isLoggedIn ? (
                    <div className="p-4 bg-[var(--surface)] border border-[var(--border)] rounded-2xl w-full text-left text-xs text-neutral-400">
                      ℹ️ Since you are logged in, you can now monitor the request status, timeline updates, and chat log directly inside your client dashboard.
                    </div>
                  ) : (
                    <div className="p-4 bg-[var(--surface)] border border-[var(--border)] rounded-2xl w-full text-left text-xs text-neutral-400">
                      💡 Tip: Create a free account or log in with the same email used in this booking to track active milestones and view project specifications.
                    </div>
                  )}
                </motion.div>
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
                    <input 
                      required 
                      name="email" 
                      type="email" 
                      className={inputClass} 
                      placeholder="john@example.com" 
                      defaultValue={userEmail}
                    />
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
                    <label className="text-xs uppercase tracking-wider text-[var(--muted)]">Project Description</label>
                    <textarea required name="description" rows={3} className={inputClass} placeholder="Tell us about your project goals..." />
                  </div>

                  <div className="pt-2">
                    <button type="submit" disabled={loading} className="w-full bg-[var(--text)] text-[var(--bg)] py-4 rounded-xl text-sm font-medium hover:opacity-80 transition-opacity disabled:opacity-50">
                      {loading ? "Processing..." : "Submit Booking Request"}
                    </button>
                  </div>
                </form>
              )}
            </div>

            <div className="pt-6 border-t border-[var(--border)] mt-6">
              {isSuccess ? (
                <div className="flex flex-col gap-2">
                  {isLoggedIn ? (
                    <button 
                      onClick={() => {
                        onClose();
                        router.push("/dashboard");
                      }} 
                      className="w-full py-4 bg-[var(--text)] text-[var(--bg)] rounded-xl text-sm font-medium hover:opacity-85 transition-opacity"
                    >
                      Go to Dashboard
                    </button>
                  ) : (
                    <button 
                      onClick={() => {
                        onClose();
                        router.push("/login");
                      }} 
                      className="w-full py-4 bg-[var(--text)] text-[var(--bg)] rounded-xl text-sm font-medium hover:opacity-85 transition-opacity"
                    >
                      Track Progress (Sign In)
                    </button>
                  )}
                  <button onClick={onClose} className="w-full py-4 border border-[var(--border)] rounded-xl text-sm font-medium hover:bg-[var(--border)]/10 transition-colors text-[var(--text)]">
                    Close Window
                  </button>
                </div>
              ) : (
                <button type="button" onClick={onClose} className="w-full py-4 border border-[var(--border)] rounded-xl text-sm font-medium hover:bg-[var(--border)]/10 transition-colors text-[var(--text)]">
                  Cancel / Go Back
                </button>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
