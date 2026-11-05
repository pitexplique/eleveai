import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesDerTangenteEquationStmg } from "@/lib/fiches-exercices/maths-stmg-der-tangente-equation";

export const metadata: Metadata = {
  title: "L'équation de la tangente STMG : 20 exercices corrigés (PDF)",
  description:
    "Vingt exercices corrigés de STMG sur l'équation de la tangente : la formule, l'équation réduite, tracer la tangente à la règle, vérifier qu'un point est dessus, estimer une valeur. Une météo, des urgences, une fusée à eau, un pont. Rappel de cours avant chaque niveau, corrigé étape par étape.",
};

export default function ExercicesDerTangenteEquationStmgPage() {
  return <FicheExercicesClient fiche={exercicesDerTangenteEquationStmg} />;
}
