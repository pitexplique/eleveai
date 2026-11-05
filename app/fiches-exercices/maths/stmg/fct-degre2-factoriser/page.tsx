import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesFctDegre2FactoriserStmg } from "@/lib/fiches-exercices/maths-stmg-fct-degre2-factoriser";

export const metadata: Metadata = {
  title: "Degré 2, factoriser connaissant une racine STMG : 20 exercices corrigés (PDF)",
  description:
    "Vingt exercices corrigés de STMG pour factoriser sans discriminant : vérifier qu'un nombre est racine, trouver l'autre avec le produit des racines, écrire la forme factorisée, développer pour contrôler. Des trottinettes, une boulangerie, un bassin de jardin, un cinéma. Rappel de cours avant chaque niveau, corrigé étape par étape.",
};

export default function ExercicesFctDegre2FactoriserStmgPage() {
  return <FicheExercicesClient fiche={exercicesFctDegre2FactoriserStmg} />;
}
