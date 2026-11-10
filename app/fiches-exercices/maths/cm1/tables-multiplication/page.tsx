import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesTablesMultiplicationCm1 } from "@/lib/fiches-exercices/maths-cm1-tables-multiplication";

// ⚠️ Cette page répond à « exercices tables de multiplication CM1 » : tables
// de 2 à 10, table de Pythagore, nombre qui manque, problèmes.
export const metadata: Metadata = {
  title: "Tables de multiplication CM1 : 20 exercices corrigés, de 2 à 10, nombre manquant (PDF)",
  description:
    "Vingt exercices corrigés sur les tables de multiplication au CM1 : lire une multiplication sur un rectangle de billes, retrouver les tables de 2 à 10 avec des astuces (le double, le double du double, 10 fois moins une fois), lire la table de Pythagore, trouver le nombre qui manque, comparer des produits. Problèmes : un verger, un concert, des devinettes, des insectes. Rappel de cours avant chaque niveau, corrigé étape par étape, PDF à imprimer.",
};

export default function ExercicesTablesMultiplicationCm1Page() {
  return <FicheExercicesClient fiche={exercicesTablesMultiplicationCm1} />;
}
