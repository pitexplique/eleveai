import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesInfoNuagePremiere } from "@/lib/fiches-exercices/maths-premiere-info-nuage";

export const metadata: Metadata = {
  title: "Le nuage de points — 1re : 20 exercices corrigés (PDF)",
  description:
    "Vingt exercices corrigés de première sur le nuage de points : lire les coordonnées d'un point, construire le nuage d'un tableau en choisissant les unités, décrire la tendance, repérer un point isolé. Éolienne et vent, recul d'un glacier, abeilles, médecins des villes. Rappel de cours avant chaque niveau, PDF à imprimer.",
};

export default function ExercicesInfoNuagePremierePage() {
  return <FicheExercicesClient fiche={exercicesInfoNuagePremiere} />;
}
