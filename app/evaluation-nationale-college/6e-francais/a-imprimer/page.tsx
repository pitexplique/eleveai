import type { Metadata } from "next";
import Sujet6eFrancaisClient from "./Sujet6eFrancaisClient";

// ⭐ LA REQUÊTE VISÉE N'EST PAS CELLE DE L'ÉPREUVE À L'ÉCRAN. « évaluation
// nationale 6e français » cherche à comprendre ; « sujet à imprimer », « PDF »,
// « annales » cherchent une feuille. Deux intentions, deux pages.
//
// ⚠️ LA DESCRIPTION DIT L'ORAL, et ce n'est pas un détail SEO : c'est la seule
// épreuve papier du site qui demande un adulte à côté. Un professeur qui
// télécharge sans le savoir découvrirait huit questions sans support.

export const metadata: Metadata = {
  title:
    "Évaluation nationale 6e français — gratuit, en PDF imprimable (sujet + corrigé) | EleveAI",
  description:
    "Le sujet de l'épreuve blanche d'évaluation nationale de 6e en français, à imprimer gratuitement : 60 questions en 50 minutes, aux effectifs du sujet officiel, sur le programme de CM2 — texte littéraire, document composite, lexique, grammaire, orthographe et compréhension de l'oral. Les textes des enregistrements sont fournis à part, sur la feuille du professeur. Trois formats : le sujet seul, le sujet et son corrigé, ou le corrigé seul. Sans inscription, sans publicité.",
  keywords: [
    "évaluation nationale 6e français à imprimer",
    "évaluation nationale 6e français PDF",
    "sujet évaluation nationale 6e français",
    "évaluation de rentrée 6e français à imprimer",
    "test de rentrée sixième français PDF",
    "évaluation nationale 6e français corrigé",
    "annales évaluation nationale sixième français",
  ],
  alternates: {
    canonical:
      "https://www.eleveai.fr/evaluation-nationale-college/6e-francais/a-imprimer",
  },
  openGraph: {
    title:
      "Évaluation nationale 6e français — gratuit, en PDF imprimable (sujet + corrigé) — EleveAI",
    description:
      "60 questions en 50 minutes, aux effectifs du sujet officiel, sur le programme de CM2. Le sujet, le corrigé, et les textes à lire à voix haute — à imprimer gratuitement.",
    url: "/evaluation-nationale-college/6e-francais/a-imprimer",
    type: "article",
    siteName: "EleveAI",
    locale: "fr_FR",
  },
};

export default function Page() {
  return <Sujet6eFrancaisClient />;
}
