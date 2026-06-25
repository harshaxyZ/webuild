"use client";

import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { LogOut, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSignOut = () => {
    document.cookie = "admin_session=; path=/; max-age=0";
    router.push("/admin/login");
  };

  if (!mounted) return null;

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

      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="max-w-md">
          <h2 className="text-2xl font-medium mb-2">Welcome to Admin Panel</h2>
          <p className="text-[var(--text-secondary)] mb-8">
            This is your control center. For now, you can use the toggle button in the header (Moon/Sun icon) to switch between the dark and light (Cherry Blossom) themes across the website.
          </p>

          <div className="bg-[var(--surface)] border border-[var(--border)] p-6 rounded-2xl flex items-center justify-between">
            <div>
              <h3 className="font-medium text-[var(--text-primary)]">Website Theme</h3>
              <p className="text-sm text-[var(--text-secondary)] mt-1">Currently: {resolvedTheme}</p>
            </div>
            <button
              onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")}
              className="px-4 py-2 bg-[var(--text-primary)] text-[var(--bg)] rounded-xl font-medium text-sm hover:opacity-90 transition-opacity"
            >
              Toggle to {resolvedTheme === "light" ? "Dark" : "Light"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
