import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesLinModeliserPremiere } from "@/lib/fiches-exercices/maths-premiere-lin-modeliser";

// La première SANS spécialité : le titre le dit.
export const metadata: Metadata = {
  title: "Modéliser une croissance linéaire en 1re (maths, sans spécialité) : 20 exercices corrigés (PDF)",
  description:
    "Vingt exercices corrigés en première, enseignement de mathématiques hors spécialité : reconnaître une croissance linéaire, choisir entre suite arithmétique (discret) et fonction affine (continu), conclure par une phrase. Covoiturage, piste cyclable, épargne, trait de côte, mouvement uniforme, charge d'une batterie, randonnée. Points et droites dessinés, PDF à imprimer.",
};

export default function ExercicesLinModeliserPremierePage() {
  return <FicheExercicesClient fiche={exercicesLinModeliserPremiere} />;
}
