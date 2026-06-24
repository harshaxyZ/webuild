"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Smartphone, Globe, Zap, CheckCircle2 } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useBooking } from "@/components/BookingProvider";
import { useRef } from "react";

export default function Home() {
  const { setBookingOpen } = useBooking();
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 1000], [0, 300]);

  return (
    <>
      <Navbar />
      
      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
          <div className="absolute inset-0 hero-gradient z-0 pointer-events-none" />
          
          <motion.div 
            style={{ y: heroY }}
            className="relative z-10 w-full max-w-5xl mx-auto px-[20px] md:px-[6%] flex flex-col items-center text-center"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="inline-flex items-center rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-1.5 text-sm font-medium mb-8"
            >
              <span className="text-[var(--text-secondary)]">Web · Apps · AI Agents</span>
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl font-semibold tracking-tight leading-[1.1] mb-6">
              {"We build things that work.".split(" ").map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                  className="inline-block mr-3"
                >
                  {word}
                </motion.span>
              ))}
            </h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-lg md:text-xl text-[var(--text-secondary)] max-w-2xl mb-10"
            >
              Websites, apps, and AI automations for businesses that want results — not just deliverables.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="flex flex-col sm:flex-row items-center gap-4"
            >
              <button 
                onClick={() => setBookingOpen(true)}
                className="btn-pill text-lg py-4 px-8 w-full sm:w-auto"
              >
                Book a Call &rarr;
              </button>
              <button 
                onClick={() => {
                  document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors px-6 py-4"
              >
                See our work &darr;
              </button>
            </motion.div>
          </motion.div>
        </section>

        {/* TRUST BAR */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="border-y border-[var(--border)] bg-[var(--surface-2)]/50"
        >
          <div className="max-w-7xl mx-auto px-[20px] py-6 text-center">
            <p className="text-[var(--text-secondary)] text-sm md:text-base font-medium uppercase tracking-wider">
              Trusted by founders, freelancers, and growing businesses
            </p>
          </div>
        </motion.section>

        {/* SERVICES */}
        <section id="services" className="section-padding max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                icon: Smartphone,
                title: "Apps",
                desc: "From idea to deployed product. Mobile and web apps built fast, built right.",
                delay: 0
              },
              {
                icon: Globe,
                title: "Websites",
                desc: "Conversion-focused websites that make visitors trust you before they even read a word.",
                delay: 0.1
              },
              {
                icon: Zap,
                title: "Automations & AI Agents",
                desc: "Automate your workflows and let AI handle calls, follow-ups, and outreach — while you sleep.",
                delay: 0.2
              }
            ].map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: service.delay, duration: 0.5 }}
                className="service-card p-8 md:p-10 flex flex-col"
              >
                <div className="w-12 h-12 rounded-lg bg-[var(--surface-2)] flex items-center justify-center text-[var(--accent)] mb-6">
                  <service.icon className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">{service.title}</h3>
                <p className="text-[var(--text-secondary)] leading-relaxed flex-1">
                  {service.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="section-padding bg-[var(--surface-2)]/30 border-y border-[var(--border)]">
          <div className="max-w-7xl mx-auto">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-semibold mb-16 text-center md:text-left"
            >
              How it works
            </motion.h2>
            
            <div className="flex flex-col md:flex-row items-start justify-between gap-12 relative">
              {/* Connector line for desktop */}
              <div className="hidden md:block absolute top-6 left-[10%] right-[10%] h-[2px] bg-[var(--border)] -z-10">
                <motion.div 
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                  className="h-full bg-[var(--accent)] origin-left"
                />
              </div>

              {[
                { step: "01", title: "Book a Call", desc: "Tell us what you need. We'll ask the right questions." },
                { step: "02", title: "We Plan & Quote", desc: "You get a clear scope, timeline, and price. No surprises." },
                { step: "03", title: "We Build & Ship", desc: "We build it, you review, we refine until it's right. Then we go live." }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.2, duration: 0.5 }}
                  className="flex-1 bg-[var(--bg)] md:bg-transparent p-6 md:p-0 rounded-2xl md:rounded-none border md:border-none border-[var(--border)] relative z-10 w-full"
                >
                  <div className="text-[var(--accent)] font-semibold text-sm tracking-wider mb-2">
                    {item.step} &rarr;
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                  <p className="text-[var(--text-secondary)] text-sm">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* WHY US */}
        <section className="section-padding max-w-7xl mx-auto overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-semibold leading-[1.2]">
                We don't disappear after delivery.
              </h2>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              {[
                "Working demo before you pay a rupee",
                "Direct communication — no account managers",
                "Fast turnaround — most projects in 1–2 weeks",
                "We're builders first, salespeople never"
              ].map((point, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <CheckCircle2 className="w-6 h-6 text-[var(--success)] shrink-0 mt-0.5" />
                  <p className="text-lg text-[var(--text-primary)]">{point}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
