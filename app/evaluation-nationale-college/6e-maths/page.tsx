import type { Metadata } from "next";
import Epreuve6eMathsClient from "./Epreuve6eMathsClient";

export const metadata: Metadata = {
  title:
    "Évaluation nationale de 6e en maths — l'épreuve blanche, 50 minutes, corrigée | EleveAI",
  // ⚠️ 160 CARACTÈRES MAXIMUM — voir 4e-maths/page.tsx pour le pourquoi.
  // Elle en faisait 605. « aux effectifs » et non « au volume » : c'est le
  // mot de cette page-ci, les deux ne sont pas synonymes ici.
  description:
    "Évaluation nationale de 6e en maths : l'épreuve blanche, aux effectifs du sujet officiel — 62 questions en 50 minutes, sur le programme de CM2. Gratuit.",
  keywords: [
    "évaluation nationale 6e maths",
    "évaluation nationale 6e s'entraîner",
    "épreuve blanche évaluation nationale",
    "évaluation de rentrée 6e mathématiques",
    "test de rentrée sixième maths",
    "programme de CM2 révision",
    // Cette page fille se classe seule : elle doit répondre aussi à ceux qui
    // cherchent une feuille, pas seulement une épreuve à l'écran. Le sujet
    // papier a sa propre page, celle-ci y mène dès le premier écran.
    "évaluation nationale 6e maths PDF",
  ],
  alternates: {
    canonical: "https://www.eleveai.fr/evaluation-nationale-college/6e-maths",
  },
};

export default function Page() {
  return <Epreuve6eMathsClient />;
}
