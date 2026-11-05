import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesSuiteSommeStmg } from "@/lib/fiches-exercices/maths-stmg-suite-somme";

export const metadata: Metadata = {
  title: "Somme des termes d'une suite STMG : 20 exercices corrigés (PDF)",
  description:
    "Vingt exercices corrigés de terminale STMG sur la somme des premiers termes d'une suite : le signe Σ, compter les termes, la formule arithmétique et la formule géométrique. L'entraînement d'un marathonien, les sièges d'un théâtre, une collecte de dons, une pyramide de cubes. Rappel de cours avant chaque niveau, corrigé étape par étape.",
};

export default function ExercicesSuiteSommeStmgPage() {
  return <FicheExercicesClient fiche={exercicesSuiteSommeStmg} />;
}
