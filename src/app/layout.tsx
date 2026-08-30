import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { SecurityGate } from "@/components/security-gate";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const siteUrl = "https://big-skyy.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Onoja Oche David | Digital Marketing & Real Estate Content Specialist",
    template: "%s | Onoja Oche David",
  },
  description:
    "Abuja-based digital marketing & content specialist helping real estate brands turn property listings into qualified WhatsApp enquiries through video content, Meta & Google Ads, and lead generation.",
  keywords: [
    "Onoja Oche David",
    "Big Skyy Marketing",
    "real estate marketing Abuja",
    "digital marketing Nigeria",
    "content creation",
    "Meta Ads",
    "Google Ads",
    "lead generation",
    "property marketing",
  ],
  authors: [{ name: "Onoja Oche David", url: siteUrl }],
  creator: "Onoja Oche David",
  publisher: "Big Skyy Marketing",
  applicationName: "Big Skyy Marketing",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    shortcut: ["/favicon.ico"],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "Onoja Oche David | Digital Marketing & Real Estate Content Specialist",
    description:
      "Building the content & campaigns that turn property listings into qualified conversations. Based in Abuja, Nigeria.",
    url: siteUrl,
    siteName: "Big Skyy Marketing",
    type: "profile",
    images: [
      {
        url: "/icon-512.png",
        width: 512,
        height: 512,
        alt: "Big Skyy Marketing logo",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Onoja Oche David | Big Skyy Marketing",
    description:
      "Real estate digital marketing & content specialist — Abuja, Nigeria.",
    images: ["/icon-512.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "marketing",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f0f9ff" },
    { media: "(prefers-color-scheme: dark)", color: "#0b2233" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} font-body antialiased bg-white text-[var(--ink)]`}
      >
        <SecurityGate />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
