import type { Metadata } from "next";
import Epreuve6eFrancaisClient from "./Epreuve6eFrancaisClient";

export const metadata: Metadata = {
  title:
    "Évaluation nationale de 6e en français — l'épreuve blanche, 25 minutes, corrigée | EleveAI",
  description:
    "L'épreuve blanche de l'évaluation nationale de 6e en français : même forme que le jour J — prise en main, puis 25 questions qui défilent une par une, sans retour en arrière, à raison d'une minute chacune. Sur le programme de CM2 : comprendre ce qu'on lit, comprendre ce qu'on écoute, lexique, phrase et accords, temps des verbes. À la fin, le nom de chaque compétence qui a coincé et de quoi la retravailler. Gratuit, sans publicité.",
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
    canonical: "https://eleveai.fr/evaluation-nationale-college/6e-francais",
  },
};

export default function Page() {
  return <Epreuve6eFrancaisClient />;
}
