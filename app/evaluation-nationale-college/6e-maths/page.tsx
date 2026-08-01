import type { Metadata } from "next";
import Epreuve6eMathsClient from "./Epreuve6eMathsClient";

export const metadata: Metadata = {
  title:
    "Évaluation nationale de 6e en maths — l'épreuve blanche, 20 minutes, corrigée | EleveAI",
  description:
    "L'épreuve blanche de l'évaluation nationale de 6e en mathématiques : même forme que le jour J — prise en main, puis 20 questions qui défilent une par une, sans retour en arrière, à raison d'une minute chacune. Sur le programme de CM2. À la fin, le nom de chaque compétence qui a coincé et de quoi la retravailler. Gratuit, sans publicité.",
  keywords: [
    "évaluation nationale 6e maths",
    "évaluation nationale 6e s'entraîner",
    "épreuve blanche évaluation nationale",
    "évaluation de rentrée 6e mathématiques",
    "test de rentrée sixième maths",
    "programme de CM2 révision",
  ],
  alternates: {
    canonical: "https://eleveai.fr/evaluation-nationale-college/6e-maths",
  },
};

export default function Page() {
  return <Epreuve6eMathsClient />;
}
