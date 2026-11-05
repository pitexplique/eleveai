import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesSuiteRepresentationStmg } from "@/lib/fiches-exercices/maths-stmg-suite-representation";

export const metadata: Metadata = {
  title: "Représenter les termes d'une suite STMG : 20 exercices corrigés (PDF)",
  description:
    "Vingt exercices corrigés de STMG pour représenter une suite : le nuage de points, lire un terme ou un rang, conjecturer la nature de la suite, écrire une formule de tableur recopiable. Un studio de yoga, un entrepôt, une serre, un jeu vidéo. Rappel de cours avant chaque niveau, corrigé étape par étape.",
};

export default function ExercicesSuiteRepresentationStmgPage() {
  return <FicheExercicesClient fiche={exercicesSuiteRepresentationStmg} />;
}
