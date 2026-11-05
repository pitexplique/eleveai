import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesAutoTerminaleReconnaitreStmg } from "@/lib/fiches-exercices/maths-stmg-auto-terminale-reconnaitre";

export const metadata: Metadata = {
  title: "Reconnaître, automatismes de terminale STMG : 20 exercices corrigés (PDF)",
  description:
    "Vingt exercices corrigés de terminale STMG : reconnaître une suite géométrique, écrire sa raison, passer de la raison au taux, trouver le signe d'une expression factorisée sans rien tracer. Un loyer, une machine, un stock qui fond, des papillons. Rappel de cours avant chaque niveau, corrigé étape par étape.",
};

export default function ExercicesAutoTerminaleReconnaitreStmgPage() {
  return <FicheExercicesClient fiche={exercicesAutoTerminaleReconnaitreStmg} />;
}
