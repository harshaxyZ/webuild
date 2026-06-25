"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const frameworks = [
  { name: "React", svg: <path d="M12 2c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2zm0 1.5c-4.69 0-8.5 3.81-8.5 8.5s3.81 8.5 8.5 8.5 8.5-3.81 8.5-8.5-3.81-8.5-8.5-8.5zm0 2.5c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6 2.69-6 6-6z" fill="#61DAFB"/> }, 
  { name: "Next.js", svg: <path d="M12 2L2 22h20L12 2zm0 4.5l6.5 13h-13l6.5-13z" fill="#fff"/> },
  { name: "TypeScript", svg: <path d="M4 4h16v16H4V4zm9 11h2v-4h3v-2h-8v2h3v4zM7 9v2h4v2H7v4h2v-6H7z" fill="#3178C6"/> },
  { name: "Tailwind", svg: <path d="M12 4c-3 0-5 2.5-5 6 0 3.5 3.5 4.5 5 7 3 0 5-2.5 5-6 0-3.5-3.5-4.5-5-7z" fill="#38B2AC"/> },
  { name: "Node.js", svg: <path d="M12 2L3 7v10l9 5 9-5V7l-9-5zm0 2.3l6.8 3.8-6.8 3.8-6.8-3.8L12 4.3zm0 15.4l-7-3.9V9.1l7 3.9 7-3.9v6.7l-7 3.9z" fill="#339933"/> },
  { name: "GSAP", svg: <circle cx="12" cy="12" r="8" fill="#88CE02"/> },
  { name: "Supabase", svg: <path d="M12 2L2 12h8v10l10-10h-8V2z" fill="#3ECF8E"/> },
  { name: "Framer", svg: <path d="M4 2h16v8h-8l8 8H4V2z" fill="#0055FF"/> },
  { name: "Vercel", svg: <path d="M24 22.525H0l12-21.05 12 21.05z" fill="#fff"/> },
  { name: "PostgreSQL", svg: <path d="M21.1 19.5c-.8 1.4-2.1 2.5-3.6 3.1-1.7.7-3.6.9-5.5.9-1.9 0-3.8-.2-5.5-.9-1.5-.6-2.8-1.7-3.6-3.1-.9-1.5-1.3-3.2-1.3-4.9 0-1.7.4-3.4 1.3-4.9.8-1.4 2.1-2.5 3.6-3.1 1.7-.7 3.6-.9 5.5-.9 1.9 0 3.8.2 5.5.9 1.5.6 2.8 1.7 3.6 3.1.9 1.5 1.3 3.2 1.3 4.9 0 1.7-.4 3.4-1.3 4.9zm-9.1-12c-2.3 0-4.2 1.9-4.2 4.2 0 2.3 1.9 4.2 4.2 4.2 2.3 0 4.2-1.9 4.2-4.2 0-2.3-1.9-4.2-4.2-4.2z" fill="#336791"/> },
  { name: "Redis", svg: <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.88 13.98c-1.15.54-2.5.83-3.88.83-1.38 0-2.73-.29-3.88-.83-.41-.19-.59-.68-.4-1.09.19-.41.68-.59 1.09-.4 1.01.48 2.11.72 3.19.72s2.18-.24 3.19-.72c.41-.19.9-.01 1.09.4.19.41.01.9-.4 1.09zM15 11c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-6 0c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z" fill="#DC382D"/> },
  { name: "Docker", svg: <path d="M21.9 11.2c-.2-.7-.9-1.2-1.7-1.2h-1v-2c0-.5-.4-.9-.9-.9h-2v-2c0-.5-.4-.9-.9-.9h-6c-.5 0-.9.4-.9.9v2h-2c-.5 0-.9.4-.9.9v2h-2c-.5 0-.9.4-.9.9v1.2c-1.4.3-2.5 1.5-2.5 3 0 1.7 1.3 3 3 3h16.2c1.7 0 3-1.3 3-3 0-1-.5-1.9-1.4-2.4zm-14.9-6h4.2v1.8h-4.2v-1.8zm-4.2 3.8h4.2v1.8h-4.2v-1.8zm8.4 0h4.2v1.8h-4.2v-1.8zm4.2 3.8h-4.2v-1.8h4.2v1.8zm-8.4 0h-4.2v-1.8h4.2v1.8z" fill="#2496ED"/> },
];

