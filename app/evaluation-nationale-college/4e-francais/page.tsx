import type { Metadata } from "next";
import Epreuve4eFrancaisClient from "./Epreuve4eFrancaisClient";

export const metadata: Metadata = {
  title:
    "Évaluation nationale de 4e en français — l'épreuve blanche, 50 minutes, corrigée | EleveAI",
  // ⚠️ 160 CARACTÈRES MAXIMUM — voir 4e-maths/page.tsx pour le pourquoi.
  // Elle en faisait 564. Le détail des six domaines est dans la page.
  description:
    "Évaluation nationale de 4e en français : l'épreuve blanche, au volume du sujet officiel — 67 questions en 50 minutes, sur le programme de 5e. Gratuit.",
  keywords: [
    "évaluation nationale 4e français",
    "évaluation nationale 4e s'entraîner",
    "épreuve blanche évaluation nationale 4e français",
    "évaluation de rentrée quatrième français",
    "test de rentrée 4e français",
    "valeur des temps 5e",
    "programme de 5e français révision",
  ],
  alternates: {
    canonical: "https://www.eleveai.fr/evaluation-nationale-college/4e-francais",
  },
};

export default function Page() {
  return <Epreuve4eFrancaisClient />;
}
