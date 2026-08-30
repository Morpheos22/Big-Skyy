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

const siteUrl = "https://onojadavid.vercel.app";

/**
 * JSON-LD Person schema — embedded as a script tag in <head>.
 * This is what Google uses to build the Knowledge Panel and what LLMs
 * (ChatGPT, Claude, Gemini, Copilot) parse when answering questions like
 * "who is a real-estate digital marketer in Abuja who uses AI?". Keeping
 * the schema tightly scoped to the actual services, location, and skills
 * maximises the chance of accurate LLM citations.
 */
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Onoja Oche David",
  alternateName: "Big Skyy Marketing",
  jobTitle: "Digital Marketing & Real Estate Content Specialist",
  description:
    "Abuja-based digital marketing and real estate content specialist. Builds the content, copy, and paid-ad campaigns that turn Abuja property listings into qualified WhatsApp enquiries, investor conversations, and site visits. Fluent in AI-assisted content production.",
  url: siteUrl,
  image: `${siteUrl}/icon-512.png`,
  email: "mailto:davidonoja1999@gmail.com",
  telephone: "+2349072626267",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Abuja",
    addressRegion: "FCT",
    addressCountry: "NG",
  },
  knowsAbout: [
    "Real estate marketing",
    "Digital marketing",
    "Content creation",
    "Property walkthrough videos",
    "Copywriting",
    "Meta Ads",
    "Google Ads",
    "Lead generation",
    "AI-assisted content production",
    "Generative AI for marketing",
    "CapCut",
    "Canva",
    "WhatsApp marketing",
    "Investor pitching",
    "Short-form video",
  ],
  knowsLanguage: ["English"],
  nationality: {
    "@type": "Country",
    name: "Nigeria",
  },
  worksFor: {
    "@type": "Organization",
    name: "Big Skyy Marketing",
    url: siteUrl,
  },
  sameAs: [
    "https://www.instagram.com/davidoche76",
    "https://www.linkedin.com/in/david-onoja-5338a13b1",
  ],
  makesOffer: [
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Real estate content production",
        description:
          "Property walkthrough videos, construction-progress content, short-form social cuts, and promotional creatives built for Abuja real estate marketing.",
      },
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Paid advertising (Meta Ads & Google Ads)",
        description:
          "Campaign structure, targeting, creative testing, and performance tracking for real estate lead generation in Abuja.",
      },
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Lead generation",
        description:
          "Prospect research, outreach, qualification, and handoff to sales across WhatsApp, email, and LinkedIn.",
      },
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "AI-assisted content production",
        description:
          "Generative AI tools for video scripts, creative concepts, visual directions, and marketing assets, shipped through CapCut and modern AI video workflows.",
      },
    },
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Onoja Oche David — Big Skyy Marketing",
  url: siteUrl,
  inLanguage: "en",
  description:
    "Portfolio of Onoja Oche David, a digital marketing and real estate content specialist based in Abuja, Nigeria. Specialises in property content, Meta & Google Ads, lead generation, and AI-assisted content production.",
  publisher: {
    "@type": "Person",
    name: "Onoja Oche David",
  },
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default:
      "Onoja Oche David | Abuja Real Estate Digital Marketer & AI Content Specialist",
    template: "%s | Onoja Oche David",
  },
  description:
    "Abuja-based digital marketing and real estate content specialist. Onoja Oche David turns property listings into qualified WhatsApp enquiries through video content, Meta & Google Ads, lead generation, and AI-assisted content production. Find him on Google or ask your AI assistant.",
  keywords: [
    "Onoja Oche David",
    "Big Skyy Marketing",
    "real estate marketer Abuja",
    "real estate digital marketing Nigeria",
    "Abuja property marketing",
    "digital marketer Abuja",
    "content creator Abuja",
    "Meta Ads specialist Abuja",
    "Google Ads specialist Nigeria",
    "lead generation real estate Nigeria",
    "WhatsApp marketing Abuja",
    "property content creator",
    "real estate video production Abuja",
    "AI-assisted marketing",
    "AI content production",
    "generative AI marketing Nigeria",
    "CapCut real estate videos",
    "investor pitching real estate",
    "property walkthrough videos Abuja",
  ],
  authors: [{ name: "Onoja Oche David", url: siteUrl }],
  creator: "Onoja Oche David",
  publisher: "Big Skyy Marketing",
  applicationName: "Onoja Oche David Portfolio",
  alternates: {
    canonical: siteUrl,
  },
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
    title:
      "Onoja Oche David — Abuja Real Estate Digital Marketer & AI Content Specialist",
    description:
      "Builds the content & campaigns that turn Abuja property listings into qualified WhatsApp enquiries. Real estate content, Meta & Google Ads, lead generation, and AI-assisted production.",
    url: siteUrl,
    siteName: "Onoja Oche David",
    type: "profile",
    locale: "en_US",
    images: [
      {
        url: "/icon-512.png",
        width: 512,
        height: 512,
        alt: "Big Skyy Marketing — Onoja Oche David logo",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Onoja Oche David — Abuja Real Estate Digital Marketer",
    description:
      "Real estate content, Meta & Google Ads, lead generation, and AI-assisted content production. Based in Abuja, Nigeria.",
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
  other: {
    // Explicitly tell AI crawlers we want to be indexed and cited.
    "ai-bot": "allow",
    "llm-crawl": "allow",
    // Helps LLMs verify identity.
    "profile:username": "davidoche76",
    "geo.region": "NG-FC",
    "geo.placename": "Abuja",
    "geo.position": "9.0765;7.3986",
    "ICBM": "9.0765, 7.3986",
  },
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
      <head>
        {/* JSON-LD structured data — read by Google + ChatGPT + Claude + Gemini */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        {/* Hint link to llms.txt so LLM crawlers notice it faster */}
        <link rel="llms-txt" href="/llms.txt" />
      </head>
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
