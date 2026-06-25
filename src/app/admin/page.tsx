"use client";
import { useEffect, useState } from "react";
import { Users2, MapPin, Clock, ExternalLink } from "lucide-react";
import Navbar from "@/components/Navbar";

export default function AdminPanel() {
  const [bookings, setBookings] = useState<any[]>([]);
  
  useEffect(() => {
    // In a real app, this would fetch from Firebase Firestore.
    // For demonstration of the UI, we're mocking the data.
    setBookings([
      { id: 1, name: "Alice Johnson", whatsapp: "9876543210", description: "Need a FinTech dashboard.", date: "Today, 10:45 AM" },
      { id: 2, name: "Bob Smith", whatsapp: "9876543211", description: "Looking for an e-commerce mobile app.", date: "Yesterday, 2:30 PM" },
    ]);
  }, []);

  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <Navbar />
      
      <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <h1 className="text-4xl font-semibold tracking-tighter mb-10">Admin Dashboard</h1>

        {/* Analytics Section */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-medium">Analytics Overview</h2>
            <a href="https://app.posthog.com" target="_blank" className="flex items-center gap-2 text-sm text-[var(--muted)] hover:text-[var(--text)] transition-colors">
              View full report in PostHog <ExternalLink size={14} />
            </a>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border)]">
              <div className="flex items-center gap-4 mb-4 text-[var(--muted)]">
                <Users2 size={24} />
                <h3 className="font-medium">Total Visitors</h3>
              </div>
              <p className="text-4xl font-semibold">1,248</p>
              <p className="text-sm text-green-500 mt-2">+12% this week</p>
            </div>

            <div className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border)]">
              <div className="flex items-center gap-4 mb-4 text-[var(--muted)]">
                <MapPin size={24} />
                <h3 className="font-medium">Top Location</h3>
              </div>
              <p className="text-4xl font-semibold">New York</p>
              <p className="text-sm text-[var(--muted)] mt-2">245 active sessions</p>
            </div>

            <div className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border)]">
              <div className="flex items-center gap-4 mb-4 text-[var(--muted)]">
                <Clock size={24} />
                <h3 className="font-medium">Avg. Time on Site</h3>
              </div>
              <p className="text-4xl font-semibold">2m 45s</p>
              <p className="text-sm text-green-500 mt-2">+30s this week</p>
            </div>
          </div>
        </section>

        {/* Bookings Section */}
        <section>
          <h2 className="text-2xl font-medium mb-6">Recent Booking Requests</h2>
          <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl overflow-hidden">
            {bookings.length > 0 ? (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[var(--border)] text-sm text-[var(--muted)]">
                    <th className="p-4 font-medium">Name</th>
                    <th className="p-4 font-medium">WhatsApp</th>
                    <th className="p-4 font-medium">Project Description</th>
                    <th className="p-4 font-medium">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((booking: any) => (
                    <tr key={booking.id} className="border-b border-[var(--border)] last:border-b-0 hover:bg-[var(--border)]/30 transition-colors text-sm">
                      <td className="p-4 font-medium">{booking.name}</td>
                      <td className="p-4">{booking.whatsapp}</td>
                      <td className="p-4 max-w-xs truncate" title={booking.description}>{booking.description}</td>
                      <td className="p-4 text-[var(--muted)]">{booking.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="p-10 text-center text-[var(--muted)]">No booking requests yet.</div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
