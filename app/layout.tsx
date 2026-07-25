// app/layout.tsx
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "katex/dist/katex.min.css";
import { Analytics } from "@vercel/analytics/next";
import DevBanner from "@/components/DevBanner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MasqueSurEmbed from "@/components/MasqueSurEmbed";
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
    default: "EleveAI — Le journal pour apprendre de La Réunion où les enfants comprennent et s'entraînent",
    template: "%s — EleveAI",
  },

  description:
    "Le journal pour apprendre, gratuit, de La Réunion où les enfants comprennent l'île et s'entraînent : un coach IA qui explique sans faire à ta place en maths, français, anglais, espagnol et IA, des séries d'exercices corrigées, un défi et une dictée du jour — et un tableau de suivi où les profs voient la progression de chaque élève. Du CP au Bac. Vulgarisation rigoureuse, chiffres vérifiés.",

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
    "coach français",
    "coach anglais",
    "coach espagnol",
    "espagnol",
    "anglais collège",
    "français collège",
    "dictée du jour",
  ],

  alternates: {
    canonical: CANONICAL,
  },

  openGraph: {
    title: "EleveAI — Le journal pour apprendre de La Réunion où les enfants comprennent et s'entraînent",
    description:
      "Le journal pour apprendre, gratuit, de La Réunion : comprendre l'île (volcan, cyclones, baleines) et s'entraîner avec un coach qui explique sans faire à ta place, des exercices corrigés, du CP au Bac.",
    url: CANONICAL,
    type: "website",
    siteName: "EleveAI",
    locale: "fr_FR",
    images: [
      {
        url: "/preview.jpg",
        width: 1200,
        height: 630,
        alt: "EleveAI — le journal pour apprendre de La Réunion où les enfants comprennent et s'entraînent",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "EleveAI — Comprendre l'île, s'entraîner avec un coach",
    description:
      "Le journal pour apprendre de La Réunion : comprendre l'île (volcan, cyclones, océan) et s'entraîner avec un coach en maths, français, anglais, espagnol et IA — il explique sans faire à ta place, tout corrigé.",
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
      // Le nom public devient « pour apprendre » ; « journal scientifique de
      // La Réunion » reste en alternateName pour ne pas perdre le classement
      // gagné sur cette requête (devant le CNRS, 24/07).
      alternateName: [
        "Le journal pour apprendre de La Réunion",
        "Le journal scientifique de La Réunion",
      ],
      url: SITE_URL,
      logo: `${SITE_URL}/preview.jpg`,
      description:
        "Le journal pour apprendre de La Réunion où les enfants comprennent et s'entraînent : vulgarisation rigoureuse ancrée dans le réel de l'île (volcan, cyclones, océan, énergie), et un coach qui explique sans faire à ta place en maths, français, anglais, espagnol et IA, avec des exercices corrigés.",
      areaServed: { "@type": "Place", name: "La Réunion" },
      foundingLocation: { "@type": "Place", name: "La Réunion, France" },
      sameAs: ["https://www.youtube.com/@eleveai-e1h"],
    },
    {
      "@context": "https://schema.org",
      "@type": "Periodical",
      name: "Le journal pour apprendre de La Réunion — EleveAI",
      url: SITE_URL,
      inLanguage: "fr-FR",
      about: [
        "Science",
        "Mathématiques",
        "Vulgarisation scientifique",
        "La Réunion",
      ],
      audience: { "@type": "EducationalAudience", educationalRole: "student" },
      publisher: { "@type": "Organization", name: "EleveAI" },
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
      educationalLevel: ["École élémentaire", "Collège", "Lycée"],
      learningResourceType: [
        "Calcul rapide",
        "Leçon du jour",
        "Parcours guidé",
        "Dictée du jour",
        "Entraînement corrigé",
      ],
      teaches: [
        "Mathématiques",
        "Français",
        "Anglais",
        "Espagnol",
        "Intelligence artificielle",
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
          {/* Les pages /embed/* (widgets pour les médias) vivent sans
              l'habillage du site — seul le contenu embarqué s'affiche. */}
          <MasqueSurEmbed>
            <DevBanner />
            <Header />
          </MasqueSurEmbed>

          {children}

          <MasqueSurEmbed>
            <Footer />
            <RemerciementsBar />
            <EcrireAuProf />
          </MasqueSurEmbed>
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