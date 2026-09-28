import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesDerVariationsPremiere } from "@/lib/fiches-exercices/maths-premiere-der-variations";

export const metadata: Metadata = {
  title: "Le tableau de variations — 1re (maths, sans spécialité) : 20 exercices corrigés (PDF)",
  description:
    "Vingt exercices corrigés sur le tableau de variations en première, enseignement de mathématiques hors spécialité : déduire les variations du signe de f′, dresser le tableau, maximum et minimum, optimisation, prévoir une évolution. Four, plongeuse, freinage, étape du Tour de France, épidémie, festival, gel des abricotiers. Tableaux dessinés, PDF à imprimer.",
};

export default function ExercicesDerVariationsPremierePage() {
  return <FicheExercicesClient fiche={exercicesDerVariationsPremiere} />;
}
