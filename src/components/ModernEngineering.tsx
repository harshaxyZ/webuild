"use client";
import { motion } from "framer-motion";

/* ─── Tech Stack with proper recognizable SVG logos ─── */
const techs = [
  {
    name: "React",
    logo: (
      <svg viewBox="-11.5 -10.232 23 20.463" className="w-6 h-6">
        <circle r="2.05" fill="#61DAFB" />
        <g stroke="#61DAFB" fill="none" strokeWidth="1">
          <ellipse rx="11" ry="4.2" />
          <ellipse rx="11" ry="4.2" transform="rotate(60)" />
          <ellipse rx="11" ry="4.2" transform="rotate(120)" />
        </g>
      </svg>
    ),
  },
  {
    name: "Next.js",
    logo: (
      <svg viewBox="0 0 180 180" className="w-6 h-6">
        <circle cx="90" cy="90" r="85" fill="none" stroke="white" strokeWidth="8" />
        <path d="M72 63v54l45-54" stroke="white" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <line x1="115" y1="63" x2="115" y2="100" stroke="white" strokeWidth="8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: "TypeScript",
    logo: (
      <svg viewBox="0 0 128 128" className="w-6 h-6">
        <rect width="128" height="128" rx="10" fill="#3178C6" />
        <path d="M82 95.4c3 1.8 6.8 3.2 10 3.2 4.3 0 6.6-2 6.6-5 0-3.4-2.6-4.6-7.2-6.6l-2.6-1.1c-7-3-11.7-6.7-11.7-14.6 0-7.3 5.6-12.8 14.3-12.8 4.4 0 9 1.4 12.4 4l-4.4 7c-2-1.5-4.7-2.7-7.2-2.7-3.2 0-5.2 2-5.2 4.6 0 3.2 2 4.5 6.6 6.5l2.6 1.1c8.3 3.5 13 7 13 14.8 0 8.5-6.7 13.2-15.7 13.2-5.6 0-11.4-2-15.2-5.4L82 95.4zM52 68h10V59H30v9h10v37h12V68z" fill="white" />
      </svg>
    ),
  },
  {
    name: "Tailwind",
    logo: (
      <svg viewBox="0 0 54 33" className="w-7 h-5">
        <path d="M27 0c-7.2 0-11.7 3.6-13.5 10.8 2.7-3.6 5.85-4.95 9.45-4.05 2.054.514 3.522 2.004 5.147 3.653C30.744 13.09 33.808 16.2 40.5 16.2c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.514-3.522-2.004-5.147-3.653C36.756 3.11 33.692 0 27 0zM13.5 16.2C6.3 16.2 1.8 19.8 0 27c2.7-3.6 5.85-4.95 9.45-4.05 2.054.514 3.522 2.004 5.147 3.653C17.244 29.29 20.308 32.4 27 32.4c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.514-3.522-2.004-5.147-3.653C23.256 19.31 20.192 16.2 13.5 16.2z" fill="#06B6D4" />
      </svg>
    ),
  },
  {
    name: "Node.js",
    logo: (
      <svg viewBox="0 0 256 282" className="w-6 h-6">
        <path d="M116.5 1.7c7.3-4.2 16.2-4.2 23.5 0l96.3 55.6c7.3 4.2 11.7 12 11.7 20.3v111c0 8.3-4.5 16.1-11.7 20.3l-96.3 55.6c-7.3 4.2-16.2 4.2-23.5 0L20.2 209c-7.3-4.2-11.7-12-11.7-20.3v-111c0-8.3 4.5-16.1 11.7-20.3L116.5 1.7z" fill="#339933" fillOpacity="0.25" />
        <path d="M128 0L0 73.9v136.2L128 282l128-71.9V73.9L128 0z" fill="none" stroke="#339933" strokeWidth="8" />
      </svg>
    ),
  },
  {
    name: "Supabase",
    logo: (
      <svg viewBox="0 0 109 113" className="w-6 h-6">
        <path d="M63.7 110.3c-2.6 3.3-8 1.1-7.9-3.2l1-50.8H99c5.4 0 8.3 6.3 4.9 10.5L63.7 110.3z" fill="#3ECF8E" />
        <path d="M45.3 2.7c2.6-3.3 8-1.1 7.9 3.2l-1 50.8H10c-5.4 0-8.3-6.3-4.9-10.5L45.3 2.7z" fill="#3ECF8E" opacity="0.5" />
      </svg>
    ),
  },
  {
    name: "Vercel",
    logo: (
      <svg viewBox="0 0 76 65" className="w-6 h-5">
        <polygon points="38,0 76,65 0,65" fill="white" />
      </svg>
    ),
  },
  {
    name: "Figma",
    logo: (
      <svg viewBox="0 0 38 57" className="w-4 h-6">
        <path d="M19 28.5a9.5 9.5 0 119.5 9.5A9.5 9.5 0 0119 28.5z" fill="#1ABCFE" />
        <path d="M0 47.5A9.5 9.5 0 019.5 38H19v9.5a9.5 9.5 0 11-19 0z" fill="#0ACF83" />
        <path d="M19 0v19h9.5a9.5 9.5 0 100-19H19z" fill="#FF7262" />
        <path d="M0 9.5A9.5 9.5 0 009.5 19H19V0H9.5A9.5 9.5 0 000 9.5z" fill="#F24E1E" />
        <path d="M0 28.5A9.5 9.5 0 009.5 38H19V19H9.5A9.5 9.5 0 000 28.5z" fill="#A259FF" />
      </svg>
    ),
  },
  {
    name: "Framer",
    logo: (
      <svg viewBox="0 0 14 21" className="w-4 h-6">
        <path d="M0 0h14v7H7l7 7H0V7h7L0 0z" fill="#05F" />
        <path d="M0 14h7v7L0 14z" fill="#05F" />
      </svg>
    ),
  },
  {
    name: "GitHub",
    logo: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="white">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
];

/* ─── Elliptical orbit: pre-compute 2D positions ─── */
const ORBIT_RX = 340;
const ORBIT_RY = 110;
const STEPS = 72;

function generateOrbitKeyframes(): string {
  let css = "@keyframes ellipse-orbit {\n";
  for (let i = 0; i <= STEPS; i++) {
    const pct = ((i / STEPS) * 100).toFixed(2);
    const angle = (i / STEPS) * Math.PI * 2;
    const x = Math.cos(angle) * ORBIT_RX;
    const y = Math.sin(angle) * ORBIT_RY;
    // z-index: 25 when in front (bottom half), 15 when behind (top half)
    const z = y > 0 ? 25 : 15;
    css += `  ${pct}% { transform: translate(${x.toFixed(1)}px, ${y.toFixed(1)}px); z-index: ${z}; }\n`;
  }
  css += "}\n";
  return css;
}

/* ─── Glowing Stars (pure CSS, no images) ─── */
function Stars() {
  const stars = Array.from({ length: 150 }, (_, i) => {
    // Deterministic pseudo-random positions
    const x = ((i * 7919 + 104729) % 10000) / 100;
    const y = ((i * 6271 + 32749) % 10000) / 100;
    const isBright = i % 7 === 0;
    const isMedium = i % 4 === 0;
    const size = isBright ? 3 : isMedium ? 2 : 1;
    const delay = ((i * 137) % 500) / 100;
    const duration = 2.5 + ((i * 311) % 300) / 100;
    const baseOpacity = isBright ? 0.9 : isMedium ? 0.6 : 0.35;
    return (
      <div
        key={i}
        className="absolute rounded-full"
        style={{
          left: `${x}%`,
          top: `${y}%`,
          width: size,
          height: size,
          backgroundColor: `rgba(255,255,255,${baseOpacity})`,
          boxShadow: isBright
            ? `0 0 6px 2px rgba(200,220,255,0.8), 0 0 12px 4px rgba(180,200,255,0.4)`
            : isMedium
              ? `0 0 4px 1px rgba(220,230,255,0.5)`
              : "none",
          animation: `twinkle ${duration}s ease-in-out infinite`,
          animationDelay: `${delay}s`,
        }}
      />
    );
  });
  return <div className="absolute inset-0 overflow-hidden pointer-events-none">{stars}</div>;
}

/* ─── Ring visuals (just the decorative bands) ─── */
function RingBands({ isFront }: { isFront: boolean }) {
  return (
    <div
      className="absolute pointer-events-none"
      style={{
        width: 900,
        height: 900,
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%) scaleY(0.35)",
        clipPath: isFront
          ? "polygon(0 50%, 100% 50%, 100% 100%, 0 100%)"
          : "polygon(0 0, 100% 0, 100% 50%, 0 50%)",
        zIndex: isFront ? 30 : 10,
      }}
    >
      {/* Thick bright ring bands */}
      <div className="absolute top-1/2 left-1/2 w-[440px] h-[440px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[14px] border-[#c49c71]/30" />
      <div className="absolute top-1/2 left-1/2 w-[510px] h-[510px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[30px] border-[#d4a96a]/35 shadow-[0_0_40px_rgba(212,169,106,0.25)]" />
      <div className="absolute top-1/2 left-1/2 w-[590px] h-[590px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[5px] border-[#f4dfc4]/45" />
      <div className="absolute top-1/2 left-1/2 w-[650px] h-[650px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[45px] border-[#8a6234]/25 shadow-[0_0_50px_rgba(138,98,52,0.2)]" />
      <div className="absolute top-1/2 left-1/2 w-[760px] h-[760px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[1.5px] border-[#f4dfc4]/15" />
    </div>
  );
}

/* ─── Main Component ─── */
export default function ModernEngineering() {
  const orbitCSS = generateOrbitKeyframes();
  const totalLogos = techs.length;

  return (
    <section className="relative w-full bg-black overflow-hidden">
      <div className="relative w-full h-screen md:min-h-[120vh] flex flex-col items-center pt-16 md:pt-32 pb-8 md:pb-40">
        {/* Pure black background + CSS stars */}
        <div className="absolute inset-0 bg-black" />
        <Stars />

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
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tighter text-white mb-6">
              Powered by modern engineering.
            </h2>
            <p className="text-white/60 text-base md:text-lg leading-relaxed font-light max-w-lg mx-auto">
              We use the best tools and technologies to build scalable, high-performance products.
            </p>
          </motion.div>
        </div>

        {/* Saturn System */}
        <div className="relative w-full flex-1 flex items-center justify-center mt-4 md:mt-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex items-center justify-center"
            style={{ width: 900, height: 600 }}
          >
            {/* Scale wrapper for responsive and tilted rings */}
            <div className="absolute inset-0 flex items-center justify-center origin-center scale-[0.68] sm:scale-[0.75] md:scale-[0.85] lg:scale-[0.9] xl:scale-100 rotate-[-18deg]">
              {/* Back ring bands */}
              <RingBands isFront={false} />

              {/* Planet — circular mask clips the image perfectly */}
              <div
                className="absolute rounded-full overflow-hidden z-20"
                style={{
                  width: 300,
                  height: 300,
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%) rotate(18deg)",
                  boxShadow:
                    "0 0 60px rgba(196,156,113,0.2), 0 0 150px rgba(196,156,113,0.08)",
                }}
              >
                <img
                  src="/saturn-transparent.webp"
                  alt="Planet"
                  width={330}
                  height={330}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 object-cover"
                  style={{ width: "110%", height: "110%", maxWidth: "none" }}
                  loading="eager"
                  decoding="async"
                />
              </div>

              {/* Front ring bands */}
              <RingBands isFront={true} />

              {/* Orbiting logos — each one follows the SAME elliptical keyframes,
                   staggered by animation-delay. They are NOT inside the clip-path
                   container, so they are NEVER clipped. */}
              {techs.map((tech, i) => {
                const delay = -((i / totalLogos) * 80); // spread evenly across 80s orbit
                return (
                  <div
                    key={tech.name}
                    className="absolute"
                    style={{
                      top: "50%",
                      left: "50%",
                      marginTop: -24,
                      marginLeft: -24,
                      width: 48,
                      height: 48,
                      animation: `ellipse-orbit 80s linear infinite`,
                      animationDelay: `${delay}s`,
                    }}
                  >
                    <div className="flex flex-col items-center gap-2 rotate-[18deg]">
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center"
                        style={{
                          background: "radial-gradient(circle at 30% 30%, #1e1e1e, #0a0a0a)",
                          border: "1px solid rgba(255,255,255,0.15)",
                          boxShadow: "0 4px 20px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.1)",
                        }}
                      >
                        {tech.logo}
                      </div>
                      <span className="text-white/60 text-[9px] font-medium tracking-[0.15em] uppercase whitespace-nowrap">
                        {tech.name}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Injected CSS animations */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
          ${orbitCSS}
          @keyframes twinkle {
            0%, 100% { opacity: 0.2; }
            50% { opacity: 1; }
          }
        `,
        }}
      />
    </section>
  );
}
