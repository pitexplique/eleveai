import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesMonnaieCe2 } from "@/lib/fiches-exercices/maths-ce2-monnaie";

// ⚠️ Cette page répond à « exercices monnaie CE2 : euros et centimes, écriture à virgule, rendre la monnaie ».
export const metadata: Metadata = {
  title: "Monnaie CE2 : 20 exercices corrigés, euros et centimes, écriture à virgule (PDF)",
  description:
    "Vingt exercices corrigés sur la monnaie au CE2 : écrire un prix avec une virgule (4,05 €), 1 € = 100 centimes, compter des pièces et des billets, additionner des prix, rendre la monnaie. Problèmes : une kermesse, un marché, des pièces de 20 centimes, une tirelire. Rappel avant chaque niveau, corrigé étape par étape, réponse vérifiée en ligne, PDF à imprimer.",
};

export default function ExercicesMonnaieCe2Page() {
  return <FicheExercicesClient fiche={exercicesMonnaieCe2} />;
}
