import type { Metadata } from "next";
import Sujet4eFrancaisClient from "./Sujet4eFrancaisClient";

// ⭐ LA REQUÊTE VISÉE N'EST PAS CELLE DE L'ÉPREUVE À L'ÉCRAN. « évaluation
// nationale 4e français » cherche à comprendre ; « sujet à imprimer », « PDF »,
// « annales » cherchent une feuille. Deux intentions, deux pages.
//
// ⚠️ LA DESCRIPTION DIT L'ORAL : c'est la seule famille d'épreuves papier du
// site qui demande un adulte à côté, et il vaut mieux le savoir avant
// d'imprimer que devant vingt-huit élèves.

export const metadata: Metadata = {
  title:
    "Évaluation nationale 4e français — gratuit, en PDF imprimable (sujet + corrigé) | EleveAI",
  description:
    "Le sujet de l'épreuve blanche d'évaluation nationale de 4e en français, à imprimer gratuitement : 67 questions en 50 minutes, aux effectifs du sujet officiel, sur le programme de 5e — texte littéraire, document composite, lexique, grammaire, orthographe et compréhension de l'oral. Les textes des enregistrements sont fournis à part, sur la feuille du professeur. Trois formats : le sujet seul, le sujet et son corrigé, ou le corrigé seul. Sans inscription, sans publicité.",
  keywords: [
    "évaluation nationale 4e français à imprimer",
    "évaluation nationale 4e français PDF",
    "sujet évaluation nationale 4e français",
    "évaluation de rentrée 4e français à imprimer",
    "test de rentrée quatrième français PDF",
    "évaluation nationale 4e français corrigé",
    "annales évaluation nationale quatrième français",
  ],
  alternates: {
    canonical:
      "https://www.eleveai.fr/evaluation-nationale-college/4e-francais/a-imprimer",
  },
  openGraph: {
    title:
      "Évaluation nationale 4e français — gratuit, en PDF imprimable (sujet + corrigé) — EleveAI",
    description:
      "67 questions en 50 minutes, aux effectifs du sujet officiel, sur le programme de 5e. Le sujet, le corrigé, et les textes à lire à voix haute — à imprimer gratuitement.",
    url: "/evaluation-nationale-college/4e-francais/a-imprimer",
    type: "article",
    siteName: "EleveAI",
    locale: "fr_FR",
  },
};

export default function Page() {
  return <Sujet4eFrancaisClient />;
}
