import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesDerivationPremiere } from "@/lib/fiches-exercices/maths-premiere-tc-derivation";

// La première SANS spécialité : le titre le dit, pour ne pas voler la requête
// de la spé (et ne pas promettre le quotient à qui ne l'a pas au programme).
export const metadata: Metadata = {
  title: "Dérivation en 1re (maths, sans spécialité) : 20 exercices corrigés (PDF)",
  description:
    "Vingt exercices corrigés sur la dérivation en première, enseignement de mathématiques hors spécialité : lire un nombre dérivé sur une tangente, dériver un polynôme de degré 3, étudier le signe de f′ sur sa forme factorisée, tableau de variations, maximum. Exode rural, recette marginale, bénéfice, crue, épidémie, sentier de montagne. Courbes et tableaux dessinés, PDF à imprimer.",
};

export default function ExercicesDerivationPremierePage() {
  return <FicheExercicesClient fiche={exercicesDerivationPremiere} />;
}
