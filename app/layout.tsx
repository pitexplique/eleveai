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

export const metadata: Metadata = {
  metadataBase: new URL("https://eleveai.fr"),
  title:
    "EleveAI – L’IA qui transforme vos questions en prompts intelligents pour élèves, professeurs et parents",
  description:
    "EleveAI transforme vos questions en prompts intelligents. Élèves, parents, professeurs et équipes éducatives gagnent du temps, clarifient leurs demandes et obtiennent des réponses plus pertinentes.",
  keywords: [
    "eleveai",
    "optimisation de prompts",
    "amélioration des questions",
    "IA éducative",
    "IA pédagogique",
    "gain de temps",
    "efficacité scolaire",
    "élèves",
    "parents",
    "professeurs",
    "direction",
    "vie scolaire",
    "assistant IA",
    "éducation",
    "collège",
    "lycée",
    "La Réunion",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title:
      "EleveAI – L’IA qui transforme vos questions en prompts intelligents pour élèves, professeurs et parents",
    description:
      "EleveAI transforme vos questions en prompts intelligents. Élèves, parents, professeurs et équipes éducatives gagnent du temps, clarifient leurs demandes et obtiennent des réponses plus pertinentes.",
    url: "/",
    type: "website",
    siteName: "EleveAI",
    locale: "fr_FR",
    images: [
      {
        url: "/preview.jpg",
        width: 1200,
        height: 630,
        alt: "EleveAI – IA pédagogique pour toute la communauté éducative",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "EleveAI – L’IA qui transforme vos questions en prompts intelligents pour élèves, professeurs et parents",
    description:
      "EleveAI transforme vos questions en prompts intelligents. Élèves, parents, professeurs et équipes éducatives gagnent du temps, clarifient leurs demandes et obtiennent des réponses plus pertinentes.",
    images: ["/preview.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteUrl = "https://eleveai.fr";

  // ✅ JSON-LD : identité EleveAI (Organization)
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "EleveAI",
    url: siteUrl,
    logo: `${siteUrl}/preview.jpg`, // adapte si tu as un vrai logo, ex: /logo.png
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "support",
        email: "frederic.lacoste@ac-reunion.fr",
        availableLanguage: ["fr"],
      },
    ],
    founder: {
      "@type": "Person",
      name: "Frédéric Lacoste",
      jobTitle: "Fondateur",
      url: `${siteUrl}/manifeste`,
    },
  };

  // ✅ JSON-LD : personne (fondateur)
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Frédéric Lacoste",
    jobTitle: "Enseignant de mathématiques · Fondateur d’EleveAI",
    url: `${siteUrl}/manifeste`,
    email: "frederic.lacoste@ac-reunion.fr",
    worksFor: {
      "@type": "Organization",
      name: "EleveAI",
      url: siteUrl,
    },
  };

  // ✅ JSON-LD : site (optionnel mais utile)
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "EleveAI",
    url: siteUrl,
    inLanguage: "fr-FR",
  };

  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-950`}
      >
        <AppShell>{children}</AppShell>

        {/* ✅ Injection JSON-LD (server OK) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </body>
    </html>
  );
}
