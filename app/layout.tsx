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
    default: "EleveAI — Le journal scientifique de La Réunion où les enfants comprennent et s'entraînent",
    template: "%s — EleveAI",
  },

  description:
    "Le journal scientifique gratuit de La Réunion où les enfants comprennent l'île et s'entraînent : la science et les maths racontées avec le volcan, les cyclones, les baleines — et un coach IA qui explique sans faire à ta place, des séries d'exercices corrigées, un défi et une dictée du jour. Du CP au Bac. Vulgarisation rigoureuse, chiffres vérifiés.",

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
    title: "EleveAI — Le journal scientifique de La Réunion où les enfants comprennent et s'entraînent",
    description:
      "Le journal scientifique gratuit de La Réunion : comprendre l'île (volcan, cyclones, baleines) et s'entraîner avec un coach qui explique sans faire à ta place, des exercices corrigés, du CP au Bac.",
    url: CANONICAL,
    type: "website",
    siteName: "EleveAI",
    locale: "fr_FR",
    images: [
      {
        url: "/preview.jpg",
        width: 1200,
        height: 630,
        alt: "EleveAI — le journal scientifique de La Réunion où les enfants comprennent et s'entraînent",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "EleveAI — Comprendre l'île, s'entraîner avec un coach",
    description:
      "Le journal scientifique de La Réunion : comprendre les sciences avec le volcan, les cyclones, l'océan — et s'entraîner avec un coach qui explique sans faire à ta place, tout corrigé.",
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
      alternateName: "Le journal scientifique de La Réunion",
      url: SITE_URL,
      logo: `${SITE_URL}/preview.jpg`,
      description:
        "Le journal scientifique de La Réunion où les enfants comprennent et s'entraînent : vulgarisation rigoureuse des sciences et des mathématiques ancrée dans le réel de l'île (volcan, cyclones, océan, énergie), et un coach qui explique sans faire à ta place avec des exercices corrigés.",
      areaServed: { "@type": "Place", name: "La Réunion" },
      foundingLocation: { "@type": "Place", name: "La Réunion, France" },
      sameAs: ["https://www.youtube.com/@eleveai-e1h"],
    },
    {
      "@context": "https://schema.org",
      "@type": "Periodical",
      name: "Le journal scientifique de La Réunion — EleveAI",
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