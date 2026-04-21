"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Users, FileText, Search, ArrowRight, X, Trash2, Phone, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { getFirestore, collection, query, orderBy, onSnapshot, limit } from "firebase/firestore";
import { app } from "@/lib/firebase";
import { checkIsAdmin } from "@/lib/auth-utils";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db as firebaseDb } from "@/lib/firebase";
import { Lock, Plus, ShieldCheck, Mail, Key } from "lucide-react";

type Submission = {
  id: string;
  concept?: string | null;
  projectType?: string | null;
  stylePreference?: string | null;
  referenceUrls?: string[];
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
  const [selectedLead, setSelectedLead] = useState<Submission | null>(null);
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [activeTab, setActiveTab] = useState<"dashboard" | "users">("dashboard");
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [isAddingAdmin, setIsAddingAdmin] = useState(false);
  const [adminSuccess, setAdminSuccess] = useState("");
  const [adminError, setAdminError] = useState("");

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
      setIsDemoMode(true);
      setLoading(false);
      return;
    }
    const unsubscribe = onAuthStateChanged(auth, async (u) => {
      if (!u) {
        router.push("/admin/login");
        setLoading(false);
        return;
      }

      const isAdmin = await checkIsAdmin(u.email);
      if (!isAdmin) {
        await signOut(auth);
        router.push("/");
        setLoading(false);
        return;
      }

      setUser(u);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [router]);

  // Bypassing Real-time Client listener to prevent "Insufficient Permissions" 
  // on default Firebase rule constraints. We will execute secure Admin Backend fetching on an interval.
  useEffect(() => {
    if (!user) return;
    
    fetchSubmissions(); // Initial fetch
    
    const interval = setInterval(() => {
      fetchSubmissions();
    }, 10000); // Poll every 10 seconds

    return () => clearInterval(interval);
  }, [user, fetchSubmissions]);

  const handleLogout = async () => {
    if (auth) await signOut(auth);
    router.push("/admin/login");
  };

  const handleStatusUpdate = async (id: string, newStatus: string) => {
    try {
      const resp = await fetch("/api/admin/submissions", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (resp.ok) {
        setSubmissions((prev) => 
          prev.map((s) => (s.id === id ? { ...s, status: newStatus } : s))
        );
      }
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this lead?")) return;
    try {
      const resp = await fetch(`/api/admin/submissions?id=${id}`, {
        method: "DELETE",
      });
      if (resp.ok) {
        setSubmissions((prev) => prev.filter((s) => s.id !== id));
      }
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const handleAddAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminEmail || !adminPassword) return;
    if (adminPassword.length < 6) {
      setAdminError("Password must be at least 6 characters.");
      return;
    }
    
    setIsAddingAdmin(true);
    setAdminError("");
    setAdminSuccess("");
    
    try {
      if (!firebaseDb || !auth) throw new Error("Firebase not initialized");

      // To create a user WITHOUT signing out the current user, we'd ideally use a Cloud Function.
      // But since we want to "keep it simple", we will add them to the whitelist first.
      // If the requirement strictly needs Auth user creation NOW, we can use a secondary app instance.
      
      const { initializeApp: initSecondary, getApp: getSecondary } = await import("firebase/app");
      const { getAuth: getAuthSecondary, createUserWithEmailAndPassword: createSecondary } = await import("firebase/auth");
      
      let secondaryApp;
      try {
        secondaryApp = getSecondary("secondary");
      } catch (e) {
        secondaryApp = initSecondary(app!.options, "secondary");
      }
      
      const secondaryAuth = getAuthSecondary(secondaryApp);
      await createSecondary(secondaryAuth, adminEmail, adminPassword);

      // Add to Firestore whitelist
      await setDoc(doc(firebaseDb, "admins", adminEmail.toLowerCase()), {
        email: adminEmail.toLowerCase(),
        addedBy: user?.email,
        createdAt: new Date().toISOString()
      });

      setAdminSuccess(`Admin ${adminEmail} created and added to whitelist.`);
      setAdminEmail("");
      setAdminPassword("");
    } catch (err: any) {
      setAdminError(err.message || "Failed to add admin.");
    } finally {
      setIsAddingAdmin(false);
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
      <aside className="w-64 border-r border-zinc-900 bg-zinc-950 p-6 hidden md:flex flex-col h-screen sticky top-0">
        <div className="text-xl font-bold tracking-tight mb-12 text-rose-500">we build admin</div>
        <nav className="space-y-2 flex-1">
          <Button 
            variant="ghost" 
            className={`w-full justify-start ${activeTab === 'dashboard' ? 'text-white bg-zinc-900' : 'text-zinc-400 hover:text-white hover:bg-zinc-900'}`}
            onClick={() => setActiveTab('dashboard')}
          >
            <Search className="w-4 h-4 mr-3" /> Dashboard
          </Button>
          <Button 
            variant="ghost" 
            className={`w-full justify-start ${activeTab === 'users' ? 'text-white bg-zinc-900' : 'text-zinc-400 hover:text-white hover:bg-zinc-900'}`}
            onClick={() => setActiveTab('users')}
          >
            <Users className="w-4 h-4 mr-3" /> Admin Management
          </Button>
        </nav>
        <div className="mt-auto">
          <Button variant="outline" className="w-full border-zinc-800 text-zinc-400 hover:bg-zinc-900" onClick={handleLogout}>Logout</Button>
        </div>
      </aside>

      {/* Mobile Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 border-t border-zinc-900 bg-zinc-950/90 backdrop-blur-xl p-4 flex justify-between z-50">
        <Button variant="ghost" size="icon" className="text-zinc-500 hover:text-white">
          <Search className="w-5 h-5" />
        </Button>
        <Button variant="ghost" size="icon" className="text-white bg-zinc-900">
          <FileText className="w-5 h-5" />
        </Button>
        <Button variant="ghost" size="icon" className="text-zinc-500 hover:text-white">
          <Users className="w-5 h-5" />
        </Button>
      </div>

      {/* Admin Content */}
      <main className="flex-1 p-6 md:p-12 pb-24 md:pb-12 overflow-y-auto overflow-x-hidden">
        {activeTab === "dashboard" ? (
          <>
            <header className="flex items-center justify-between mb-8 md:mb-12">
              <div>
                 <h1 className="text-2xl md:text-3xl font-bold">Pipeline</h1>
                 <p className="text-zinc-500 text-xs mt-1 md:hidden text-rose-500/80">Track your leads</p>
              </div>
              <div className="flex items-center gap-2">
                <Button 
                  variant="secondary" 
                  size="sm"
                  className="bg-zinc-900 text-zinc-100 hover:bg-zinc-800 border-zinc-800 border text-xs h-9 px-3 hover:border-rose-500/30 transition-colors"
                  onClick={fetchSubmissions}
                >
                  Refresh
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="md:hidden text-zinc-400 hover:text-white"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </div>
            </header>

          </>
        ) : (
          <div className="max-w-4xl">
            <header className="mb-12">
              <h1 className="text-3xl font-bold mb-2">Admin Management</h1>
              <p className="text-zinc-500">Add and manage authorized system administrators.</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Add Admin Form */}
              <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-8 backdrop-blur-xl">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-rose-500/10 rounded-2xl flex items-center justify-center text-rose-500">
                    <Plus size={24} />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">Add New Admin</h2>
                    <p className="text-zinc-500 text-sm">Create a new authorized account.</p>
                  </div>
                </div>

                <form onSubmit={handleAddAdmin} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-400 flex items-center gap-2">
                      <Mail size={14} /> Email Address
                    </label>
                    <input 
                      type="email"
                      required
                      placeholder="email@example.com"
                      className="w-full h-12 bg-zinc-950 border border-zinc-800 rounded-xl px-4 focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all text-white"
                      value={adminEmail}
                      onChange={(e) => setAdminEmail(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-400 flex items-center gap-2">
                      <Key size={14} /> temporary Password
                    </label>
                    <input 
                      type="password"
                      required
                      placeholder="••••••••"
                      className="w-full h-12 bg-zinc-950 border border-zinc-800 rounded-xl px-4 focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all text-white"
                      value={adminPassword}
                      onChange={(e) => setAdminPassword(e.target.value)}
                    />
                    <p className="text-[10px] text-zinc-500 italic">User will need to use this to log in.</p>
                  </div>

                  {adminError && (
                    <div className="p-4 bg-rose-500/10 border border-rose-500/20 text-rose-500 text-xs rounded-xl">
                      {adminError}
                    </div>
                  )}

                  {adminSuccess && (
                     <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs rounded-xl flex items-center gap-3">
                        <ShieldCheck size={16} />
                        {adminSuccess}
                     </div>
                  )}

                  <Button 
                    type="submit" 
                    className="w-full h-14 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-xl shadow-lg shadow-rose-500/20"
                    disabled={isAddingAdmin}
                  >
                    {isAddingAdmin ? "Adding Admin..." : "Add Admin Access"}
                  </Button>
                </form>
              </div>

              {/* Status/Security Info */}
              <div className="space-y-6">
                <div className="p-8 bg-zinc-900/30 border border-zinc-800 rounded-3xl">
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <ShieldCheck size={20} className="text-emerald-500" />
                    Security Protocol
                  </h3>
                  <ul className="space-y-4 text-sm text-zinc-400">
                    <li className="flex gap-3">
                      <div className="w-1.5 h-1.5 bg-rose-500 rounded-full mt-1.5 shrink-0" />
                      Only members of the whitelist can access this panel.
                    </li>
                    <li className="flex gap-3">
                      <div className="w-1.5 h-1.5 bg-rose-500 rounded-full mt-1.5 shrink-0" />
                      harsha210108@gmail.com is hardcoded as Super Admin.
                    </li>
                    <li className="flex gap-3">
                      <div className="w-1.5 h-1.5 bg-rose-500 rounded-full mt-1.5 shrink-0" />
                      Unauthorized attempts are automatically redirected to home.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* DETAILS MODAL */}
        <AnimatePresence>
          {selectedLead && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                onClick={() => setSelectedLead(null)}
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative w-full max-w-2xl bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-2xl overflow-y-auto max-h-[90vh]"
              >
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-2">{selectedLead.user.name || "Anonymous Lead"}</h2>
                    <p className="text-zinc-400 font-mono text-sm">{selectedLead.user.email}</p>
                  </div>
                  <button onClick={() => setSelectedLead(null)} className="p-2 hover:bg-zinc-800 rounded-full transition-colors">
                    <X size={24} className="text-zinc-500" />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-8">
                   <div className="p-4 bg-zinc-950 rounded-2xl border border-zinc-800">
                      <span className="text-[10px] uppercase font-bold text-zinc-500 tracking-widest block mb-1">Concept</span>
                      <span className="text-white font-medium">{selectedLead.concept || "N/A"}</span>
                   </div>
                   <div className="p-4 bg-zinc-950 rounded-2xl border border-zinc-800">
                      <span className="text-[10px] uppercase font-bold text-zinc-500 tracking-widest block mb-1">Type</span>
                      <span className="text-white font-medium">{selectedLead.projectType || "N/A"}</span>
                   </div>
                   <div className="p-4 bg-zinc-950 rounded-2xl border border-zinc-800">
                      <span className="text-[10px] uppercase font-bold text-zinc-500 tracking-widest block mb-1">Style</span>
                      <span className="text-white font-medium">{selectedLead.stylePreference || "N/A"}</span>
                   </div>
                   <div className="p-4 bg-zinc-950 rounded-2xl border border-zinc-800">
                      <span className="text-[10px] uppercase font-bold text-zinc-500 tracking-widest block mb-1">Phone</span>
                      <span className="text-white font-medium">{selectedLead.user.phoneNumber || "N/A"}</span>
                   </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-widest mb-3">Project Description</h3>
                    <div className="p-6 bg-zinc-950 rounded-3xl border border-zinc-800 text-zinc-300 leading-relaxed italic">
                      "{selectedLead.ideaDescription || "No description provided."}"
                    </div>
                  </div>

                  {selectedLead.referenceUrls && selectedLead.referenceUrls.length > 0 && (
                    <div>
                      <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-widest mb-3">Reference Links</h3>
                      <div className="space-y-2">
                        {selectedLead.referenceUrls.map((url, i) => (
                          <a 
                            key={i} 
                            href={url.startsWith('http') ? url : `https://${url}`} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="flex items-center gap-2 p-3 bg-zinc-950 rounded-xl border border-zinc-800 text-blue-400 hover:text-blue-300 hover:border-zinc-700 transition-all text-sm truncate"
                          >
                            <ExternalLink size={14} /> {url}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

function SubmissionCard({ submission, onStatusUpdate, onDelete, onViewDetails, nextStatus }: { submission: Submission; onStatusUpdate: (id: string, status: string) => void; onDelete: (id: string) => void; onViewDetails: () => void; nextStatus?: string }) {
  const initials = (submission.user.name || submission.user.email).slice(0, 2).toUpperCase();
  const timeAgo = getTimeAgo(submission.createdAt);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-5 rounded-xl border border-zinc-800 bg-zinc-900/50 hover:border-zinc-700 transition-colors shadow-lg shadow-black/20 flex flex-col"
    >
      <div className="flex justify-between items-start mb-3">
        <span className="text-xs font-mono text-zinc-500">{initials}</span>
        <span className="text-xs text-zinc-500">{timeAgo}</span>
      </div>
      <h3 className="font-semibold mb-1 truncate text-zinc-100">{submission.user.name || "Anonymous"}</h3>
      <p className="text-sm text-zinc-400 mb-2 truncate">{submission.user.email}</p>
      
      {(submission.concept || submission.projectType || submission.stylePreference) && (
        <div className="flex flex-wrap gap-1.5 mb-3">
          {submission.concept && <span className="bg-rose-500/10 text-rose-400 text-[10px] uppercase font-bold px-2 py-0.5 rounded-full border border-rose-500/20">{submission.concept}</span>}
          {submission.projectType && <span className="bg-emerald-500/10 text-emerald-400 text-[10px] uppercase font-bold px-2 py-0.5 rounded-full border border-emerald-500/20">{submission.projectType}</span>}
          {submission.stylePreference && <span className="bg-amber-500/10 text-amber-500 text-[10px] uppercase font-bold px-2 py-0.5 rounded-full border border-amber-500/20">{submission.stylePreference}</span>}
        </div>
      )}

      {submission.ideaDescription && (
        <p className="text-sm text-zinc-500 line-clamp-3 mb-3 leading-relaxed">{submission.ideaDescription}</p>
      )}

      <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-500 mt-auto pt-4 border-t border-zinc-800/50">
        <div className="flex items-center gap-1.5 bg-zinc-900/50 px-2.5 py-1 rounded-lg border border-zinc-800 group-hover:border-zinc-700 transition-colors">
          <Phone size={12} className="text-zinc-600" />
          <span>{submission.user.phoneNumber || "No Phone"}</span>
        </div>
        {submission.referenceUrls && submission.referenceUrls.length > 0 && (
          <div className="flex items-center gap-1.5 bg-zinc-900/50 px-2.5 py-1 rounded-lg border border-zinc-800 group-hover:border-zinc-700 transition-colors">
            <ExternalLink size={12} className="text-zinc-600" />
            <span>{submission.referenceUrls.length} Ref(s)</span>
          </div>
        )}
      </div>

      <div className="flex items-center gap-2 mt-5">
        {nextStatus && (
          <Button 
            size="sm" 
            className="flex-1 bg-zinc-100 text-zinc-950 hover:bg-white text-[11px] font-bold h-9 rounded-xl transition-all active:scale-95"
            onClick={() => onStatusUpdate(submission.id, nextStatus)}
          >
            Move to {nextStatus.replace("_", " ")}
          </Button>
        )}
        <Button 
          size="sm" 
          variant="outline" 
          className="px-3 h-9 rounded-xl border-zinc-800 bg-zinc-900/50 text-zinc-500 hover:text-white hover:border-zinc-700 hover:bg-zinc-800 transition-all active:scale-95 text-[10px] font-bold uppercase tracking-widest"
          onClick={onViewDetails}
        >
          Details
        </Button>
        <Button 
          size="sm" 
          variant="outline" 
          className="w-10 h-9 rounded-xl border-zinc-800 bg-zinc-900/50 text-rose-500/50 hover:text-rose-500 hover:border-rose-500/30 hover:bg-rose-500/10 transition-all active:scale-95 flex items-center justify-center p-0"
          onClick={() => onDelete(submission.id)}
          title="Delete Submission"
        >
          <Trash2 size={14} />
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
