import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesFonctionsReferenceSeconde } from "@/lib/fiches-exercices/maths-seconde-fonctions-reference";

// ⚠️ Le titre ne répète pas celui de la fiche de cours : cette page répond à
// « exercices corrigés fonctions de référence seconde », l'autre à « cours ».
export const metadata: Metadata = {
  title: "Fonctions de référence en seconde : 20 exercices corrigés, carré, inverse, racine (PDF)",
  description:
    "Vingt exercices corrigés sur les fonctions de référence en seconde : carré, inverse, racine carrée, cube et valeur absolue. Calculer, lire une courbe, résoudre x² = k, comparer et encadrer sans calculatrice. Un gouffre mesuré au chronomètre, le marathon sous les 2 heures, la masse d'une baleine, un refuge de montagne. Rappel de cours avant chaque niveau, corrigé étape par étape, PDF à imprimer.",
};

export default function ExercicesFonctionsReferenceSecondePage() {
  return <FicheExercicesClient fiche={exercicesFonctionsReferenceSeconde} />;
}
