import Link from "next/link";
import { Twitter, Linkedin, Github, Mail, ArrowUpRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--surface)] text-[var(--text-primary)]">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-16">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-[var(--text-primary)] rounded-lg flex items-center justify-center">
                <span className="text-[var(--bg)] font-bold text-lg">w</span>
              </div>
              <span className="text-2xl font-semibold tracking-tight">we build</span>
            </Link>
            <p className="text-[var(--text-secondary)] text-lg max-w-sm leading-relaxed mb-8">
              We build high-performance web applications, mobile apps, and AI automations that scale.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-[var(--surface-2)] flex items-center justify-center hover:bg-[var(--accent)] hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-[var(--surface-2)] flex items-center justify-center hover:bg-[var(--accent)] hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-[var(--surface-2)] flex items-center justify-center hover:bg-[var(--accent)] hover:text-white transition-colors">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-6">Company</h4>
            <ul className="space-y-4 text-[var(--text-secondary)]">
              <li><Link href="/#services" className="hover:text-[var(--accent)] transition-colors">Services</Link></li>
              <li><Link href="/terms-of-service" className="hover:text-[var(--accent)] transition-colors">Process</Link></li>
              <li><Link href="/login" className="hover:text-[var(--accent)] transition-colors">Client Login</Link></li>
              <li><Link href="/admin" className="hover:text-[var(--accent)] transition-colors">Admin</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-6">Legal</h4>
            <ul className="space-y-4 text-[var(--text-secondary)]">
              <li><Link href="/privacy-policy" className="hover:text-[var(--accent)] transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms-of-service" className="hover:text-[var(--accent)] transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-[var(--border)] flex flex-col md:flex-row items-center justify-between gap-4 text-[var(--text-secondary)] text-sm">
          <p>© {new Date().getFullYear()} we build. All rights reserved.</p>
          <a href="mailto:harsha210108@gmail.com" className="flex items-center gap-1 hover:text-[var(--text-primary)] transition-colors">
            <Mail className="w-4 h-4" /> harsha210108@gmail.com
          </a>
        </div>
      </div>
    </footer>
  );
}
