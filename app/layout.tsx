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
import MasqueSurGuide from "@/components/MasqueSurGuide";
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

// ⚠️ AVEC LE www, ET C'EST OBLIGATOIRE (corrigé le 06/08/2026).
// `https://eleveai.fr` répond 308 vers `https://www.eleveai.fr` — c'est Vercel
// qui le décide, et le www est donc la VRAIE adresse du site. Tant que cette
// constante disait « eleveai.fr », chaque URL canonique et chaque ligne du
// sitemap désignait une adresse qui redirige : on demandait aux moteurs
// d'indexer une porte au lieu de la pièce.
const SITE_URL = "https://www.eleveai.fr";

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

  // ⛔ « JOURNAL » RETIRÉ PARTOUT LE 06/08/2026. Ce titre-ci est le défaut de
  // TOUTES les pages du site : tant qu'il annonçait un journal, chaque page
  // sans metadata propre continuait de le dire — y compris après la refonte de
  // l'accueil. Frédéric, le même jour : « je me fiche du journal scientifique ».
  title: {
    default: "EleveAI — exercices, coach et cahiers gratuits, du CP au Bac",
    template: "%s — EleveAI",
  },

  description:
    "Dis ce que tu cherches, EleveAI te propose des ressources vérifiées par un enseignant : coach en maths, français, anglais, espagnol et IA, exercices corrigés, cahiers de vacances, dictée et défi du jour. Du CP au Bac, gratuit.",

  keywords: [
    "EleveAI",
    "exercices corrigés",
    "cahier de vacances gratuit",
    "aide aux devoirs",
    "soutien scolaire gratuit",
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

  // ⛔ PAS DE CANONIQUE ICI, PLUS JAMAIS (retirée le 06/08/2026).
  // Elle valait `/accueil` et le layout la donne à TOUTES les pages qui n'en
  // déclarent pas. Six pages disaient donc à Google « je suis une copie de
  // l'accueil, indexe-le à ma place » : les quatre coachs, /parcours et
  // /dictee-du-jour — celles-là mêmes que le sitemap annonce en priorité 0,95.
  // Le site se contredisait, et c'est la balise qui gagne.
  // Sans canonique déclarée, chaque page se désigne elle-même : c'est le bon
  // comportement par défaut. Une canonique ne se pose QUE sur une page qui sait
  // vraiment être le double d'une autre.

  openGraph: {
    title: "EleveAI — exercices, coach et cahiers gratuits, du CP au Bac",
    description:
      "Dis ce que tu cherches, EleveAI te propose des ressources vérifiées par un enseignant : coach en maths, français, anglais, espagnol et IA, exercices corrigés, cahiers de vacances. Du CP au Bac, gratuit.",
    url: "/accueil",
    type: "website",
    siteName: "EleveAI",
    locale: "fr_FR",
    images: [
      {
        url: "/preview.jpg",
        width: 1200,
        height: 630,
        // ⛔ « le journal » retiré de ce texte alternatif le 06/08 : il décrivait
        // encore une page qui n'existe plus, et c'est lui que lisent les
        // lecteurs d'écran comme les IA quand elles décrivent l'aperçu.
        alt: "EleveAI — exercices, coach et cahiers gratuits, du CP au Bac, conçu à La Réunion",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "EleveAI — exercices, coach et cahiers gratuits, du CP au Bac",
    description:
      "Dis ce que tu cherches, EleveAI te propose des ressources vérifiées par un enseignant — maths, français, anglais, espagnol et IA. Il explique sans faire à ta place, tout est corrigé.",
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
      // ⛔ Les trois alternateName « journal » sont partis le 06/08. Le dernier,
      // « Le journal scientifique de La Réunion », était gardé pour un rang
      // gagné devant le CNRS — Frédéric l'a explicitement lâché le même jour.
      // Tant qu'il était là, on continuait de dire à Google qu'on est un
      // journal, sur toutes les pages du site.
      url: SITE_URL,
      logo: `${SITE_URL}/preview.jpg`,
      description:
        "EleveAI propose à chaque élève, parent ou enseignant les ressources vérifiées qui correspondent à sa demande : un coach qui explique sans faire à sa place en maths, français, anglais, espagnol et IA, des exercices corrigés, des cahiers de vacances et des activités ancrées dans le réel de La Réunion.",
      areaServed: { "@type": "Place", name: "La Réunion" },
      foundingLocation: { "@type": "Place", name: "La Réunion, France" },
      // La chaîne officielle, confirmée par Frédéric le 06/08. C'est ce lien
      // qu'une IA cite quand on lui demande « la chaîne d'EleveAI ».
      sameAs: ["https://www.youtube.com/@eleveai974"],
    },
    // ⛔ LE BLOC `Periodical` EST PARTI LE 06/08. Il déclarait EleveAI comme un
    // périodique — un journal — sur toutes les pages du site. Invisible pour un
    // visiteur, mais c'est exactement ce qu'on venait de retirer de la page.
    // Le type qui dit ce qu'on est vraiment, `EducationalApplication`, est déjà
    // là plus bas.
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
            {/* Les guides de survie (imprimables) finissent sur leur propre
                CTA coach : pas de footer ni de remerciements élèves là-bas. */}
            <MasqueSurGuide>
              <Footer />
              <RemerciementsBar />
            </MasqueSurGuide>
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