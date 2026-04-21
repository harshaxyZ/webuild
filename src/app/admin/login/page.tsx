"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { checkIsAdmin } from "@/lib/auth-utils";
import { ZenithSpinner } from "@/components/ui/zenith-spinner";
import { Lock } from "lucide-react";

export default function AdminLoginPage() {
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
      if (!auth) {
        // Demo mode: Allow any login if Firebase is disabled
        router.push("/admin");
        return;
      }
      
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const isAdmin = await checkIsAdmin(userCredential.user.email);

      if (!isAdmin) {
        await signOut(auth);
        setError("Not authorized. Access denied.");
        return;
      }

      router.push("/admin");
    } catch (err: any) {
      if (err.code === "auth/user-not-found" || err.code === "auth/wrong-password") {
        setError("Invalid credentials.");
      } else {
        setError(err.message || "Failed to log in.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-zinc-900/50 border border-zinc-800 p-8 rounded-3xl shadow-2xl backdrop-blur-xl"
      >
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Access</h1>
          <p className="text-zinc-400 mt-2">Manage your pipeline and client deliveries.</p>
        </div>

        {error && (
          <div className="bg-red-500/10 text-red-400 text-sm p-3 rounded-lg border border-red-500/20 mb-6 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-300">Admin Email</label>
            <input
              type="email"
              required
              className="w-full h-12 bg-zinc-950 border border-zinc-800 rounded-xl px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              placeholder="admin@webuild.example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-300">Security Key</label>
            <input
              type="password"
              required
              className="w-full h-12 bg-zinc-950 border border-zinc-800 rounded-xl px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <Button className="w-full h-14 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-lg shadow-blue-500/20" type="submit" disabled={loading}>
            {loading ? <ZenithSpinner size={20} className="mr-2" /> : "Access Dashboard"}
          </Button>
        </form>

        <p className="text-center text-xs text-zinc-500 mt-8">
          This is a protected system. Unauthorized access is recorded.
        </p>
      </motion.div>
    </div>
  );
}
