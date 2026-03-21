"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { ZenithSpinner } from "@/components/ui/zenith-spinner";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      if (!auth) throw new Error("Firebase auth is not initialized");
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Failed to log in.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Side */}
      <div className="flex-1 flex flex-col justify-center px-6 py-12 lg:px-24 xl:px-32 relative">
        <header className="absolute top-0 w-full p-6 left-0 text-left">
          <Link href="/" className="text-xl font-bold tracking-tight">
            we build
          </Link>
        </header>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-sm w-full mx-auto space-y-8"
        >
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Welcome back</h1>
            <p className="mt-2 text-muted-foreground">Sign in to track your demo's progress.</p>
          </div>

          {error && (
            <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-lg border border-destructive/20 text-center">
              {error}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleLogin}>
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none">Email Address</label>
              <input
                type="email"
                required
                className="flex h-12 w-full rounded-xl border border-input bg-transparent px-3 py-1 shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium leading-none">Password</label>
              </div>
              <input
                type="password"
                required
                className="flex h-12 w-full rounded-xl border border-input bg-transparent px-3 py-1 shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <Button variant="gradient" className="w-full h-12 text-base rounded-xl" type="submit" disabled={loading}>
              {loading ? <ZenithSpinner size={20} className="mr-2" /> : null}
              Sign In
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link href="/auth/signup" className="text-foreground hover:text-muted-foreground font-medium underline underline-offset-4">
              Sign up
            </Link>
          </p>
        </motion.div>
      </div>

      {/* Right Side */}
      <div className="hidden lg:flex lg:flex-1 relative overflow-hidden bg-zinc-50 dark:bg-zinc-900 border-l border-border">
        <div className="w-full h-full flex flex-col items-center justify-center p-12 text-center relative z-10">
           <div className="max-w-md space-y-6">
             <div className="w-20 h-20 mx-auto bg-foreground rounded-2xl rotate-12 flex items-center justify-center shadow-2xl">
               <div className="w-10 h-10 bg-background rounded-full -rotate-12" />
             </div>
             <h2 className="text-3xl font-bold tracking-tight text-foreground">Top-tier websites. Zero upfront cost.</h2>
             <p className="text-lg text-muted-foreground">Sign in to track the progress of your demo and communicate directly with your dedicated development team.</p>
           </div>
        </div>
        
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 z-0 opacity-[0.03] dark:opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, black 1px, transparent 0)', backgroundSize: '24px 24px' }} />
      </div>
    </div>
  );
}
