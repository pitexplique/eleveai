import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesDevfacSeconde } from "@/lib/fiches-exercices/maths-seconde-devfac";

// ⚠️ Le titre ne répète pas celui de la fiche de cours : cette page répond à
// « exercices corrigés développer factoriser seconde », l'autre à « cours ».
export const metadata: Metadata = {
  title: "Développer et factoriser en seconde : 20 exercices corrigés, jusqu'à l'équation produit nul (PDF)",
  description:
    "Vingt exercices corrigés de développement et de factorisation en seconde : distributivité, signe moins devant une parenthèse, double distributivité, facteur commun, identités remarquables, équation produit nul. Problèmes : une terrasse, un cadre photo, un programme de calcul, trois formes d'une même expression. Rappel de cours avant chaque niveau, corrigé étape par étape, PDF à imprimer.",
};

export default function ExercicesDevfacSecondePage() {
  return <FicheExercicesClient fiche={exercicesDevfacSeconde} />;
}
