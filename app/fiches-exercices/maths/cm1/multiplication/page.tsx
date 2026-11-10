import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesMultiplicationCm1 } from "@/lib/fiches-exercices/maths-cm1-multiplication";

// ⚠️ Cette page répond à « exercices multiplication CM1 » : × 10, × 100,
// calcul mental, multiplication posée, décimal × entier, problèmes.
export const metadata: Metadata = {
  title: "Multiplication CM1 : 20 exercices corrigés, posée, × 10 et × 100, calcul mental (PDF)",
  description:
    "Vingt exercices corrigés sur la multiplication au CM1 : multiplier par 10, 100 ou 1 000 par la valeur des chiffres, calculer de tête en coupant un nombre, poser une multiplication avec retenues puis par un nombre à deux chiffres, multiplier un prix à virgule, changer l'ordre pour calculer malin. Problèmes : une boulangerie, un voyage en car, un carrelage, des chiffres cachés. Rappel de cours avant chaque niveau, corrigé étape par étape, PDF à imprimer.",
};

export default function ExercicesMultiplicationCm1Page() {
  return <FicheExercicesClient fiche={exercicesMultiplicationCm1} />;
}
