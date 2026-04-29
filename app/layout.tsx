// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "katex/dist/katex.min.css";
import { Analytics } from "@vercel/analytics/react";
import DevBanner from "@/components/DevBanner";
import Header from "@/components/Header";
import { EleveProvider } from "@/context/EleveContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = "https://eleveai.fr";
const CANONICAL = "/accueil";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: "EleveAI — IA pédagogique à La Réunion",
    template: "%s — EleveAI",
  },

  description:
    "EleveAI accompagne les professeurs et les élèves : Valéria, générateur de prompts profs, défis de La Réunion, coach maths et parcours de progression.",

  keywords: [
    "EleveAI",
    "IA pédagogique",
    "Valéria",
    "générateur de prompts",
    "défis mathématiques",
    "coach maths",
    "La Réunion",
    "professeurs",
    "élèves",
    "collège",
    "lycée",
  ],

  alternates: {
    canonical: CANONICAL,
  },

  openGraph: {
    title: "EleveAI — Comprendre · S’entraîner · Réussir",
    description:
      "Une plateforme pédagogique avec Valéria, un générateur de prompts profs, des défis de La Réunion, un coach maths et des parcours de progression.",
    url: CANONICAL,
    type: "website",
    siteName: "EleveAI",
    locale: "fr_FR",
    images: [
      {
        url: "/preview.jpg",
        width: 1200,
        height: 630,
        alt: "EleveAI — IA pédagogique à La Réunion",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "EleveAI — Comprendre · S’entraîner · Réussir",
    description:
      "Valéria, générateur de prompts profs, défis de La Réunion, coach maths et parcours de progression.",
    images: ["/preview.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "EleveAI",
      url: SITE_URL,
      logo: `${SITE_URL}/preview.jpg`,
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "EleveAI",
      url: SITE_URL,
      inLanguage: "fr-FR",
    },
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "EleveAI",
      url: SITE_URL,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Web",
      inLanguage: "fr-FR",
    },
    {
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Frédéric Lacoste",
      jobTitle: "Fondateur d’EleveAI",
    },
  ];

  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen antialiased`}
      >
        <EleveProvider>
          <DevBanner />

          <Header />

          {children}
        </EleveProvider>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <Analytics />
      </body>
    </html>
  );
}