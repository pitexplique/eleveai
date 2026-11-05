import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesAutoOrdresUnitesStmg } from "@/lib/fiches-exercices/maths-stmg-auto-ordres-unites";

export const metadata: Metadata = {
  title: "Ordre de grandeur et conversions STMG : 20 exercices corrigés (PDF)",
  description:
    "Vingt exercices corrigés de STMG sur le calcul mental, l'ordre de grandeur et les conversions : pourcentages usuels, estimer un produit ou un quotient, heures et minutes, tonnes et kilos. Un train, un glacier, un chargement de pommes, une salle de concert. Rappel de cours avant chaque niveau, corrigé étape par étape.",
};

export default function ExercicesAutoOrdresUnitesStmgPage() {
  return <FicheExercicesClient fiche={exercicesAutoOrdresUnitesStmg} />;
}
