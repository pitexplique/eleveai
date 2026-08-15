import type { Metadata } from "next";
import Epreuve4eMathsClient from "./Epreuve4eMathsClient";

export const metadata: Metadata = {
  title:
    "Évaluation nationale de 4e en maths — l'épreuve blanche, 50 minutes, corrigée | EleveAI",
  description:
    "L'épreuve blanche de l'évaluation nationale de 4e en mathématiques : l'épreuve entière, au volume du sujet officiel — 62 questions en 50 minutes, qui défilent une par une, sans retour en arrière. Quatre domaines (nombres et calcul, grandeurs et mesures, espace et géométrie, données et proportionnalité) et les deux tests spécifiques, automatismes et résolution de problèmes. Sur le programme de 5e : relatifs, fractions, divisibilité, calcul littéral, conversions, aires et volumes, triangles et parallélogrammes, proportionnalité, statistiques, probabilités, programmation. À la fin, un groupe de maîtrise par domaine et de quoi retravailler chaque compétence qui a coincé. Gratuit, sans publicité.",
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
    canonical: "https://www.eleveai.fr/evaluation-nationale-college/4e-maths",
  },
};

export default function Page() {
  return <Epreuve4eMathsClient />;
}
