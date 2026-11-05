import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesFctDegre2SymetrieStmg } from "@/lib/fiches-exercices/maths-stmg-fct-degre2-symetrie";

export const metadata: Metadata = {
  title: "Degré 2, axe de symétrie et extremum STMG : 20 exercices corrigés (PDF)",
  description:
    "Vingt exercices corrigés de STMG sur l'axe de symétrie d'une parabole et son extremum : le milieu des racines, le maximum ou le minimum, une image retrouvée sans calcul. Une brasserie, des panneaux solaires, un billet de théâtre, un camion sous une arche. Rappel de cours avant chaque niveau, corrigé étape par étape.",
};

export default function ExercicesFctDegre2SymetrieStmgPage() {
  return <FicheExercicesClient fiche={exercicesFctDegre2SymetrieStmg} />;
}
