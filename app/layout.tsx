// app/layout.tsx
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "katex/dist/katex.min.css";
import { Analytics } from "@vercel/analytics/react";
import DevBanner from "@/components/DevBanner";
import Header from "@/components/Header";
import { EleveProvider } from "@/context/EleveContext";
import RemerciementsBar from "@/components/remerciements/RemerciementsBar";

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

export const viewport: Viewport = {
  themeColor: "#020617",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  manifest: "/manifest.webmanifest",

  appleWebApp: {
    capable: true,
    title: "EleveAI",
    statusBarStyle: "black-translucent",
  },

  icons: {
    icon: "/icons/icon-192.png",
    apple: "/icons/icon-192.png",
  },

  title: {
    default: "EleveAI — Mathématiques, automatismes et raisonnement",
    template: "%s — EleveAI",
  },

  description:
    "EleveAI aide les élèves à progresser en mathématiques grâce au calcul rapide, aux parcours guidés, à la leçon du jour et à des entraînements courts centrés sur les automatismes et le raisonnement.",

  keywords: [
    "EleveAI",
    "mathématiques",
    "calcul rapide",
    "automatismes",
    "raisonnement scientifique",
    "coach maths",
    "leçon du jour",
    "parcours de progression",
    "révision maths",
    "collège",
    "6e",
    "5e",
    "4e",
    "3e",
    "brevet 2026",
    "La Réunion",
  ],

  alternates: {
    canonical: CANONICAL,
  },

  openGraph: {
    title: "EleveAI — Apprendre, raisonner, progresser",
    description:
      "Calcul rapide, leçon du jour, coach maths et parcours guidés : EleveAI accompagne les élèves pour consolider leurs bases et développer leur raisonnement.",
    url: CANONICAL,
    type: "website",
    siteName: "EleveAI",
    locale: "fr_FR",
    images: [
      {
        url: "/preview.jpg",
        width: 1200,
        height: 630,
        alt: "EleveAI — plateforme pédagogique de mathématiques",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "EleveAI — Mathématiques et progression",
    description:
      "Une plateforme pédagogique pour progresser en maths avec des entraînements courts, réguliers et guidés.",
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
      sameAs: [],
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
      "@type": "EducationalApplication",
      name: "EleveAI",
      url: SITE_URL,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Web",
      educationalLevel: ["Collège"],
      learningResourceType: [
        "Calcul rapide",
        "Leçon du jour",
        "Parcours guidé",
        "Entraînement mathématique",
      ],
      teaches: [
        "Mathématiques",
        "Automatismes",
        "Raisonnement scientifique",
        "Résolution de problèmes",
      ],
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

          <RemerciementsBar />
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