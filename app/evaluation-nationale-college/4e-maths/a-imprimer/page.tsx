import type { Metadata } from "next";
import Sujet4eMathsClient from "./Sujet4eMathsClient";

// ⭐ LA REQUÊTE VISÉE N'EST PAS CELLE DE L'ÉPREUVE À L'ÉCRAN. « évaluation
// nationale 4e maths » cherche à comprendre ; « évaluation nationale 4e à
// imprimer », « sujet PDF », « annales » cherchent une feuille. Ce sont deux
// intentions, deux pages — et c'est exactement la leçon des cahiers de
// vacances, dont tout le trafic vient de « à imprimer » et « PDF gratuit ».

export const metadata: Metadata = {
  // La formule de Frédéric, la même qu'en 6ᵉ : « gratuit, en PDF imprimable ».
  // Elle porte les trois mots que les gens tapent, et c'est ici qu'elle compte —
  // un sitemap XML ne transporte aucun titre.
  title:
    "Évaluation nationale 4e maths — gratuit, en PDF imprimable (sujet + corrigé) | EleveAI",
  // ⚠️ 160 CARACTÈRES MAXIMUM — voir ../page.tsx pour le pourquoi.
  // Elle en faisait 316. Ce qui est gardé, c'est ce qu'un prof cherche avant
  // de cliquer : le volume, le programme, et « sans inscription » — le seul
  // mot qui le rassure sur le fait qu'il pourra imprimer dans dix minutes.
  description:
    "L'évaluation nationale de 4e en maths à imprimer : 62 questions en 50 minutes, sur le programme de 5e. Sujet et corrigé, gratuits, sans inscription.",
  keywords: [
    "évaluation nationale 4e maths à imprimer",
    "évaluation nationale 4e PDF",
    "sujet évaluation nationale 4e mathématiques",
    "évaluation de rentrée 4e à imprimer",
    "test de rentrée quatrième maths PDF",
    "évaluation nationale 4e corrigé",
    "annales évaluation nationale quatrième",
  ],
  alternates: {
    canonical:
      "https://www.eleveai.fr/evaluation-nationale-college/4e-maths/a-imprimer",
  },
  openGraph: {
    title:
      "Évaluation nationale 4e maths — gratuit, en PDF imprimable (sujet + corrigé) — EleveAI",
    description:
      "62 questions en 50 minutes, aux effectifs du sujet officiel, sur le programme de 5e. Le sujet, le corrigé, ou les deux — à imprimer gratuitement.",
    url: "/evaluation-nationale-college/4e-maths/a-imprimer",
    type: "article",
    siteName: "EleveAI",
    locale: "fr_FR",
  },
};

export default function Page() {
  return <Sujet4eMathsClient />;
}
