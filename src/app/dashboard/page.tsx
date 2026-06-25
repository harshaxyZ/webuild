"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import { BackButton } from "@/components/BackButton";
import { LogOut, Calendar } from "lucide-react";

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!auth) {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        router.push("/login");
      } else {
        setUser(currentUser);
        // Fetch user's bookings
        if (db) {
          try {
            const q = query(collection(db, "bookings"), where("userId", "==", currentUser.uid));
            const querySnapshot = await getDocs(q);
            const userBookings = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setBookings(userBookings);
          } catch (e) {
            console.error("Error fetching bookings:", e);
          }
        }
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--accent)]"></div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <>
      <Navbar />
      <main className="flex-1 pt-32 pb-20 px-[20px] md:px-[6%] max-w-5xl mx-auto w-full">
        <BackButton />
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
          <div>
            <h1 className="text-4xl font-semibold tracking-tight mb-2">My Dashboard</h1>
            <p className="text-[var(--text-secondary)]">Welcome back, {user.email}</p>
          </div>
          <button 
            onClick={() => {
              signOut(auth!);
              router.push("/");
            }}
            className="flex items-center gap-2 text-[var(--error)] hover:opacity-80 transition-opacity bg-[var(--error)]/10 px-4 py-2 rounded-lg font-medium"
          >
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <Calendar className="w-6 h-6 text-[var(--accent)]" /> 
              My Projects & Bookings
            </h2>
            
            {bookings.length === 0 ? (
              <div className="service-card p-12 text-center">
                <h3 className="text-xl font-medium mb-2">No projects yet</h3>
                <p className="text-[var(--text-secondary)] mb-6">You haven't booked any projects with us yet.</p>
                <button 
                  onClick={() => router.push("/?book=true")} 
                  className="btn-pill"
                >
                  Start a Project
                </button>
              </div>
            ) : (
              <div className="grid gap-4">
                {bookings.map((b) => (
                  <div key={b.id} className="service-card p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                      <h3 className="font-semibold text-lg">{b.service}</h3>
                      <p className="text-[var(--text-secondary)] text-sm mt-1">Submitted on: {new Date(b.createdAt?.toDate?.() || Date.now()).toLocaleDateString()}</p>
                    </div>
                    <span className="px-3 py-1 bg-[var(--accent)]/10 text-[var(--accent)] text-sm font-medium rounded-full border border-[var(--accent)]/20">
                      {b.status || "Pending Review"}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
    </>
  );
}
