import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesStatEnquete6e } from "@/lib/fiches-exercices/maths-6e-stat-enquete";

// Pas de fiche de cours pour cette notion : le titre vise « exercices corrigés
// enquête statistique tableau d'effectifs 6e ».
export const metadata: Metadata = {
  title: "Enquête et tableau d'effectifs 6e : 20 exercices corrigés (PDF)",
  description:
    "Vingt exercices corrigés pour mener une enquête en 6e : choisir la question et les personnes interrogées, mesurer et noter avec la bonne unité, construire un tableau d'effectifs, lire un tableau. Problèmes : le sommeil, le carnet du jardinier, deux sondages, la pesée du pain. Rappel de cours avant chaque niveau, corrigé étape par étape, PDF à imprimer.",
};

export default function ExercicesStatEnquete6ePage() {
  return <FicheExercicesClient fiche={exercicesStatEnquete6e} />;
}
