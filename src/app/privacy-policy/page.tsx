import Navbar from "@/components/Navbar";

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen pt-32 pb-20 px-6">
      <Navbar onOpenPanel={() => {}} />
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-semibold tracking-tighter mb-8">Privacy Policy</h1>
        <div className="prose prose-invert max-w-none text-[var(--muted)]">
          <p>Last updated: June 2026</p>
          <h2 className="text-[var(--text)] text-2xl mt-8 mb-4">1. Information We Collect</h2>
          <p>We collect information you provide directly to us when you fill out a form or communicate with us.</p>
          <h2 className="text-[var(--text)] text-2xl mt-8 mb-4">2. Use of Information</h2>
          <p>We use the information we collect to provide, maintain, and improve our services, as well as to communicate with you.</p>
          <h2 className="text-[var(--text)] text-2xl mt-8 mb-4">3. Analytics</h2>
          <p>We use PostHog to analyze traffic and usage patterns to improve our website experience.</p>
        </div>
      </div>
    </main>
  );
}
