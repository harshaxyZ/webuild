import Navbar from "@/components/Navbar";

export default function TermsOfService() {
  return (
    <main className="min-h-screen pt-32 pb-20 px-6">
      <Navbar onOpenPanel={() => {}} />
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-semibold tracking-tighter mb-8">Terms of Service</h1>
        <div className="prose prose-invert max-w-none text-[var(--muted)]">
          <p>Last updated: June 2026</p>
          <h2 className="text-[var(--text)] text-2xl mt-8 mb-4">1. Acceptance of Terms</h2>
          <p>By accessing and using our website, you agree to be bound by these Terms of Service.</p>
          <h2 className="text-[var(--text)] text-2xl mt-8 mb-4">2. Services</h2>
          <p>We provide digital engineering and development services as outlined in our project agreements.</p>
        </div>
      </div>
    </main>
  );
}
