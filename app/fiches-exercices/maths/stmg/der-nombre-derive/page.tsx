import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesDerNombreDeriveStmg } from "@/lib/fiches-exercices/maths-stmg-der-nombre-derive";

export const metadata: Metadata = {
  title: "Le nombre dérivé STMG : 20 exercices corrigés (PDF)",
  description:
    "Vingt exercices corrigés de STMG sur le nombre dérivé : taux de variation, coefficient directeur de la tangente, lecture sur une courbe, vitesse à un instant et coût marginal. Un voilier, un tram, un stock de médicaments, un livre à éditer. Rappel de cours avant chaque niveau, corrigé étape par étape.",
};

export default function ExercicesDerNombreDeriveStmgPage() {
  return <FicheExercicesClient fiche={exercicesDerNombreDeriveStmg} />;
}
