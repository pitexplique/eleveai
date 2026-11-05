import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesAutoTerminaleDeriveeStmg } from "@/lib/fiches-exercices/maths-stmg-auto-terminale-derivee";

export const metadata: Metadata = {
  title: "Dérivée et tangente, automatismes de terminale STMG : 20 exercices corrigés (PDF)",
  description:
    "Vingt exercices corrigés de terminale STMG : dériver un polynôme, calculer le coefficient directeur d'une tangente, trouver où elle est horizontale, lire sa pente sur le dessin. Une imprimerie, un souffleur de verre, un toboggan. Rappel de cours avant chaque niveau, corrigé étape par étape.",
};

export default function ExercicesAutoTerminaleDeriveeStmgPage() {
  return <FicheExercicesClient fiche={exercicesAutoTerminaleDeriveeStmg} />;
}
