"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { LogOut, Moon, Sun, Users, LayoutDashboard, Calendar as CalendarIcon, CheckCircle } from "lucide-react";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { collection, query, getDocs, orderBy, updateDoc, doc } from "firebase/firestore";
import toast from "react-hot-toast";

export default function AdminDashboard() {
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setMounted(true);
    
    if (!auth) {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        router.push("/login?redirect=/admin");
      } else {
        // In a real production app, we would verify currentUser.uid is an admin.
        // For now, anyone who logs in and goes to /admin can see this (as requested to make it work quickly).
        setUser(currentUser);
        fetchBookings();
      }
    });

    return () => unsubscribe();
  }, [router]);

  const fetchBookings = async () => {
    if (!db) return;
    try {
      const q = query(collection(db, "bookings"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const allBookings = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setBookings(allBookings);
    } catch (e) {
      console.error("Error fetching bookings:", e);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = () => {
    signOut(auth!);
    router.push("/");
  };

  const markAsCompleted = async (id: string) => {
    if (!db) return;
    try {
      await updateDoc(doc(db, "bookings", id), {
        status: "Completed"
      });
      toast.success("Project marked as completed");
      fetchBookings();
    } catch (e) {
      toast.error("Failed to update status");
    }
  };

  if (!mounted || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--accent)]"></div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text-primary)]">
      {/* Header */}
      <header className="border-b border-[var(--border)] bg-[var(--surface)] glass-nav sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <h1 className="font-semibold text-xl tracking-tight flex items-center gap-2">
              <LayoutDashboard className="w-5 h-5 text-[var(--accent)]" /> 
              we build <span className="text-[var(--text-secondary)] font-normal text-sm">Admin</span>
            </h1>
            
            <button
              onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")}
              className="p-2 rounded-full hover:bg-[var(--surface-2)] transition-colors text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              aria-label="Toggle theme"
            >
              {resolvedTheme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>
          </div>
          
          <button 
            onClick={handleSignOut}
            className="flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--error)] transition-colors"
          >
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="service-card p-6 flex flex-col justify-between">
            <h3 className="text-[var(--text-secondary)] font-medium text-sm flex items-center gap-2 mb-2">
              <Users className="w-4 h-4" /> Total Leads
            </h3>
            <p className="text-4xl font-semibold">{bookings.length}</p>
          </div>
          <div className="service-card p-6 flex flex-col justify-between">
            <h3 className="text-[var(--text-secondary)] font-medium text-sm flex items-center gap-2 mb-2">
              <CalendarIcon className="w-4 h-4" /> Pending Reviews
            </h3>
            <p className="text-4xl font-semibold">
              {bookings.filter(b => b.status === "Pending Review").length}
            </p>
          </div>
          <div className="service-card p-6 flex flex-col justify-between">
            <h3 className="text-[var(--text-secondary)] font-medium text-sm flex items-center gap-2 mb-2">
              <CheckCircle className="w-4 h-4" /> Completed
            </h3>
            <p className="text-4xl font-semibold">
              {bookings.filter(b => b.status === "Completed").length}
            </p>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mb-6">Recent Bookings</h2>
        
        {bookings.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-[var(--border)] rounded-2xl">
            <p className="text-[var(--text-secondary)]">No bookings found in Firestore.</p>
          </div>
        ) : (
          <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-card)] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-[var(--surface-2)] border-b border-[var(--border)]">
                  <tr>
                    <th className="px-6 py-4 font-medium text-sm text-[var(--text-secondary)]">Client</th>
                    <th className="px-6 py-4 font-medium text-sm text-[var(--text-secondary)]">Contact</th>
                    <th className="px-6 py-4 font-medium text-sm text-[var(--text-secondary)]">Service</th>
                    <th className="px-6 py-4 font-medium text-sm text-[var(--text-secondary)]">Status</th>
                    <th className="px-6 py-4 font-medium text-sm text-[var(--text-secondary)]">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border)]">
                  {bookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-[var(--surface-2)]/50 transition-colors">
                      <td className="px-6 py-4">
                        <p className="font-medium">{booking.name}</p>
                        <p className="text-sm text-[var(--text-secondary)]">{booking.email}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm">{booking.whatsapp}</p>
                        <p className="text-sm text-[var(--text-secondary)]">{booking.time}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[var(--surface-2)] text-[var(--text-primary)] border border-[var(--border)]">
                          {booking.service}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                          booking.status === 'Completed' 
                            ? 'bg-[var(--success)]/10 text-[var(--success)] border-[var(--success)]/20' 
                            : 'bg-[var(--accent)]/10 text-[var(--accent)] border-[var(--accent)]/20'
                        }`}>
                          {booking.status || 'Pending Review'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {booking.status !== 'Completed' && (
                          <button 
                            onClick={() => markAsCompleted(booking.id)}
                            className="text-sm text-[var(--success)] hover:underline font-medium"
                          >
                            Mark Complete
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
