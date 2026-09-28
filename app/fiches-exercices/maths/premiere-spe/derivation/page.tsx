import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesDerivationPremiereSpe } from "@/lib/fiches-exercices/maths-premiere-derivation";

// ⚠️ Le titre ne répète pas celui de la fiche de cours : cette page répond à
// « exercices corrigés dérivation 1re spé », l'autre à « cours dérivation ».
export const metadata: Metadata = {
  title: "Dérivation 1re spé : 20 exercices corrigés, du nombre dérivé à la tangente (PDF)",
  description:
    "Vingt exercices corrigés sur la dérivation en première spécialité : taux de variation, nombre dérivé par la définition, lecture graphique, équation de la tangente, dérivées usuelles et x ↦ xⁿ, somme, produit, quotient, g(ax + b), valeur absolue. Rappel de cours avant chaque niveau, courbes et tangentes dessinées dans les corrigés, PDF à imprimer.",
};

export default function ExercicesDerivationPremiereSpePage() {
  return <FicheExercicesClient fiche={exercicesDerivationPremiereSpe} />;
}
