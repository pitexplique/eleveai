import type { Metadata } from "next";
import Epreuve6eMathsClient from "./Epreuve6eMathsClient";

export const metadata: Metadata = {
  title:
    "Évaluation nationale de 6e en maths — l'épreuve blanche, 50 minutes, corrigée | EleveAI",
  description:
    "L'épreuve blanche de l'évaluation nationale de 6e en mathématiques : l'épreuve entière, aux effectifs du sujet officiel — 62 questions en 50 minutes, qui défilent une par une, sans retour en arrière. Trois domaines (espace et géométrie, grandeurs et mesures, nombres et calculs) et les deux tests spécifiques, automatismes et résolution de problèmes. Sur le programme de CM2. À la fin, un groupe de maîtrise par domaine, dans les mots du bilan officiel, et de quoi retravailler chaque compétence qui a coincé. Le sujet est aussi téléchargeable en PDF imprimable, avec son corrigé. Gratuit, sans publicité.",
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
