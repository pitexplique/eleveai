import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesContenanceCm2 } from "@/lib/fiches-exercices/maths-cm2-contenance";

export const metadata: Metadata = {
  title: "Contenances CM2 : 20 exercices corrigés, convertir, comparer, verre doseur (PDF)",
  description:
    "Vingt exercices corrigés de CM2, avec champ réponse et clavier maths. Convertir des L, dL, cL et mL, comparer, lire un verre doseur et estimer une contenance. Une pâte à crêpes, une fontaine, un aquarium, une douche ou un bain, un anniversaire et la citerne de la maraîchère. Rappel de cours avant chaque niveau, corrigé étape par étape, PDF à imprimer.",
};

export default function ExercicesContenanceCm2Page() {
  return <FicheExercicesClient fiche={exercicesContenanceCm2} />;
}
