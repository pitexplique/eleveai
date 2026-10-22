import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesStatChangementVariableStmg } from "@/lib/fiches-exercices/maths-stmg-stat-changement-variable";

export const metadata: Metadata = {
  title: "Changement de variable, Tle STMG : 20 exercices corrigés (PDF)",
  description:
    "Vingt exercices corrigés de terminale STMG sur le changement de variable pour linéariser un nuage de points : u = x², z = 1/x et Y = log y, nuage transformé presque aligné, droite de la calculatrice, retour aux variables de départ (y = 10^(ax + b)), taux d'évolution et seuils. Le prix des pizzas, l'électricité solaire en France (RTE), la distance de freinage, la croissance des bactéries, la loi de Moore, une navette partagée. Rappel de cours avant chaque niveau, corrigé étape par étape avec le nuage transformé, PDF à imprimer.",
};

export default function ExercicesStatChangementVariableStmgPage() {
  return <FicheExercicesClient fiche={exercicesStatChangementVariableStmg} />;
}
