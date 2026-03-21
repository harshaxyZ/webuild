"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ZenithSpinner } from "@/components/ui/zenith-spinner";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      if (!auth) throw new Error("Firebase auth is not initialized");
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: name });
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Failed to create account.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Right Side - Visual */}
      <div className="hidden lg:flex lg:flex-1 relative overflow-hidden bg-zinc-50 dark:bg-zinc-900 border-r border-border">
        <div className="w-full h-full flex flex-col items-center justify-center p-12 text-center relative z-10">
           <div className="max-w-md space-y-6">
             <div className="w-20 h-20 mx-auto bg-foreground rounded-full flex items-center justify-center shadow-2xl mb-8">
               <div className="w-8 h-8 rounded-sm bg-background rotate-45" />
             </div>
             <h2 className="text-3xl font-bold tracking-tight text-foreground">Your digital presence starts here.</h2>
             <p className="text-lg text-muted-foreground">Join WeBuild to request your custom, zero-risk demo website. Our team of expert designers and engineers are ready to build for you.</p>
           </div>
        </div>
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 z-0 opacity-[0.03] dark:opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, black 1px, transparent 0)', backgroundSize: '24px 24px' }} />
      </div>

      {/* Left Side - Form */}
      <div className="flex-1 flex flex-col justify-center px-6 py-12 lg:px-24 xl:px-32 relative">
        <header className="absolute top-0 w-full p-6 right-0 text-right lg:text-left">
          <Link href="/" className="text-xl font-bold tracking-tight">
            we build
          </Link>
        </header>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-sm w-full mx-auto space-y-8"
        >
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Create account</h1>
            <p className="mt-2 text-muted-foreground">Sign up to get your zero-risk demo.</p>
          </div>

          {error && (
            <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-lg border border-destructive/20 text-center">
              {error}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSignup}>
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none">Full Name</label>
              <input
                type="text"
                required
                className="flex h-12 w-full rounded-xl border border-input bg-transparent px-3 py-1 shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                placeholder="Jane Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

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
              <label className="text-sm font-medium leading-none">Password</label>
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
              Create Account
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-foreground hover:text-muted-foreground font-medium underline underline-offset-4">
              Log in
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
