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
    "EleveAI – L’IA qui améliore vos questions et prompts pour élèves, parents, professeurs, direction et vie scolaire",

  description:
    "EleveAI optimise, reformule et améliore vos questions et vos prompts pour gagner du temps, clarifier vos demandes et augmenter votre efficacité. Conçu pour les élèves, parents, professeurs, équipes de direction, vie scolaire et personnels éducatifs.",

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
    "La Réunion"
  ],

  metadataBase: new URL("https://eleveai.vercel.app"),

  openGraph: {
    title:
      "EleveAI – L’IA qui améliore vos questions et prompts pour élèves, parents, professeurs, direction et vie scolaire",
    description:
      "EleveAI améliore et optimise les prompts de toute la communauté éducative : élèves, parents, enseignants, direction et vie scolaire.",
    url: "https://eleveai.vercel.app",
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
      "EleveAI – Optimisez vos questions et prompts grâce à l’IA",
    description:
      "EleveAI optimise vos prompts et améliore votre efficacité. Pour élèves, parents, professeurs, direction et vie scolaire.",
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
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
