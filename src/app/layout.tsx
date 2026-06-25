import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { CookieBanner } from "@/components/CookieBanner";
import { BookingProvider } from "@/components/BookingProvider";
import { BookingSheet } from "@/components/BookingSheet";
import { CherryBlossomParticles } from "@/components/CherryBlossomParticles";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.webuildnow.in"),
  title: "we build — Apps, Websites & AI Agents",
  description: "We build apps, websites, and AI automations for businesses that want results. Book a call and let's talk.",
  alternates: {
    canonical: "https://www.webuildnow.in",
  },
  openGraph: {
    title: "we build — Apps, Websites & AI Agents",
    description: "We build apps, websites, and AI automations for businesses that want results. Book a call and let's talk.",
    url: "https://www.webuildnow.in",
    type: "website",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "we build — Apps, Websites & AI Agents",
    description: "We build apps, websites, and AI automations for businesses that want results. Book a call and let's talk.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased dark`} suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      </head>
      <body suppressHydrationWarning className="min-h-full flex flex-col font-sans">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <BookingProvider>
            <CherryBlossomParticles />
            {children}
            <BookingSheet />
            <CookieBanner />
            <Toaster 
              position="bottom-center"
              toastOptions={{
                style: {
                  background: 'var(--surface-2)',
                  color: 'var(--text-primary)',
                  border: '1px solid var(--border)',
                },
                success: {
                  iconTheme: {
                    primary: 'var(--success)',
                    secondary: 'white',
                  },
                },
              }}
            />
          </BookingProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
