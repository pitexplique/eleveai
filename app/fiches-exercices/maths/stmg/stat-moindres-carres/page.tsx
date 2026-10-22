import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesStatMoindresCarresStmg } from "@/lib/fiches-exercices/maths-stmg-stat-moindres-carres";

export const metadata: Metadata = {
  title: "Méthode des moindres carrés, Tle STMG : 20 exercices corrigés (PDF)",
  description:
    "Vingt exercices corrigés de terminale STMG sur la méthode des moindres carrés : écarts verticaux, somme des carrés des écarts calculée à la main dans un tableau, comparer deux droites d'ajustement, droite donnée par la calculatrice (coefficients arrondis), point moyen, effet d'un point isolé. Les abonnés de Spotify, l'eau d'un hôtel, le coût de production d'une usine, l'attente aux caisses. Rappel de cours avant chaque niveau, corrigé étape par étape avec le tableau des écarts, PDF à imprimer.",
};

export default function ExercicesStatMoindresCarresStmgPage() {
  return <FicheExercicesClient fiche={exercicesStatMoindresCarresStmg} />;
}
