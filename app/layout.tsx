import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "katex/dist/katex.min.css";
import "./globals.css";
import Header from "@/components/Header";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "EleveAI – Aide scolaire assistée par IA pour collégiens, lycéens et enseignants",
  description:
    "EleveAI est une plateforme éducative qui aide les élèves de collège et lycée à comprendre leurs cours grâce à une IA pédagogique sécurisée. Un espace dédié accompagne les professeurs dans la rédaction de prompts efficaces et leur permet bientôt d’enregistrer, organiser et retrouver leurs prompts.",
  keywords: [
    "eleveai",
    "aide scolaire",
    "IA éducative",
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
  ],
  openGraph: {
    title: "EleveAI – Aide scolaire assistée par IA pour élèves et enseignants",
    description:
      "Une IA pédagogique sécurisée pour aider les élèves à comprendre leurs cours, et un futur espace professeurs pour rédiger, améliorer et enregistrer leurs prompts.",
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
    title: "EleveAI – IA pédagogique pour élèves et enseignants",
    description:
      "Explications claires pour les élèves et aide à la rédaction de prompts pour les enseignants.",
    images: ["https://eleveai.vercel.app/preview.jpg"],
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
