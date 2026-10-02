import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesRatio4e } from "@/lib/fiches-exercices/maths-4e-prop-ratio";

// ⭐ 02/10/2026 : née de la coupe de « Ratios et pourcentages » en deux notions.
export const metadata: Metadata = {
  title: "Ratios 4e : exercices corrigés (simplifier, partager, ratio à trois termes)",
  description:
    "20 exercices de ratios pour la 4e, du geste seul au problème : simplifier a : b, égalité de quotients, ratio à trois termes, partage selon un ratio, écart et enchaînement de ratios. Corrigés pas à pas, avec la barre des parts dessinée.",
};

export default function ExercicesRatio4ePage() {
  return <FicheExercicesClient fiche={exercicesRatio4e} />;
}
