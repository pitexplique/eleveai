import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesDerNombreDerivePremiere } from "@/lib/fiches-exercices/maths-premiere-der-nombre-derive";

export const metadata: Metadata = {
  title: "Nombre dérivé et tangente — 1re (maths, sans spécialité) : 20 exercices corrigés (PDF)",
  description:
    "Vingt exercices corrigés sur le nombre dérivé en première, enseignement de mathématiques hors spécialité : coefficient directeur d'une tangente, équation réduite par deux points, vitesse instantanée, valeur approchée, coût et recette marginaux. Chute d'une pierre, TGV, glacier, CO₂, radiateur, cuve d'eau de pluie. Tangentes dessinées, PDF à imprimer.",
};

export default function ExercicesDerNombreDerivePremierePage() {
  return <FicheExercicesClient fiche={exercicesDerNombreDerivePremiere} />;
}
