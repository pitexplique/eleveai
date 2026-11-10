import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesAlgorithmiqueCm2 } from "@/lib/fiches-exercices/maths-cm2-algorithmique";

export const metadata: Metadata = {
  title: "Algorithmique CM2 : 20 exercices corrigés, instructions, flèches, Scratch, répéter (PDF)",
  description:
    "Vingt exercices corrigés de CM2, avec champ réponse et clavier maths. Suivre des instructions dans l'ordre, coder un déplacement avec des flèches, lire un programme Scratch, compter les pas, utiliser « répéter ». Un robot aspirateur, une chasse au trésor, un tour de magie, un drone, un robot jardinier et une livreuse à vélo. Rappel de cours avant chaque niveau, corrigé étape par étape, PDF à imprimer.",
};

export default function ExercicesAlgorithmiqueCm2Page() {
  return <FicheExercicesClient fiche={exercicesAlgorithmiqueCm2} />;
}
