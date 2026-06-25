import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Client Portal — We Build",
  description: "Log in or create an account to view your project booking specifications, active timeline, and project details.",
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
