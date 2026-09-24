import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesArithmetique3e } from "@/lib/fiches-exercices/maths-3e-arithmetique";

// ⚠️ Le titre ne répète pas celui de la fiche de cours (« Multiples, diviseurs
// et facteurs premiers ») : cette page répond à « exercices corrigés
// arithmétique 3e », l'autre à « cours arithmétique 3e ».
export const metadata: Metadata = {
  title: "Arithmétique 3e : 20 exercices corrigés, nombres premiers, décomposition, PGCD (PDF)",
  description:
    "Vingt exercices corrigés de 3e : multiples et diviseurs, critères de divisibilité, nombres premiers, décomposition en produit de facteurs premiers, PGCD et fraction irréductible. Problèmes type brevet : les sacs identiques d'un ravitaillement, les plus grandes dalles d'une terrasse, le cycle de Jupiter et Saturne, les équipes d'un club. Rappel de cours avant chaque niveau, corrigé étape par étape avec échelles de divisions et schémas, PDF à imprimer.",
};

export default function ExercicesArithmetique3ePage() {
  return <FicheExercicesClient fiche={exercicesArithmetique3e} />;
}
