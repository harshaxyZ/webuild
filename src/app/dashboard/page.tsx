"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Clock, PlayCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ZenithSpinner } from "@/components/ui/zenith-spinner";

const mockSubmissions = [
  {
    id: "sub_1",
    project: "E-Commerce Storefront",
    date: "Oct 24, 2026",
    status: "IN_PROGRESS",
    description: "A sleek store with dark mode, luxury typography, and high-end animations.",
  },
  {
    id: "sub_2",
    project: "Portfolio Restyle",
    date: "Oct 10, 2026",
    status: "COMPLETED",
    description: "Minimalist photography portfolio.",
  }
];

const StatusIcon = ({ status }: { status: string }) => {
  switch (status) {
    case "SUBMITTED": return <Clock className="w-5 h-5 text-muted-foreground" />;
    case "IN_PROGRESS": return <ZenithSpinner size={20} />;
    case "DEMO_READY": return <PlayCircle className="w-5 h-5 text-foreground" />;
    case "COMPLETED": return <CheckCircle2 className="w-5 h-5 text-foreground" />;
    default: return null;
  }
};

const StatusBadge = ({ status }: { status: string }) => {
  switch (status) {
    case "SUBMITTED": return <span className="bg-muted text-muted-foreground px-3 py-1 rounded-full text-xs font-semibold">Submitted</span>;
    case "IN_PROGRESS": return <span className="bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-700 px-3 py-1 rounded-full text-xs font-semibold">In Progress</span>;
    case "DEMO_READY": return <span className="bg-zinc-900 dark:bg-zinc-100 text-zinc-50 dark:text-zinc-900 border border-zinc-800 dark:border-zinc-200 px-3 py-1 rounded-full text-xs font-semibold shadow-sm">Demo Ready</span>;
    case "COMPLETED": return <span className="bg-background text-foreground border border-border px-3 py-1 rounded-full text-xs font-semibold">Completed</span>;
    default: return null;
  }
};

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-muted/10">
      <header className="bg-background border-b px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <Link href="/" className="text-xl font-bold tracking-tight">we build</Link>
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 rounded-full bg-foreground text-background flex items-center justify-center font-bold text-xs shadow-sm">
            JD
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 lg:px-8 py-12 max-w-5xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Your Demos</h1>
            <p className="text-muted-foreground mt-1">Track the status of your website builds.</p>
          </div>
          <Button variant="gradient" asChild>
             <Link href="/book">Request New Demo</Link>
          </Button>
        </div>

        <div className="space-y-6">
          {mockSubmissions.map((sub, i) => (
            <motion.div
              key={sub.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-background rounded-2xl border p-6 lg:p-8 flex flex-col md:flex-row gap-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex-1 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold">{sub.project}</h3>
                  <div className="md:hidden"><StatusBadge status={sub.status} /></div>
                </div>
                <p className="text-muted-foreground">{sub.description}</p>
                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                  <span>Submitted: {sub.date}</span>
                  {sub.status === "IN_PROGRESS" && (
                    <Button variant="link" className="p-0 h-auto text-foreground font-medium underline underline-offset-4">Update Requirements</Button>
                  )}
                  {sub.status === "DEMO_READY" && (
                    <Button variant="link" className="p-0 h-auto text-foreground font-medium underline underline-offset-4">View Demo</Button>
                  )}
                </div>
              </div>

              <div className="hidden md:flex flex-col items-end justify-between min-w-[200px] border-l pl-6">
                <StatusBadge status={sub.status} />
                <div className="flex items-center gap-2 mt-4">
                  <StatusIcon status={sub.status} />
                  <span className="font-medium text-sm">
                    {sub.status.replace("_", " ")}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}
