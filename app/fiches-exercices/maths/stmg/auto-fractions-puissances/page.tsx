import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesAutoFractionsPuissancesStmg } from "@/lib/fiches-exercices/maths-stmg-auto-fractions-puissances";

export const metadata: Metadata = {
  title: "Fractions, puissances et écritures STMG : 20 exercices corrigés (PDF)",
  description:
    "Vingt exercices corrigés de STMG sur les fractions et les puissances : additionner et comparer des fractions, en prendre une partie, calculer avec des puissances, écriture scientifique. Un parc de vélos, une colonie de bactéries, la lumière du Soleil, un centre de données. Rappel de cours avant chaque niveau, corrigé étape par étape.",
};

export default function ExercicesAutoFractionsPuissancesStmgPage() {
  return <FicheExercicesClient fiche={exercicesAutoFractionsPuissancesStmg} />;
}
