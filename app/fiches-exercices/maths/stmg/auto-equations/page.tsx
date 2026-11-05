import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesAutoEquationsStmg } from "@/lib/fiches-exercices/maths-stmg-auto-equations";

export const metadata: Metadata = {
  title: "Équations et inéquations STMG : 20 exercices corrigés (PDF)",
  description:
    "Vingt exercices corrigés de STMG sur les équations et les inéquations : le premier degré, le sens qui se retourne, x² = a et ses deux solutions, l'équation produit nul. Une salle d'escalade, une cuve d'irrigation, un contrat d'électricité, un monte-charge. Rappel de cours avant chaque niveau, corrigé étape par étape.",
};

export default function ExercicesAutoEquationsStmgPage() {
  return <FicheExercicesClient fiche={exercicesAutoEquationsStmg} />;
}
