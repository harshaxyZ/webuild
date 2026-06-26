"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import { BackButton } from "@/components/BackButton";
import { LogOut, Calendar, ExternalLink, MessageSquare, Clock, RefreshCw } from "lucide-react";
import toast from "react-hot-toast";

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();

  const fetchUserBookings = async (email: string) => {
    try {
      const res = await fetch(`/api/booking?email=${encodeURIComponent(email)}`);
      if (res.ok) {
        const data = await res.json();
        setBookings(data);
      } else {
        console.error("Failed to load bookings");
      }
    } catch (err) {
      console.error("Error fetching bookings:", err);
    }
  };

  useEffect(() => {
    let unsubscribe = () => {};

    // 1. Resolve Auth User (real or simulated)
    const resolveUser = async () => {
      // Check Supabase first
      if (supabase) {
        // Get current active session
        const getSession = async () => {
          const { data: { session } } = await supabase.auth.getSession();
          if (session?.user) {
            setUser(session.user);
            await fetchUserBookings(session.user.email || "");
            setLoading(false);
          } else {
            // Check local storage simulated session
            const localSession = localStorage.getItem("webuild_session");
            if (localSession) {
              const parsedUser = JSON.parse(localSession);
              setUser(parsedUser);
              await fetchUserBookings(parsedUser.email);
              setLoading(false);
            } else {
              router.push("/login");
            }
          }
        };

        getSession();

        // Subscribe to auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
          if (session?.user) {
            setUser(session.user);
            await fetchUserBookings(session.user.email || "");
            setLoading(false);
          } else if (event === "SIGNED_OUT") {
            const localSession = localStorage.getItem("webuild_session");
            if (!localSession) {
              setUser(null);
              router.push("/login");
            }
          }
        });

        unsubscribe = () => subscription.unsubscribe();
      } else {
        const localSession = localStorage.getItem("webuild_session");
        if (localSession) {
          const parsedUser = JSON.parse(localSession);
          setUser(parsedUser);
          await fetchUserBookings(parsedUser.email);
          setLoading(false);
        } else {
          router.push("/login");
        }
      }
    };

    resolveUser();
    return () => unsubscribe();
  }, [router]);

  const handleRefresh = async () => {
    if (user?.email) {
      setRefreshing(true);
      await fetchUserBookings(user.email);
      setRefreshing(false);
      toast.success("Dashboard refreshed!");
    }
  };

  const handleSignOut = async () => {
    if (supabase) {
      await supabase.auth.signOut();
    }
    localStorage.removeItem("webuild_session");
    setUser(null);
    toast.success("Signed out successfully.");
    router.push("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#060606]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <>
      <Navbar />
      
      {/* Grid Overlay background */}
      <div className="global-grid" />

      <main className="flex-1 pt-32 pb-20 px-6 max-w-5xl mx-auto w-full relative z-10">
        <BackButton />
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4 mt-6">
          <div>
            <h1 className="text-4xl font-semibold tracking-tight mb-2">My Dashboard</h1>
            <p className="text-neutral-500 text-sm">
              Logged in as <span className="text-white font-medium">{user.email}</span>
              {user.isSimulated && <span className="ml-2 px-2 py-0.5 text-[10px] bg-amber-500/10 text-amber-500 border border-amber-500/20 rounded-full">Simulated Client</span>}
            </p>
          </div>
          <button 
            onClick={handleSignOut}
            className="flex items-center gap-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all border border-red-500/20 px-4 py-2.5 rounded-xl font-medium text-sm active:scale-95"
          >
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>

        <div className="space-y-8">
          <section>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-medium flex items-center gap-2">
                <Calendar className="w-5 h-5 text-neutral-400" /> 
                My Lead & Project Bookings
              </h2>
              <button 
                onClick={handleRefresh}
                disabled={refreshing}
                className="flex items-center gap-1.5 border border-white/[0.08] text-neutral-400 hover:text-white px-4 py-2.5 rounded-xl text-xs font-medium hover:bg-white/5 transition-all disabled:opacity-50 active:scale-95"
              >
                <RefreshCw size={12} className={refreshing ? "animate-spin" : ""} />
                Refresh Bookings
              </button>
            </div>
            
            {bookings.length === 0 ? (
              <div className="bg-neutral-900/40 border border-white/[0.06] p-12 rounded-[24px] text-center backdrop-blur-sm">
                <h3 className="text-xl font-medium mb-2">No projects yet</h3>
                <p className="text-neutral-500 text-sm mb-6 max-w-sm mx-auto">You haven't submitted any project booking request to our agency yet.</p>
                <button 
                  onClick={() => router.push("/?book=true")} 
                  className="px-6 py-3 bg-white text-black font-semibold text-sm rounded-full hover:opacity-85 transition-opacity"
                >
                  Start a Project Now
                </button>
              </div>
            ) : (
              <div className="grid gap-5">
                {bookings.map((b) => (
                  <div key={b.id} className="bg-neutral-900/40 border border-white/[0.08] hover:border-white/20 transition-all p-6 rounded-[24px] flex flex-col md:flex-row justify-between items-start md:items-center gap-6 backdrop-blur-md">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold text-lg capitalize">{b.projectType || b.service || "Website Development"}</h3>
                        <span className="px-2.5 py-0.5 bg-white/5 text-neutral-400 border border-white/[0.08] text-[10px] uppercase tracking-wider font-semibold rounded-full">
                          {b.id.startsWith("mock") ? "Simulation Lead" : "Live Lead"}
                        </span>
                      </div>
                      <p className="text-neutral-400 text-sm leading-relaxed max-w-2xl">{b.description}</p>
                      
                      <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 pt-2 text-xs text-neutral-500">
                        <span className="flex items-center gap-1"><Clock size={13} /> {b.date || "N/A"}</span>
                        <span className="flex items-center gap-1"><MessageSquare size={13} /> WhatsApp: {b.whatsapp}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row md:flex-col items-stretch sm:items-center md:items-end gap-3 w-full md:w-auto">
                      <span className="px-3.5 py-1.5 bg-neutral-800 border border-white/[0.08] text-white text-xs font-semibold rounded-xl text-center">
                        {b.status || "Pending Review"}
                      </span>
                      <a 
                        href={`https://wa.me/${b.whatsapp.replace(/[^0-9]/g, "")}`} 
                        target="_blank" 
                        className="text-xs text-neutral-400 hover:text-white transition-colors flex items-center gap-1 justify-center md:justify-end"
                      >
                        Chat with Developer <ExternalLink size={12} />
                      </a>
                    </div>
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
