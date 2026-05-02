import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "we build. — Website Design Agency in Bengaluru | Free Demo in 48 Hours",
  description: "Get a professional business website built in Bengaluru. Free working demo in 48 hours. No upfront payment. Starter from ₹7,999. Trusted by Indian businesses.",
  keywords: "website design Bengaluru, web development India, business website India, affordable website design, e-commerce website India, web agency Bengaluru",
  icons: {
    icon: "/favicon.svg",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased dark`}
    >
      <body 
        className="min-h-full flex flex-col font-sans bg-zinc-950 text-zinc-50 selection:bg-rose-500/30"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
