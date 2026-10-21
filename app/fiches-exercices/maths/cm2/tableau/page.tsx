import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesTableauCm2 } from "@/lib/fiches-exercices/maths-cm2-tableau";

// ⚠️ Le titre ne répète pas celui de la fiche de cours (« Lire un tableau ») :
// cette page répond à « exercices corrigés tableau à double entrée CM2 ».
export const metadata: Metadata = {
  title: "Tableau à double entrée CM2 : 20 exercices corrigés, lire, compléter, total (PDF)",
  description:
    "Vingt exercices corrigés pour lire, compléter et interpréter un tableau en CM2 : lire une case au croisement d'une ligne et d'une colonne, retrouver une case effacée grâce au total, calculer un écart, vérifier un total de deux façons. Problèmes : médailles des Jeux de Paris 2024, refuge pour animaux, bibliothèque, panneaux solaires. Rappel de cours avant chaque niveau, corrigé étape par étape, PDF à imprimer.",
};

export default function ExercicesTableauCm2Page() {
  return <FicheExercicesClient fiche={exercicesTableauCm2} />;
}
