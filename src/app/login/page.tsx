"use client";

import { useState, Suspense } from "react";
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { BackButton } from "@/components/BackButton";
import Navbar from "@/components/Navbar";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect") || "/dashboard";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth) {
      toast.error("Database connection not configured.");
      return;
    }
    
    setLoading(true);
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        toast.success("Welcome back!");
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        toast.success("Account created successfully!");
      }
      router.push(redirectPath);
    } catch (err: any) {
      toast.error(err.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="service-card p-8 shadow-xl">
      <h1 className="text-3xl font-semibold mb-2">
        {isLogin ? "Welcome back" : "Create an account"}
      </h1>
      <p className="text-[var(--text-secondary)] mb-8">
        {isLogin ? "Sign in to manage your bookings." : "Sign up to start your project."}
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-[var(--surface-2)] border border-[var(--border)] rounded-[var(--radius-input)] p-3 outline-none focus:border-[var(--accent)] transition-colors"
            placeholder="you@example.com"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-[var(--surface-2)] border border-[var(--border)] rounded-[var(--radius-input)] p-3 outline-none focus:border-[var(--accent)] transition-colors"
            placeholder="••••••••"
            required
            minLength={6}
          />
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="w-full btn-pill mt-4 disabled:opacity-50"
        >
          {loading ? "Please wait..." : (isLogin ? "Sign In" : "Sign Up")}
        </button>
      </form>

      <div className="mt-6 text-center text-sm text-[var(--text-secondary)]">
        {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
        <button 
          type="button"
          onClick={() => setIsLogin(!isLogin)}
          className="text-[var(--accent)] hover:underline font-medium"
        >
          {isLogin ? "Sign up" : "Sign in"}
        </button>
      </div>
    </div>
  );
}

export default function Login() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center justify-center p-6 relative">
        <div className="absolute inset-0 hero-gradient z-0 pointer-events-none opacity-50" />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md relative z-10"
        >
          <BackButton />
          <Suspense fallback={<div className="service-card p-8 shadow-xl flex justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--accent)]"></div></div>}>
            <LoginForm />
          </Suspense>
        </motion.div>
      </div>
    </>
  );
}
