import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesDerSignePremiere } from "@/lib/fiches-exercices/maths-premiere-der-signe";

export const metadata: Metadata = {
  title: "Le signe de la dérivée — 1re (maths, sans spécialité) : 20 exercices corrigés (PDF)",
  description:
    "Vingt exercices corrigés pour étudier le signe de f′ en première, enseignement de mathématiques hors spécialité : inéquation pour une forme affine, lecture sur la courbe de f′, tableau de signes sur une forme factorisée donnée, vérification en développant. Drone, étape du Tour de France, lac de barrage, saumons, climat. Tableaux de signes dessinés, PDF à imprimer.",
};

export default function ExercicesDerSignePremierePage() {
  return <FicheExercicesClient fiche={exercicesDerSignePremiere} />;
}
