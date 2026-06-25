import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BackButton } from "@/components/BackButton";

export default function TermsOfService() {
  return (
    <>
      <Navbar />
      <main className="flex-1 pt-32 pb-20 px-[20px] md:px-[6%] max-w-4xl mx-auto w-full">
        <BackButton />
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-12">Terms of Service</h1>
        
        <div className="prose prose-invert prose-lg max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-[var(--text-primary)]">1. Services offered</h2>
            <p className="text-[var(--text-secondary)]">
              we build offers design, development, and deployment services for mobile and web applications, custom websites, and workflow automation/AI agents. The scope of each project will be agreed upon individually.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-[var(--text-primary)]">2. Payment terms</h2>
            <p className="text-[var(--text-secondary)]">
              Payment terms are handled on a case-by-case basis depending on the scope of the project. A deposit may be required before work begins. All payment structures will be clearly outlined in your project proposal.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-[var(--text-primary)]">3. Intellectual property</h2>
            <p className="text-[var(--text-secondary)]">
              Upon receipt of full payment, you (the client) own the final deliverables. We reserve the right to display the completed project in our portfolio unless a Non-Disclosure Agreement (NDA) is signed prior to the project start.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-[var(--text-primary)]">4. Limitation of liability</h2>
            <p className="text-[var(--text-secondary)]">
              we build is not liable for any indirect, incidental, or consequential damages resulting from the use of our services or products. We deliver software "as is" and warrant that it functions according to the agreed-upon specifications at the time of delivery.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-[var(--text-primary)]">5. Governing law</h2>
            <p className="text-[var(--text-secondary)]">
              These terms are governed by the laws of India. Any disputes arising from these terms will be subject to the exclusive jurisdiction of the courts in India.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
