"use client";
import { useEffect, useState } from "react";
import { Users2, MapPin, Clock, ExternalLink } from "lucide-react";
import Navbar from "@/components/Navbar";

export default function AdminPanel() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loadingBookings, setLoadingBookings] = useState(true);
  const [bookingsError, setBookingsError] = useState<string | null>(null);
  const [analytics, setAnalytics] = useState<any>(null);
  const [analyticsError, setAnalyticsError] = useState<string | null>(null);
  
  useEffect(() => {
    // Fetch live bookings from server API
    async function fetchBookings() {
      try {
        const res = await fetch("/api/admin/bookings");
        const data = await res.json();
        if (res.ok) {
          setBookings(data);
        } else {
          setBookingsError(data.error || "Failed to load bookings");
        }
      } catch (err) {
        setBookingsError("An error occurred fetching bookings");
      } finally {
        setLoadingBookings(false);
      }
    }

    // Fetch Analytics
    async function fetchAnalytics() {
      try {
        const res = await fetch("/api/admin/analytics");
        const data = await res.json();
        if (res.ok) {
          setAnalytics(data);
        } else {
          setAnalyticsError(data.error);
        }
      } catch (err) {
        setAnalyticsError("Failed to load analytics.");
      }
    }

    fetchBookings();
    fetchAnalytics();
  }, []);

  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <Navbar />
      
      <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
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
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[var(--border)] text-sm text-[var(--muted)] bg-[var(--surface)]">
                    <th className="p-5 font-medium">Client Info</th>
                    <th className="p-5 font-medium">Project Specs</th>
                    <th className="p-5 font-medium">Description</th>
                    <th className="p-5 font-medium">Submitted</th>
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
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="p-16 text-center text-[var(--muted)]">No booking requests yet.</div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
