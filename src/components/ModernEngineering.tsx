"use client";
import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

const frameworks = [
  { name: "React", svg: <path d="M12 2c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2zm0 1.5c-4.69 0-8.5 3.81-8.5 8.5s3.81 8.5 8.5 8.5 8.5-3.81 8.5-8.5-3.81-8.5-8.5-8.5zm0 2.5c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6 2.69-6 6-6z" fill="#61DAFB"/> }, // Using simple stylized shapes since I can't load exact SVGs instantly
  { name: "Next.js", svg: <path d="M12 2L2 22h20L12 2zm0 4.5l6.5 13h-13l6.5-13z" fill="#fff"/> },
  { name: "TypeScript", svg: <path d="M4 4h16v16H4V4zm9 11h2v-4h3v-2h-8v2h3v4zM7 9v2h4v2H7v4h2v-6H7z" fill="#3178C6"/> },
  { name: "Tailwind", svg: <path d="M12 4c-3 0-5 2.5-5 6 0 3.5 3.5 4.5 5 7 3 0 5-2.5 5-6 0-3.5-3.5-4.5-5-7z" fill="#38B2AC"/> },
  { name: "Node.js", svg: <path d="M12 2L3 7v10l9 5 9-5V7l-9-5zm0 2.3l6.8 3.8-6.8 3.8-6.8-3.8L12 4.3zm0 15.4l-7-3.9V9.1l7 3.9 7-3.9v6.7l-7 3.9z" fill="#339933"/> },
  { name: "GSAP", svg: <circle cx="12" cy="12" r="8" fill="#88CE02"/> },
  { name: "Supabase", svg: <path d="M12 2L2 12h8v10l10-10h-8V2z" fill="#3ECF8E"/> },
  { name: "Framer", svg: <path d="M4 2h16v8h-8l8 8H4V2z" fill="#0055FF"/> },
];

export default function ModernEngineering() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });

  return (
    <section 
      ref={ref} 
      className="relative min-h-[120vh] w-full bg-[#080808] flex flex-col items-center pt-32 overflow-hidden"
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[url('/starry-bg.png')] bg-cover bg-center opacity-40" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_0%,#080808_100%)] opacity-80" />

      {/* Copy */}
      <div className="relative z-20 max-w-[650px] mx-auto text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="text-[10px] tracking-[0.2em] font-medium text-white/50 uppercase mb-4 block">
            HOW WE WORK
          </span>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tighter text-white mb-6">
            Powered by modern engineering.
          </h2>
          <p className="text-white/60 text-lg leading-relaxed font-light">
            Every product is built using carefully selected technologies that maximize performance, scalability, maintainability and user experience.
          </p>
        </motion.div>
      </div>

      {/* 3D Scene */}
      <div className="relative w-full h-[800px] mt-20 flex items-center justify-center perspective-[1200px]">
        {/* Tilt Container */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8, y: 100 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className={`relative w-[800px] h-[800px] preserve-3d ${isInView ? 'animate-scene-tilt' : ''}`}
          style={{ transform: "rotateX(75deg)" }}
        >
          


          {/* Orbit Tracks & Logos */}
          {frameworks.map((fw, i) => {
            const delay = (i * -4) + "s"; // Offset animations
            const radius = 240 + (i % 3) * 60; // Spread across the 3 rings (240, 300, 360 radii)
            
            return (
              <div 
                key={fw.name}
                className="absolute top-1/2 left-1/2 w-0 h-0 preserve-3d"
                style={{
                  animation: isInView ? `orbit 35s linear infinite` : 'none',
                  animationDelay: delay
                }}
              >
                <div 
                  className="absolute preserve-3d"
                  style={{
                    transform: `translateX(${radius}px)`,
                  }}
                >
                  <div 
                    className="flex flex-col items-center justify-center"
                    style={{
                      animation: isInView ? `anti-orbit 35s linear infinite` : 'none',
                      animationDelay: delay
                    }}
                  >
                    {/* Reverse Scene Tilt to Face Camera */}
                    <div 
                      className="flex flex-col items-center gap-3 preserve-3d"
                      style={{ transform: "rotateX(-75deg)" }}
                    >
                      <div className="w-14 h-14 rounded-full bg-[#1a1a1a] border border-white/10 shadow-[0_4px_24px_rgba(0,0,0,0.4)] flex items-center justify-center text-white relative group overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-50" />
                        <svg viewBox="0 0 24 24" className="w-6 h-6 z-10" fill="currentColor">
                          {fw.svg}
                        </svg>
                      </div>
                      <span className="text-white/70 text-[11px] font-medium tracking-wide drop-shadow-md">
                        {fw.name}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Saturn Body (Realistic Image) */}
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px]"
            style={{ transform: "translate(-50%, -50%) rotateX(-75deg)" }} 
          >
            {/* Blocker to hide stars behind the planet body */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] rounded-full bg-[#080808]" />
            {/* The actual realistic planet with blend mode to remove the black background but keep rings translucent */}
            <img 
              src="/saturn-realistic.png" 
              alt="Saturn" 
              className="absolute inset-0 w-full h-full object-contain mix-blend-screen pointer-events-none"
            />
          </div>

        </motion.div>
      </div>

      {/* Stats Section */}
      <div className="relative z-20 max-w-5xl mx-auto w-full px-6 pb-20 mt-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 bg-white/[0.03] backdrop-blur-md border border-white/5 rounded-2xl p-8">
          <div className="flex flex-col items-center text-center">
            <svg className="w-6 h-6 text-white/50 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <div className="text-3xl font-semibold text-white mb-1">25+</div>
            <div className="text-xs text-white/50 tracking-wider">Projects Delivered</div>
          </div>
          <div className="flex flex-col items-center text-center">
            <svg className="w-6 h-6 text-white/50 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <div className="text-3xl font-semibold text-white mb-1">2–6 weeks</div>
            <div className="text-xs text-white/50 tracking-wider">Average Delivery</div>
          </div>
          <div className="flex flex-col items-center text-center">
            <svg className="w-6 h-6 text-white/50 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="text-3xl font-semibold text-white mb-1">15+</div>
            <div className="text-xs text-white/50 tracking-wider">Happy Clients</div>
          </div>
          <div className="flex flex-col items-center text-center">
            <svg className="w-6 h-6 text-white/50 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            <div className="text-3xl font-semibold text-white mb-1">98%</div>
            <div className="text-xs text-white/50 tracking-wider">Client Satisfaction</div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .preserve-3d { transform-style: preserve-3d; }
        .perspective-\\[1200px\\] { perspective: 1200px; }
        
        @keyframes orbit {
          from { transform: rotateZ(0deg); }
          to { transform: rotateZ(360deg); }
        }
        
        @keyframes anti-orbit {
          from { transform: rotateZ(0deg); }
          to { transform: rotateZ(-360deg); }
        }
      `}} />
    </section>
  );
}
