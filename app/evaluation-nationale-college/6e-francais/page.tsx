import type { Metadata } from "next";
import Epreuve6eFrancaisClient from "./Epreuve6eFrancaisClient";

export const metadata: Metadata = {
  title:
    "Évaluation nationale de 6e en français — l'épreuve blanche, 50 minutes, corrigée | EleveAI",
  // ⚠️ 160 CARACTÈRES MAXIMUM — voir 4e-maths/page.tsx pour le pourquoi.
  // Elle en faisait 558. Le détail des six domaines est dans la page.
  description:
    "Évaluation nationale de 6e en français : l'épreuve blanche, au volume du sujet officiel — 60 questions en 50 minutes, sur le programme de CM2. Gratuit.",
  keywords: [
    "évaluation nationale 6e français",
    "évaluation nationale 6e s'entraîner",
    "épreuve blanche évaluation nationale français",
    "évaluation de rentrée sixième français",
    "test de rentrée 6e français",
    "compréhension de l'écrit CM2",
    "programme de CM2 français révision",
  ],
  alternates: {
    canonical: "https://www.eleveai.fr/evaluation-nationale-college/6e-francais",
  },
};

export default function Page() {
  return <Epreuve6eFrancaisClient />;
}
