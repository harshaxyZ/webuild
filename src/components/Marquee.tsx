export default function Marquee() {
  return (
    <div className="border-y border-[var(--border)] py-8 overflow-hidden whitespace-nowrap z-10 relative mask-linear-gradient-to-r from-transparent via-black to-transparent">
      <div className="animate-marquee inline-flex gap-16 text-4xl md:text-6xl font-medium tracking-tighter text-[var(--muted)]">
        <span>NEXT.JS</span> <span className="text-[var(--text)]">✦</span> <span>REACT NATIVE</span> <span className="text-[var(--text)]">✦</span> <span>FIREBASE</span> <span className="text-[var(--text)]">✦</span> <span>TYPESCRIPT</span> <span className="text-[var(--text)]">✦</span>
        <span>NEXT.JS</span> <span className="text-[var(--text)]">✦</span> <span>REACT NATIVE</span> <span className="text-[var(--text)]">✦</span> <span>FIREBASE</span> <span className="text-[var(--text)]">✦</span> <span>TYPESCRIPT</span> <span className="text-[var(--text)]">✦</span>
      </div>
    </div>
  );
}
