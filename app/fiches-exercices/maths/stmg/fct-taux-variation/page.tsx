import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesFctTauxVariationStmg } from "@/lib/fiches-exercices/maths-stmg-fct-taux-variation";

export const metadata: Metadata = {
  title: "Taux de variation et sécante STMG : 20 exercices corrigés (PDF)",
  description:
    "Vingt exercices corrigés de STMG sur le taux de variation : le calculer entre deux valeurs, le voir comme la pente d'une sécante, retrouver une image, dire ce qu'il signifie dans la situation. Une chambre froide, une rivière, une coureuse, deux magasins. Rappel de cours avant chaque niveau, corrigé étape par étape.",
};

export default function ExercicesFctTauxVariationStmgPage() {
  return <FicheExercicesClient fiche={exercicesFctTauxVariationStmg} />;
}
