"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import toast from "react-hot-toast";
import { Copy, Trash2, CheckCircle, Moon, Sun, LogOut } from "lucide-react";

type Booking = {
  id: string;
  name: string;
  email: string;
  whatsapp: string;
  service: string;
  description: string;
  preferred_time: string;
  status: string;
  created_at: string;
};

export default function AdminDashboard() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("Failed to load bookings");
    } else {
      setBookings(data || []);
    }
    setLoading(false);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase
      .from("bookings")
      .update({ status })
      .eq("id", id);
      
    if (error) {
      toast.error("Failed to update status");
    } else {
      setBookings((prev) => prev.map((b) => b.id === id ? { ...b, status } : b));
      toast.success(`Marked as ${status}`);
    }
  };

  const deleteBooking = async (id: string) => {
    if (!confirm("Are you sure you want to delete this booking?")) return;
    
    const { error } = await supabase
      .from("bookings")
      .delete()
      .eq("id", id);
      
    if (error) {
      toast.error("Failed to delete booking");
    } else {
      setBookings((prev) => prev.filter((b) => b.id !== id));
      toast.success("Booking deleted");
    }
  };

  const copyWhatsApp = (number: string) => {
    navigator.clipboard.writeText(number);
    toast.success("Copied WhatsApp number!");
  };

  const filteredBookings = filter === "All" 
    ? bookings 
    : bookings.filter((b) => b.status.toLowerCase() === filter.toLowerCase());

  const stats = {
    total: bookings.length,
    new: bookings.filter((b) => b.status === "new").length,
    contacted: bookings.filter((b) => b.status === "contacted").length,
    closed: bookings.filter((b) => b.status === "closed").length,
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text-primary)]">
      {/* Header */}
      <header className="border-b border-[var(--border)] bg-[var(--surface)]">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <h1 className="font-semibold text-xl tracking-tight">we build <span className="text-[var(--text-secondary)] font-normal text-sm ml-2">Admin</span></h1>
            
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

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Bookings", value: stats.total },
            { label: "New", value: stats.new, color: "text-[var(--accent)]" },
            { label: "Contacted", value: stats.contacted, color: "text-[var(--success)]" },
            { label: "Closed", value: stats.closed, color: "text-[var(--text-secondary)]" },
          ].map((stat) => (
            <div key={stat.label} className="bg-[var(--surface)] border border-[var(--border)] rounded-lg p-4">
              <p className="text-[var(--text-secondary)] text-sm mb-1">{stat.label}</p>
              <p className={`text-2xl font-semibold ${stat.color || ""}`}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 mb-6">
          {["All", "New", "Contacted", "Closed"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-full text-sm transition-colors ${
                filter === f 
                  ? "bg-[var(--text-primary)] text-[var(--bg)] font-medium" 
                  : "bg-[var(--surface-2)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-lg overflow-x-auto">
          {loading ? (
            <div className="p-8 text-center text-[var(--text-secondary)]">Loading bookings...</div>
          ) : filteredBookings.length === 0 ? (
            <div className="p-8 text-center text-[var(--text-secondary)]">No bookings found for this filter.</div>
          ) : (
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-[var(--surface-2)] text-[var(--text-secondary)] border-b border-[var(--border)]">
                <tr>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium">Date</th>
                  <th className="px-6 py-4 font-medium">Name</th>
                  <th className="px-6 py-4 font-medium">Contact</th>
                  <th className="px-6 py-4 font-medium">Service / Time</th>
                  <th className="px-6 py-4 font-medium">Description</th>
                  <th className="px-6 py-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {filteredBookings.map((b) => (
                  <tr key={b.id} className="hover:bg-[var(--surface-2)]/50 transition-colors">
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        b.status === "new" ? "bg-[var(--accent)]/10 text-[var(--accent)]" :
                        b.status === "contacted" ? "bg-[var(--success)]/10 text-[var(--success)]" :
                        "bg-[var(--text-secondary)]/10 text-[var(--text-secondary)]"
                      }`}>
                        {b.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-[var(--text-secondary)]">
                      {new Date(b.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 font-medium">{b.name}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span>{b.whatsapp}</span>
                        <button 
                          onClick={() => copyWhatsApp(b.whatsapp)}
                          className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors p-1"
                          title="Copy WhatsApp"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="text-[var(--text-secondary)] text-xs mt-1">{b.email}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div>{b.service}</div>
                      <div className="text-[var(--text-secondary)] text-xs mt-1">{b.preferred_time}</div>
                    </td>
                    <td className="px-6 py-4 max-w-xs truncate" title={b.description}>
                      {b.description || "-"}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {b.status === "new" && (
                          <button
                            onClick={() => updateStatus(b.id, "contacted")}
                            className="p-1.5 rounded-md bg-[var(--success)]/10 text-[var(--success)] hover:bg-[var(--success)]/20 transition-colors"
                            title="Mark Contacted"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                        )}
                        {b.status !== "closed" && (
                          <button
                            onClick={() => updateStatus(b.id, "closed")}
                            className="p-1.5 rounded-md bg-[var(--text-secondary)]/10 text-[var(--text-secondary)] hover:bg-[var(--text-secondary)]/20 transition-colors text-xs font-medium"
                            title="Mark Closed"
                          >
                            Close
                          </button>
                        )}
                        <button
                          onClick={() => deleteBooking(b.id)}
                          className="p-1.5 rounded-md text-[var(--text-secondary)] hover:bg-[var(--error)]/10 hover:text-[var(--error)] transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
}
