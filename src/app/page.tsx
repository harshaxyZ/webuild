"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Smartphone, Globe, Zap, CheckCircle2, ArrowRight, Star, Code2, Users2, LineChart } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useBooking } from "@/components/BookingProvider";
import { useRef } from "react";

export default function Home() {
  const { setBookingOpen } = useBooking();
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 1000], [0, 300]);
  const opacityFade = useTransform(scrollY, [0, 500], [1, 0]);

  const projects = [
    { name: "FinTech Dashboard", category: "Web App", color: "from-blue-500/20 to-cyan-500/20" },
    { name: "E-Commerce Mobile", category: "iOS & Android", color: "from-purple-500/20 to-pink-500/20" },
    { name: "AI Customer Agent", category: "Automation", color: "from-emerald-500/20 to-teal-500/20" },
  ];

  return (
    <>
      <Navbar />
      
      <main className="flex-1 relative">
        {/* HERO SECTION */}
        <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden pt-20">
          <div className="absolute inset-0 hero-gradient z-0 pointer-events-none" />
          
          {/* Animated Grid Background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] z-0" />

          <motion.div 
            style={{ y: heroY, opacity: opacityFade }}
            className="relative z-10 w-full max-w-6xl mx-auto px-6 flex flex-col items-center text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="inline-flex items-center rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/10 px-5 py-2 text-sm font-medium mb-10 backdrop-blur-md"
            >
              <span className="text-[var(--accent)] flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent)]"></span>
                </span>
                Accepting new projects for 2026
              </span>
            </motion.div>
            
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-semibold tracking-tighter leading-[1.05] mb-8">
              <span className="block text-transparent bg-clip-text bg-gradient-to-b from-[var(--text-primary)] to-[var(--text-secondary)]">
                We build
              </span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent)] to-purple-500">
                things that work.
              </span>
            </h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="text-xl md:text-2xl text-[var(--text-secondary)] max-w-3xl mb-12 font-light"
            >
              Premium apps, websites, and AI automations engineered for businesses that demand exceptional results, not just deliverables.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7 }}
              className="flex flex-col sm:flex-row items-center gap-6 w-full sm:w-auto"
            >
              <button 
                onClick={() => setBookingOpen(true)}
                className="btn-pill text-lg py-5 px-10 w-full sm:w-auto flex items-center justify-center gap-2 group"
              >
                Start Your Project 
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          </motion.div>

          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
            <div className="w-8 h-12 rounded-full border-2 border-[var(--text-secondary)]/30 flex justify-center p-2">
              <div className="w-1 h-3 bg-[var(--text-secondary)] rounded-full animate-pulse" />
            </div>
          </div>
        </section>

        {/* TRUST BAR */}
        <div className="border-y border-[var(--border)] bg-[var(--surface-2)]/80 backdrop-blur-md py-8">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
            <p className="text-[var(--text-secondary)] text-sm font-medium uppercase tracking-widest shrink-0">
              Trusted by visionaries
            </p>
            <div className="flex flex-wrap justify-center md:justify-end items-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
              {/* Abstract company logos */}
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center gap-2 font-bold text-xl tracking-tighter">
                  <div className="w-6 h-6 rounded-md bg-[var(--text-primary)]" />
                  Brand{i}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SERVICES */}
        <section id="services" className="section-padding max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="mb-20 max-w-2xl"
          >
            <h2 className="text-4xl md:text-6xl font-semibold mb-6">Expertise</h2>
            <p className="text-xl text-[var(--text-secondary)]">We don't do everything. We just do these three things exceptionally well.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Smartphone,
                title: "Mobile Apps",
                desc: "Native-feeling iOS and Android applications built with React Native. Fast, fluid, and scalable.",
                delay: 0
              },
              {
                icon: Globe,
                title: "Web Platforms",
                desc: "High-performance web applications and marketing sites that convert visitors into customers.",
                delay: 0.1
              },
              {
                icon: Zap,
                title: "AI & Automation",
                desc: "Custom LLM integrations, automated workflows, and AI voice agents that replace mundane tasks.",
                delay: 0.2
              }
            ].map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: service.delay, duration: 0.7 }}
                className="service-card p-10 flex flex-col group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:scale-150 transition-transform duration-700 pointer-events-none">
                  <service.icon className="w-32 h-32" />
                </div>
                <div className="w-14 h-14 rounded-2xl bg-[var(--accent)]/10 flex items-center justify-center text-[var(--accent)] mb-8 border border-[var(--accent)]/20 group-hover:scale-110 transition-transform duration-500">
                  <service.icon className="w-7 h-7" />
                </div>
                <h3 className="text-3xl font-semibold mb-4">{service.title}</h3>
                <p className="text-lg text-[var(--text-secondary)] leading-relaxed flex-1">
                  {service.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* PORTFOLIO SHOWCASE */}
        <section className="section-padding bg-[var(--surface-2)]/30 border-y border-[var(--border)] overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div 
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8"
            >
              <div>
                <h2 className="text-4xl md:text-6xl font-semibold mb-4">Our Work</h2>
                <p className="text-xl text-[var(--text-secondary)]">Recent projects we've shipped.</p>
              </div>
              <button className="text-[var(--accent)] font-medium flex items-center gap-2 hover:gap-4 transition-all">
                View all case studies <ArrowRight className="w-5 h-5" />
              </button>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {projects.map((project, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group cursor-pointer"
                >
                  <div className={`w-full aspect-[4/5] rounded-[var(--radius-card)] bg-gradient-to-br ${project.color} border border-[var(--border)] mb-6 flex items-center justify-center overflow-hidden relative`}>
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
                      <span className="btn-pill py-3 px-6">View Project</span>
                    </div>
                    {/* Abstract UI representation */}
                    <div className="w-3/4 h-3/4 bg-[var(--surface)] rounded-xl shadow-2xl border border-[var(--border)] p-4 flex flex-col gap-4 group-hover:scale-105 transition-transform duration-500">
                      <div className="w-full h-8 bg-[var(--surface-2)] rounded-md" />
                      <div className="w-full flex-1 bg-[var(--surface-2)] rounded-md" />
                    </div>
                  </div>
                  <p className="text-[var(--accent)] text-sm font-semibold tracking-wider uppercase mb-2">{project.category}</p>
                  <h3 className="text-2xl font-semibold group-hover:text-[var(--accent)] transition-colors">{project.name}</h3>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* METRICS & TESTIMONIALS */}
        <section className="section-padding max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
            <div>
              <h2 className="text-4xl md:text-5xl font-semibold mb-12">The Impact</h2>
              <div className="grid grid-cols-2 gap-8">
                {[
                  { icon: Code2, num: "50+", label: "Projects Shipped" },
                  { icon: Users2, num: "100%", label: "Client Satisfaction" },
                  { icon: LineChart, num: "$10M+", label: "Client Revenue Generated" },
                  { icon: Zap, num: "<2wks", label: "Average Launch Time" },
                ].map((stat, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="border-l-2 border-[var(--accent)] pl-6"
                  >
                    <stat.icon className="w-6 h-6 text-[var(--accent)] mb-4" />
                    <p className="text-4xl font-bold mb-2">{stat.num}</p>
                    <p className="text-[var(--text-secondary)]">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-card)] p-10 md:p-14 relative">
              <div className="absolute top-10 right-10 opacity-10">
                <Star className="w-24 h-24 fill-current" />
              </div>
              <div className="flex gap-1 mb-8">
                {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 fill-[var(--accent)] text-[var(--accent)]" />)}
              </div>
              <h3 className="text-2xl md:text-3xl font-medium leading-relaxed mb-8">
                "we build completely transformed our digital presence. They didn't just write code; they understood our business goals and engineered a platform that actually drives revenue. Worth every penny."
              </h3>
              <div>
                <p className="font-semibold text-lg">Sarah Jenkins</p>
                <p className="text-[var(--text-secondary)]">CEO, TechFlow Inc.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-[var(--accent)]/5" />
          <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
            <h2 className="text-5xl md:text-7xl font-semibold mb-8">Ready to build?</h2>
            <p className="text-xl text-[var(--text-secondary)] mb-12">Stop settling for generic templates and slow agencies. Let's build something exceptional.</p>
            <button 
              onClick={() => setBookingOpen(true)}
              className="btn-pill text-xl py-5 px-12 inline-flex items-center gap-3 group"
            >
              Start Your Project Now
              <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
