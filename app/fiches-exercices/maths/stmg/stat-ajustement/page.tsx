import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesStatAjustementStmg } from "@/lib/fiches-exercices/maths-stmg-stat-ajustement";

export const metadata: Metadata = {
  title: "Ajustement affine, Tle STMG : 20 exercices corrigés (PDF)",
  description:
    "Vingt exercices corrigés de terminale STMG sur l'ajustement affine d'un nuage de points : juger si un ajustement affine est pertinent, tracer une droite au jugé par le point moyen G, trouver l'équation y = ax + b par deux points ou par G et le coefficient directeur, calculer une valeur de y ou de x, critiquer le modèle. Le CO₂ de Mauna Loa, un food truck, la masse salariale d'une PME, un festival, la consommation d'une voiture électrique. Rappel de cours avant chaque niveau, corrigé étape par étape avec la droite dessinée, PDF à imprimer.",
};

export default function ExercicesStatAjustementStmgPage() {
  return <FicheExercicesClient fiche={exercicesStatAjustementStmg} />;
}
