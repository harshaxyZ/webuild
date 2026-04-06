"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Loader2, CheckCircle2, Clock, PlayCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function StatusPage() {
  const [email, setEmail] = useState("");
  const [results, setResults] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    setError("");
    setResults(null);

    try {
      // In a real app, this would fetch from /api/status?email=...
      // For now, we simulate a fetch from the submissions API via a client-side filter
      const res = await fetch("/api/admin/submissions");
      const data = await res.json();
      
      const userSubmissions = data.submissions?.filter((s: any) => 
        s.user.email.toLowerCase() === email.toLowerCase()
      );

      if (userSubmissions && userSubmissions.length > 0) {
        // Sort by date and take the latest
        setResults(userSubmissions.sort((a: any, b: any) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )[0]);
      } else {
        setError("No submissions found for this email address.");
      }
    } catch (err) {
      setError("Failed to fetch status. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const statusSteps = [
    { id: "SUBMITTED", label: "Confirmed", icon: CheckCircle2 },
    { id: "IN_PROGRESS", label: "Building", icon: Loader2 },
    { id: "DEMO_READY", label: "Ready", icon: PlayCircle },
    { id: "COMPLETED", label: "Launched", icon: Clock },
  ];

  const currentIdx = results ? statusSteps.findIndex(s => s.id === results.status) : -1;

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-rose-100 selection:text-rose-900">
      <div className="container mx-auto px-6 py-20 max-w-2xl">
        <Link href="/" className="inline-flex items-center gap-2 text-zinc-500 hover:text-rose-500 transition-colors mb-12 font-bold text-sm tracking-widest uppercase">
          <ArrowLeft size={16} /> Back to Home
        </Link>

        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Track your demo.</h1>
          <p className="text-zinc-500 text-lg font-medium">Enter your email to check the progress of your application.</p>
        </div>

        <form onSubmit={handleSearch} className="relative mb-16">
          <input 
            type="email"
            required
            placeholder="Enter your email address"
            className="w-full h-16 rounded-2xl border-2 border-zinc-100 px-6 pr-16 text-lg focus:border-rose-500 outline-none transition-all shadow-sm focus:ring-4 focus:ring-rose-500/5"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button 
            type="submit"
            disabled={isLoading}
            className="absolute right-2 top-2 w-12 h-12 bg-zinc-900 text-white rounded-xl flex items-center justify-center hover:bg-rose-500 transition-all disabled:opacity-50"
          >
            {isLoading ? <Loader2 className="animate-spin" /> : <Search size={20} />}
          </button>
        </form>

        <AnimatePresence mode="wait">
          {error && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="p-6 rounded-2xl bg-red-50 border border-red-100 text-red-600 font-medium text-center"
            >
              {error}
            </motion.div>
          )}

          {results && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <div className="p-8 rounded-[2.5rem] border-2 border-zinc-100 bg-white shadow-xl shadow-zinc-200/50">
                <div className="flex justify-between items-start mb-12">
                   <div>
                     <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-rose-500 mb-2 block">Latest Status</span>
                     <h2 className="text-3xl font-bold">{results.concept} Demo</h2>
                   </div>
                   <div className="bg-zinc-50 px-4 py-2 rounded-xl border border-zinc-100 text-xs font-bold text-zinc-400">
                     ID: {results.id.slice(0, 8)}
                   </div>
                </div>

                {/* Progress Bar */}
                <div className="relative pt-8 pb-4">
                   <div className="absolute top-0 left-0 w-full h-1 bg-zinc-100 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${((currentIdx + 1) / statusSteps.length) * 100}%` }}
                        className="h-full bg-rose-500"
                        transition={{ duration: 1, ease: "easeOut" }}
                      />
                   </div>
                   <div className="flex justify-between">
                     {statusSteps.map((step, i) => {
                       const isActive = i <= currentIdx;
                       const isCurrent = i === currentIdx;
                       return (
                         <div key={step.id} className="flex flex-col items-center gap-3 relative -top-3">
                            <div className={`w-6 h-6 rounded-full border-4 ${isActive ? 'bg-rose-500 border-white shadow-md' : 'bg-white border-zinc-100'} transition-colors duration-500`} />
                            <span className={`text-[10px] font-bold tracking-widest uppercase ${isCurrent ? 'text-rose-500' : isActive ? 'text-zinc-900' : 'text-zinc-300'}`}>
                              {step.label}
                            </span>
                         </div>
                       );
                     })}
                   </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                 <div className="p-6 rounded-3xl bg-zinc-50 border border-zinc-100">
                    <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block mb-1">Created</span>
                    <span className="font-bold text-sm">{new Date(results.createdAt).toLocaleDateString()}</span>
                 </div>
                 <div className="p-6 rounded-3xl bg-zinc-50 border border-zinc-100">
                    <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block mb-1">Queue Position</span>
                    <span className="font-bold text-sm">#2 in Builder</span>
                 </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
