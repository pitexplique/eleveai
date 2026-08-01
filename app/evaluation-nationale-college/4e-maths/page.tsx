import type { Metadata } from "next";
import Epreuve4eMathsClient from "./Epreuve4eMathsClient";

export const metadata: Metadata = {
  title:
    "Évaluation nationale de 4e en maths — l'épreuve blanche, 20 minutes, corrigée | EleveAI",
  description:
    "L'épreuve blanche de l'évaluation nationale de 4e en mathématiques : même forme que le jour J — prise en main, puis 20 questions qui défilent une par une, sans retour en arrière, à raison d'une minute chacune. Sur le programme de 5e : relatifs, fractions, calcul littéral, aires et volumes, triangles, proportionnalité. À la fin, le nom de chaque compétence qui a coincé et de quoi la retravailler. Gratuit, sans publicité.",
  keywords: [
    "évaluation nationale 4e maths",
    "évaluation nationale 4e s'entraîner",
    "épreuve blanche évaluation nationale 4e",
    "évaluation de rentrée quatrième mathématiques",
    "test de rentrée 4e maths",
    "programme de 5e révision",
    "nombres relatifs 5e",
  ],
  alternates: {
    canonical: "https://eleveai.fr/evaluation-nationale-college/4e-maths",
  },
};

export default function Page() {
  return <Epreuve4eMathsClient />;
}
