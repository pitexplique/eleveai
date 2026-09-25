import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesParallelogrammes4e } from "@/lib/fiches-exercices/maths-4e-parallelogrammes";

// ⚠️ Le titre ne répète pas celui de la fiche de cours (« Le parallélogramme ») :
// cette page répond à « exercices corrigés parallélogramme 4e », « montrer qu'un
// quadrilatère est un parallélogramme exercices », l'autre au cours.
export const metadata: Metadata = {
  title: "Parallélogrammes 4e : 20 exercices corrigés, démontrer, rectangle, losange, carré, aire (PDF)",
  description:
    "Vingt exercices corrigés de 4e sur le parallélogramme : côtés et angles opposés, diagonales qui se coupent en leur milieu, montrer qu'un quadrilatère est un parallélogramme, rectangle, losange et carré, aire base × hauteur. Problèmes : une lampe d'architecte, un parking en épi, le terrain de baseball, le drapeau du Brésil. Rappel de cours avant chaque niveau, corrigé étape par étape avec chaque figure dessinée à l'échelle, PDF à imprimer.",
};

export default function ExercicesParallelogrammes4ePage() {
  return <FicheExercicesClient fiche={exercicesParallelogrammes4e} />;
}
