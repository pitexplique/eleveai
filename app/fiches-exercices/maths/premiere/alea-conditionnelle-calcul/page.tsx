import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesAleaConditionnelleCalculPremiere } from "@/lib/fiches-exercices/maths-premiere-alea-conditionnelle-calcul";

export const metadata: Metadata = {
  title: "Probabilité conditionnelle, calculer — 1re : 20 exercices corrigés (PDF)",
  description:
    "Vingt exercices corrigés de première : la formule P_A(B) = P(A ∩ B) / P(A), la probabilité d'une intersection, la phrase qui interprète, le paradoxe des faux positifs. Dépistage, résistances électriques, choléra de Londres, incendies de forêt, iode 131, recrutement, espérance de vie. Rappel de cours avant chaque niveau, PDF à imprimer.",
};

export default function ExercicesAleaConditionnelleCalculPremierePage() {
  return <FicheExercicesClient fiche={exercicesAleaConditionnelleCalculPremiere} />;
}
