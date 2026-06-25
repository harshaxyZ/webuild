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
  description: "We are a new breed of agency ready to engineer your idea from scratch with absolute modern precision. Next.js, React, and serverless — built in weeks, not months.",
  metadataBase: new URL("https://webuildnow.in"),
  openGraph: {
    title: "We Build — Premium Digital Products",
    description: "We are a new breed of agency ready to engineer your idea from scratch with absolute modern precision. Next.js, React, and serverless — built in weeks, not months.",
    url: "https://webuildnow.in",
    siteName: "We Build",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "We Build — Premium Digital Products",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "We Build — Premium Digital Products",
    description: "Engineering your idea from scratch with absolute modern precision.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-theme="dark" className={outfit.variable} suppressHydrationWarning>
      <body className="font-sans">
        <SmoothScrolling>
          {children}
          <WhatsAppButton />
        </SmoothScrolling>
        <Analytics />
        <CookieBanner />
      </body>
    </html>
  );
}
