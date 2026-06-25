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
];

const RingSystem = ({ isFront, isInView }: { isFront: boolean; isInView: boolean }) => (
  <div 
    className="absolute top-1/2 left-1/2 w-[900px] h-[900px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
    style={{
      transform: "translate(-50%, -50%) scaleY(0.35)", 
      clipPath: isFront ? "polygon(0 50%, 100% 50%, 100% 100%, 0 100%)" : "polygon(0 0, 100% 0, 100% 50%, 0 50%)",
      zIndex: isFront ? 30 : 10
    }}
  >
    {/* Concentric Rings */}
    <div className="absolute top-1/2 left-1/2 w-[550px] h-[550px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[1px] border-white/20" />
    <div className="absolute top-1/2 left-1/2 w-[650px] h-[650px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[12px] border-[#c49c71]/20 shadow-[0_0_40px_rgba(196,156,113,0.15)] animate-[spin_80s_linear_infinite_reverse]" />
    <div className="absolute top-1/2 left-1/2 w-[720px] h-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-[#f4dfc4]/10 animate-[spin_60s_linear_infinite]" />
    <div className="absolute top-1/2 left-1/2 w-[820px] h-[820px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[24px] border-[#6e492b]/20 border-dashed animate-[spin_100s_linear_infinite]" />
    
    {/* Orbiting Frameworks */}
    {frameworks.map((fw, i) => {
      const delay = (i * -5) + "s";
      const radius = 290 + (i % 3) * 50; 
      
      return (
        <div 
          key={fw.name}
          className="absolute top-1/2 left-1/2 w-0 h-0"
          style={{
            animation: isInView ? `orbit 40s linear infinite` : 'none',
            animationDelay: delay
          }}
        >
          <div className="absolute" style={{ transform: `translateX(${radius}px)` }}>
            <div 
              className="flex flex-col items-center justify-center"
              style={{
                animation: isInView ? `anti-orbit 40s linear infinite` : 'none',
                animationDelay: delay
              }}
            >
              {/* Counter-scale the 0.35 squash (1 / 0.35 = 2.857) */}
              <div className="flex flex-col items-center gap-4" style={{ transform: "scaleY(2.857)" }}>
                <div className="w-14 h-14 rounded-full bg-black/90 border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.9)] flex items-center justify-center text-white relative group overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-40" />
                  <svg viewBox="0 0 24 24" className="w-6 h-6 z-10" fill="currentColor">
                    {fw.svg}
                  </svg>
                </div>
                <span className="text-white/80 text-[11px] font-semibold tracking-wider drop-shadow-lg uppercase bg-black/40 px-2 py-1 rounded-md backdrop-blur-sm">
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
  const isInView = useInView(ref, { once: false, margin: "-100px" });

  return (
    <section 
      ref={ref} 
      className="relative min-h-[140vh] w-full bg-black flex flex-col items-center pt-32 pb-40 overflow-hidden"
    >
      {/* Ultra Minimalist Space Background */}
      <div className="absolute inset-0 bg-[url('/minimal-stars.webp')] bg-cover bg-center opacity-70" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_0%,black_100%)] opacity-90" />

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
          <RingSystem isFront={false} isInView={isInView} />

          {/* Planet Body (Z: 20) */}
          <div className="absolute top-1/2 left-1/2 w-[340px] h-[340px] -translate-x-1/2 -translate-y-1/2 rounded-full overflow-hidden z-20 shadow-[0_0_80px_rgba(196,156,113,0.3)] bg-black">
             {/* The true transparent planet image forced into a perfect circular mask */}
             <img 
               src="/saturn-transparent.webp" 
               alt="Saturn" 
               className="absolute top-1/2 left-1/2 w-[110%] h-[110%] max-w-none -translate-x-1/2 -translate-y-1/2 object-cover" 
             />
          </div>

          {/* Front Rings (Z: 30) */}
          <RingSystem isFront={true} isInView={isInView} />
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
      `}} />
    </section>
  );
}
