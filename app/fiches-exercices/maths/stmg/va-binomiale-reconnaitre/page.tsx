import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesVaBinomialeReconnaitreStmg } from "@/lib/fiches-exercices/maths-stmg-va-binomiale-reconnaitre";

export const metadata: Metadata = {
  title: "Loi binomiale : reconnaître STMG : 20 exercices corrigés (PDF)",
  description:
    "Vingt exercices corrigés de terminale STMG pour reconnaître une loi binomiale : vérifier les conditions, lire n et p dans un énoncé, repérer l'évènement sur un arbre, calculer la probabilité d'un chemin, démasquer le tirage sans remise. Rappel de cours avant chaque niveau, corrigé étape par étape.",
};

export default function ExercicesVaBinomialeReconnaitreStmgPage() {
  return <FicheExercicesClient fiche={exercicesVaBinomialeReconnaitreStmg} />;
}
