import Navbar from "@/components/Navbar";

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen pt-32 pb-20 px-6 bg-[var(--bg)]">
      <Navbar />
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-semibold tracking-tighter mb-8">Privacy Policy</h1>
        <div className="prose prose-invert prose-lg max-w-none text-[var(--muted)]">
          <p>Last updated: June 2026</p>
          <h2 className="text-[var(--text)] text-3xl mt-12 mb-6">1. Information We Collect</h2>
          <p>We collect information you provide directly to us when you request a quote, fill out a form, or communicate with us. This includes your name, email address, WhatsApp number, and any project details.</p>
          
          <h2 className="text-[var(--text)] text-3xl mt-12 mb-6">2. How We Use Information</h2>
          <p>We use the information we collect to:</p>
          <ul className="list-disc pl-6 space-y-2 mt-4">
            <li>Provide, maintain, and improve our services.</li>
            <li>Communicate with you about your project and send you technical notices.</li>
            <li>Respond to your comments, questions, and customer service requests.</li>
          </ul>

          <h2 className="text-[var(--text)] text-3xl mt-12 mb-6">3. Cookies & Analytics</h2>
          <p>We use cookies and similar tracking technologies (like PostHog and Vercel Analytics) to track the activity on our Service and hold certain information to improve your experience. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent via our Cookie Banner.</p>

          <h2 className="text-[var(--text)] text-3xl mt-12 mb-6">4. Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, please contact us at support@webuildnow.in.</p>
        </div>
      </div>
    </main>
  );
}
