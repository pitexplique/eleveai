import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesSuiteGeoEvolutionStmg } from "@/lib/fiches-exercices/maths-stmg-suite-geo-evolution";

export const metadata: Metadata = {
  title: "Suite géométrique et taux d'évolution STMG : 20 exercices corrigés (PDF)",
  description:
    "Vingt exercices corrigés de STMG pour relier la raison d'une suite géométrique et un taux d'évolution : passer du pourcentage au coefficient, retrouver un taux avec deux relevés, calculer l'évolution sur deux ans, lire le sens de variation. Des vélos, une PME, un club de rugby, une librairie. Rappel de cours avant chaque niveau, corrigé étape par étape.",
};

export default function ExercicesSuiteGeoEvolutionStmgPage() {
  return <FicheExercicesClient fiche={exercicesSuiteGeoEvolutionStmg} />;
}
