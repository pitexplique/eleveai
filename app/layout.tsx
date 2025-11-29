import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "katex/dist/katex.min.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title:
    "EleveAI – Aide scolaire assistée par IA pour collégiens, lycéens, parents et enseignants",
  description:
    "EleveAI est une plateforme éducative qui aide les élèves de collège et lycée à comprendre leurs cours grâce à une IA pédagogique sécurisée, conforme Eduscol et inspirée des neurosciences. Un espace dédié accompagne les professeurs dans la rédaction de prompts efficaces, avec la possibilité d’organiser et retrouver leurs prompts. Les parents disposent d’un espace pour mieux accompagner leurs enfants.",
  keywords: [
    "eleveai",
    "aide scolaire",
    "IA éducative",
    "IA pédagogique",
    "collège",
    "lycée",
    "réviser",
    "expliquer",
    "maths",
    "français",
    "sciences",
    "La Réunion",
    "prompts enseignants",
    "outil pour professeurs",
    "aide à la rédaction de prompts",
    "espace parents",
    "Eduscol",
    "neurosciences apprentissage",
  ],
  metadataBase: new URL("https://eleveai.vercel.app"),
  openGraph: {
    title:
      "EleveAI – Aide scolaire assistée par IA pour élèves, parents et enseignants",
    description:
      "Une IA pédagogique sécurisée pour aider les élèves à comprendre leurs cours, un espace enseignants pour rédiger et organiser leurs prompts, et un espace parents pour accompagner les apprentissages.",
    url: "https://eleveai.vercel.app",
    type: "website",
    images: [
      {
        url: "https://eleveai.vercel.app/preview.jpg",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "EleveAI – IA pédagogique pour élèves, parents et enseignants",
    description:
      "Explications claires pour les élèves, aide à la rédaction de prompts pour les enseignants, et repères pour les parents.",
    images: ["https://eleveai.vercel.app/preview.jpg"],
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
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}

