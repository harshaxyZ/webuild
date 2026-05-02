import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "we build — Website Design Agency in Bengaluru | Free Demo in 48 Hours",
  description: "Get a professional business website built in Bengaluru. Free working demo in 48 hours. No upfront payment. Starting from ₹7,999. Trusted by Indian businesses.",
  keywords: "website design Bengaluru, web development India, business website India, affordable website design, e-commerce website Bengaluru, web agency Bengaluru",
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "we build — Website Design Agency in Bengaluru | Free Demo in 48 Hours",
    description: "Get a professional business website built in Bengaluru. Free working demo in 48 hours. No upfront payment. Starting from ₹7,999. Trusted by Indian businesses.",
    url: "https://webuildnow.in",
    type: "website",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "we build — Website Design Agency in Bengaluru | Free Demo in 48 Hours",
    description: "Get a professional business website built in Bengaluru. Free working demo in 48 hours. No upfront payment. Starting from ₹7,999. Trusted by Indian businesses.",
  },
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
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "we build",
              "url": "https://webuildnow.in",
              "email": "harsha210108@gmail.com",
              "telephone": "+917899214458",
              "description": "Web design agency in Bengaluru offering professional websites starting at ₹7,999.",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Bengaluru",
                "addressCountry": "IN"
              }
            })
          }}
        />
      </head>
      <body 
        className="min-h-full flex flex-col font-sans bg-zinc-950 text-zinc-50 selection:bg-rose-500/30"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
