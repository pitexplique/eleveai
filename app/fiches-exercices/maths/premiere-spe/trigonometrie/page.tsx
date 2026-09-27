import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesTrigonometriePremiere } from "@/lib/fiches-exercices/maths-premiere-trigonometrie";

export const metadata: Metadata = {
  title: "Trigonométrie 1re spé : 20 exercices corrigés, du radian au cercle trigonométrique (PDF)",
  description:
    "Vingt exercices corrigés de trigonométrie en première spécialité : radian et longueur d'arc, placer un point sur le cercle trigonométrique, cosinus et sinus, valeurs remarquables, angles associés, grands réels, cos x = a, démonstrations de cos π/4 et cos π/3, méthode d'Archimède. Corrigés dessinés sur le cercle, PDF à imprimer.",
};

export default function ExercicesTrigonometriePremierePage() {
  return <FicheExercicesClient fiche={exercicesTrigonometriePremiere} />;
}
