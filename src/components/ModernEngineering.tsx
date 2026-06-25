"use client";
import { motion } from "framer-motion";

/* ─────────────────── Actual SVG Logo Data ─────────────────── */
const frameworks: { name: string; color: string; logo: JSX.Element }[] = [
  {
    name: "React",
    color: "#61DAFB",
    logo: (
      <g fill="none" stroke="#61DAFB" strokeWidth="1">
        <ellipse cx="12" cy="12" rx="10" ry="4" />
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" />
        <circle cx="12" cy="12" r="2" fill="#61DAFB" />
      </g>
    ),
  },
  {
    name: "Next.js",
    color: "#fff",
    logo: (
      <g>
        <circle cx="12" cy="12" r="10" fill="none" stroke="#fff" strokeWidth="1" />
        <path d="M8 8l10 12M8 8v8" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
      </g>
    ),
  },
  {
    name: "TypeScript",
    color: "#3178C6",
    logo: (
      <g>
        <rect x="2" y="2" width="20" height="20" rx="3" fill="#3178C6" />
        <text x="7" y="17" fontSize="13" fontWeight="bold" fontFamily="Arial" fill="#fff">TS</text>
      </g>
    ),
  },
  {
    name: "Tailwind",
    color: "#06B6D4",
    logo: (
      <g fill="#06B6D4">
        <path d="M12 6C9.33 6 7.67 7.33 7 10c1-1.33 2.17-1.83 3.5-1.5.76.19 1.3.74 1.9 1.35C13.35 10.82 14.5 12 17 12c2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.3-.74-1.9-1.35C15.65 7.18 14.5 6 12 6zM7 12C4.33 12 2.67 13.33 2 16c1-1.33 2.17-1.83 3.5-1.5.76.19 1.3.74 1.9 1.35C8.35 16.82 9.5 18 12 18c2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.3-.74-1.9-1.35C10.65 13.18 9.5 12 7 12z" />
      </g>
    ),
  },
  {
    name: "Node.js",
    color: "#339933",
    logo: (
      <g fill="#339933">
        <path d="M12 1.85l8.69 5.02v10.04L12 21.93l-8.69-5.02V6.87L12 1.85zm0 1.73L4.81 8.02v7.74L12 20.2l7.19-4.44V8.02L12 3.58z" />
        <path d="M12 7.5v9" stroke="#339933" strokeWidth="1.5" />
      </g>
    ),
  },
  {
    name: "Supabase",
    color: "#3ECF8E",
    logo: (
      <g>
        <path d="M13.7 21.15c-.44.56-1.36.15-1.35-.6l.15-7.05H4.82c-.87 0-1.34-1.01-.78-1.68L10.3 2.85c.44-.56 1.36-.15 1.35.6l-.15 7.05h7.68c.87 0 1.34 1.01.78 1.68l-6.26 6.97z" fill="#3ECF8E" />
      </g>
    ),
  },
  {
    name: "Vercel",
    color: "#fff",
    logo: <polygon points="12,2 22,20 2,20" fill="#fff" />,
  },
  {
    name: "Framer",
    color: "#05F",
    logo: (
      <g fill="#05F">
        <path d="M4 0h16v8H12l8 8H4V8h8L4 0z" transform="translate(0,4) scale(0.83)" />
      </g>
    ),
  },
  {
    name: "Figma",
    color: "#F24E1E",
    logo: (
      <g>
        <circle cx="15" cy="8" r="3" fill="#1ABCFE" />
        <circle cx="15" cy="12" r="3" fill="#0ACF83" />
        <rect x="9" y="5" width="6" height="6" rx="3" fill="#FF7262" />
        <rect x="9" y="11" width="6" height="6" rx="3" fill="#A259FF" />
        <path d="M9 17a3 3 0 106 0V14H9v3z" fill="#0ACF83" />
      </g>
    ),
  },
  {
    name: "PostgreSQL",
    color: "#336791",
    logo: (
      <g>
        <circle cx="12" cy="12" r="9" fill="none" stroke="#336791" strokeWidth="1.5" />
        <text x="6.5" y="16" fontSize="10" fontWeight="bold" fontFamily="Arial" fill="#336791">P</text>
      </g>
    ),
  },
];

/* ─────────────────── Glowing Stars (CSS only) ─────────────────── */
function Stars() {
  // Generate 80 random stars using seeded positions
  const stars = Array.from({ length: 80 }, (_, i) => {
    const seed = (i * 7919 + 104729) % 100;
    const seed2 = (i * 6271 + 32749) % 100;
    const size = (i % 5 === 0) ? 3 : (i % 3 === 0) ? 2 : 1;
    const delay = (i * 0.37) % 5;
    const opacity = 0.3 + (seed % 70) / 100;
    return (
      <div
        key={i}
        className="absolute rounded-full"
        style={{
          left: `${seed}%`,
          top: `${seed2}%`,
          width: size,
          height: size,
          backgroundColor: `rgba(255,255,255,${opacity})`,
          boxShadow: size > 1 ? `0 0 ${size * 3}px ${size}px rgba(255,255,255,${opacity * 0.6})` : 'none',
          animation: `twinkle ${2 + delay}s ease-in-out infinite`,
          animationDelay: `${delay}s`,
        }}
      />
    );
  });
  return <div className="absolute inset-0 overflow-hidden">{stars}</div>;
}

