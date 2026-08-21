// app/espace-parents/metadata.ts
import type { Metadata } from "next";

// ⚠️ DEUX PAGES POUR LES PARENTS, DEUX INTENTIONS — À NE PAS LAISSER SE
// RESSEMBLER (21/08/2026). `/parents` et `/espace-parents` sortaient côte à côte
// dans les résultats de marque, et le même doublon a déjà coûté deux rubriques
// sur cinq du côté des enseignants (`/enseignants` et `/espace-profs`, cf.
// next.config.ts). Quand deux descriptions disent la même chose, le moteur en
// choisit une au hasard et les deux s'affaiblissent.
//   `/parents`        → est-ce sérieux, est-ce sans danger pour mon enfant
//   `/espace-parents` → qu'est-ce qu'il y fait, et qu'est-ce que j'en vois
// Cette description ne parle donc QUE d'usage et de suivi : pas un mot sur la
// publicité, le RGPD ou l'encadrement, qui sont l'affaire de l'autre page.
//
// ⚠️ Elle citait « Brevet des collèges » et « du CM1 au Bac » — le site couvre
// cinq matières depuis le CP. Une description périmée se fait remplacer par le
// texte de la page (leçon du 08/08, voir app/accueil/metadata.ts).
const RESUME =
  "Cinq coachs du CP à la Terminale, des exercices corrigés et un rituel chaque jour. Votre enfant garde ses résultats, vous suivez ce qu'il travaille et ce qui coince.";

export const metadata: Metadata = {
  title: "Suivre la progression de votre enfant",
  description: RESUME,
  alternates: { canonical: "https://www.eleveai.fr/espace-parents" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: "https://www.eleveai.fr/espace-parents",
    siteName: "EleveAI",
    title: "Suivre la progression de votre enfant",
    description: RESUME,
  },
  twitter: {
    card: "summary",
    title: "Suivre la progression de votre enfant",
    description: RESUME,
  },
};
