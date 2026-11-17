import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesMonnaieCp } from "@/lib/fiches-exercices/maths-cp-monnaie";

// ⚠️ Cette page répond à « exercices monnaie CP : pièces et billets en euros, compter, comparer, rendre la monnaie ».
export const metadata: Metadata = {
  title: "Monnaie CP : 20 exercices corrigés, pièces, billets, rendre la monnaie (PDF)",
  description:
    "Vingt exercices corrigés sur la monnaie au CP : reconnaître les pièces et les billets en euros, compter une somme, comparer deux sommes, payer un prix, rendre la monnaie. Des euros entiers jusqu'à 100, sans centimes. Problèmes : une tirelire, un marché, une fête foraine, une boulangerie. Rappel avant chaque niveau, corrigé étape par étape, réponse vérifiée en ligne, PDF à imprimer.",
};

export default function ExercicesMonnaieCpPage() {
  return <FicheExercicesClient fiche={exercicesMonnaieCp} />;
}
