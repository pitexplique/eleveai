// app/layout.tsx
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "katex/dist/katex.min.css";
import { Analytics } from "@vercel/analytics/react";
import DevBanner from "@/components/DevBanner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { EleveProvider } from "@/context/EleveContext";
import RemerciementsBar from "@/components/remerciements/RemerciementsBar";
import EcrireAuProf from "@/components/EcrireAuProf";

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
    default: "EleveAI — Plusieurs portes pour apprendre les maths",
    template: "%s — EleveAI",
  },

  description:
    "EleveAI : un espace avec plusieurs portes d'entrée pour apprendre les maths et suivre la progression des élèves. Coach Maths IA, Parcours, Brevet, Calcul rapide, English Maths — du CM1 au Bac, à La Réunion.",

  keywords: [
    "EleveAI",
    "mathématiques",
    "coach maths",
    "parcours progression",
    "brevet des collèges",
    "bac spé maths",
    "calcul rapide",
    "révision maths",
    "suivi élèves",
    "collège",
    "6e", "5e", "4e", "3e",
    "brevet 2026",
    "La Réunion",
    "english maths",
  ],

  alternates: {
    canonical: CANONICAL,
  },

  openGraph: {
    title: "EleveAI — Plusieurs portes pour apprendre les maths",
    description:
      "Coach Maths IA, Parcours, Brevet, Calcul rapide, English Maths : EleveAI accompagne les élèves du CM1 au Bac avec un suivi de progression.",
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
      jobTitle: "Enseignant de mathématiques — Fondateur d’EleveAI",
      description: "Enseignant au Collège du Dimitile à La Réunion. DESS de mathématiques appliquées, spécialiste de la théorie du plus proche voisin.",
      worksFor: {
        "@type": "EducationalOrganization",
        name: "Collège du Dimitile",
        address: { "@type": "PostalAddress", addressRegion: "La Réunion", addressCountry: "FR" },
      },
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

          <Footer />
          <RemerciementsBar />
          <EcrireAuProf />
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