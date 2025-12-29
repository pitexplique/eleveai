// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "katex/dist/katex.min.css";
import AppShell from "@/components/AppShell";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ✅ Ajuste si ta page principale publique est /accueil
const SITE_URL = "https://eleveai.fr";
const CANONICAL = "/"; // ou "/accueil" si tu veux que Google considère /accueil comme page principale

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  // ✅ Title plus court, plus clair, plus “produit”
  title: {
    default: "EleveAI — IA pédagogique encadrée (Profs · Élèves · Parents)",
    template: "%s — EleveAI",
  },

  // ✅ Description orientée “cadre + usage”
  description:
    "EleveAI aide à créer des consignes IA (prompts) claires et guidées pour apprendre sans tricher : profs, élèves et parents. Atelier-IA, traces, esprit critique, collège/lycée.",

  // (Keywords pas critique mais ok)
  keywords: [
    "EleveAI",
    "IA pédagogique",
    "IA encadrée",
    "anti-triche",
    "Atelier-IA",
    "consigne IA",
    "prompt éducatif",
    "professeurs",
    "élèves",
    "parents",
    "collège",
    "lycée",
    "La Réunion",
  ],

  alternates: {
    canonical: CANONICAL,
  },

  openGraph: {
    title: "EleveAI — IA pédagogique encadrée (Profs · Élèves · Parents)",
    description:
      "Créer des consignes IA claires et guidées, apprendre sans tricher : Atelier-IA, traces, esprit critique. Pensé collège/lycée.",
    url: CANONICAL,
    type: "website",
    siteName: "EleveAI",
    locale: "fr_FR",
    images: [
      {
        url: "/preview.jpg",
        width: 1200,
        height: 630,
        alt: "EleveAI — IA pédagogique encadrée pour profs, élèves et parents",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "EleveAI — IA pédagogique encadrée (Profs · Élèves · Parents)",
    description:
      "Créer des consignes IA claires et guidées, apprendre sans tricher : Atelier-IA, traces, esprit critique. Pensé collège/lycée.",
    images: ["/preview.jpg"],
  },

  // Bonus utile : empêche l’indexation d’un “cache” si tu en as
  // robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // ✅ JSON-LD : Organization
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "EleveAI",
    url: SITE_URL,
    logo: `${SITE_URL}/preview.jpg`, // idéalement un vrai logo carré : /logo.png
    sameAs: [],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "support",
        email: "frederic.lacoste@ac-reunion.fr",
        availableLanguage: ["fr"],
      },
    ],
  };

  // ✅ JSON-LD : WebSite + SearchAction (aide Google à comprendre le site)
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "EleveAI",
    url: SITE_URL,
    inLanguage: "fr-FR",
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/blog?search={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  // ✅ JSON-LD : WebApplication (important pour un rendu “outil”)
  const appJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "EleveAI",
    url: SITE_URL,
    applicationCategory: "EducationalApplication",
    operatingSystem: "Web",
    inLanguage: "fr-FR",
    description:
      "IA pédagogique encadrée pour profs, élèves et parents : création de consignes IA (prompts), Atelier-IA, traces, esprit critique, cadre anti-triche.",
    offers: [
      {
        "@type": "Offer",
        name: "Découverte",
        price: "0",
        priceCurrency: "EUR",
        category: "subscription",
        url: `${SITE_URL}/tarifs`,
      },
      {
        "@type": "Offer",
        name: "Starter",
        price: "5",
        priceCurrency: "EUR",
        category: "subscription",
        url: `${SITE_URL}/tarifs`,
      },
      {
        "@type": "Offer",
        name: "Essentiel",
        price: "9",
        priceCurrency: "EUR",
        category: "subscription",
        url: `${SITE_URL}/tarifs`,
      },
    ],
  };

  // ✅ (Optionnel) Person — si tu veux vraiment le garder
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Frédéric Lacoste",
    jobTitle: "Fondateur d’EleveAI",
    url: `${SITE_URL}/qui-sommes-nous`,
    worksFor: {
      "@type": "Organization",
      name: "EleveAI",
      url: SITE_URL,
    },
  };

  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-950`}
      >
        <AppShell>{children}</AppShell>

        {/* ✅ JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(appJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </body>
    </html>
  );
}
