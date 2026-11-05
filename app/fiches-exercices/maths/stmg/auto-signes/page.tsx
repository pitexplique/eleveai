import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesAutoSignesStmg } from "@/lib/fiches-exercices/maths-stmg-auto-signes";

export const metadata: Metadata = {
  title: "Signe d'une expression STMG : 20 exercices corrigés (PDF)",
  description:
    "Vingt exercices corrigés de STMG sur le signe d'une expression : signe de ax + b, seuil de rentabilité, signe d'un produit de deux facteurs, tableau de signes, inéquation. Un atelier de vélos, un plongeoir, une serre, une fromagerie. Rappel de cours avant chaque niveau, corrigé étape par étape.",
};

export default function ExercicesAutoSignesStmgPage() {
  return <FicheExercicesClient fiche={exercicesAutoSignesStmg} />;
}