/* ─────────────────── Ring System ─────────────────── */
function RingSystem({ isFront }: { isFront: boolean }) {
  return (
    <div
      className="absolute pointer-events-none"
      style={{
        width: 900,
        height: 900,
        top: "50%",
        left: "50%",
        /* The key fix: rotateX gives the TILT angle (not flat) */
        transform: "translate(-50%, -50%) rotateX(65deg)",
        clipPath: isFront
          ? "polygon(0 50%, 100% 50%, 100% 100%, 0 100%)"
          : "polygon(0 0, 100% 0, 100% 50%, 0 50%)",
        zIndex: isFront ? 30 : 10,
      }}
    >
      {/* Ring bands — thick, glowing, layered */}
      <div className="absolute top-1/2 left-1/2 w-[440px] h-[440px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[16px] border-[#c49c71]/35" />
      <div className="absolute top-1/2 left-1/2 w-[520px] h-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[35px] border-[#e6b981]/40 shadow-[0_0_50px_rgba(230,185,129,0.3)]" />
      <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[6px] border-[#f4dfc4]/50" />
      <div className="absolute top-1/2 left-1/2 w-[680px] h-[680px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[50px] border-[#916b45]/25 shadow-[0_0_60px_rgba(145,107,69,0.2)]" />
      <div className="absolute top-1/2 left-1/2 w-[790px] h-[790px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[1px] border-[#f4dfc4]/20" />

      {/* Orbiting logos — using CSS animation, perfectly spaced */}
      {frameworks.map((fw, i) => {
        const totalLogos = frameworks.length;
        const angleDeg = (360 / totalLogos) * i;
        const radius = 310;

        return (
          <div
            key={fw.name}
            className="absolute top-1/2 left-1/2"
            style={{
              width: 0,
              height: 0,
              animation: `orbit 80s linear infinite`,
              /* Initial spread: each logo starts at a different angle */
              transform: `rotate(${angleDeg}deg)`,
            }}
          >
            <div
              className="absolute flex flex-col items-center"
              style={{ left: radius, top: -28 }}
            >
              <div
                style={{
                  /* Counter-rotate to stay upright, and un-tilt from rotateX(65deg) */
                  animation: `anti-orbit 80s linear infinite`,
                  transform: `rotateX(-65deg) rotate(-${angleDeg}deg)`,
                }}
              >
                <div className="flex flex-col items-center gap-2">
                  <div
                    className="w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center relative"
                    style={{
                      background: `radial-gradient(circle at 30% 30%, #1a1a1a 0%, #0a0a0a 100%)`,
                      border: `1px solid ${fw.color}33`,
                      boxShadow: `0 0 20px ${fw.color}22, inset 0 1px 0 rgba(255,255,255,0.1)`,
                    }}
                  >
                    <svg viewBox="0 0 24 24" className="w-6 h-6">
                      {fw.logo}
                    </svg>
                  </div>
                  <span className="text-white/70 text-[10px] font-medium tracking-widest uppercase whitespace-nowrap">
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
}

/* ─────────────────── Main Component ─────────────────── */
export default function ModernEngineering() {
  return (
    <section className="relative w-full bg-black overflow-hidden">
      {/* Aspect-ratio container for responsiveness */}
      <div className="relative w-full min-h-[100vh] md:min-h-[120vh] flex flex-col items-center pt-24 md:pt-32 pb-32 md:pb-40">

        {/* Single background: pure black + CSS stars */}
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
              We use the best tools and technologies to build scalable, high-performance products that stand the test of time.
            </p>
          </motion.div>
        </div>

        {/* Saturn System — scales down on mobile */}
        <div className="relative w-full flex-1 flex items-center justify-center mt-16 md:mt-24" style={{ perspective: 1200 }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex items-center justify-center"
            style={{ width: 900, height: 700, maxWidth: "100vw" }}
          >
            {/* Scale wrapper for mobile */}
            <div className="absolute inset-0 flex items-center justify-center origin-center scale-[0.38] sm:scale-[0.5] md:scale-[0.65] lg:scale-[0.85] xl:scale-100">
              
              {/* Back Rings */}
              <RingSystem isFront={false} />

              {/* Planet */}
              <div
                className="absolute rounded-full overflow-hidden z-20"
                style={{
                  width: 300,
                  height: 300,
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  boxShadow: "0 0 80px rgba(196,156,113,0.25), 0 0 200px rgba(196,156,113,0.1)",
                }}
              >
                <img
                  src="/saturn-transparent.webp"
                  alt="Planet"
                  width={330}
                  height={330}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 object-cover max-w-none"
                  style={{ width: "110%", height: "110%" }}
                  loading="eager"
                />
              </div>

              {/* Front Rings */}
              <RingSystem isFront={true} />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Keyframe animations — pure CSS, zero JS overhead */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes orbit {
            from { transform: rotate(var(--start-angle, 0deg)); }
            to { transform: rotate(calc(var(--start-angle, 0deg) + 360deg)); }
          }
          @keyframes anti-orbit {
            from { transform: rotateX(-65deg) rotate(var(--counter-start, 0deg)); }
            to { transform: rotateX(-65deg) rotate(calc(var(--counter-start, 0deg) - 360deg)); }
          }
          @keyframes twinkle {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 1; }
          }
        `,
      }} />
    </section>
  );
}
