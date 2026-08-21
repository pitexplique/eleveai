import type { Metadata } from "next";
import Sujet6eMathsClient from "./Sujet6eMathsClient";

// ⭐ LA REQUÊTE VISÉE N'EST PAS CELLE DE L'ÉPREUVE À L'ÉCRAN. « évaluation
// nationale 6e maths » cherche à comprendre ; « évaluation nationale 6e à
// imprimer », « sujet PDF », « annales » cherchent une feuille. Ce sont deux
// intentions, deux pages — et c'est exactement la leçon des cahiers de
// vacances, dont tout le trafic vient de « à imprimer » et « PDF gratuit ».

export const metadata: Metadata = {
  // ⭐ LA FORMULE EST CELLE DE FRÉDÉRIC (21/08) : « évaluations nationales
  // gratuit en PDF imprimable ». Elle porte les trois mots que les gens tapent
  // — gratuit, PDF, imprimable — et c'est ici qu'elle compte : un sitemap XML
  // ne transporte aucun titre, seul le <title> arrive dans les résultats.
  title:
    "Évaluation nationale 6e maths — gratuit, en PDF imprimable (sujet + corrigé) | EleveAI",
  description:
    "Le sujet de l'épreuve blanche d'évaluation nationale de 6e en mathématiques, à imprimer gratuitement : 62 questions en 50 minutes, aux effectifs du sujet officiel, sur le programme de CM2. Trois formats — le sujet seul, le sujet et son corrigé, ou le corrigé seul pour le professeur. Sans inscription, sans publicité.",
  keywords: [
    "évaluation nationale 6e maths à imprimer",
    "évaluation nationale 6e PDF",
    "sujet évaluation nationale 6e mathématiques",
    "évaluation de rentrée 6e à imprimer",
    "test de rentrée sixième maths PDF",
    "évaluation nationale 6e corrigé",
    "annales évaluation nationale sixième",
  ],
  alternates: {
    canonical:
      "https://www.eleveai.fr/evaluation-nationale-college/6e-maths/a-imprimer",
  },
  openGraph: {
    title:
      "Évaluation nationale de 6e en maths à imprimer (sujet + corrigé, PDF gratuit) — EleveAI",
    description:
      "62 questions en 50 minutes, aux effectifs du sujet officiel, sur le programme de CM2. Le sujet, le corrigé, ou les deux — à imprimer gratuitement.",
    url: "/evaluation-nationale-college/6e-maths/a-imprimer",
    type: "article",
    siteName: "EleveAI",
    locale: "fr_FR",
  },
};

export default function Page() {
  return <Sujet6eMathsClient />;
}
