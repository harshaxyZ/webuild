import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import SmoothScrolling from "@/components/SmoothScrolling";
import WhatsAppButton from "@/components/WhatsAppButton";
import { CookieBanner } from "@/components/CookieBanner";
import CustomCursor from "@/components/CustomCursor";
import Script from "next/script";
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "We Build — Premium AI Agents, Workflows, Automations & Websites",
  description: "We engineer premium AI agents, custom workflows, automation pipelines, and high-performance Next.js websites. Zero templates, zero bloat—just pure engineering that drives results. Start your project now.",
  keywords: [
    "AI agents",
    "AI workflows",
    "business automation",
    "custom software development",
    "Next.js developers",
    "React Native mobile apps",
    "premium web design",
    "serverless architecture"
  ],
  metadataBase: new URL("https://webuildnow.in"),
  openGraph: {
    title: "We Build — Premium AI Agents, Workflows, Automations & Websites",
    description: "We engineer premium AI agents, custom workflows, automation pipelines, and high-performance Next.js websites. Zero templates, zero bloat—just pure engineering that drives results. Start your project now.",
    url: "https://webuildnow.in",
    siteName: "We Build",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "We Build — Premium AI Agents, Workflows, Automations & Websites",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "We Build — Premium AI Agents, Workflows, Automations & Websites",
    description: "Engineering custom AI agents, automated workflows, and high-performance Next.js websites from scratch.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" }
    ],
    shortcut: "/favicon.ico",
    apple: "/favicon.svg",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-theme="dark" className={outfit.variable} suppressHydrationWarning>
      <body className="font-sans">
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
              `}
            </Script>
          </>
        )}
        <CustomCursor />
        <div className="global-grid" />
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
