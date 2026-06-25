import Navbar from "@/components/Navbar";

export default function TermsOfService() {
  return (
    <main className="min-h-screen pt-32 pb-20 px-6 bg-[var(--bg)]">
      <Navbar />
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-semibold tracking-tighter mb-8">Terms of Service</h1>
        <div className="prose prose-invert prose-lg max-w-none text-[var(--muted)]">
          <p>Last updated: June 2026</p>
          <h2 className="text-[var(--text)] text-3xl mt-12 mb-6">1. Agreement to Terms</h2>
          <p>By accessing or using our services at We Build, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access our services.</p>
          
          <h2 className="text-[var(--text)] text-3xl mt-12 mb-6">2. Intellectual Property</h2>
          <p>The Service and its original content, features, and functionality are and will remain the exclusive property of We Build and its licensors. Once a project is fully paid for and handed over, intellectual property rights to the custom code transfer to the client, subject to the specific contract.</p>

          <h2 className="text-[var(--text)] text-3xl mt-12 mb-6">3. Project Timelines & Revisions</h2>
          <p>Project timelines are estimates. We strive to meet all deadlines, but delays can occur. Revisions are limited to the scope defined in the initial project agreement. Additional features will be billed separately.</p>

          <h2 className="text-[var(--text)] text-3xl mt-12 mb-6">4. Limitation of Liability</h2>
          <p>In no event shall We Build, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.</p>
        </div>
      </div>
    </main>
  );
}
