import type { Metadata } from "next";
import FicheExercicesClient from "@/components/fiches-exercices/FicheExercicesClient";
import { exercicesFigurePlaneCm2 } from "@/lib/fiches-exercices/maths-cm2-figure-plane";

export const metadata: Metadata = {
  title: "Figures planes CM2 : 20 exercices corrigés, triangles, quadrilatères, cercle, codage (PDF)",
  description:
    "Vingt exercices corrigés de CM2, avec champ réponse et clavier maths. Reconnaître un triangle, un carré, un losange, un cercle, lire le codage, le rayon et le diamètre, suivre un programme de construction et trouver la mesure qui manque. Un carrelage, un cerf-volant, une cible, un vitrail et des balles de tennis. Rappel de cours avant chaque niveau, corrigé étape par étape, PDF à imprimer.",
};

export default function ExercicesFigurePlaneCm2Page() {
  return <FicheExercicesClient fiche={exercicesFigurePlaneCm2} />;
}
