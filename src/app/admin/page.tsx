"use client";
import { useEffect, useState, useCallback } from "react";
import { Users2, MapPin, Clock, ExternalLink, Copy, RefreshCw, LogOut } from "lucide-react";
import toast from "react-hot-toast";

export default function AdminPanel() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loadingBookings, setLoadingBookings] = useState(true);
  const [bookingsError, setBookingsError] = useState<string | null>(null);
  const [analytics, setAnalytics] = useState<any>(null);
  const [analyticsError, setAnalyticsError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  // Fetch live bookings from server API
  const fetchBookings = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/bookings");
      const data = await res.json();
      if (res.ok) {
        setBookings(data);
        setBookingsError(null);
      } else {
        setBookingsError(data.error || "Failed to load bookings");
      }
    } catch (err) {
      setBookingsError("An error occurred fetching bookings");
    } finally {
      setLoadingBookings(false);
    }
  }, []);

  // Fetch Analytics
  const fetchAnalytics = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/analytics");
      const data = await res.json();
      if (res.ok) {
        setAnalytics(data);
        setAnalyticsError(null);
      } else {
        setAnalyticsError(data.error);
      }
    } catch (err) {
      setAnalyticsError("Failed to load analytics.");
    }
  }, []);

  const loadData = useCallback(async () => {
    await Promise.all([fetchBookings(), fetchAnalytics()]);
  }, [fetchBookings, fetchAnalytics]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleRefresh = async () => {
    setRefreshing(true);
    setLoadingBookings(true);
    await loadData();
    setRefreshing(false);
    toast.success("Admin dashboard data refreshed!");
  };

  const handleSignOut = () => {
    document.cookie = "admin_token=; path=/; max-age=0;";
    toast.success("Admin session terminated.");
    window.location.href = "/";
  };

  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      {/* Custom Clean Admin Navbar */}
      <header className="fixed top-0 left-0 w-full z-50 bg-[var(--glass)] backdrop-blur-2xl border-b border-[var(--border)]">
        <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-5">
          <div className="flex items-center gap-3 text-lg font-medium tracking-tighter">
            <div className="w-8 h-8 rounded-md flex items-center justify-center font-bold bg-[var(--text)] text-[var(--bg)]">w</div>
            <span className="font-semibold text-[var(--text)]">we build</span>
            <span className="px-2 py-0.5 text-[9px] bg-red-500/10 text-red-400 border border-red-500/20 rounded-full uppercase tracking-wider font-semibold">Admin Panel</span>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={handleRefresh} 
              disabled={refreshing}
              className="flex items-center gap-1.5 border border-[var(--border)] text-[var(--text)] px-4 py-2.5 rounded-xl text-xs font-medium hover:bg-[var(--border)]/30 transition-colors disabled:opacity-50 active:scale-95"
            >
              <RefreshCw size={13} className={refreshing ? "animate-spin" : ""} />
              Refresh
            </button>
            <button 
              onClick={handleSignOut} 
              className="flex items-center gap-1.5 bg-red-500/10 text-red-400 border border-red-500/20 px-4 py-2.5 rounded-xl text-xs font-medium hover:bg-red-500/20 transition-colors active:scale-95"
            >
              <LogOut size={13} />
              Sign Out
            </button>
          </div>
        </nav>
      </header>
      
      <div className="pt-36 pb-20 px-6 max-w-7xl mx-auto">
        <h1 className="text-4xl font-semibold tracking-tighter mb-10">Admin Dashboard</h1>

        {/* Analytics Section */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-medium">Vercel Web Analytics</h2>
            <a href="https://vercel.com/dashboard" target="_blank" className="flex items-center gap-2 text-sm text-[var(--muted)] hover:text-[var(--text)] transition-colors">
              View full report in Vercel <ExternalLink size={14} />
            </a>
          </div>
          
          {analyticsError ? (
            <div className="p-6 rounded-2xl bg-[var(--surface)] border border-yellow-500/30 text-yellow-500/80">
              <p className="font-medium">⚠️ {analyticsError}</p>
              <p className="text-sm mt-1">Please add VERCEL_ACCESS_TOKEN and VERCEL_PROJECT_ID to your environment variables to view live analytics.</p>
            </div>
          ) : !analytics ? (
            <div className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border)] animate-pulse h-32"></div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border)]">
                <div className="flex items-center gap-4 mb-4 text-[var(--muted)]">
                  <Users2 size={24} />
                  <h3 className="font-medium">Total Visitors</h3>
                </div>
                <p className="text-4xl font-semibold">{analytics?.visitors || "0"}</p>
              </div>

              <div className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border)]">
                <div className="flex items-center gap-4 mb-4 text-[var(--muted)]">
                  <MapPin size={24} />
                  <h3 className="font-medium">Top Location</h3>
                </div>
                <p className="text-4xl font-semibold">{analytics?.topLocation || "N/A"}</p>
              </div>

              <div className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border)]">
                <div className="flex items-center gap-4 mb-4 text-[var(--muted)]">
                  <Clock size={24} />
                  <h3 className="font-medium">Total Page Views</h3>
                </div>
                <p className="text-4xl font-semibold">{analytics?.pageViews || "0"}</p>
              </div>
            </div>
          )}
        </section>

        {/* Bookings Section */}
        <section>
          <h2 className="text-2xl font-medium mb-6">Recent Booking Requests</h2>
          <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl overflow-hidden">
            {loadingBookings ? (
              <div className="p-16 text-center text-[var(--muted)]">Loading bookings...</div>
            ) : bookingsError ? (
              <div className="p-16 text-center text-red-500/80">⚠️ {bookingsError}</div>
            ) : bookings.length > 0 ? (
              <div className="overflow-x-auto w-full">
                <table className="w-full min-w-[800px] text-left border-collapse">
                  <thead>
                    <tr className="border-b border-[var(--border)] text-sm text-[var(--muted)] bg-[var(--surface)]">
                      <th className="p-5 font-medium">Client Info</th>
                      <th className="p-5 font-medium">Project Specs</th>
                      <th className="p-5 font-medium">Description</th>
                      <th className="p-5 font-medium">Submitted</th>
                      <th className="p-5 font-medium text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((booking: any) => (
                      <tr key={booking.id} className="border-b border-[var(--border)] last:border-b-0 hover:bg-[var(--border)]/30 transition-colors text-sm">
                        <td className="p-5">
                          <div className="font-medium text-[var(--text)]">{booking.name}</div>
                          <div className="text-xs text-[var(--muted)] mt-1">{booking.whatsapp}</div>
                          <div className="text-xs text-[var(--muted)]">{booking.email}</div>
                        </td>
                        <td className="p-5">
                          <div className="font-medium capitalize text-[var(--text)]">{booking.projectType}</div>
                          <div className="text-xs text-[var(--muted)] mt-1">Call: {booking.preferredTime}</div>
                        </td>
                        <td className="p-5 max-w-xs">
                          <div className="text-xs text-[var(--text)] line-clamp-3 leading-relaxed" title={booking.description}>
                            {booking.description}
                          </div>
                        </td>
                        <td className="p-5 text-xs text-[var(--muted)] whitespace-nowrap">{booking.date}</td>
                        <td className="p-5 text-right">
                          <button
                            onClick={() => {
                              const details = `Lead Details:\n-----------------------------\nName: ${booking.name}\nWhatsApp: ${booking.whatsapp}\nEmail: ${booking.email}\nProject Type: ${booking.projectType}\nPreferred Call: ${booking.preferredTime}\nDescription: ${booking.description}\nSubmitted: ${booking.date}`;
                              navigator.clipboard.writeText(details);
                              toast.success("Lead details copied!");
                            }}
                            className="px-3 py-1.5 border border-[var(--border)] hover:border-[var(--text)] rounded-lg inline-flex items-center gap-1.5 text-xs font-medium text-[var(--text)] bg-[var(--surface)] transition-all active:scale-95"
                          >
                            <Copy size={13} /> Copy Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-16 text-center text-[var(--muted)]">No booking requests yet.</div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
