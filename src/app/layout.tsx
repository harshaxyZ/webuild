import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { ReactLenis as LenisProvider } from "@studio-freight/react-lenis";
import { PostHogProvider } from "@/components/PostHogProvider";
import WhatsAppButton from "@/components/WhatsAppButton";
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "We Build — Premium Digital Products",
  description: "Engineering your idea from scratch with absolute modern precision.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-theme="dark" className={outfit.variable} suppressHydrationWarning>
      <body className="font-sans cursor-none md:cursor-none cursor-auto">
        <PostHogProvider>
          <div className="noise-overlay" />
          <LenisProvider root options={{ duration: 1.2, smoothWheel: true, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) }}>
            {children}
            <WhatsAppButton />
          </LenisProvider>
        </PostHogProvider>
      </body>
    </html>
  );
}
