import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesCalculCm1 } from "@/lib/fiches-exercices/maths-cm1-calcul";

// ⚠️ Cette page répond à « exercices calcul CM1 » : calcul mental, addition et
// soustraction posées, multiplication, décimaux, calculs à trous, priorités.
export const metadata: Metadata = {
  title: "Calcul CM1 : 20 exercices corrigés, calcul mental, opérations posées (PDF)",
  description:
    "Vingt exercices corrigés de calcul au CM1 : calcul mental et astuces (+ 9, × 5), addition et soustraction posées avec retenues, multiplication posée, nombres à virgule, calculs à trous, priorités des opérations, estimer un résultat. Problèmes : une cantine, un menuisier, un voyage de classe, une épicerie. Rappel de cours avant chaque niveau, corrigé étape par étape, PDF à imprimer.",
};

export default function ExercicesCalculCm1Page() {
  return <FicheExercicesClient fiche={exercicesCalculCm1} />;
}
