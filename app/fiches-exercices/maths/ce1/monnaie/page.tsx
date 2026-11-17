import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesMonnaieCe1 } from "@/lib/fiches-exercices/maths-ce1-monnaie";

// ⚠️ Cette page répond à « exercices monnaie CE1 : pièces, billets, rendre la monnaie, euros et centimes ».
export const metadata: Metadata = {
  title: "Monnaie CE1 : 20 exercices corrigés, pièces, billets, rendre la monnaie (PDF)",
  description:
    "Vingt exercices corrigés sur la monnaie au CE1 : compter des pièces et des billets, comparer deux sommes, payer un prix, rendre la monnaie, 1 € = 100 centimes, lire un prix à virgule. Problèmes : un fleuriste, une tirelire, un marché, un magasin de jouets. Rappel avant chaque niveau, corrigé étape par étape, réponse vérifiée en ligne, PDF à imprimer.",
};

export default function ExercicesMonnaieCe1Page() {
  return <FicheExercicesClient fiche={exercicesMonnaieCe1} />;
}
