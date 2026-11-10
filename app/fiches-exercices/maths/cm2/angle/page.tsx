import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesAngleCm2 } from "@/lib/fiches-exercices/maths-cm2-angle";

export const metadata: Metadata = {
  title: "Angles CM2 : 20 exercices corrigés, droit, aigu, obtus, rapporteur (PDF)",
  description:
    "Vingt exercices corrigés de CM2, avec champ réponse et clavier maths. Trouver le sommet et les côtés d'un angle, repérer un angle droit, nommer un angle avec trois lettres, dire s'il est aigu, droit, obtus ou plat, comparer sans mesurer, lire un rapporteur. Une horloge, une pizza, une rampe de skate, un éventail et une rose des vents. Rappel de cours avant chaque niveau, corrigé étape par étape, PDF à imprimer.",
};

export default function ExercicesAngleCm2Page() {
  return <FicheExercicesClient fiche={exercicesAngleCm2} />;
}
