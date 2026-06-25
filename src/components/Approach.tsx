"use client";
import ScrollReveal from "./ScrollReveal";

const items = [
  { num: "01 / OBSESSION", title: "Zero Bloat", desc: "We don't reuse bloated templates. Every line of code is written specifically for your product, guaranteeing 90fps performance and perfect Lighthouse scores." },
  { num: "02 / ACCESS", title: "Direct Line", desc: "No project managers, no middlemen. You work directly with the engineers building your product. Agile, transparent, and brutally fast." },
  { num: "03 / STACK", title: "Modern Core", desc: "We build exclusively on Next.js, React Native, and serverless infrastructure. If it was invented before 2020, we probably aren't using it." }
];

export default function Approach() {
  return (
    <section id="approach" className="py-32 md:py-48 px-6 relative z-10 border-t border-[var(--border)]">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-12 gap-8 mb-20">
          <div className="md:col-span-5">
            <ScrollReveal><p className="text-sm uppercase tracking-widest mb-4 text-[var(--muted)]">The Unfair Advantage</p></ScrollReveal>
          </div>
          <div className="md:col-span-7">
            <ScrollReveal delay={0.1}>
              <h2 className="text-3xl md:text-5xl font-light tracking-tight leading-[1.1]">
                We haven't shipped a hundred projects. We don't have a roster of Fortune 500 clients. <span className="text-[var(--muted)]">And that is exactly why you should hire us.</span>
              </h2>
            </ScrollReveal>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-px bg-[var(--border)] border border-[var(--border)] rounded-2xl overflow-hidden mt-16">
          {items.map((item, i) => (
            <ScrollReveal key={i} delay={i * 0.1} className="bg-[var(--bg)] p-8 md:p-12 border-r border-[var(--border)] last:border-r-0">
              <span className="text-xs font-mono opacity-50">{item.num}</span>
              <h3 className="text-2xl font-medium mt-4 mb-4">{item.title}</h3>
              <p className="font-light text-sm leading-relaxed text-[var(--muted)]">{item.desc}</p>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
