import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesStatInterpolerStmg } from "@/lib/fiches-exercices/maths-stmg-stat-interpoler";

export const metadata: Metadata = {
  title: "Interpoler et extrapoler, Tle STMG : 20 exercices corrigés (PDF)",
  description:
    "Vingt exercices corrigés de terminale STMG sur l'interpolation et l'extrapolation avec une droite d'ajustement : estimer une valeur par le calcul ou sur le graphique, dire si c'est une interpolation ou une extrapolation, trouver à partir de quand un seuil est franchi, discuter les limites d'une extrapolation (valeur absurde, tendance qui change). La taille des enfants (OMS), la population mondiale (ONU), le record du 100 m, une droite d'étalonnage, la fonte d'un glacier. Rappel de cours avant chaque niveau, corrigé étape par étape avec la lecture dessinée, PDF à imprimer.",
};

export default function ExercicesStatInterpolerStmgPage() {
  return <FicheExercicesClient fiche={exercicesStatInterpolerStmg} />;
}
