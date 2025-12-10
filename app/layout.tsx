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
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-950`}
      >
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}


