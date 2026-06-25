import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BackButton } from "@/components/BackButton";

export default function PrivacyPolicy() {
  return (
    <>
      <Navbar />
      <main className="flex-1 pt-32 pb-20 px-[20px] md:px-[6%] max-w-4xl mx-auto w-full">
        <BackButton />
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-12">Privacy Policy</h1>
        
        <div className="prose prose-invert prose-lg max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-[var(--text-primary)]">1. What data we collect</h2>
            <p className="text-[var(--text-secondary)]">
              When you book a call with us, we collect your name, email address, WhatsApp number, and the type of service you are interested in.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-[var(--text-primary)]">2. Why we collect it</h2>
            <p className="text-[var(--text-secondary)]">
              We collect this information strictly to schedule a consultation call, understand your project requirements before we speak, and provide our services to you.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-[var(--text-primary)]">3. How it's stored</h2>
            <p className="text-[var(--text-secondary)]">
              Your data is securely stored using industry-standard database providers. It is encrypted at rest and transmitted over secure HTTPS connections.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-[var(--text-primary)]">4. Who has access</h2>
            <p className="text-[var(--text-secondary)]">
              Only the core team at we build has access to this data. We do not sell, rent, or share your personal information with any third parties.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-[var(--text-primary)]">5. Your rights</h2>
            <p className="text-[var(--text-secondary)]">
              You have the right to request the deletion of your personal data at any time. To do so, please <a href="mailto:harsha210108@gmail.com" className="text-[var(--accent)] hover:underline">email us</a>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-[var(--text-primary)]">6. Cookies we use</h2>
            <p className="text-[var(--text-secondary)]">
              We use only session and necessary cookies to keep the site secure and remember your consent preferences. We do not load any analytics or tracking cookies unless you explicitly grant us consent via the cookie banner.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-[var(--text-primary)]">7. Contact</h2>
            <p className="text-[var(--text-secondary)]">
              For any privacy-related questions, please <a href="mailto:harsha210108@gmail.com" className="text-[var(--accent)] hover:underline">email</a> us.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
