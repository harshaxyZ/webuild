"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const PREMIUM_EASE = [0.16, 1, 0.3, 1] as const;

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    business: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent("New Project Inquiry from we build website");
    const body = encodeURIComponent(
      `Name: ${formData.name}\nBusiness: ${formData.business}\nPhone: ${formData.phone}\n\nMessage:\n${formData.message}`
    );
    window.location.href = `mailto:harsha210108@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="py-16 md:py-32 px-5 md:px-6 bg-zinc-950 relative overflow-hidden">
      <div className="container mx-auto max-w-3xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: PREMIUM_EASE }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-[clamp(1.75rem,5vw,4.5rem)] md:text-7xl font-black tracking-tight text-white mb-6 leading-[1.1]">
            Start your project
          </h2>
          <p className="text-zinc-400 text-base md:text-xl font-medium max-w-2xl mx-auto">
            Tell us about your business and we will get back to you within 24 hours.
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: PREMIUM_EASE }}
          className="p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] bg-white/5 border border-white/10"
        >
          <div className="space-y-5">
            <div>
              <label htmlFor="contact-name" className="block text-sm font-bold text-zinc-300 mb-2">Name</label>
              <input
                id="contact-name"
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full min-h-[44px] px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-zinc-600 focus:outline-none focus:border-rose-500/50 focus:ring-1 focus:ring-rose-500/30 transition-all text-base"
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="contact-business" className="block text-sm font-bold text-zinc-300 mb-2">Business Name</label>
              <input
                id="contact-business"
                type="text"
                required
                value={formData.business}
                onChange={(e) => setFormData({ ...formData, business: e.target.value })}
                className="w-full min-h-[44px] px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-zinc-600 focus:outline-none focus:border-rose-500/50 focus:ring-1 focus:ring-rose-500/30 transition-all text-base"
                placeholder="Your business name"
              />
            </div>
            <div>
              <label htmlFor="contact-phone" className="block text-sm font-bold text-zinc-300 mb-2">Phone Number</label>
              <input
                id="contact-phone"
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full min-h-[44px] px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-zinc-600 focus:outline-none focus:border-rose-500/50 focus:ring-1 focus:ring-rose-500/30 transition-all text-base"
                placeholder="+91 XXXXX XXXXX"
              />
            </div>
            <div>
              <label htmlFor="contact-message" className="block text-sm font-bold text-zinc-300 mb-2">Message</label>
              <textarea
                id="contact-message"
                rows={4}
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-zinc-600 focus:outline-none focus:border-rose-500/50 focus:ring-1 focus:ring-rose-500/30 transition-all resize-none text-base"
                placeholder="Tell us about your project..."
              />
            </div>
          </div>

          <Button
            type="submit"
            className="btn-pill min-h-[44px] h-14 w-full text-base md:text-lg font-bold bg-white text-zinc-950 hover:bg-zinc-200 mt-8 flex items-center justify-center gap-2"
          >
            Send Message →
          </Button>
        </motion.form>
      </div>
    </section>
  );
}