const RingSystem = ({ isFront }: { isFront: boolean }) => (
  <div 
    className="absolute top-1/2 left-1/2 w-[900px] h-[900px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
    style={{
      transform: "translate(-50%, -50%) scaleY(0.35)", 
      clipPath: isFront ? "polygon(0 50%, 100% 50%, 100% 100%, 0 100%)" : "polygon(0 0, 100% 0, 100% 50%, 0 50%)",
      zIndex: isFront ? 30 : 10
    }}
  >
    {/* Thick, Bright, Realistic Rings */}
    <div className="absolute top-1/2 left-1/2 w-[460px] h-[460px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[20px] border-[#c49c71]/40 shadow-[0_0_40px_rgba(196,156,113,0.5)]" />
    <div className="absolute top-1/2 left-1/2 w-[540px] h-[540px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[40px] border-[#e6b981]/50 shadow-[0_0_60px_rgba(230,185,129,0.6)]" />
    <div className="absolute top-1/2 left-1/2 w-[620px] h-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[8px] border-[#f4dfc4]/60 shadow-[0_0_20px_rgba(244,223,196,0.8)]" />
    <div className="absolute top-1/2 left-1/2 w-[720px] h-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[60px] border-[#916b45]/30 shadow-[0_0_80px_rgba(145,107,69,0.4)]" />
    <div className="absolute top-1/2 left-1/2 w-[840px] h-[840px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[2px] border-[#f4dfc4]/30" />
    
    {/* Animated Ring Textures (Dashed lines to show rotation) */}
    <div className="absolute top-1/2 left-1/2 w-[540px] h-[540px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[40px] border-black/10 border-dashed animate-spin-slow" />
    <div className="absolute top-1/2 left-1/2 w-[720px] h-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[60px] border-black/10 border-dashed animate-spin-reverse" />

    {/* Orbiting Framework Logos */}
    {frameworks.map((fw, i) => {
      // 12 logos, 60s total orbit -> perfectly spread out by exactly 5s intervals.
      // This guarantees they will never bunch up!
      const delay = (i * -5) + "s";
      const radius = 280 + (i % 3) * 50; 
      
      return (
        <div 
          key={fw.name}
          className="absolute top-1/2 left-1/2 w-0 h-0 animate-orbit"
          style={{ animationDelay: delay }}
        >
          <div className="absolute" style={{ transform: `translateX(${radius}px)` }}>
            <div 
              className="flex flex-col items-center justify-center animate-anti-orbit"
              style={{ animationDelay: delay }}
            >
              {/* Counter-scale the 0.35 squash (1 / 0.35 = 2.857) */}
              <div className="flex flex-col items-center gap-4" style={{ transform: "scaleY(2.857)" }}>
                <div className="w-14 h-14 rounded-full bg-[#080808] border border-white/20 shadow-[0_10px_30px_rgba(0,0,0,0.9)] flex items-center justify-center text-white relative group overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-40" />
                  <svg viewBox="0 0 24 24" className="w-6 h-6 z-10" fill="currentColor">
                    {fw.svg}
                  </svg>
                </div>
                <span className="text-white/80 text-[11px] font-semibold tracking-wider drop-shadow-lg uppercase bg-black/50 px-2 py-1 rounded-md">
                  {fw.name}
                </span>
              </div>
            </div>
          </div>
        </div>
      );
    })}
  </div>
);

export default function ModernEngineering() {
  const ref = useRef(null);

  return (
    <section 
      ref={ref} 
      className="relative min-h-[140vh] w-full bg-black flex flex-col items-center pt-32 pb-40 overflow-hidden"
    >
      {/* ONE Single Background: Pitch black with minimal stars */}
      <div className="absolute inset-0 bg-black">
        <div className="absolute inset-0 bg-[url('/minimal-stars.webp')] bg-cover bg-center opacity-60" />
      </div>

      {/* Copy */}
      <div className="relative z-40 max-w-[650px] mx-auto text-center px-6">
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
            We use the best tools and technologies to build scalable, high-performance products that stand the test of time.
          </p>
        </motion.div>
      </div>

      {/* Flawless 2D Split-Ring System */}
      <div className="relative w-full h-[700px] mt-32 flex items-center justify-center">
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full h-full flex items-center justify-center"
        >
          {/* Back Rings (Z: 10) */}
          <RingSystem isFront={false} />

          {/* Planet Body (Z: 20) */}
          <div className="absolute top-1/2 left-1/2 w-[340px] h-[340px] -translate-x-1/2 -translate-y-1/2 rounded-full overflow-hidden z-20 shadow-[0_0_80px_rgba(196,156,113,0.3)] bg-black border border-white/5">
             {/* The true transparent planet image forced into a perfect circular mask */}
             <img 
               src="/saturn-transparent.webp" 
               alt="Planet" 
               className="absolute top-1/2 left-1/2 w-[110%] h-[110%] max-w-none -translate-x-1/2 -translate-y-1/2 object-cover" 
             />
          </div>

          {/* Front Rings (Z: 30) */}
          <RingSystem isFront={true} />
        </motion.div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes orbit {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes anti-orbit {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }

        .animate-orbit {
          animation: orbit 60s linear infinite;
        }

        .animate-anti-orbit {
          animation: anti-orbit 60s linear infinite;
        }

        .animate-spin-slow {
          animation: orbit 100s linear infinite;
        }
        
        .animate-spin-reverse {
          animation: anti-orbit 120s linear infinite;
        }
      `}} />
    </section>
  );
}
