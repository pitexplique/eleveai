import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesFctDegre3Stmg } from "@/lib/fiches-exercices/maths-stmg-fct-degre3";

export const metadata: Metadata = {
  title: "Degré 3, courbe, racines et signe STMG : 20 exercices corrigés (PDF)",
  description:
    "Vingt exercices corrigés de STMG sur les fonctions de degré 3 : reconnaître la courbe de ax³ + b, lire trois racines, dresser le tableau de signes, vérifier une racine par le calcul. Une éolienne, un sismographe, un grand huit, un magasin de ski. Rappel de cours avant chaque niveau, corrigé étape par étape.",
};

export default function ExercicesFctDegre3StmgPage() {
  return <FicheExercicesClient fiche={exercicesFctDegre3Stmg} />;
}
