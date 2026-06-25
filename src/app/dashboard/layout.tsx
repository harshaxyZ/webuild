import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Client Dashboard — We Build",
  description: "Track your agency projects, booking details, developer messages, and active product development specifications.",
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
