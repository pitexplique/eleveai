import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesDerFormulesStmg } from "@/lib/fiches-exercices/maths-stmg-der-formules";

export const metadata: Metadata = {
  title: "Les formules de dérivation STMG : 20 exercices corrigés (PDF)",
  description:
    "Vingt exercices corrigés de STMG sur les formules de dérivation : le carré, le cube, le nombre devant, la somme, la constante qui disparaît. La vitesse d'une skateuse, un carrelage, un aquarium, deux podcasts. Rappel de cours avant chaque niveau, corrigé étape par étape.",
};

export default function ExercicesDerFormulesStmgPage() {
  return <FicheExercicesClient fiche={exercicesDerFormulesStmg} />;
}
