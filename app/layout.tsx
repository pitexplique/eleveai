// app/layout.tsx
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "katex/dist/katex.min.css";
import { Analytics } from "@vercel/analytics/next";
import DevBanner from "@/components/DevBanner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { EleveProvider } from "@/context/EleveContext";
import RemerciementsBar from "@/components/remerciements/RemerciementsBar";
import EcrireAuProf from "@/components/EcrireAuProf";
import PageViewTracker from "@/components/PageViewTracker";

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
    default: "EleveAI — Plusieurs portes pour apprendre",
    template: "%s — EleveAI",
  },

  description:
    "EleveAI : un espace avec plusieurs portes d'entrée pour apprendre et suivre la progression des élèves — maths, français, anglais, espagnol et IA. Coach IA, Parcours, Brevet, Calcul rapide, dictée du jour — du CM1 au Bac, à La Réunion.",

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
    "coach IA",
    "coach français IA",
    "espagnol",
    "français collège",
    "dictée du jour",
  ],

  alternates: {
    canonical: CANONICAL,
  },

  openGraph: {
    title: "EleveAI — Plusieurs portes pour apprendre",
    description:
      "Maths, français, anglais, espagnol et IA : EleveAI accompagne les élèves du CM1 au Bac avec un coach IA, des parcours et un suivi de progression.",
    url: CANONICAL,
    type: "website",
    siteName: "EleveAI",
    locale: "fr_FR",
    images: [
      {
        url: "/preview.jpg",
        width: 1200,
        height: 630,
        alt: "EleveAI — plateforme pédagogique, conçue à La Réunion",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "EleveAI — Comprendre, s'entraîner, progresser",
    description:
      "Maths, français, anglais, espagnol et IA : progresser avec un coach IA, des entraînements courts, réguliers et guidés.",
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
          <PageViewTracker />
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