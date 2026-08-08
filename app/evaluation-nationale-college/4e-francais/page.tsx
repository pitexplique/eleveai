import type { Metadata } from "next";
import Epreuve4eFrancaisClient from "./Epreuve4eFrancaisClient";

export const metadata: Metadata = {
  title:
    "Évaluation nationale de 4e en français — l'épreuve blanche, 25 minutes, corrigée | EleveAI",
  description:
    "L'épreuve blanche de l'évaluation nationale de 4e en français : même forme que le jour J — prise en main, puis 25 questions qui défilent une par une, sans retour en arrière, à raison d'une minute chacune. Sur le programme de 5e : comprendre et interpréter un texte, comprendre ce qu'on écoute, lexique, phrase et accords, discours et valeur des temps. À la fin, le nom de chaque compétence qui a coincé et de quoi la retravailler. Gratuit, sans publicité.",
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
