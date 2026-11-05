import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesAutoIndiceStmg } from "@/lib/fiches-exercices/maths-stmg-auto-indice";

export const metadata: Metadata = {
  title: "Indice base 100 STMG : 20 exercices corrigés (PDF)",
  description:
    "Vingt exercices corrigés de STMG sur l'indice base 100 : interpréter un indice, calculer un indice, retrouver une valeur, calculer le taux entre deux indices, comparer deux séries d'unités différentes. Un aéroport, un vignoble, les prix et les salaires, le solaire. Rappel de cours avant chaque niveau, corrigé étape par étape.",
};

export default function ExercicesAutoIndiceStmgPage() {
  return <FicheExercicesClient fiche={exercicesAutoIndiceStmg} />;
}
