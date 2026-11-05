import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesSuiteMoyennesStmg } from "@/lib/fiches-exercices/maths-stmg-suite-moyennes";

export const metadata: Metadata = {
  title: "Moyennes arithmétique et géométrique STMG : 20 exercices corrigés (PDF)",
  description:
    "Vingt exercices corrigés de terminale STMG sur les moyennes arithmétique et géométrique : demi-somme, racine du produit, retrouver un nombre manquant, intercaler un terme, comprendre pourquoi deux taux ne se moyennent pas. Un loyer, des cigognes, une prime de vente, l'audience d'une radio. Rappel de cours avant chaque niveau, corrigé étape par étape.",
};

export default function ExercicesSuiteMoyennesStmgPage() {
  return <FicheExercicesClient fiche={exercicesSuiteMoyennesStmg} />;
}
