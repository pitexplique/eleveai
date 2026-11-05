import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesLogiqueRaisonnementStmg } from "@/lib/fiches-exercices/maths-stmg-logique-raisonnement";

export const metadata: Metadata = {
  title: "Contre-exemple, réciproque, contraposée STMG : 20 exercices corrigés (PDF)",
  description:
    "Vingt exercices corrigés de STMG sur le raisonnement : contre-exemple, réciproque, contraposée, condition nécessaire et condition suffisante. Rappel de cours avant chaque niveau, corrigé étape par étape.",
};

export default function ExercicesLogiqueRaisonnementStmgPage() {
  return <FicheExercicesClient fiche={exercicesLogiqueRaisonnementStmg} />;
}
