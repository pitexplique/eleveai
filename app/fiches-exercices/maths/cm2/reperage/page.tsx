import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesReperageCm2 } from "@/lib/fiches-exercices/maths-cm2-reperage";

export const metadata: Metadata = {
  title: "Se repérer sur un quadrillage CM2 : 20 exercices corrigés, cases, coordonnées, déplacements (PDF)",
  description:
    "Vingt exercices corrigés de CM2, avec champ réponse et clavier maths. Nommer une case comme C4, lire les coordonnées d'un point comme (3 ; 2), retrouver un point, compter un déplacement. Un zoo, un robot, une carte au trésor, des étoiles, un drone, une fourmi et une randonnée. Rappel de cours avant chaque niveau, corrigé étape par étape, PDF à imprimer.",
};

export default function ExercicesReperageCm2Page() {
  return <FicheExercicesClient fiche={exercicesReperageCm2} />;
}
