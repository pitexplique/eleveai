import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesSuiteCm2 } from "@/lib/fiches-exercices/maths-cm2-suite";

export const metadata: Metadata = {
  title: "Suites de nombres CM2 : 20 exercices corrigés, continuer, trouver la règle (PDF)",
  description:
    "Vingt exercices corrigés de CM2, avec champ réponse et clavier maths. Continuer une suite, trouver sa règle, dire si elle monte ou si elle descend, puis des défis. Des allumettes, une bougie, une plante d'eau, un taxi, une coureuse, un banquet, une citerne et un code secret. Rappel de cours avant chaque niveau, corrigé étape par étape, PDF à imprimer.",
};

export default function ExercicesSuiteCm2Page() {
  return <FicheExercicesClient fiche={exercicesSuiteCm2} />;
}
