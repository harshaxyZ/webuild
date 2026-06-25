import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import SmoothScrolling from "@/components/SmoothScrolling";
import WhatsAppButton from "@/components/WhatsAppButton";
import { CookieBanner } from "@/components/CookieBanner";
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "We Build — Premium Digital Products",
  description: "Engineering your idea from scratch with absolute modern precision.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-theme="dark" className={outfit.variable} suppressHydrationWarning>
      <body className="font-sans cursor-none md:cursor-none cursor-auto">
        <SmoothScrolling>
          <div className="noise-overlay" />
          {children}
          <WhatsAppButton />
        </SmoothScrolling>
        <Analytics />
        <CookieBanner />
      </body>
    </html>
  );
}
