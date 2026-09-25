import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesFactorisation4e } from "@/lib/fiches-exercices/maths-4e-factorisation";

// ⚠️ Le titre ne répète pas celui de la fiche de cours (« La factorisation ») :
// cette page répond à « exercices corrigés factorisation 4e », l'autre à
// « cours factorisation 4e ».
export const metadata: Metadata = {
  title: "Factorisation 4e : 20 exercices corrigés, facteur commun, vérifier en développant (PDF)",
  description:
    "Vingt exercices corrigés de 4e sur la factorisation : trouver le plus grand facteur commun, factoriser par un nombre, par une lettre ou par un nombre négatif, faire apparaître le « 1 » caché, retrouver un produit en développant deux parenthèses, et vérifier en développant. Problèmes : un terrain de handball, un potager et sa bande fleurie, une forêt replantée, un étang et sa roselière. Rappel de cours avant chaque niveau, corrigé étape par étape avec le rectangle dessiné pour chaque exercice, PDF à imprimer.",
};

export default function ExercicesFactorisation4ePage() {
  return <FicheExercicesClient fiche={exercicesFactorisation4e} />;
}
