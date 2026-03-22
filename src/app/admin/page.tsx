"use client";

import { motion } from "framer-motion";
import { Users, FileText, Search, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";

type Submission = {
  id: string;
  ideaDescription: string | null;
  socialLinks: string | null;
  status: string;
  createdAt: string;
  user: { name: string | null; email: string; phoneNumber: string | null };
  uploads: { id: string; fileName: string; fileUrl: string }[];
};

export default function AdminDashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [submissions, setSubmissions] = useState<Submission[]>([]);

  const fetchSubmissions = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/submissions");
      const data = await res.json();
      if (data.submissions) setSubmissions(data.submissions);
    } catch (e: any) {
      console.error("Failed to fetch submissions:", e);
    }
  }, []);

  // Auth & Initial Load
  useEffect(() => {
    if (!auth) {
      setUser({ email: "admin@demo.mode", displayName: "Demo Admin" });
      setLoading(false);
      return;
    }
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      if (!u) {
        router.push("/admin/login");
      } else {
        setUser(u);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [router]);

  // Real-time Firestore Listener
  useEffect(() => {
    if (!user) return;
    
    const { getFirestore, collection, query, orderBy, onSnapshot, limit } = require("firebase/firestore");
    const db = getFirestore();
    const q = query(collection(db, "submissions"), orderBy("createdAt", "desc"), limit(50));

    const unsubscribe = onSnapshot(q, (snapshot: any) => {
      const liveSubmissions = snapshot.docs.map((doc: any) => {
        const data = doc.data();
        return {
          id: data.id,
          ideaDescription: data.description,
          socialLinks: data.socialLinks || null,
          status: data.status,
          createdAt: data.createdAt,
          user: { name: data.userName, email: data.userEmail, phoneNumber: data.userPhone || null },
          uploads: data.uploads || []
        };
      });
      
      if (liveSubmissions.length > 0) {
        setSubmissions(prev => {
          const merged = [...liveSubmissions];
          const liveIds = new Set(liveSubmissions.map((s: any) => s.id));
          prev.forEach(p => {
            if (!liveIds.has(p.id)) merged.push(p);
          });
          return merged.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        });
      }
    });

    return () => unsubscribe();
  }, [user]);

  useEffect(() => {
    if (user) fetchSubmissions();
  }, [user, fetchSubmissions]);

  const handleLogout = async () => {
    if (auth) await signOut(auth);
    router.push("/admin/login");
  };

  const moveSubmission = async (id: string, newStatus: string) => {
    try {
      const res = await fetch("/api/admin/submissions", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (res.ok) fetchSubmissions();
    } catch (e: any) {
      console.error("Failed to update submission:", e);
    }
  };

  if (loading) return null;
  if (!user) return null;

  const submitted = submissions.filter((s) => s.status === "SUBMITTED");
  const inProgress = submissions.filter((s) => s.status === "IN_PROGRESS");
  const demoReady = submissions.filter((s) => s.status === "DEMO_READY" || s.status === "COMPLETED");

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 flex">
      {/* Admin Sidebar */}
      <aside className="w-64 border-r border-zinc-900 bg-zinc-950 p-6 hidden md:flex flex-col">
        <div className="text-xl font-bold tracking-tight mb-12 text-blue-400">we build admin</div>
        <nav className="space-y-2 flex-1">
          <Button variant="ghost" className="w-full justify-start text-white bg-zinc-900">
            <Search className="w-4 h-4 mr-3" /> Dashboard
          </Button>
          <Button variant="ghost" className="w-full justify-start text-zinc-400 hover:text-white hover:bg-zinc-900">
            <FileText className="w-4 h-4 mr-3" /> Submissions
          </Button>
          <Button variant="ghost" className="w-full justify-start text-zinc-400 hover:text-white hover:bg-zinc-900">
            <Users className="w-4 h-4 mr-3" /> Users
          </Button>
        </nav>
        <div className="mt-auto">
          <Button variant="outline" className="w-full border-zinc-800 text-zinc-400 hover:bg-zinc-900" onClick={handleLogout}>Logout</Button>
        </div>
      </aside>

      {/* Admin Content */}
      <main className="flex-1 p-6 md:p-12">
        <header className="flex items-center justify-between mb-12">
          <h1 className="text-3xl font-bold">Submissions Pipeline</h1>
          <Button 
            variant="secondary" 
            className="bg-zinc-900 text-zinc-100 hover:bg-zinc-800 border-zinc-800 border"
            onClick={fetchSubmissions}
          >
            Refresh
          </Button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Column: Submitted */}
          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm font-medium text-zinc-400 mb-4 px-2">
              <span>SUBMITTED</span>
              <span className="bg-zinc-900 px-2 py-0.5 rounded-full">{submitted.length}</span>
            </div>
            {submitted.length === 0 ? (
              <div className="h-32 border border-dashed border-zinc-800 rounded-xl flex items-center justify-center text-zinc-600 text-sm">
                No new submissions
              </div>
            ) : (
              submitted.map((s) => (
                <SubmissionCard key={s.id} submission={s} onMove={() => moveSubmission(s.id, "IN_PROGRESS")} nextLabel="Move to In Progress" />
              ))
            )}
          </div>

          {/* Column: In Progress */}
          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm font-medium text-blue-400 mb-4 px-2">
              <span>IN PROGRESS</span>
              <span className="bg-blue-900/30 text-blue-400 px-2 py-0.5 rounded-full">{inProgress.length}</span>
            </div>
            {inProgress.length === 0 ? (
              <div className="h-32 border border-dashed border-zinc-800 rounded-xl flex items-center justify-center text-zinc-600 text-sm">
                No active builds
              </div>
            ) : (
              inProgress.map((s) => (
                <SubmissionCard key={s.id} submission={s} onMove={() => moveSubmission(s.id, "DEMO_READY")} nextLabel="Mark Demo Ready" />
              ))
            )}
          </div>

          {/* Column: Demo Ready */}
          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm font-medium text-purple-400 mb-4 px-2">
              <span>DEMO READY</span>
              <span className="bg-purple-900/30 text-purple-400 px-2 py-0.5 rounded-full">{demoReady.length}</span>
            </div>
            {demoReady.length === 0 ? (
              <div className="h-32 border border-dashed border-zinc-800 rounded-xl flex items-center justify-center text-zinc-600 text-sm">
                No demos waiting
              </div>
            ) : (
              demoReady.map((s) => (
                <SubmissionCard key={s.id} submission={s} onMove={() => moveSubmission(s.id, "COMPLETED")} nextLabel="Mark Completed" />
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

function SubmissionCard({ submission, onMove, nextLabel }: { submission: Submission; onMove: () => void; nextLabel: string }) {
  const initials = (submission.user.name || submission.user.email).slice(0, 2).toUpperCase();
  const timeAgo = getTimeAgo(submission.createdAt);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-5 rounded-xl border border-zinc-800 bg-zinc-900/50 hover:border-zinc-700 transition-colors"
    >
      <div className="flex justify-between items-start mb-3">
        <span className="text-xs font-mono text-zinc-500">{initials}</span>
        <span className="text-xs text-zinc-500">{timeAgo}</span>
      </div>
      <h3 className="font-semibold mb-1 truncate">{submission.user.name || "Anonymous"}</h3>
      <p className="text-sm text-zinc-400 mb-1 truncate">{submission.user.email}</p>
      {submission.ideaDescription && (
        <p className="text-sm text-zinc-500 line-clamp-2 mb-4">{submission.ideaDescription}</p>
      )}
      {submission.uploads.length > 0 && (
        <p className="text-xs text-zinc-600 mb-3">{submission.uploads.length} file(s) attached</p>
      )}
      <div className="flex items-center gap-2">
        <Button size="sm" variant="outline" className="text-xs h-8 border-zinc-800 hover:bg-zinc-800 gap-1" onClick={onMove}>
          {nextLabel} <ArrowRight className="w-3 h-3" />
        </Button>
      </div>
    </motion.div>
  );
}

function getTimeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}
