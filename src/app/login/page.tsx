"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[var(--bg)] flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_100%)] pointer-events-none" />
      
      <Link href="/" className="absolute top-8 left-8 text-[var(--muted)] hover:text-[var(--text)] transition-colors flex items-center gap-2 text-sm font-medium">
        <ArrowLeft size={16} /> Back to home
      </Link>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md bg-[var(--surface)] border border-[var(--border)] rounded-3xl p-10 shadow-2xl relative z-10"
      >
        <div className="flex flex-col items-center text-center mb-10">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center font-bold bg-[var(--text)] text-[var(--bg)] mb-6 text-xl">w</div>
          <h1 className="text-2xl font-semibold tracking-tight mb-2">Welcome Back</h1>
          <p className="text-[var(--muted)] text-sm">Login or sign up to continue.</p>
        </div>

        <div className="space-y-4">
          <button className="w-full bg-[var(--bg)] border border-[var(--border)] hover:border-[var(--text)] text-[var(--text)] py-3.5 rounded-xl text-sm font-medium transition-colors flex items-center justify-center gap-3 group">
            <svg viewBox="0 0 24 24" className="w-5 h-5 group-hover:scale-110 transition-transform">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            Continue with Google
          </button>
          
          <div className="relative flex items-center py-2">
            <div className="flex-grow border-t border-[var(--border)]"></div>
            <span className="flex-shrink-0 mx-4 text-[var(--muted)] text-xs uppercase tracking-wider font-medium">Or</span>
            <div className="flex-grow border-t border-[var(--border)]"></div>
          </div>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <input type="email" placeholder="Email address" required className="w-full bg-[var(--bg)] border border-[var(--border)] rounded-xl px-4 py-3.5 text-sm outline-none focus:border-[var(--text)] transition-colors" />
            </div>
            <div>
              <input type="password" placeholder="Password" required className="w-full bg-[var(--bg)] border border-[var(--border)] rounded-xl px-4 py-3.5 text-sm outline-none focus:border-[var(--text)] transition-colors" />
            </div>
            <button type="submit" className="w-full bg-[var(--text)] text-[var(--bg)] py-3.5 rounded-xl text-sm font-medium hover:opacity-90 transition-opacity">
              Continue with Email
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
